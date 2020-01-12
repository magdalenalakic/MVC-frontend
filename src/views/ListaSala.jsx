import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import "klinickiCentar.css";
import Button from "components/CustomButton/CustomButton.jsx";
import axios from "axios";
import Dialog from 'react-bootstrap-dialog';
import IzmenaLekara from 'views/IzmenaProfila.jsx';
import "klinickiCentar.css";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

class ListaSala extends Component {
  constructor(props) {
    super(props);
    console.log("LISTA SALA");
    console.log(this.props);
    this.state = {
      uloga: props.uloga,
      email: props.email,
      token: props.token,
      idAdmina: "",
      idKlinike: "",
      listaLekara: [],
      listaKlinika: [], 
      emailLekara: "",
      imeLekara: "",
      prezimeLekara: "",
      lozinkaLekara: "",
      telefonLekara: "",
      klinikaLekara: 0,
      idSale: "",
      brojSale: "",
      nazivSale: "",
      reirectToIzmeniLekar: false,
    };
     this.listaSalaK = this.listaSalaK.bind(this);
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
    // console.log(this.state);
    console.log("On change !!!");
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
                    listaLekara: klinika.data,
                
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
                listaLekara: klinika.data,
             
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
                            listaLekara: klinika.data,
                        
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

  listaSalaK() {
    let res = [];
    let lista = this.state.listaLekara;

    for (var i = 0; i < lista.length; i++) {
      
      res.push(

        <tr key={i}>
       
         
          <td>{lista[i].naziv}</td>
          <td>{lista[i].broj}</td>
          <td>{lista[i].telefon}</td>   
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
    return res;
  }

  render() {
//     const lista = this.state.listaKlinika;
//     const reirectToIzmeniLekar = this.state.reirectToIzmeniLekar;
//    console.log("LEKARRRRRRR : "  + this.state.emailLekara);
//    const emailLekara = this.state.emailLekara;
//     if (reirectToIzmeniLekar === true) {
//       return (
//         <BrowserRouter>
//           <Switch>
//             <Route
            
//               path="/izmenaProfilaLekara"
//               render={props => <IzmenaProfila {...props} email={emailLekara} />}
//             />
//             <Redirect from="/" to="/izmenaProfilaLekara" />
//           </Switch>
//         </BrowserRouter>
//       );
//    }
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col>
              <Row>
                <Card
                  title="Lista sala klinike"
                  // category="Here is a subtitle for this table"
                  ctTableFullWidth
                  ctTableResponsive
                  content={
                    <div>
                    <Button className="DodajKlinikuDugme"  onClick={e => this.dodajSalu(e)}>Dodaj salu</Button>
                    <Dialog ref={(el) => { this.dialog = el }} ></Dialog>
                    
                   
                    <Table striped hover>
                      <thead>
                        <tr>
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
        </Grid>
      </div>
    );
  }
}

export default ListaSala;
