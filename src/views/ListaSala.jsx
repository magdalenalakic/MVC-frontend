import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import "klinickiCentar.css";
import Button from "components/CustomButton/CustomButton.jsx";
import axios from "axios";
import Dialog from 'react-bootstrap-dialog';

import IzmenaLekara from 'views/IzmenaProfila.jsx';
import "klinickiCentar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import events from "events.js"; //ovo nece trebati  kasnije
import moment from 'moment';
const localizer = momentLocalizer(moment);

class ListaSala extends Component {
  constructor(props) {
    super(props);
    console.log("LISTA SALA");
    console.log(this.props);
    this.state = {
      uloga: props.uloga,
      email: props.email,
      token: props.token,
      pretraziPoljeKlinika: "",
      datumS: new Date(),
      nazivIzabraneSale: "",
      izabranaSala: 1,
      idAdmina: "",
      idKlinike: "",
      listaSalaKlinike: [],
      hiddenKalendar: false,

      klinikaLekara: 0,
      idSale: "",
      brojSale: "",
      nazivSale: "",
      reirectToIzmeniLekar: false,
    };
     this.listaSalaK = this.listaSalaK.bind(this);
     this.promenjenOdabirSale = this.promenjenOdabirSale.bind(this);
     this.handleChangeDate = this.handleChangeDate.bind(this);
     // this.dodajLekara = this.dodajLekara.bind(this);
    // this.obrisiLekara = this.obrisiLekara.bind(this);
    // this.proslediKliniku = this.proslediKliniku.bind(this);

    // this.getKlinikaValue = this.getKlinikaValue.bind(this);

  }

  getKlinikaValue(){
    console.log('get klinika value');
    return this.state.idKlinike;
  }
  handleChange = e => {
    e.preventDefault();
    
    this.setState({ [e.target.name]: e.target.value });
   console.log(this.state);
    console.log("On change !!!");
  };
  handleChangeDate = date => {
    console.log(date)
    this.setState(
      {
        datumS: date
      },
      () => console.log(this.state)
    );
  };
  
  proslediKliniku(klinika) {
    
    console.log("prosledjena klinika");

    console.log("I==================D" + klinika.target.value);
    console.log("-------------------------" + this.state.idKlinike);
    this.setState({
      klinikaLekara : klinika.target.value
      
    },() => console.log(this.state));
   


  };
  listaSalaIspisi() {


    
        console.log("ID KLINIKE OD KOJE TRAZIM LEKARE: " + this.state.idKlinike);
        console.log("ucitaj mi kliniku");
        var config = {
          headers: {
            Authorization: "Bearer " + this.state.token,
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        };
        console.log("++++++++++++++++++ Id k: " + this.state.idKlinike);
         
        console.log("Preuzmi mi sale za tu kliniku");
        const urlKlinike = 'http://localhost:8025/api/sale/preuzmiSaleKlinike/' + this.state.idKlinike;    
         axios.get(urlKlinike, config)
            .then(klinika => {
                console.log("Preuzeta lista klinika");
                console.log(klinika.data);
    
                this.setState({
                    // idKlinike: klinika.data.id,
                    listaSalaKlinike: klinika.data,
                
                });
 
         })
 
      

  }
  componentWillMount(){
  var config = {
    headers: {
      Authorization: "Bearer " + this.state.token,
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  };
    console.log("wmount")
    console.log("Preuzimanje admina klinike.....")
    var config = {
      headers: {
        Authorization: "Bearer " + this.state.token,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
    const url = 'http://localhost:8025/api/adminKlinike/getAdminKlinikeByEmail';
    axios.get(url, config)
      .then(Response => {
        console.log("Preuzet admin klinike: ");
        console.log(Response.data);

        this.setState({
          email: Response.data.email,
        //   ime: Response.data.ime,
        //   prezime: Response.data.prezime,
        //   telefon: Response.data.telefon,
        idKlinike: Response.data.idKlinike,
        });
        console.log("Ucitaj mi kliniku sa id " + this.state.idKlinike);
        console.log("ucitaj mi kliniku");
        const urlKlinike = 'http://localhost:8025/api/klinike/listaLekaraKlinika/' + this.state.idKlinike;    
        axios.get(urlKlinike, config)
          .then(klinika => {
            console.log("Preuzeta klinika");
            console.log(klinika.data);
   
            this.setState({
                // idKlinike: klinika.data.id,
                listaSalaKlinike: klinika.data,
             
            });
                console.log("++++++++++++++++++ Id k: " + this.state.idKlinike);
         
                console.log("Preuzmi mi sale za tu kliniku");
                const urlKlinike = 'http://localhost:8025/api/sale/preuzmiSaleKlinike/' + this.state.idKlinike;    
                 axios.get(urlKlinike, config)
                    .then(klinika => {
                        console.log("Preuzeta lista klinika");
                        console.log(klinika.data);
            
                        this.setState({
                            // idKlinike: klinika.data.id,
                            listaSalaKlinike: klinika.data,
                        
                        }, ()=>{
                          console.log('OK JE SVE');
                          for(var i = 0;i<this.state.listaSalaKlinike.length; i++){
                            const urlKlinike = 'http://localhost:8025/api/sale/preuzmiZauzeteTermine/' + this.state.listaSalaKlinike[i].id;    
                            axios.get(urlKlinike, config)
                               .then(termini => {
                                console.log('TERMINIIII');
                                console.log(termini.data);
                               })
                               .catch(error => {
                                console.log("sale termini nisu preuzeti")
                              })
                          }
                        });
                      
         
                 })
         
            })
      
      })
      
      .catch(error => {
        console.log("Administrator klinike  nije preuzet")
      })
      console.log("************* ID KLINIKE JE:" + this.state.idKlinike);

    
  }
 
  onDropdownSelected(e) {
    console.log("THE VAL", e.target.value);
    //here you will see the current selected value of the select input
}
dodajSalu = e => {
    e.preventDefault();

    console.log("--------------------------------");
    this.dialog.show({
      title: 'Dodaj salu',
      body: [
      <form className="formaZaDodavanjeNovogLekara">
         
          <div className="imeLekara" >
            <label className="lekarImeLabel" htmlFor="imeLekara">Naziv: </label>
            <input className="lekarImeLabel"
              type="text"
              name="nazivSale"
              defaultValue = "" 
              onChange={this.handleChange}
            />
          </div>
          <div className="telefonLekara" >
            <label className="lekarTelefonLabel" htmlFor="telefonLekara">Oznaka: </label>
            <input className="lekarTelefonLabel"
              type="text"
              name="brojSale"
              defaultValue=""
              onChange={this.handleChange}
            />
          </div>
  
    
      </form> 
      ],
      actions: [
        Dialog.CancelAction(),
        Dialog.OKAction(() => {
          
          console.log('OK je kliknuto!');
          var config = {
            headers: {
              Authorization: "Bearer " + this.state.token,
              Accept: "application/json",
              "Content-Type": "application/json"
            }
          };
          const url3 = "http://localhost:8025/api/sale/dodajSalu";
          axios
            .post(url3, {
              naziv: this.state.nazivSale,
              broj: this.state.brojSale,
              klinikaID: this.state.idKlinike
              
            }, config)
            .then(response => {
              
              console.log("Dodavanje sale je uspjelo! ");
              console.log(response.data);
              this.listaSalaIspisi();

            })
            .catch(error => {
              console.log("Dodavanje nove sale nije uspjelo! ");
            });
           
        })
      ],
      bsSize: 'medium',
      onHide: (dialog) => {
        dialog.hide()
        console.log('closed by clicking background.')
      }
    })
    
  }

  handlePrikaziKalendar = e => {
    console.log("888888888888888888888888888888888888888888")
    this.setState({
      hiddenKalendar: true
    });

  }

handleIzmeni = e => {
    e.preventDefault();

    console.log("handle IZMENIIII SALU : ")
    this.setState({
        idSale: e.target.id
    });
    var config = {
      headers: {
        Authorization: "Bearer " + this.state.token,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
    console.log("Id sale koje mijenjamo: " + e.target.id);
    const url = 'http://localhost:8025/api/sale/' + e.target.id;
    axios.get(url, config)
      .then(Response => {
        console.log("Preuzeta  sala: ");
        console.log(Response.data);

        this.setState({
          brojSale: Response.data.broj,
          nazivSale: Response.data.naziv,
          idKlinike: Response.data.klinikaID
         });
      console.log(this.state.brojSale);
      console.log(this.state.nazivSale);
      console.log(this.state.idKlinike)
        this.dialog.show({
          title: 'Izmeni salu',
          body: [
          <form className="formaZaDodavanjeNovogLekara">
            
              <div className="imeLekara" >
                <label className="lekarImeLabel" htmlFor="imeLekara">Naziv: </label>
                <input className="lekarImeLabel"
                  type="text"
                  name="nazivSale"
                  defaultValue = {this.state.nazivSale} 
                  onChange={this.handleChange}
                />
              </div>
              <div className="telefonLekara" >
                <label className="lekarTelefonLabel" htmlFor="telefonLekara">Oznaka: </label>
                <input className="lekarTelefonLabel"
                  type="text"
                  name="brojSale"
                  defaultValue= {this.state.brojSale}
                  onChange={this.handleChange}
                />
              </div>
      
        
          </form> 
          ],
          actions: [
            Dialog.CancelAction(),
            Dialog.OKAction(() => {
              
              console.log('OK je kliknuto!');
              var config = {
                headers: {
                  Authorization: "Bearer " + this.state.token,
                  Accept: "application/json",
                  "Content-Type": "application/json"
                }
              };
              const url3 = "http://localhost:8025/api/sale/izmenaSale";
              axios
                .put(url3, {
                  id: Response.data.id,
                  naziv: this.state.nazivSale,
                  broj: this.state.brojSale,
                  klinikaID: this.state.idKlinike
                  
                }, config)
                .then(response => {
                  
                  console.log("Izmjena sale je uspjela! ");
                  console.log(response.data);
                  this.listaSalaIspisi();
    
                })
                .catch(error => {
                  console.log("Izmjena sale nije uspjela! ");
                });
              
            })
          ],
          bsSize: 'medium',
          onHide: (dialog) => {
            dialog.hide()
            console.log('closed by clicking background.')
          }
        })
  
    }) 

    .catch(error => {
      console.log("Izmjena sale nije uspela! " + e.target.id);
    });
    

  };

obrisiLekara = e => {
    e.preventDefault();
    console.log("CLick brisanje sale  ");
    
    console.log("Sala za brisanje: " + e.target.id);
    console.log("--------------------------------");
    var config = {
      headers: {
        Authorization: "Bearer " + this.state.token,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
    const url6 = "http://localhost:8025/api/sale/brisanjeSale";
          axios
            .post(url6, {
              id : e.target.id, 
              // naziv: this.state.nazivSale,
              // broj: this.state.brojSale,
              klinikaID: this.state.idKlinike
            
            }, config)
            .then(response => {
              console.log("Brisanje sale uspelo! ");
              console.log(response.data);
              this.listaSalaIspisi();
  
            })
            .catch(error => {
              console.log("Brisanje sale nije uspelo! ");
            });
  
  }

  // listaSalaK() {
  //   let res = [];
  //   let lista = this.state.listaSalaKlinike;

  //   for (var i = 0; i < lista.length; i++) {
      
  //     res.push(

  //       <tr key={i}>
  //           <td>
  //             <input
  //               name="odabranaSala"
  //               type="radio"
  //               value={lista[i].id}
  //               checked={this.state.izabranaSala == lista[i].id}
  //               onChange={e => {
  //           //      this.promenjenOdabirKlinike(e);
  //               }}
  //             ></input>
  //           </td>
         
  //         <td>{lista[i].naziv}</td>
  //         <td>{lista[i].broj}</td>
  //         <td>{lista[i].telefon}</td>   
  //       <td >
  //            <Button  id={lista[i].id} onClick={e => this.obrisiLekara(e)}>Obrisi</Button>
  //            <Dialog ref={(el) => { this.dialog = el }} ></Dialog>     
  //      </td>
  //        <td>
  //           <Button className="OdobrenZahtev" id={lista[i].id} onClick={e => this.handleIzmeni(e)}>
  //             Izmeni
  //           </Button>
  //         </td>
 
  //       </tr>
  //     );
  //   }
  //   return res;
  // }

  odabranaSala = e => {
    //treba redirektovati na pretragu i filtriranje lekara
    e.preventDefault();
    var config = {
      headers: {
        Authorization: "Bearer " + this.state.token,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
    axios
      .get(
        "http://localhost:8025/api/sale/listaLekaraKlinika/" +
          this.state.izabranaKlinika,
          config
      )
      .then(Response => {
        console.log("Preuzeta lista lekara: ");
        console.log(Response.data);
        this.setState({
          listaLekara: Response.data,
          nazivIzabranogLekara:
            Response.data[0].ime + " " + Response.data[0].prezime,
            redirectNext: true,
            flag: 1
        });
        console.log(this.state.listaLekara);
      })

      .catch(error => {
        console.log("lekari nisu preuzete");
      });
    // this.setState({
      
    // });
  };

  promenjenOdabirSale = e => {
    console.log("Izabrana sala: " + e.currentTarget.value);
    this.setState(
      {
        izabranaSala: e.currentTarget.value
      },
      () => console.log(this.state.izabranaSala)
    );
    if (e.currentTarget.value != 0 && e.currentTarget.value != undefined) {
      const lista = this.state.listaSalaKlinike;
      for (var i = 0; i < lista.length; i++) {
        if (lista[i].id == e.currentTarget.value) {
          this.setState(
            {
              nazivIzabraneSale: lista[i].nazivSale
            },
            () => console.log(this.state)
          );
          break;
        }
      }
    }
    this.listaSalaK();
  };

  listaSalaK() {
    let res = [];
    console.log("lista sala pretraga");

    const pretraga = this.state.pretraziPoljeKlinika;
    // const oc = this.state.ocenaKlinike;
    // console.log(oc);
    let lista = this.state.listaSalaKlinike;
    if (pretraga == "" || pretraga == undefined) {
      for (var i = 0; i < lista.length; i++) {
        res.push(
          <tr key={i}>
            <td>
              <input
                name="odabranaSala"
                type="radio"
                value={lista[i].id}
                checked={this.state.izabranaSala == lista[i].id}
                onChange={e => {
                  this.promenjenOdabirSale(e);
                }}
              ></input>
            </td>
                {/* <td key={lista[i].idSale}>{lista[i].idSale}</td>
                <td key={lista[i].nazivSale}>{lista[i].nazivSale}</td>
                <td key={lista[i].brojSale}>{lista[i].brojSale}</td>  */}

                <td>{lista[i].naziv}</td>
                <td>{lista[i].broj}</td>
           
              <td >
                    <Button  id={lista[i].id} onClick={e => this.obrisiLekara(e)}>Obrisi</Button>
                    <Dialog ref={(el) => { this.dialog = el }} ></Dialog>     
              </td>
              <td>
                  <Button className="OdobrenZahtev" id={lista[i].id} onClick={e => this.handleIzmeni(e)}>
                    Izmeni
                  </Button>
              </td>
              <td>
                  <Button  id={lista[i].id} onClick={e => this.handlePrikaziKalendar(e)}>
                    Prikazi kalendar
                  </Button>
              </td>
          </tr>
        );
      }
    } else {
      console.log("===========");
      console.log(pretraga);
      let lista = this.state.listaSalaKlinike;
      console.log("Lista sala:  ")
      
      for (var i = 0; i < lista.length; i++) {
          console.log(lista[i]);
      
          var naziv = lista[i].naziv;
          var broj = lista[i].broj.toString();

    
          if(naziv.toLowerCase().includes(pretraga.toLowerCase())
          || broj.toLowerCase().includes(pretraga.toLocaleLowerCase())){
          console.log("POSTOJIIIIIIT TAKVA")
            res.push(
              <tr key={i}>
                <td>
                  <input
                    name="odabranaSala"
                    type="radio"
                    value={lista[i].id}
                    checked={this.state.izabranaSala == lista[i].id}
                    onChange={e => {
                      this.promenjenOdabirSale(e);
                    }}
                  ></input>
                </td>
                <td>{lista[i].naziv}</td>
                <td>{lista[i].broj}</td>
        
                {/* <td key={lista[i].opis}>{lista[i].opis}</td>
                <td key={lista[i].ocena}>{lista[i].ocena}</td> */}
              </tr>
            );

        }
      }
    }

    return res;
  }

  render() {
console.log("KKad ovdjeeeeee")
const stanjeKalendara = this.state.hiddenKalendar;
console.log("? " + stanjeKalendara);
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col>
              <Row>
                <Card
                  title="Lista sala klinike"
                 
                  ctTableFullWidth
                  ctTableResponsive
                  content={
                    <div>

                    <form>
                        <input
                          placeholder="Pretrazi"
                          type="text"
                          aria-label="Search"
                          name="pretraziPoljeKlinika"
                          onChange={this.handleChange}
                        />
                      {/* <Button onClick={e => this.pretraziSale()}>
                        Pretrazi
                      </Button> */}
                  </form>
                  <div>
                    <h5>Datum za pregled:</h5>

                    <DatePicker
                      placeholderText="Izaberi datum"
                      selected={this.state.datumZaPregled}
                      onChange={date=>this.handleChangeDate(date)}
                      // showTimeSelect
                      minDate={new Date()}
                      // timeCaption="Vreme"
                      withPortal
                      // excludeTimes={[
                      //   setHours(setMinutes(new Date(), 0), 17)
                      // ]}
                      // minTime={setHours(setMinutes(new Date(), 0), 7)}
                      // maxTime={setHours(setMinutes(new Date(), 0), 20)}
                      dateFormat="dd.MM.yyyy"

                      // onChange={date => setStartDate(date)}
                    />
                    <Button onClick={this.slobodniTermini}>
                      Pronadji salu
                    </Button>
                  </div>

                    <Button className="DodajKlinikuDugme"  onClick={e => this.dodajSalu(e)}>Dodaj salu</Button>
                    <Dialog ref={(el) => { this.dialog = el }} ></Dialog>
                    
                   
                    <Table striped hover>
                      <thead>
                        <tr>
                        <th></th>
                          <th id="IdPacijenta">Naziv</th>
                         
                          <th id="ImePacijenta"> Broj</th>
      
                  
                        </tr>
                      </thead>
                      <tbody>{this.listaSalaK()}</tbody>
                    </Table>
                    </div>
                  }
                />
              </Row>
            </Col>
          </Row>

          <Row>
            <Col>
                <Row>
                { this.state.hiddenKalendar ?
                <Card
                  title="Kalendar zauzeca sale"
                 
                  ctTableFullWidth
                  ctTableResponsive
                  content={
                    <div style={{ height: 400 }}  className="ct-chart">
                      
                    <Calendar
                        // style={{ maxHeight: "100%" }}
                        // localizer={localizer}
                        // showMultiDayTimes={true}
                        // // views={["month"]}  
                        // defaultDate={new Date()}
                       // events={this.state.odmor}
                        // eventPropGetter={event => ({
                        //   style:{
                        //     backgroundColor: "#ebd234"
                        //   }
                        // })}

                        localizer={localizer}
                        events={events }
                      //  views={["month"]}
                        defaultDate={new Date()}
                        // startAccessor={event.start}
                        // endAccessor={event.end}
                        // titleAccessor="tip"
                        // onSelectEvent={obj => {
                        //   this.state.objekat = obj;
                        //   console.log(this.state.objekat);
                        //   this.setState({
                        //     isOpen: true
                        //   })
                          
                        // }}
                      />
                  </div>

                  
                  }
                />
                : null
                }
                </Row>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default ListaSala;
