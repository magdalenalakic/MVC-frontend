import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import "klinickiCentar.css";
import { Button } from "react-bootstrap";
// import Button from "components/CustomButton/CustomButton.jsx";
import axios from "axios";
import Dialog from 'react-bootstrap-dialog';
import { ButtonToolbar } from "react-bootstrap";
import IzmenaLekara from 'views/IzmenaProfila.jsx';
import "klinickiCentar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import events from "events.js"; //ovo nece trebati  kasnije
import moment from 'moment';
import ListaZahtevaPregled from "views/ListaZahtevaPregled.jsx"
const localizer = momentLocalizer(moment);

class ListaSala extends Component {
  constructor(props) {
    super(props);
    console.log("LISTA SALAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaa -----------------------------")
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
      pretragaTabela:  false,
      listaTermina: [],
      noviNiz: [], //termin od 9 do 11 i dalje

      disabled: [false, false, false, false],
      
      listaSlobodnihSala: [],
      listaZauzetihTerminaSale: [],
      rezervisanaSala: false,

      listaLekara: [],
      velikiNiz: [],
      aktivaniDugmici: false,
      izabranDatum: false,
      prikaziDatumaTermina: false,
      prikazPretraga: false,
      odabranFilter: "",
      terminPregleda: props.termrinPregleda,
      idPregleda: props.idPregleda,
      idLekar: props.idLekar,
      idPacijent: props.idPacijent,
     // datumPregleda: props.datumPregleda,
      //redirekcija od lista sala, mijenjam izgled i setujem datum
      // redirectFromListaSala: false,

      datum666: "",
      selectValue:"",
      klinikaLekara: 0,
      idSale: "",
      brojSale: "",
      nazivSale: "",
      reirectToIzmeniLekar: false,
    };
     
      console.log(this.state)
      console.log(this.props.datumPregleda);
      // console.log(this.state.datumPregleda);
     this.listaSalaK = this.listaSalaK.bind(this);
     
     this.promenjenOdabirSale = this.promenjenOdabirSale.bind(this);
     this.handleChangeDate = this.handleChangeDate.bind(this);
     this.posaljiDatum = this.posaljiDatum.bind(this);
     this.handleDropdownChange = this.handleDropdownChange.bind(this);
     this.dodeliLekara = this.dodeliLekara.bind(this);
  //   this.rezervisiSalu = this.rezervisiSalu.bind(this);

  }

  getKlinikaValue(){

    return this.state.idKlinike;
  }
  handleChange = e => {
    e.preventDefault();
    
    this.setState({ [e.target.name]: e.target.value });

  };
  handleChangeDate = date => {

    //provjeri mi zauzeti  termin
    let lista = this.state.listaSalaKlinike;
    let listaT = this.state.listaTermina;



      // for (var i = 0; i < lista.length; i++) {


      //     var zabranjeniTermini = [false, false, false, false];
      //     for(var j = 0; j < listaT.length; j++){
      //       if(lista[i].id == listaT[j].salaID){
      
             
                
      //       var dT = moment(listaT[j].datumPocetka).format("DD.MM.YYYY.")
      
      //       var dDP = moment(this.state.datumS).format("DD.MM.YYYY.");
      //         if(dT.valueOf()===dDP.valueOf()){
             
      //           var pocetakTerminaZauzetog = this.state.listaTermina[j].termin;
             
      //               if(pocetakTerminaZauzetog==9){
                    
      //                   zabranjeniTermini[0] = true;
                      
      //               } else  if(pocetakTerminaZauzetog==11){
                     
      //                   zabranjeniTermini[1] = true;
                     
      //               }else  if(pocetakTerminaZauzetog==13){
                      
      //                   zabranjeniTermini[2] = true;
                     
      //               } else  if(pocetakTerminaZauzetog==15){
                      
      //                   zabranjeniTermini[3] = true;
                     
      //               }


      //         }else{
      //           continue;
      //         }
             
      //       }else{
      //         continue;
      //       }


      //     }
       
    // }      
       

                

    this.setState(
      {
        datumS: date,
        datum666: date,
        izabranDatum: true,
        
      },
      () => {
        this.pretraziPoDatumu();
        
      }
        );


  };
  pretraziPoDatumu(){
  } 
  proslediKliniku(klinika) {
    

  
    this.setState({
      klinikaLekara : klinika.target.value
      
    });
   


  };
  listaSalaIspisi() {


    
     
        var config = {
          headers: {
            Authorization: "Bearer " + this.state.token,
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        };
       
        const urlKlinike = 'http://localhost:8025/api/sale/preuzmiSaleKlinike/' + this.state.idKlinike;    
         axios.get(urlKlinike, config)
            .then(klinika => {
               
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


        this.setState({
          email: Response.data.email,
        //   ime: Response.data.ime,
        //   prezime: Response.data.prezime,
        //   telefon: Response.data.telefon,
        idKlinike: Response.data.idKlinike,
        });

        const urlKlinike = 'http://localhost:8025/api/klinike/listaLekaraKlinika/' + this.state.idKlinike;    
        axios.get(urlKlinike, config)
          .then(klinika => {

   
            this.setState({
                // idKlinike: klinika.data.id,
                listaSalaKlinike: klinika.data,
             
            });
              
                const urlKlinike = 'http://localhost:8025/api/sale/preuzmiSaleKlinike/' + this.state.idKlinike;    
                 axios.get(urlKlinike, config)
                    .then(klinika => {
                       
            
                        this.setState({
                            // idKlinike: klinika.data.id,
                            listaSalaKlinike: klinika.data
                            
                        
                        }, ()=>{
                         
                         
                       
                          const urlKlinike = 'http://localhost:8025/api/sale/allTermini';    
                            axios.get(urlKlinike, config)
                               .then(termini => {
                            
                                console.log(termini.data);
                                  this.setState({
                                      listaTermina: termini.data
                                  }, ()=>{
                                        for(var j = 0; j < this.state.listaTermina.length; j++){
                                            var dis = [];
                                            var pocetakTerminaZauzetog = this.state.listaTermina[j].termin;
                                          
                                         
                                                if(pocetakTerminaZauzetog==9){
                                                
                                                    dis = [true, false, false, false];
                                                   
                                                  
                                                } else  if(pocetakTerminaZauzetog==11){
                                                  this.setState({
                                                    disabled: [false, true, false, false]
                                                  })
                                                }else  if(pocetakTerminaZauzetog==13){
                                                  this.setState({
                                                    disabled: [false, false, true, false]
                                                  })
                                                } else  if(pocetakTerminaZauzetog==15){
                                                  this.setState({
                                                    disabled: [false, false, false, true]
                                                  })
                                                }
                                         }
                                         
                                  });
                                 
                               })
                                .catch(error => {
                                  console.log("sale termini nisu preuzeti")
                                })
                             });
                            
         
                 })
         
            })
      
      })
      
      .catch(error => {
        console.log("Administrator klinike  nije preuzet")
      })
  if(this.props.redirectToListaSala==true){
    const urlPRegled = 'http://localhost:8025/api/sale/pronadjiSaleZaTajTermin/' + this.props.idPregleda;    
    axios.get(urlPRegled,  config)
      .then(pregled => {
        console.log(pregled.data);
        this.setState({
          listaSlobodnihSala: pregled.data,
        });
       
      });
  }
   


  this.setState({
    datum666: this.props.datumPregleda
  }, ()=> {console.log("DADSDSADSADASDADDSA DATUM ~~~~~~~~~~~~~~~~~"); console.log(this.state.datum666)})



  const urlKlinike = 'http://localhost:8025/api/klinike/listaLekaraKlinika/' +3;    
  axios.get(urlKlinike, config)
    .then(klinika => {
      console.log("Preuzeta klinika");
      console.log(klinika.data);

      this.setState({
         
          listaLekara: klinika.data,
       
      });
 
    })

  }
 

  ispisiSlobodneLekare() {
    let res = [];
    let lista = this.state.listaLekara;

    for (var i = 0; i < lista.length; i++) {
      
      res.push(

        <tr key={i}>
          <td>{lista[i].id}</td>
         
          <td>{lista[i].ime}</td>
          <td>{lista[i].prezime}</td>
          <td>{lista[i].email}</td>
       
          <td>{lista[i].telefon}</td>   
       
 
        </tr>
      );
    }
    return res;
  }

  dodajSalu = e => {
    e.preventDefault();


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
              
           
              this.listaSalaIspisi();

            })
            .catch(error => {
            });
           
        })
      ],
      bsSize: 'medium',
      onHide: (dialog) => {
        dialog.hide()
      }
    })
    
  }


handleIzmeni = e => {
    e.preventDefault();

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
    const url = 'http://localhost:8025/api/sale/' + e.target.id;
    axios.get(url, config)
      .then(Response => {


        this.setState({
          brojSale: Response.data.broj,
          nazivSale: Response.data.naziv,
          idKlinike: Response.data.klinikaID
         });

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
                  
          
            
                  this.listaSalaIspisi();
    
                })
                .catch(error => {
                });
              
            })
          ],
          bsSize: 'medium',
          onHide: (dialog) => {
            dialog.hide()
          }
        })
  
    }) 

    .catch(error => {
    });
    

  };

obrisiLekara = e => {
    e.preventDefault();
    
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

              this.listaSalaIspisi();
  
            })
            .catch(error => {
            });
  
  }

  dodeliLekara= e => {
     console.log("Dijalog sa slobodnim lekarima za taj datum i termin");
     console.log(e.target.id + " " + e.target.value);
     this.dialog.show({
      title: 'Lista slobodnih lekara',
      body: [
      <form className="formaZaDodavanjeNovogLekara">
         
         <Table striped hover>
                      <thead>
                        <tr>
                          <th id="IdPacijenta">Id</th>
                         
                          <th id="ImePacijenta"> Ime</th>
                          <th id="PrezimePacijenta">Prezime</th>
                          <th id="EmailPacijenta">Email</th>
                         
                          <th id="TelefonPacijenta">Telefon</th>
                  
                        </tr>
                      </thead>
                      <tbody>{this.ispisiSlobodneLekare()}</tbody>
                    </Table>
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
          const url3 = "http://localhost:8025/api/adminKlinike/dodavanjeLekara";
          axios
            .post(url3, {
              ime: this.state.imeLekara,
              prezime: this.state.prezimeLekara,
              telefon: this.state.telefonLekara,
              lozinka: this.state.lozinkaLekara,
              email: this.state.emailLekara,
              klinikaID: this.state.idKlinike,
            }, config)
            .then(response => {
              
              console.log("Dodavanje lekra je uspjelo! ");
              console.log(response.data);
              this.listaLekaraPonovo();

            })
            .catch(error => {
              console.log("Dodavanje novog lekaara nije uspjelo! ");
              console.log("+++++++++++" + this.state.idKlinike);
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

  odabranaSala = e => {
    //treba redirektovati na pretragu i filtriranje lekara
    console.log(e.target.value);
    var config = {
      headers: {
        Authorization: "Bearer " + this.state.token,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
    axios
      .get(
        "http://localhost:8025/api/sale/" +
          this.state.izabranaSala,
          config
      )
      .then(Response => {
    
        this.setState({
          nazivSale: Response.data.naziv,
          brojSale: Response.data.broj,
          idSale: Response.data.id,
          idKlinike: Response.data.klinikaID
        }, () => {
          const url =  "http://localhost:8025/api/pregledi/rezervisanje" ;
            axios
              .post(url, {
                id: this.props.idPregleda,
                salaN : this.state.nazivSale,
                salaBR: this.state.brojSale,
                salaID: this.state.idSale,
                datum: this.state.datumS,
                klinikaID: this.state.idKlinike
                
              }, config)
              .then(response => {
             
              })
              .catch(error => {
          
              });
          })
        

      })

      .catch(error => {
      });



  };

  promenjenOdabirSale = e => {
    console.log ("SALAAA : *********************** "   + e.target.value );
    this.setState(
      {
        izabranaSala: e.target.value
      }




      );


    // if (e.currentTarget.value != 0 && e.currentTarget.value != undefined) {
    //   const lista = this.state.listaSalaKlinike;
    //   for (var i = 0; i < lista.length; i++) {
    //     if (lista[i].id == e.currentTarget.value) {
    //       this.setState(
    //         {
    //           nazivIzabraneSale: lista[i].nazivSale
    //         });
    //       break;
    //     }
    //   }
    // }
    this.listaSalaK();
  };

 
  handleDropdownChange(e) {
    this.setState({ selectValue: e.target.value });
  }
  listaSalaK() {
    var config = {
      headers: {
        Authorization: "Bearer " + this.state.token,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
    let res = [];

    const pretraga = this.state.pretraziPoljeKlinika;
 
    let lista = this.state.listaSalaKlinike;
    let listaT = this.state.listaTermina;

    let listaSlobodnihSala = this.state.listaSlobodnihSala;


    
    if(this.props.redirectToListaSala==true){
          var prikaz1 =  false;
          for (var i = 0; i < this.state.listaSlobodnihSala.length; i++) {
            var zauzetiTermin = [];
            zauzetiTermin = listaSlobodnihSala[i].zauzetiTermini;
           
            var zabranjeniTermini = [false, false, false, false];
            for(var j = 0; j < zauzetiTermin.length; j++){
              var preuzmiPocTermina = [];
              preuzmiPocTermina = zauzetiTermin[j].termin; 

              
                var datumP = zauzetiTermin[j].datumPocetka;
                // console.log("Prikaz 1 : " + prikaz1);
                if(datumP.valueOf()===this.props.datumPregleda.valueOf()){
                  if(preuzmiPocTermina===this.props.terminPregleda){
                    prikaz1 = true;
                    // console.log("Prikaz 1 - 1 : " + prikaz1);

                  }

                }
                
                if(preuzmiPocTermina==9){
                       
                 zabranjeniTermini[0] = true;
               
             } else  if(preuzmiPocTermina==11){
              
                 zabranjeniTermini[1] = true;
              
             }else  if(preuzmiPocTermina==13){
               
                 zabranjeniTermini[2] = true;
              
             } else  if(preuzmiPocTermina==15){
               
                 zabranjeniTermini[3] = true;
              
             }

            }
            
            var naziv = this.state.listaSlobodnihSala[i].naziv;
            var broj = this.state.listaSlobodnihSala[i].broj;

        
      
              
           if(prikaz1==false){
            var krajT = this.props.terminPregleda + 2;
            res.push(
              <tr key={i}>
                     {/* <td>
                      <input
                        name="odabranaSala"
                        type="radio"
                        value={listaSlobodnihSala[i].id}
                        checked={this.state.izabranaSala == listaSlobodnihSala[i].id}
                        onChange={e => {
                          this.promenjenOdabirSale(e);
                        }}
                      ></input>
                    </td> */}
                <td>{naziv}</td>
                <td>{broj}</td>
                <td> {moment(this.props.datumPregleda).format("DD.MM.YYYY.")}
                {this.props.terminPregleda} : 00 - {krajT} : 00
                 </td>
                 <td><Button id={listaSlobodnihSala[i].id}  value= {this.state.selectValue}  onClick={e => this.rezervisiSalu(e) }>  Rezervisi</Button>  </td> 
               
              </tr>
            );
           }else{
            res.push(
              <tr key={i}>
                     {/* <td>
                      <input
                        name="odabranaSala"
                        type="radio"
                        value={listaSlobodnihSala[i].id}
                        checked={this.state.izabranaSala == listaSlobodnihSala[i].id}
                        onChange={e => {
                          this.promenjenOdabirSale(e);
                        }}
                      ></input>
                    </td> */}
                <td>{naziv}</td>
                <td>{broj}</td>
                <td> {moment(this.props.datumPregleda).format("DD.MM.YYYY.")}
                 <select id="selectTermin" onChange={this.handleDropdownChange}>
                          <option value={9} disabled={zabranjeniTermini[0]}>
                            09:00-11:00
                          </option>
                          <option value={11} disabled={zabranjeniTermini[1]}> 
                            11:00-13:00
                          </option>
                          <option value={13} disabled={zabranjeniTermini[2]}>
                            13:00-15:00
                          </option>
                          <option value={15} disabled={zabranjeniTermini[3]}>
                            15:00-17:00
                          </option>
                   </select>
                 </td>
                 <td><Button id={listaSlobodnihSala[i].id}  value= {this.state.selectValue}  onClick={e => this.dodeliLekara(e) }>Dodeli lekara</Button>  </td> 
               
              </tr>
            );
           }

            
          }
       

    } else if ((pretraga == "" || pretraga == undefined) && this.state.izabranDatum == false ) {
      for (var i = 0; i < lista.length; i++) {
        res.push(
          <tr key={i}>
           

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
              
          </tr>
        );
      }
    } else if((pretraga == "" || pretraga == undefined) && this.state.izabranDatum == true ){
     
      let lista = this.state.listaSalaKlinike;
     
 
      for (var i = 0; i < lista.length; i++) {
      
            console.log(lista[i]);
        
            var naziv = lista[i].naziv;
            var broj = lista[i].broj.toString();



           
         


              var zabranjeniTermini = [false, false, false, false];
              for(var j = 0; j < listaT.length; j++){
                if(lista[i].id == listaT[j].salaID){
                

                var dT = moment(listaT[j].datumPocetka).format("DD.MM.YYYY");
                var dDP = moment(this.state.datumS).format("DD.MM.YYYY");
           
               
                  if(dT.valueOf()===dDP.valueOf()){
                   

                    var pocetakTerminaZauzetog = this.state.listaTermina[j].termin;
                  
                 
                        if(pocetakTerminaZauzetog==9){
                        
                            zabranjeniTermini[0] = true;
                          
                        } else  if(pocetakTerminaZauzetog==11){
                         
                            zabranjeniTermini[1] = true;
                         
                        }else  if(pocetakTerminaZauzetog==13){
                          
                            zabranjeniTermini[2] = true;
                         
                        } else  if(pocetakTerminaZauzetog==15){
                          
                            zabranjeniTermini[3] = true;
                         
                        }


                  }
                  
                }else{
                  continue;
                }


            }
           
                    
                    res.push(
                      <tr key={i}>
                        {/* <td>
                          <input
                            name="odabranaSala"
                            type="radio"
                            value={lista[i].id}
                            checked={this.state.izabranaSala == lista[i].id}
                            onChange={e => {
                              this.promenjenOdabirSale(e);
                            }}
                          ></input>
                        </td> */}
                        <td>{lista[i].naziv}</td>
                        <td>{lista[i].broj}</td>

                          {/* za datum */}
 
                       <td> {moment(this.state.datumS).format("DD.MM.YYYY")} <select>
                          <option value="1" disabled={zabranjeniTermini[0]}>
                            09:00-11:00
                          </option>
                          <option value="2" disabled={zabranjeniTermini[1]}> 
                            11:00-13:00
                          </option>
                          <option value="3" disabled={zabranjeniTermini[2]}>
                            13:00-15:00
                          </option>
                          <option value="4" disabled={zabranjeniTermini[3]}>
                            15:00-17:00
                          </option>
                          </select>
                          </td>
                  {/* <td> </td> */}
                  {/* <td><Button>  Rezervisi</Button>  </td>  */}
                      </tr>
                    );
         
        
            
        
      }
    } else if((pretraga != "" || pretraga != undefined) && this.state.izabranDatum == true){
    
      let lista = this.state.listaSalaKlinike;
   
 
      for (var i = 0; i < lista.length; i++) {
      
        
            var naziv = lista[i].naziv;
            var broj = lista[i].broj.toString();
  
            if(naziv.toLowerCase().includes(pretraga.toLowerCase())
            || broj.toLowerCase().includes(pretraga.toLocaleLowerCase())){
         

              var zabranjeniTermini = [false, false, false, false];
              for(var j = 0; j < listaT.length; j++){
                if(lista[i].id == listaT[j].salaID){
                 

                var dT = moment(listaT[j].datumPocetka).format("DD.MM.YYYY");
                var dDP = moment(this.state.datumS).format("DD.MM.YYYY");
           
                
                  if(dT.valueOf()===dDP.valueOf()){

                    var pocetakTerminaZauzetog = this.state.listaTermina[j].termin;
                 
                        if(pocetakTerminaZauzetog==9){
                        
                            zabranjeniTermini[0] = true;
                          
                        } else  if(pocetakTerminaZauzetog==11){
                         
                            zabranjeniTermini[1] = true;
                         
                        }else  if(pocetakTerminaZauzetog==13){
                          
                            zabranjeniTermini[2] = true;
                         
                        } else  if(pocetakTerminaZauzetog==15){
                          
                            zabranjeniTermini[3] = true;
                         
                        }


                  }
                  
                }else{
                  continue;
                }


            }
           
                    
                    res.push(
                      <tr key={i}>
                        
                        <td>{lista[i].naziv}</td>
                        <td>{lista[i].broj}</td>

                          {/* za datum */}

                          <td> {moment(this.state.datumS).format("DD.MM.YYYY")} <select>
                          <option value="1" disabled={zabranjeniTermini[0]}>
                            09:00-11:00
                          </option>
                          <option value="2" disabled={zabranjeniTermini[1]}> 
                            11:00-13:00
                          </option>
                          <option value="3" disabled={zabranjeniTermini[2]}>
                            13:00-15:00
                          </option>
                          <option value="4" disabled={zabranjeniTermini[3]}>
                            15:00-17:00
                          </option>
                          </select>
                          </td>
                      </tr>
                    );
         
        
            }
        
      }
    } else if((pretraga != "" || pretraga != undefined) && this.state.izabranDatum == false){
     
      for (var i = 0; i < lista.length; i++) {
        var naziv = lista[i].naziv;
            var broj = lista[i].broj.toString();

        if(naziv.toLowerCase().includes(pretraga.toLowerCase())
        || broj.toLowerCase().includes(pretraga.toLocaleLowerCase())){
          res.push(
            <tr key={i}>
            
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
                
            </tr>
          );
        }
        
      }
    } 
    return res;
  }


  rezervisiSalu = e =>{
    console.log("SALU REEZERVISEE : " + e.target.id + " " + e.target.value);
    var config = {
      headers: {
        Authorization: "Bearer " + this.state.token,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
    const url = 'http://localhost:8025/api/sale/' + e.target.id;
    axios.get(url, config)
      .then(Response => {
        console.log("SALA PREUZEO JE");
        console.log(Response.data);

        this.setState({
          brojSale: Response.data.broj,
          nazivSale: Response.data.naziv,
          idKlinike: Response.data.klinikaID,
          idSale: Response.data.id
         }, ()=> {
           console.log(this.props.idLekar);
          console.log("111111111111111111111111111111111111111111111111")
          const url3 = "http://localhost:8025/api/sale/rezervisanjeSale";
          axios
            .post(url3, {
              salaID: this.state.idSale,
              klinikaID: this.state.idKlinike,
              datum: this.state.datumS,
              termin: this.state.selectValue,
              id: this.props.idPregleda,
              lekarID: this.props.idLekar,
              
            }, config)
            .then(response => {
              
              console.log("USPJEEEEEH< REZ SALAAAA")
              this.setState({
                rezervisanaSala: true
              }, ()=> {console.log(this.state.rezervisanaSala)
                
                

              })
      
            })
            .catch(error => {
            });
          
         });
    });
    
  }

  posaljiDatum(){
   
    console.log(this.state.datumS);
  }

  prikazFiltera() {
    let res = [];
    if (this.state.odabranFilter == "pretraga") {
      res.push(
        <h5>
          <input
            placeholder="Pretrazi"
            type="text"
            aria-label="Search"
            name="pretraziPoljeKlinika"
            onChange={this.handleChange}
            value={this.state.pretraziPoljeKlinika}
          />
        </h5>
      );
    } else if (this.state.odabranFilter == "datum") {
      if(this.props.redirectToListaSala==true){
      
          res.push(
            <h5>
              <DatePicker
                placeholderText="Izaberi datum"
                selected={this.state.datumPregleda}
                onChange={date => this.handleChangeDate(date)}
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
              <br></br>
              {/* <Button onClick={this.slobodniTermini}>Pronadji termine</Button> */}
            </h5>
          );
      
      }else{
        res.push(
          <h5>
            <DatePicker
              placeholderText="Izaberi datum"
              selected={this.state.datumS}
              onChange={date => this.handleChangeDate(date)}
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
            <br></br>
            {/* <Button onClick={this.slobodniTermini}>Pronadji termine</Button> */}
          </h5>
        );
      }
      
    } else if(this.state.odabranFilter == "dodajSalu"){
      res.push(
        <Dialog ref={(el) => { this.dialog = el }} ></Dialog>
      );
    }
      
    
    return res;
  }
  clickPretraga() {
    if(this.state.odabranFilter == "pretraga"){
      this.setState({
        odabranFilter:""
      })
    }else{
      this.setState({
        odabranFilter: "pretraga"
      });
    }
    
  }
  clickDatum() {
    if(this.state.odabranFilter == "datum"){
      this.setState({
        odabranFilter:""
      })
    }else{
    this.setState({
      odabranFilter: "datum"
    });
  }
  }
  ponistiFiltere(){
    this.setState({
      listaSalaKlinike:this.state.listaSalaKlinike,
      odabranFilter:"",
      izabranDatum: false,
      pretraziPoljeKlinika:""
    })
  }


  render() {
    // console.log(this.props);
    const pretraga = this.state.pretraziPoljeKlinika;
    const redirectFromListaSala = this.props.redirectToListaSala;
    const datumPregleda = this.state.datumPregleda;
    const salaN = this.props.salaN;
    const salaBR = this.props.salaBR;
    // const datumPRegleda = this.props.datumPregleda;
    const reditectListaZah = this.state.rezervisanaSala
    // console.log("ispisi  mi redirect: " + reditectListaZah);
    if(this.state.rezervisanaSala==true){
      console.log("if");
      return (
        <BrowserRouter>
          <Switch>
            <Route
              path="/listaZahtevaPregled"
              render={props => <ListaZahtevaPregled  token={this.state.token} />}
            />
            <Redirect from="/" to="/listaZahtevaPregled" />
          </Switch>
        </BrowserRouter>
      );
    }
    if(redirectFromListaSala==true){
      var krajT = this.props.terminPregleda + 2;
      return (
        
        <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                content={
                  <div>
                    <ButtonToolbar>
                      <Button
                        fill
                        // bsStyle="info"
                        value="1"
                       onClick={e => this.clickPretraga()}
                      >
                        Pretrazi
                      </Button>
                     
                      <Button
                        fill
                        // bsStyle="success"
                        value="3"
                        onClick={e => this.clickDatum()}
                      >
                        Izaberi datum
                      </Button>
                      {/* <Button fill value="4"  onClick={e => this.dodajSalu(e)}>
                        
                        Dodaj salu
                      
                      </Button> */}
                      <Button
                        fill
                        value="5"
                        onClick={e => this.ponistiFiltere()}><i className="pe-7s-close"/> Prikazi sve sale </Button>
                    </ButtonToolbar>
                <p> Zahtevani pregled sale za datum: {moment(this.props.datumPregleda).format("DD.MM.YYYY.")} i termin {this.props.terminPregleda} : 00 - {krajT} : 00</p> 
                    <br></br>
                    <div>{this.prikazFiltera()}</div>
                   
                  </div>
                }
              />
    
             </Col>
            </Row>
 
            <Row>
              <Col md={12}>
                <Row>
                  <Card
                    // title="Lista sala klinike"
                   
                    // ctTableFullWidth
                    // ctTableResponsive
                    content={
                      <div>
  
                      <form>
                        
                    </form>
                    
                    <div>
                    
                    </div>
                      <ButtonToolbar>
                      
                      </ButtonToolbar>
                       <Dialog ref={(el) => { this.dialog = el }} ></Dialog>
                      
                     
                      <Table striped hover>
                        <thead>
                          <tr>
                          {/* <th></th> */}
                            <th id="IdPacijenta">Naziv</th>
                            <th id="ImePacijenta"> Broj</th>
                          
                            <th>Prvi slobodan termin</th>
                    
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
  
      
          </Grid>
        </div>
      );
      
    }

   
    if (this.state.izabranDatum==true) {
      return (
        <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                content={
                  <div>
                    <ButtonToolbar>
                      <Button
                        fill
                        // bsStyle="info"
                        value="1"
                       onClick={e => this.clickPretraga()}
                      >
                        Pretrazi
                      </Button>
                     
                      <Button
                        fill
                        // bsStyle="success"
                        value="3"
                        onClick={e => this.clickDatum()}
                      >
                        Izaberi datum
                      </Button>
                      <Button fill value="4"  onClick={e => this.dodajSalu(e)}>
                        
                        Dodaj salu
                      
                      </Button>
                      <Button
                        fill
                        value="5"
                        onClick={e => this.ponistiFiltere()}><i className="pe-7s-close"/></Button>
                    </ButtonToolbar>
                    <br></br>
                    <div>{this.prikazFiltera()}</div>
                   
                  </div>
                }
              />
    
             </Col>
            </Row>
 
            <Row>
              <Col md={12}>
                <Row>
                  <Card
                    // title="Lista sala klinike"
                   
                    // ctTableFullWidth
                    // ctTableResponsive
                    content={
                      <div>
  
                      <form>
                          {/* <input
                            placeholder="Pretrazi"
                            type="text"
                            aria-label="Search"
                            name="pretraziPoljeKlinika"
                            onChange={this.handleChange}
                          /> */}
                        {/* <Button onClick={e => this.pretraziSale()}>
                          Pretrazi
                        </Button> */}
                    </form>
                    
                    <div>
             
                    </div>
                      
                       <Dialog ref={(el) => { this.dialog = el }} ></Dialog>
                      
                     
                      <Table striped hover>
                        <thead>
                          <tr>
                          {/* <th></th> */}
                            <th id="IdPacijenta">Naziv</th>
                            <th id="ImePacijenta"> Broj</th>
                            {/* <th>Termini</th> */}
                            <th>Prvi slobodan termin</th>
                    
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
    }else{
      return (
        <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                content={
                  <div>
                    <ButtonToolbar>
                      <Button
                        fill
                        // bsStyle="info"
                        value="1"
                       onClick={e => this.clickPretraga()}
                      >
                        Pretrazi
                      </Button>
                     
                      <Button
                        fill
                        // bsStyle="success"
                        value="3"
                        onClick={e => this.clickDatum()}
                      >
                        Izaberi datum
                      </Button>
                      <Button fill value="4"   onClick={e => this.dodajSalu(e)}>
                        
                        Dodaj salu
                      
                      </Button>
                      <Button
                        fill
                        value="5"
                        onClick={e => this.ponistiFiltere()}><i className="pe-7s-close"/></Button>
                    </ButtonToolbar>
                    <br></br>
                    <div>{this.prikazFiltera()}</div>
                   
                  </div>
                }
              />
    
             </Col>
            </Row>
           
            <Row>
              <Col md={12}>
                <Row>
                  <Card
                    // title="Lista sala klinike"
                   
                    // ctTableFullWidth
                    // ctTableResponsive
                    content={
                      <div>
                        {/* stari naziv */}
                      <form>
                          {/* <input
                            placeholder="Pretrazi"
                            type="text"
                            aria-label="Search"
                            name="pretraziPoljeKlinika"
                            onChange={this.handleChange}
                          /> */}
                        {/* <Button onClick={e => this.pretraziSale()}>
                          Pretrazi
                        </Button> */}
                    </form>
                    
  
                      
                      <Dialog ref={(el) => { this.dialog = el }} ></Dialog>
                      
                     
                      <Table striped hover>
                        <thead>
                          <tr>
                          {/* <th></th> */}
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
                        // // views={["month"]}  
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
}

export default ListaSala;
