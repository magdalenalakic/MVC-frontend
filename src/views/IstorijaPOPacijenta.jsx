import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";
import Button from "components/CustomButton/CustomButton.jsx";
import { Table } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";
import "izmenaProfila.css";
import "klinickiCentar.css";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
//dodam link za sliku  mozda od doktora!!
import avatar from "assets/img/faces/face-3.jpg";
import "login.js";
import { log } from "util";
import Login from "login";
import slikaPacijent from "assets/img/pacijentImage.jpg";
import axios from "axios";
import Dialog from "react-bootstrap-dialog";

class IstorijaPOPacijenta extends Component {
  constructor(props) {
    super(props);
    console.log("IZMENA PROFILA Pacijent");
    this.state = {
      email: props.email,
      uloga: props.uloga,
      token: props.token,
      ime: "",
      prezime: "",
      formMessage: "",
      lbo: "",
      pregledi: [],
      OnazivKl: "",
      OimeL: "",
      OprezimeL: "",
      OklinikaID: "",
      OlekarID: ""
    };
    this.listaPregleda = this.listaPregleda.bind(this);
    this.oceni = this.oceni.bind(this);
    this.ocenjenaKlinika = this.ocenjenaKlinika.bind(this);
    this.ocenjenLekar = this.ocenjenLekar.bind(this);
  }

  componentWillMount() {
    var config = {
      headers: {
        Authorization: "Bearer " + this.state.token,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
    const url = "http://localhost:8025/api/pacijenti/findPacijentEmail";
    axios
      .get(url, config)
      .then(Response => {
        console.log("Preuzet pacijent: ");
        console.log(Response.data);

        this.setState({
          email: Response.data.email
        });
        this.setState({
          ime: Response.data.ime
        });

        this.setState({
          prezime: Response.data.prezime
        });
        this.setState({
          telefon: Response.data.telefon,
          adresa: Response.data.adresa,
          grad: Response.data.grad,
          drzava: Response.data.drzava,
          lbo: Response.data.lbo
        });
        axios
          .get("http://localhost:8025/api/pregledi/preglediPacijenta", config)
          .then(res => {
            console.log(res.data);
            this.setState({
              pregledi: res.data
            });
          });
      })

      .catch(error => {
        console.log("Pacijent  nije preuzet");
      });
  }
  ocenjenaKlinika(e, klinikaID) {
    console.log(this.state);
    console.log(e.currentTarget.value);
    console.log(klinikaID);
    var config = {
      headers: {
        Authorization: "Bearer " + this.state.token,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
    axios
      .put(
        "http://localhost:8025/api/klinike/oceni/" +
          klinikaID +
          "/" +
          e.currentTarget.value,
        {},
        config
      )
      .then(response => {
        console.log(response.data);
        this.props.handleClick("OCENJENA KLINIKA");

        this.setState({
          ime: response.data.ime
        });
      })
      .catch(error => {
        console.log("Izmena nije uspela! ");
      });
  }
  ocenjenLekar(e,lekarID){
    console.log(e.currentTarget.value);
    console.log(lekarID)
    var config = {
      headers: {
        Authorization: "Bearer " + this.state.token,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
    axios
      .put(
        "http://localhost:8025/api/lekari/oceni/" +
        lekarID +
          "/" +
          e.currentTarget.value,
        {},
        config
      )
      .then(response => {
        console.log(response.data);
        this.props.handleClick("OCENJEN LEKAR");

        this.setState({
          ime: response.data.ime
        });
      })
      .catch(error => {
        console.log("Izmena nije uspela! ");
      });
  };
  oceni = e => {
    let lista = this.state.pregledi;
    console.log(e.currentTarget.value);

    for (var i = 0; i < lista.length; i++) {
      console.log(lista[i].id);
      if (lista[i].id == e.currentTarget.value) {
        console.log("equals");
        this.setState(
          {
            OnazivKl: lista[i].nazivKl,
            OimeL: lista[i].imeL,
            OprezimeL: lista[i].prezimeL,
            OklinikaID: lista[i].klinikaID,
            OlekarID: lista[i].lekarID
          },
          () => {
            this.dialog.show({
              title: "Oceni pregled",
              body: [
                <form className="formaIzmenaProfilaLekara">
                  <div className="ime">
                    <label htmlFor="Ocenite kliniku">Ocenite kliniku: </label>
                    <label>{this.state.OnazivKl}</label>
                    <div>
                      <Button
                        fill
                        bsStyle="danger"
                        value="1"
                        onClick={e =>
                          this.ocenjenaKlinika(e, this.state.OklinikaID)
                        }
                      >
                        1
                      </Button>
                      <Button
                        fill
                        bsStyle="danger"
                        value="2"
                        onClick={e => this.ocenjenaKlinika(e, this.state.OklinikaID)}
                      >
                        2
                      </Button>
                      <Button
                        fill
                        bsStyle="danger"
                        value="3"
                        onClick={e => this.ocenjenaKlinika(e, this.state.OklinikaID)}
                      >
                        3
                      </Button>
                      <Button
                        fill
                        bsStyle="danger"
                        value="4"
                        onClick={e => this.ocenjenaKlinika(e, this.state.OklinikaID)}
                      >
                        4
                      </Button>
                      <Button
                        fill
                        bsStyle="danger"
                        value="5"
                        onClick={e => this.ocenjenaKlinika(e, this.state.OklinikaID)}
                      >
                        5
                      </Button>
                      <Button
                        fill
                        bsStyle="danger"
                        value="6"
                        onClick={e => this.ocenjenaKlinika(e, this.state.OklinikaID)}
                      >
                        6
                      </Button>
                      <Button
                        fill
                        bsStyle="danger"
                        value="7"
                        onClick={e => this.ocenjenaKlinika(e, this.state.OklinikaID)}
                      >
                        7
                      </Button>
                      <Button
                        fill
                        bsStyle="danger"
                        value="8"
                        onClick={e => this.ocenjenaKlinika(e, this.state.OklinikaID)}
                      >
                        8
                      </Button>
                      <Button
                        fill
                        bsStyle="danger"
                        value="9"
                        onClick={e => this.ocenjenaKlinika(e, this.state.OklinikaID)}
                      >
                        9
                      </Button>
                      <Button
                        fill
                        bsStyle="danger"
                        value="10"
                        onClick={e => this.ocenjenaKlinika(e, this.state.OklinikaID)}
                      >
                        10
                      </Button>
                    </div>
                  </div>
                  <div className="ime">
                    <label htmlFor="Ocenite lekara">Ocenite lekara: </label>
                    <label>
                      {this.state.OimeL} {this.state.OprezimeL}
                    </label>
                    <div>
                      <Button
                        fill
                        bsStyle="danger"
                        value="1"
                        onClick={e => this.ocenjenLekar(e, this.state.OlekarID)}
                      >
                        1
                      </Button>
                      <Button
                        fill
                        bsStyle="danger"
                        value="2"
                        onClick={e => this.ocenjenLekar(e, this.state.OlekarID)}
                      >
                        2
                      </Button>
                      <Button
                        fill
                        bsStyle="danger"
                        value="3"
                        onClick={e => this.ocenjenLekar(e, this.state.OlekarID)}
                      >
                        3
                      </Button>
                      <Button
                        fill
                        bsStyle="danger"
                        value="4"
                        onClick={e => this.ocenjenLekar(e, this.state.OlekarID)}
                      >
                        4
                      </Button>
                      <Button
                        fill
                        bsStyle="danger"
                        value="5"
                        onClick={e => this.ocenjenLekar(e, this.state.OlekarID)}
                      >
                        5
                      </Button>
                      <Button
                        fill
                        bsStyle="danger"
                        value="6"
                        onClick={e => this.ocenjenLekar(e, this.state.OlekarID)}
                      >
                        6
                      </Button>
                      <Button
                        fill
                        bsStyle="danger"
                        value="7"
                        onClick={e => this.ocenjenLekar(e, this.state.OlekarID)}
                      >
                        7
                      </Button>
                      <Button
                        fill
                        bsStyle="danger"
                        value="8"
                        onClick={e => this.ocenjenLekar(e, this.state.OlekarID)}
                      >
                        8
                      </Button>
                      <Button
                        fill
                        bsStyle="danger"
                        value="9"
                        onClick={e => this.ocenjenLekar(e, this.state.OlekarID)}
                      >
                        9
                      </Button>
                      <Button
                        fill
                        bsStyle="danger"
                        value="10"
                        onClick={e => this.ocenjenLekar(e, this.state.OlekarID)}
                      >
                        10
                      </Button>
                    </div>
                  </div>

                  {/* <div className="izmeniPodatkeLekar">
                         <Button type="submit">Izmeni podatke</Button>
                      </div> */}
                </form>
              ],
              actions: [
                Dialog.CancelAction(),
                Dialog.OKAction(() => {
                  console.log("Izmjena klinike: ---------------");
                  console.log(this.state.naziv);
                  console.log(this.state.idKlinike);
                  console.log(this.state.id);
                  // axios
                  //   .put("http://localhost:8025/api/klinike/update", {
                  //     id: this.state.idIzmenjeneKlinike,
                  //     naziv: this.state.nazivIzmenjeneKlinike,
                  //     adresa: this.state.adresaIzmenjeneKlinike,
                  //     ocena: this.state.ocenaIzmenjeneKlinike,
                  //     opis: this.state.opisIzmenjeneKlinike
                  //   })
                  //   .then(response => {
                  //     console.log(response.data);
                  //     this.listaKlinika();

                  //     // this.setState({
                  //     //   id: response.data.id,
                  //     //   naziv: response.data.naziv,
                  //     //   adresa: response.data.adresa,
                  //     //   ocena: response.data.ocena,
                  //     //   opis: response.data.opis
                  //     // });
                  //   })
                  //   .catch(error => {
                  //     console.log("Izmena nije uspela! ");
                  //   });
                })
              ],
              bsSize: "medium",
              onHide: dialog => {
                dialog.hide();
                console.log("closed by clicking background.");
              }
            });
          }
        );
      }
    }
  };
  listaPregleda() {
    let res = [];
    console.log("lista kl");

    // const pretraga = this.state.pretraziPoljeKlinika;
    // const oc = this.state.ocenaKlinike;
    // console.log(oc);
    // if ((pretraga == "" || pretraga == undefined) && oc < 5) {
    let lista = this.state.pregledi;
    const oceni = <Tooltip id="oceni_tooltip">Oceni</Tooltip>;

    for (var i = 0; i < lista.length; i++) {
      if (lista[i].status != 2) {
        res.push(
          <tr key={i}>
            <td key={lista[i].nazivKl}>{lista[i].nazivKl}</td>
            <td key={lista[i].lekarID}>
              {lista[i].imeL} {lista[i].prezimeL}
            </td>
            <td key={lista[i].nazivTP}>{lista[i].nazivTP}</td>
            <td key={lista[i].cena}>{lista[i].cena} RSD</td>
            <td>
              <OverlayTrigger placement="top" overlay={oceni}>
                <Button
                  bsStyle="info"
                  simple
                  type="button"
                  bsSize="sm"
                  value={lista[i].id}
                  onClick={e => this.oceni(e)}
                >
                  <i className="pe-7s-like2 text-info" />
                </Button>
              </OverlayTrigger>
              <Dialog
                ref={el => {
                  this.dialog = el;
                }}
              ></Dialog>
            </td>
          </tr>
        );
      }
    }
    // } else {
    //   console.log("===========");
    //   console.log(pretraga);
    //   let lista = this.state.listaKlinika;

    //   for (var i = 0; i < lista.length; i++) {
    //     var naziv = lista[i].naziv;
    //     var adresa = lista[i].adresa;
    //     var opis = lista[i].opis;
    //     var ocena = lista[i].ocena;
    //     if (
    //       naziv.toLowerCase().includes(pretraga.toLowerCase()) ||
    //       adresa.toLowerCase().includes(pretraga.toLowerCase()) ||
    //       opis.toLowerCase().includes(pretraga.toLowerCase())
    //     ) {
    //       if (oc <= ocena) {
    //         res.push(
    //           <tr key={i}>
    //             <td>
    //               <input
    //                 name="odabranaKlinika"
    //                 type="radio"
    //                 value={lista[i].id}
    //                 checked={this.state.izabranaKlinika == lista[i].id}
    //                 onChange={e => {
    //                   this.promenjenOdabirKlinike(e);
    //                 }}
    //               ></input>
    //             </td>
    //             <td key={lista[i].id}>{lista[i].id}</td>
    //             <td key={lista[i].naziv}>{lista[i].naziv}</td>
    //             <td key={lista[i].adresa}>{lista[i].adresa}</td>
    //             <td key={lista[i].opis}>{lista[i].opis}</td>
    //             <td key={lista[i].ocena}>{lista[i].ocena}</td>
    //           </tr>
    //         );
    //   }
    // }
    //   }
    // }

    return res;
  }
  handleChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
    console.log("On change !!!");
  };

  handleSumbit = e => {
    e.preventDefault();
    console.log("KLIK SUBMITTT");
    // let formErrors = { ...this.state.formErrors };
    console.log("Izmjena : ---------------");
    console.log(this.state.ime);
    console.log(this.state.prezime);
    var config = {
      headers: {
        Authorization: "Bearer " + this.state.token,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
    axios
      .put(
        "http://localhost:8025/api/pacijenti/update",
        {
          ime: this.state.ime,
          prezime: this.state.prezime,
          telefon: this.state.telefon,
          email: this.state.email,
          adresa: this.state.adresa,
          grad: this.state.grad,
          drzava: this.state.drzava,
          lbo: this.state.lbo
        },
        config
      )
      .then(response => {
        console.log(response.data);

        this.setState({
          ime: response.data.ime
        });

        this.setState({
          prezime: response.data.prezime
        });

        this.setState({
          telefon: response.data.telefon,
          adresa: response.data.adresa,
          grad: response.data.grad,
          drzava: response.data.drzava,
          lbo: response.data.lbo
        });

        // this.setState({
        //   redirectToReferrer: true
        // });
      })
      .catch(error => {
        console.log("Izmena nije uspela! ");
      });
  };

  render() {
    const email = this.state.email;
    const uloga = this.state.uloga;
    const ime = this.state.ime;
    const prezime = this.state.prezime;
    const telefon = this.state.telefon;
    const adresa = this.state.adresa;
    const grad = this.state.grad;
    const drzava = this.state.drzava;
    const lbo = this.state.lbo;

    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={10}>
              <Card
                title="Pregledi"
                content={
                  <Table striped hover style={{ width: 800 }}>
                    <thead className="thead-dark">
                      <tr>
                        <th id="Klinika">Klinika</th>
                        <th id="Lekar">Lekar</th>
                        <th id="TipPregleda"> Tip Pregleda</th>
                        <th id="Cena">Cena (RSD)</th>
                      </tr>
                    </thead>
                    <tbody>{this.listaPregleda()}</tbody>
                  </Table>
                }
              />
              <Card
                title="Operacije"
                content={
                  <Table striped hover style={{ width: 800 }}>
                    <thead className="thead-dark">
                      <tr>
                        <th id="Klinika">Klinika</th>
                        <th id="Lekar">Lekar</th>
                        <th id="Pregled"> Pregled</th>
                        <th id="Cena">Cena</th>
                      </tr>
                    </thead>
                    {/* <tbody>{this.listaPregleda()}</tbody> */}
                  </Table>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default IstorijaPOPacijenta;
