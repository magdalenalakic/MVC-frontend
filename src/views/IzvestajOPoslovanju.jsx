import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";
import { ButtonToolbar } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { NavItem, Nav, NavDropdown, MenuItem } from "react-bootstrap";
import { Table } from "react-bootstrap";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Form } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";

// import "izmenaProfila.css";

//dodam link za sliku  mozda od doktora!!
// import avatar from "assets/img/faces/face-3.jpg";

import { log } from "util";
import slikaPacijent from "assets/img/pacijentImage.jpg";
import axios from "axios";
import moment from "moment";

class IzvestajOPoslovanju extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: props.email,
      uloga: props.uloga,
      token: props.token,
      listaPregleda: [],
      redirectPrihodi: false,
      redirectGrafik: false,
      izabranPregled: 0,
      formError: "",
      izabraniLekar: 0,
      izabranaKlinika: 0,
      izabraniDatum: new Date(),
      izabraniTipPregleda: 0,
      izabranaCena: 0,
      izabraniPopust: 0,
      canClick: false,
      listaLekara: [],
      klinikaNaziv: "",
      klinikaOcena: 0,
      klinikaID: 0,
      flag: 0
    };
    this.redirectReferer = this.redirectReferer.bind(this);
    this.sortMyArray = this.sortMyArray.bind(this);
    this.prikaziGrafik = this.prikaziGrafik.bind(this);
    this.prikaziPrihode = this.prikaziPrihode.bind(this);
  }
  sortMyArray(sortBy) {
    console.log("sort funkcija");
    console.log(sortBy);
    const lista = this.state.listaPregleda;
    if (sortBy === "klinika") {
      console.log("klinika");
      this.setState({
        listaPregleda: lista.sort((a, b) =>
          a.klinikaN.localeCompare(b.klinikaN)
        )
      });
    } else if (sortBy === "lekarI") {
      console.log("lekarI");
      this.setState({
        listaPregleda: lista.sort((a, b) =>
          a.lekarIme.localeCompare(b.lekarIme)
        )
      });
    } else if (sortBy === "lekarP") {
      console.log("lekarP");
      this.setState({
        listaPregleda: lista.sort((a, b) =>
          a.lekarPrezime.localeCompare(b.lekarPrezime)
        )
      });
    } else if (sortBy === "cenar") {
      console.log("cenar");

      this.setState({
        listaPregleda: lista.sort((a, b) => a.cena - b.cena)
      });
    } else if (sortBy === "cenao") {
      console.log("cenao");

      this.setState({
        listaPregleda: lista.sort((a, b) => b.cena - a.cena)
      });
    } else if (sortBy === "popustr") {
      console.log("popustr");

      this.setState({
        listaPregleda: lista.sort((a, b) => a.popust - b.popust)
      });
    } else if (sortBy === "popusto") {
      console.log("popusto");

      this.setState({
        listaPregleda: lista.sort((a, b) => b.popust - a.popust)
      });
    } else if (sortBy === "tipPregleda") {
      console.log("tipPregleda");

      this.setState({
        listaPregleda: lista.sort((a, b) =>
          a.tipPregledaN.localeCompare(b.tipPregledaN)
        )
      });
    }
  }

  componentWillMount() {
    const url = "http://localhost:8025/api/adminKlinike/getAdminKlinikeByEmail";
    var config = {
      headers: {
        Authorization: "Bearer " + this.state.token,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
    axios
    .get("http://localhost:8025/api/klinike/nedeljniPrihodi/"+3, config)
    .then(Response => {
        console.log(Response)
    })
    .catch(error => {
        console.log("pregledi  nisu preuzeti");
      });

    axios
      .get(url, config)
      .then(Response => {
        console.log("Preuzeti unapred def pregledi: ");
        console.log(Response.data);

        this.setState(
          {
            klinikaID: Response.data.idKlinike
          },
          () => {
            console.log(this.state);
            axios
              .get(
                "http://localhost:8025/api/klinike/listaLekaraKlinika/" +
                  this.state.klinikaID,
                config
              )
              .then(Response => {
                console.log("Preuzeti unapred def pregledi: ");
                console.log(Response.data);

                this.setState(
                  {
                    listaLekara: Response.data.sort((b, a) => a.ocena - b.ocena)
                  },
                  () => {
                    console.log(this.state);
                    axios
                      .get(
                        "http://localhost:8025/api/klinike/" +
                          this.state.klinikaID,
                        config
                      )
                      .then(Response => {
                        console.log("Preuzeti unapred def pregledi: ");
                        console.log(Response.data);

                        this.setState(
                          {
                            klinikaNaziv: Response.data.naziv,
                            klinikaOcena: Response.data.ocena
                          },
                          () => {
                            console.log(this.state);
                          }
                        );
                      })

                      .catch(error => {
                        console.log("pregledi  nisu preuzeti");
                      });
                  }
                );
              })

              .catch(error => {
                console.log("pregledi  nisu preuzeti");
              });
          }
        );
      })

      .catch(error => {
        console.log("pregledi  nisu preuzeti");
      });
  }
  handleSortKlinika(sortBy) {
    console.log("sort funkcija");
    console.log(sortBy);
    const lista = this.state.listaPregleda;
    if (sortBy === "datumUp") {
      console.log("datum");
      this.setState({
        listaPregleda: lista.sort((a, b) => {
          return new Date(a.datum).getTime() - new Date(b.datum).getTime();
        })
      });
    } else if (sortBy === "datumDown") {
      console.log("datum");
      this.setState({
        listaPregleda: lista.sort((b, a) => {
          return new Date(a.datum).getTime() - new Date(b.datum).getTime();
        })
      });
    } else if (sortBy === "tipPregledaUp") {
      console.log("tipPregleda");
      this.setState({
        listaPregleda: lista.sort((a, b) =>
          a.tipPregledaN.localeCompare(b.tipPregledaN)
        )
      });
    } else if (sortBy === "tipPregledaDown") {
      console.log("tipPregleda");
      this.setState({
        listaPregleda: lista.sort((b, a) =>
          a.tipPregledaN.localeCompare(b.tipPregledaN)
        )
      });
    } else if (sortBy === "klinikaUp") {
      console.log("klinika");
      this.setState({
        listaPregleda: lista.sort((a, b) =>
          a.klinikaN.localeCompare(b.klinikaN)
        )
      });
    } else if (sortBy === "klinikaDown") {
      console.log("klinika");
      this.setState({
        listaPregleda: lista.sort((b, a) =>
          a.klinikaN.localeCompare(b.klinikaN)
        )
      });
    } else if (sortBy === "lekarUp") {
      console.log("lekar");
      this.setState({
        listaPregleda: lista.sort((a, b) =>
          a.lekarIme.localeCompare(b.lekarIme)
        )
      });
    } else if (sortBy === "lekarDown") {
      console.log("lekar");
      this.setState({
        listaPregleda: lista.sort((b, a) =>
          a.lekarIme.localeCompare(b.lekarIme)
        )
      });
    } else if (sortBy === "cenaUp") {
      console.log("cena");

      this.setState({
        listaPregleda: lista.sort((a, b) => a.cena - b.cena)
      });
    } else if (sortBy === "cenaDown") {
      console.log("cena");

      this.setState({
        listaPregleda: lista.sort((a, b) => b.cena - a.cena)
      });
    } else if (sortBy === "popustUp") {
      console.log("popust");

      this.setState({
        listaPregleda: lista.sort((a, b) => a.popust - b.popust)
      });
    } else if (sortBy === "popustDown") {
      console.log("popust");

      this.setState({
        listaPregleda: lista.sort((a, b) => b.popust - a.popust)
      });
    }
  }
  promenjenOdabirPregleda = e => {
    console.log("promenjen odabrir");
    console.log(e.currentTarget.value);
    const lista = this.state.listaPregleda;
    for (var i = 0; i < lista.length; i++) {
      if (lista[i].id == e.currentTarget.value) {
        this.setState({
          izabranPregled: e.currentTarget.value,
          izabraniLekar: lista[i].lekarID,
          izabranaKlinika: lista[i].klinikaID,
          izabraniDatum: lista[i].datum,
          izabranaCena: lista[i].cena,
          izabraniTipPregleda: lista[i].tipPregledaID

          // izabraniPopust:lista[i].popust
        });
      }
    }
    console.log(this.state);
  };
  odabranPrelged = e => {
    //treba redirektovati na pretragu i filtriranje lekara
    e.preventDefault();
    console.log(this.state.izabranPregled);
    const ol = this.state.izabranPregled;
    var config = {
      headers: {
        Authorization: "Bearer " + this.state.token,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
    var t = 0;
    if (
      moment(this.state.izabraniDatum)
        .format("HH:mm")
        .valueOf() == "09:00"
    ) {
      console.log("9");
      t = 9;
    } else if (
      moment(this.state.izabraniDatum)
        .format("HH:mm")
        .valueOf() == "11:00"
    ) {
      console.log("11");
      t = 11;
    } else if (
      moment(this.state.izabraniDatum)
        .format("HH:mm")
        .valueOf() == "13:00"
    ) {
      console.log("13");
      t = 13;
    } else if (
      moment(this.state.izabraniDatum)
        .format("HH:mm")
        .valueOf() == "15:00"
    ) {
      console.log("15");
      t = 15;
    }
    if (ol != 0 && ol != undefined) {
      axios

        .post(
          "http://localhost:8025/api/pregledi/newST",
          {
            lekarID: this.state.izabraniLekar,
            klinikaID: this.state.izabranaKlinika,
            tipPregledaID: this.state.izabraniTipPregleda,
            pacijentEmail: this.state.email,
            cena: this.state.izabranaCena,
            datum: this.state.izabraniDatum,
            termin: t
          },
          config
        )
        .then(response => {
          console.log("PREGLED");
          console.log(response);
          //   this.setState(
          //     {
          //       redirectNext: true,
          //       flag: 1,
          //       canClick: true
          //     },
          //     () => {
          //       this.props.handleClick("ZAHTEV JE POSLAT");
          //     }
          //   );
        })
        .catch(error => {
          console.log("greska pregled");
          console.log(error.response);
        });
    } else {
      this.setState(
        {
          formError: "Odaberite Pregled"
        },
        () => console.log(this.state.formError)
      );
    }
  };
  listaUnapredDefinisanihPregleda() {}
  listaOcenaLekara() {
    let res = [];
    console.log("lista ocena lekar");

    let lista = this.state.listaLekara;

    for (var i = 0; i < lista.length; i++) {
      res.push(
        <tr key={i}>
          <td>
            {lista[i].ime} {lista[i].prezime}
          </td>

          <td>{lista[i].ocena}</td>
        </tr>
      );
    }

    return res;
  }
  handleChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
    console.log("On change !!!");
  };

  // handleSumbit = e => {
  //   e.preventDefault();
  //   console.log("KLIK SUBMITTT");
  //   // let formErrors = { ...this.state.formErrors };
  //   console.log("Izmjena : ---------------");
  //   console.log(this.state.ime);
  //   console.log(this.state.prezime);
  //   axios
  //     .put("http://localhost:8025/api/pacijenti/update", {
  //       ime: this.state.ime,
  //       prezime: this.state.prezime,
  //       telefon: this.state.telefon,
  //       email: this.state.email,
  //       adresa: this.state.adresa,
  //       grad: this.state.grad,
  //       drzava: this.state.drzava,
  //       lbo: this.state.lbo
  //     })
  //     .then(response => {
  //       console.log(response.data);

  //       this.setState({
  //         ime: response.data.ime
  //       });

  //       this.setState({
  //         prezime: response.data.prezime
  //       });

  //       this.setState({
  //         telefon: response.data.telefon,
  //         adresa: response.data.adresa,
  //         grad: response.data.grad,
  //         drzava: response.data.drzava,
  //         lbo: response.data.lbo
  //       });

  //       // this.setState({
  //       //   redirectToReferrer: true
  //       // });
  //     })
  //     .catch(error => {
  //       console.log("Izmena nije uspela! ");
  //     });
  // };
  prikaziGrafik() {
    console.log("Prikazi grafik");
    this.setState(
      {
        redirectGrafik: true
      },
      () => {
        console.log(this.state.flag);
      }
    );
  }
  prikaziPrihode() {
    console.log("prikazi prihode");
    this.setState(
      {
        redirectPrihodi: true
      },
      () => {
        console.log(this.state.flag);
      }
    );
  }
  redirectReferer() {
    console.log("REDIRECT");
    var flag = 0;
    console.log(this.state.redirectPrihodi);
    console.log(this.state.redirectGrafik);
    if (this.state.redirectPrihodi == true && this.state.flag == 0) {
      flag = 1;
      return (
        <Route
          path="/registration"
          render={props => <IzvestajOPoslovanju {...props} flag={flag} />}
        >
          <Redirect from="/" to="/admin/izvestaj" />
        </Route>
      );
    } else if (this.state.redirectGrafik == true && this.state.flag == 0) {
      flag = 2;

      return (
        <Route
          path="/registration"
          render={props => <IzvestajOPoslovanju {...props} flag={flag} />}
        >
          <Redirect from="/" to="/admin/izvestaj" />
        </Route>
      );
    }
  }

  render() {
    console.log("RENDER");
    const email = this.state.email;
    const uloga = this.state.uloga;

    if (this.state.flag == 0) {
      return (
        <div className="content">
          <Grid fluid>
            <Row>
              <Col md={4}>
                <Card
                  // statsIcon="fa fa-clock-o"
                  title="Administator klinike"
                  // category="Ime"
                  content={
                    <div id="a">
                      {/* <div className="slikaKCdiv">
                            <h2> 
                              <img className="slikaLekar" src={slikaLekar}></img>
                            </h2>
                          </div> */}
                      <div className="typo-line">
                        <h2>
                          <p className="category">Klinika:</p>
                          <label className="adresaKC">
                            {" "}
                            {this.state.klinikaNaziv}{" "}
                          </label>
                        </h2>
                      </div>
                      <div className="typo-line">
                        <h2>
                          <p className="category">Ocena:</p>
                          <label className="adresaKC">
                            {this.state.klinikaOcena}{" "}
                          </label>
                        </h2>
                      </div>
                      
                      <div>
                      {this.redirectReferer}
                        <ButtonToolbar>
                          <Button
                            bsStyle="info"
                            // style={{ outline: "#42f5a4" }}
                            simple
                            type="button"
                            bsSize="md"
                            onClick={this.prikaziPrihode}
                          >
                            Prikazi prihode
                          </Button>
                          <Button
                            bsStyle="info"
                            // style={{ outline: "#42f5a4" }}
                            simple
                            type="button"
                            bsSize="md"
                            onClick={this.prikaziGrafik}
                          >
                            Prikazi grafik
                          </Button>
                        </ButtonToolbar>
                      </div>
                    </div>
                  }
                />
                
              </Col>
              <Col md={8}>
                <Card
                  ctTableFullWidth
                  ctTableResponsive
                  title="Ocene lekara"
                  content={
                    <div>
                      <Table striped responsive hover>
                        <thead className="thead-dark">
                          <tr>
                            <th id="Lekar">Lekar</th>
                            <th id="Ocena">Ocena</th>
                          </tr>
                        </thead>
                        <tbody>{this.listaOcenaLekara()}</tbody>
                      </Table>
                    </div>
                  }
                />
              </Col>
            </Row>
          </Grid>
        </div>
      );
    } else if (this.state.flag == 1) {
      return (
        <div>
          <h1>PRIHOD</h1>
        </div>
      );
    }
  }
}

export default IzvestajOPoslovanju;
