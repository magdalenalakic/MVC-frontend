import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "klinickiCentar.css";
import { Table } from "react-bootstrap";
import { NavItem, Nav, NavDropdown, MenuItem } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import "izmenaProfila.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//dodam link za sliku  mozda od doktora!!
import avatar from "assets/img/faces/face-3.jpg";
import "login.js";
import { log } from "util";
import Login from "login";
import slikaPacijent from "assets/img/pacijentImage.jpg";
import axios from "axios";
import { string } from "prop-types";

class ListaKlinika extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: props.email,
      uloga: props.uloga,
      listaKlinika: [],
      pretraziPoljeKlinika: "",
      pretraziPoljeLekara: "",
      datumZaPregled: new Date(),
      ocenaKlinike: 0,
      ocenaLekara: 0,
      izabranaKlinika: 1,
      formError: "",
      flag: 0,
      redirectNext: false,
      redirectNext2: false,
      listaLekara: [],
      izabranLekar: 0,
      nazivIzabranogLekara: "",
      nazivIzabraneKlinike: "",
      tipoviPregleda: [],
      oznaceniTipPregleda: 1,
      nazivOznacenogPregleda: ""
    };
    console.log(this.state);
    this.listaKlinikaUKC = this.listaKlinikaUKC.bind(this);
    this.sortMyArray = this.sortMyArray.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.podesiOcenuKlinike = this.podesiOcenuKlinike.bind(this);
    this.podesiOcenuLekara = this.podesiOcenuLekara.bind(this);
    this.slobodniTermini = this.slobodniTermini.bind(this);
    this.promenjenOdabirKlinike = this.promenjenOdabirKlinike.bind(this);
    this.promenjenOdabirLekara = this.promenjenOdabirLekara.bind(this);
    this.izaberiVrstuPregleda = this.izaberiVrstuPregleda.bind(this);
    this.redirectReferer = this.redirectReferer(this);
    this.redirectReferer2 = this.redirectReferer2(this);
    console.log(this.state.flag);
  }

  componentWillMount() {
    const url = "http://localhost:8025/api/klinike/all";
    axios
      .get(url)
      .then(Response => {
        console.log("Preuzeta lista klinika: ");
        console.log(Response.data);
        this.setState({
          listaKlinika: Response.data,
          nazivIzabraneKlinike: Response.data[0].naziv
        });
        console.log(this.state.listaKlinika);
      })

      .catch(error => {
        console.log("klinike nisu preuzete");
      });

    axios
      .get("http://localhost:8025/api/tipPregleda/all")
      .then(Response => {
        console.log("Preuzeta lista tipova pregleda: ");
        console.log(Response.data);
        this.setState({
          tipoviPregleda: Response.data,
          nazivOznacenogPregleda: Response.data[0].naziv
        });
        console.log(this.state.nazivOznacenogPregleda);
      })

      .catch(error => {
        console.log("klinike nisu preuzete");
      });
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
    axios
      .put("http://localhost:8025/api/pacijenti/update", {
        ime: this.state.ime,
        prezime: this.state.prezime,
        telefon: this.state.telefon,
        email: this.state.email,
        adresa: this.state.adresa,
        grad: this.state.grad,
        drzava: this.state.drzava,
        lbo: this.state.lbo
      })
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
  promenjenOdabirKlinike = e => {
    this.setState(
      {
        izabranaKlinika: e.currentTarget.value
      },
      () => console.log(this.state.izabranaKlinika)
    );
    if (e.currentTarget.value != 0 && e.currentTarget.value != undefined) {
      const lista = this.state.listaKlinika;
      for (var i = 0; i < lista.length; i++) {
        if (lista[i].id == e.currentTarget.value) {
          this.setState(
            {
              nazivIzabraneKlinike: lista[i].naziv
            },
            () => console.log(this.state)
          );
          break;
        }
      }
    }
    this.listaKlinikaUKC();
  };
  promenjenOdabirLekara = e => {
    console.log("promenjen odabir lekara");
    console.log(e.currentTarget.value);
    this.setState(
      {
        izabranLekar: e.currentTarget.value
      },
      () => console.log(this.state)
    );
    if (e.currentTarget.value != 0 && e.currentTarget.value != undefined) {
      const lista = this.state.listaLekara;
      for (var i = 0; i < lista.length; i++) {
        if (lista[i].id == e.currentTarget.value) {
          this.setState(
            {
              nazivIzabranogLekara: ""
            },
            () =>
              this.setState({
                nazivIzabranogLekara: lista[i].ime + " " + lista[i].prezime
              }, ()=>console.log(this.state))
          );
          break;
        }
      }
      // this.setState(
      //   {
      //     nazivIzabranogLekara:
      //       this.state.listaLekara[this.state.izabranLekar - 1].ime +
      //       " " +
      //       this.state.listaLekara[this.state.izabranLekar - 1].prezime
      //   },
      //   () => console.log(this.state)
      // );
    }
    this.listaLekaraKlinike();
  };
  listaKlinikaUKC() {
    let res = [];
    console.log("lista kl");

    const pretraga = this.state.pretraziPoljeKlinika;
    const oc = this.state.ocenaKlinike;
    console.log(oc);
    if ((pretraga == "" || pretraga == undefined) && oc < 5) {
      let lista = this.state.listaKlinika;

      for (var i = 0; i < lista.length; i++) {
        res.push(
          <tr key={i}>
            <td>
              <input
                name="odabranaKlinika"
                type="radio"
                value={lista[i].id}
                checked={this.state.izabranaKlinika == lista[i].id}
                onChange={e => {
                  this.promenjenOdabirKlinike(e);
                }}
              ></input>
            </td>
            <td key={lista[i].id}>{lista[i].id}</td>
            <td key={lista[i].naziv}>{lista[i].naziv}</td>
            <td key={lista[i].adresa}>{lista[i].adresa}</td>
            <td key={lista[i].opis}>{lista[i].opis}</td>
            <td key={lista[i].ocena}>{lista[i].ocena}</td>
          </tr>
        );
      }
    } else {
      console.log("===========");
      console.log(pretraga);
      let lista = this.state.listaKlinika;

      for (var i = 0; i < lista.length; i++) {
        var naziv = lista[i].naziv;
        var adresa = lista[i].adresa;
        var opis = lista[i].opis;
        var ocena = lista[i].ocena;
        if (
          naziv.toLowerCase().includes(pretraga.toLowerCase()) ||
          adresa.toLowerCase().includes(pretraga.toLowerCase()) ||
          opis.toLowerCase().includes(pretraga.toLowerCase())
        ) {
          if (oc <= ocena) {
            res.push(
              <tr key={i}>
                <td>
                  <input
                    name="odabranaKlinika"
                    type="radio"
                    value={lista[i].id}
                    checked={this.state.izabranaKlinika == lista[i].id}
                    onChange={e => {
                      this.promenjenOdabirKlinike(e);
                    }}
                  ></input>
                </td>
                <td key={lista[i].id}>{lista[i].id}</td>
                <td key={lista[i].naziv}>{lista[i].naziv}</td>
                <td key={lista[i].adresa}>{lista[i].adresa}</td>
                <td key={lista[i].opis}>{lista[i].opis}</td>
                <td key={lista[i].ocena}>{lista[i].ocena}</td>
              </tr>
            );
          }
        }
      }
    }

    return res;
  }
  pregledZahteva() {
    let res = [];
    res.push(
      <tr>
        <td>{this.state.nazivIzabraneKlinike}</td>

        <td>{this.state.nazivOznacenogPregleda}</td>
        <td>{this.state.nazivIzabranogLekara}</td>
        <td>CENA</td>
      </tr>
    );
    return res;
  }
  listaLekaraKlinike() {
    let res = [];
    console.log("lista lekara");

    const pretraga = this.state.pretraziPoljeLekara;
    const oc = this.state.ocenaLekara;
    console.log(oc);
    if ((pretraga == "" || pretraga == undefined) && oc < 5) {
      let lista = this.state.listaLekara;

      for (var i = 0; i < lista.length; i++) {
        res.push(
          <tr key={i}>
            <td>
              <input
                name="odabranLekar"
                type="radio"
                value={lista[i].id}
                checked={this.state.izabranLekar == lista[i].id}
                onChange={e => {
                  this.promenjenOdabirLekara(e);
                }}
              ></input>
            </td>
            <td key={lista[i].id}>{lista[i].id}</td>
            <td key={lista[i].ime}>{lista[i].ime}</td>
            <td key={lista[i].prezime}>{lista[i].prezime}</td>
            <td key={lista[i].ocena}>{lista[i].ocena}</td>
          </tr>
        );
      }
    } else {
      console.log("===========");
      console.log(pretraga);
      let lista = this.state.listaLekara;

      for (var i = 0; i < lista.length; i++) {
        var ime = lista[i].ime;
        var prezime = lista[i].prezime;
        var ocena;
        if (lista[i].ocena == undefined) {
          ocena = 0;
        } else {
          ocena = lista[i].ocena;
        }
        if (
          ime.toLowerCase().includes(pretraga.toLowerCase()) ||
          prezime.toLowerCase().includes(pretraga.toLowerCase())
        ) {
          console.log(oc);
          console.log(ocena);
          if (oc <= ocena) {
            res.push(
              <tr key={i}>
                <td>
                  <input
                    name="odabranLekar"
                    type="radio"
                    value={lista[i].id}
                    checked={this.state.izabranLekar == lista[i].id}
                    onChange={e => {
                      this.promenjenOdabirLekara(e);
                    }}
                  ></input>
                </td>
                <td key={lista[i].id}>{lista[i].id}</td>
                <td key={lista[i].ime}>{lista[i].ime}</td>
                <td key={lista[i].prezime}>{lista[i].prezime}</td>
                <td key={lista[i].ocena}>{lista[i].ocena}</td>
              </tr>
            );
          }
        }
      }
    }

    return res;
  }
  sortMyArray(sortBy) {
    console.log("sort funkcija");
    console.log(sortBy);
    const lista = this.state.listaKlinika;
    if (sortBy === "naziv") {
      console.log("naziv");
      this.setState({
        listaKlinika: lista.sort((a, b) => a.naziv.localeCompare(b.naziv))
      });
    } else if (sortBy === "opis") {
      console.log("opis");
      this.setState({
        listaKlinika: lista.sort((a, b) => a.opis.localeCompare(b.opis))
      });
    } else if (sortBy === "adresa") {
      console.log("adresa");
      this.setState({
        listaKlinika: lista.sort((a, b) => a.adresa.localeCompare(b.adresa))
      });
    } else if (sortBy === "ocena") {
      console.log("ocena");

      this.setState({
        listaKlinika: lista.sort((a, b) => b.ocena - a.ocena)
      });
    }
  }

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;

    this.setState({ [name]: value }, () => console.log(this.state));
  };
  handleChangeDate = date => {
    this.setState(
      {
        datumZaPregled: date
      },
      () => console.log(this.state)
    );
  };
  podesiOcenuKlinike = e => {
    e.preventDefault();
    if (e.target.value == "9") {
      this.setState({
        ocenaKlinike: 9
      });
      this.listaKlinikaUKC();
    } else if (e.target.value == "8") {
      this.setState({
        ocenaKlinike: 8
      });
      this.listaKlinikaUKC();
    } else if (e.target.value == "7") {
      this.setState({
        ocenaKlinike: 7
      });
      this.listaKlinikaUKC();
    } else if (e.target.value == "6") {
      this.setState({
        ocenaKlinike: 6
      });
      this.listaKlinikaUKC();
    } else if (e.target.value == "5") {
      this.setState({
        ocenaKlinike: 5
      });
      this.listaKlinikaUKC();
    }
    console.log(this.state.ocenaKlinike);
  };
  podesiOcenuLekara = e => {
    e.preventDefault();
    if (e.target.value == "9") {
      this.setState({
        ocenaLekara: 9
      });
      this.listaLekaraKlinike();
    } else if (e.target.value == "8") {
      this.setState({
        ocenaLekara: 8
      });
      this.listaLekaraKlinike();
    } else if (e.target.value == "7") {
      this.setState({
        ocenaLekara: 7
      });
      this.listaLekaraKlinike();
    } else if (e.target.value == "6") {
      this.setState({
        ocenaLekara: 6
      });
      this.listaLekaraKlinike();
    } else if (e.target.value == "5") {
      this.setState({
        ocenaLekara: 5
      });
      this.listaLekaraKlinike();
    }
    console.log(this.state.ocenaLekara);
  };
  slobodniTermini() {
    //get zahtev za preuzimanje termina iz baze za zadati datum
  }

  odabranaKlinika = e => {
    //treba redirektovati na pretragu i filtriranje lekara
    e.preventDefault();
    this.setState({
      redirectNext: true,
      flag: 1
    });
  };
  odabranLekar = e => {
    //treba redirektovati na pretragu i filtriranje lekara
    e.preventDefault();
    console.log(this.state.izabranLekar);
    const ol = this.state.izabranLekar;
    if (ol != 0 && ol != undefined) {
      this.setState({
        redirectNext2: true,
        flag: 2
      });
    } else {
      this.setState(
        {
          formError: "Odaberite Lekara"
        },
        () => console.log(this.state.formError)
      );
    }
  };
  redirectReferer() {
    var flag = 1;
    axios
      .get(
        "http://localhost:8025/api/klinike/listaLekaraKlinika/" +
          this.state.izabranaKlinika
      )
      .then(Response => {
        console.log("Preuzeta lista lekara: ");
        console.log(Response.data);
        this.setState({
          listaLekara: Response.data,
          nazivIzabranogLekara:
            Response.data[0].ime + " " + Response.data[0].prezime
        });
        console.log(this.state.listaLekara);
      })

      .catch(error => {
        console.log("lekari nisu preuzete");
      });
    if (this.state.redirectNext == true) {
      return (
        <Route
          path="/registration"
          render={props => (
            <ListaKlinika
              {...props}
              flag={flag}
              izabranaKlinika={this.state.izabranaKlinika}
              nazivIzabraneKlinike={this.state.nazivIzabraneKlinike}
              listaLekara={this.state.listaLekara}
            />
          )}
        >
          <Redirect from="/" to="/admin/klinike" />
        </Route>
      );
    }
  }
  redirectReferer2() {
    var flag = 2;
    // axios
    //   .get(
    //     "http://localhost:8025/api/klinike/listaLekaraKlinika/" +
    //       this.state.izabranaKlinika
    //   )
    //   .then(Response => {
    //     console.log("Preuzeta lista lekara: ");
    //     console.log(Response.data);
    //     this.setState({
    //       listaLekara: Response.data
    //     });
    //     console.log(this.state.listaLekara);
    //   })

    //   .catch(error => {
    //     console.log("lekari nisu preuzete");
    //   });
    if (this.state.redirectNext2 == true) {
      return (
        <Route
          path="/registration"
          render={props => (
            <ListaKlinika
              {...props}
              flag={flag}
              izabranaKlinika={this.state.izabranaKlinika}
              izabranLekar={this.state.izabranLekar}
              nazivIzabraneKlinike={this.state.nazivIzabraneKlinike}
              nazivIzabranogLekara={this.state.nazivIzabranogLekara}
              nazivOznacenogPregleda={this.state.nazivOznacenogPregleda}
            />
          )}
        >
          <Redirect from="/" to="/admin/klinike" />
        </Route>
      );
    }
  }
  biranjeTipaPregleda(tip) {
    console.log("prosledjen pregled");
    console.log(tip.target.value);
    this.setState({
      oznaceniTipPregleda: tip.target.value
    });
    let lista = this.state.tipoviPregleda;

    for (var i = 0; i < lista.length; i++) {
      var naziv = lista[i].naziv;
      var id = lista[i].id;
      if (id == tip.target.value) {
        this.setState({
          nazivOznacenogPregleda: naziv
        });
      }
    }
  }

  izaberiVrstuPregleda() {
    let res = [];
    let lista = this.state.tipoviPregleda;
    for (var i = 0; i < lista.length; i++) {
      res.push(<option value={lista[i].id}>{lista[i].naziv}</option>);
    }
    return res;
  }
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
    const lista = this.state.listaKlinika;
    console.log(this.state.flag);
    // const [startDate, setStartDate] = useState(new Date());
    if (this.state.flag == 0) {
      return (
        <div className="content">
          <Grid fluid>
            <Row>
              <Col md={10}>
                {/* <Nav pullRight> */}
                <form>
                  <input
                    placeholder="Pretrazi"
                    type="text"
                    placeholder="Search"
                    aria-label="Search"
                    name="pretraziPoljeKlinika"
                    onChange={this.handleChange}
                  />
                  <Button onClick={e => this.izaberiKliniku()}>Pretrazi</Button>
                </form>
                <div>
                  <h5>Datum za pregled:</h5>
                  <DatePicker
                    placeholderText="Izaberi datum"
                    selected={this.state.datumZaPregled}
                    onSelect={this.handleChangeDate}

                    // onChange={date => setStartDate(date)}
                  />
                  <Button onClick={this.slobodniTermini}>
                    Pronadji termine
                  </Button>
                </div>
                <div>
                  <div>
                    <h5>Tip Pregleda:</h5>
                    <select
                      name="tipPregleda"
                      onChange={e => this.biranjeTipaPregleda(e)}
                    >
                      {this.izaberiVrstuPregleda()}
                    </select>
                    {/* {" "}
                    <NavDropdown
                      onSelect={e => {
                        this.biranjeTipaPregleda(e);
                      }}
                      title="Pregled"
                      id="dropdown"
                    >
                      {this.izaberiVrstuPregleda()}
                    </NavDropdown> */}
                  </div>
                </div>
                <div>
                  <h5>Ocena: </h5>
                  <Button value="9" onClick={e => this.podesiOcenuKlinike(e)}>
                    9+
                  </Button>
                  <Button value="8" onClick={e => this.podesiOcenuKlinike(e)}>
                    8+
                  </Button>
                  <Button value="7" onClick={e => this.podesiOcenuKlinike(e)}>
                    7+
                  </Button>
                  <Button value="6" onClick={e => this.podesiOcenuKlinike(e)}>
                    6+
                  </Button>
                  <Button value="5" onClick={e => this.podesiOcenuKlinike(e)}>
                    5+
                  </Button>
                </div>
                {/* </Nav> */}
                <Card
                  title="Klinike"
                  content={
                    <form
                      onSubmit={e => {
                        this.odabranaKlinika(e);
                      }}
                    >
                      <NavDropdown
                        onSelect={e => {
                          this.sortMyArray(e);
                        }}
                        title="Sortiraj"
                        id="nav-item dropdown"
                      >
                        <MenuItem eventKey={"id"}>id</MenuItem>
                        <MenuItem eventKey={"naziv"}>Naziv</MenuItem>
                        <MenuItem eventKey={"opis"}>Opis</MenuItem>
                        <MenuItem eventKey={"adresa"}>Adresa</MenuItem>
                        <MenuItem eventKey={"ocena"}>Ocena</MenuItem>
                      </NavDropdown>

                      <Card
                        // category="Here is a subtitle for this table"
                        ctTableFullWidth
                        ctTableResponsive
                        content={
                          <Table striped hover style={{ width: 800 }}>
                            <thead className="thead-dark">
                              <tr>
                                <th></th>
                                <th id="Id">Id</th>
                                <th id="Naziv">Naziv</th>
                                <th id="Adresa"> Adresa</th>
                                <th id="Opis">Opis</th>
                                <th id="Ocena">Ocena</th>
                              </tr>
                            </thead>
                            <tbody>{this.listaKlinikaUKC()}</tbody>
                          </Table>
                        }
                      />
                      {this.redirectReferer}
                      <Button type="submit">DALJE</Button>
                    </form>
                  }
                />
              </Col>
              {/* <Col md={4}>
                <Card
                  // statsIcon="fa fa-clock-o"
                  title="O Pacijentu"
                  // category="Ime"
                  content={
                    <div id="a">
                      <div className="slikaKCdiv">
                        <h2>
                          <img
                            className="slikaPacijent"
                            src={slikaPacijent}
                          ></img>
                        </h2>
                      </div>

                      <div className="typo-line">
                        <h2>
                          <p className="category">Email: </p>
                          <label className="adresaKC">{email}</label>
                        </h2>
                      </div>
                      <div className="typo-line">
                        <h2>
                          <p className="category">LBO: </p>
                          <label className="opisKC">{lbo}</label>
                        </h2>
                      </div>
                    </div>
                  }
                />
              </Col> */}
            </Row>
          </Grid>
        </div>
      );
    } else if (this.state.flag == 1) {
      return (
        <div className="content">
          <Grid fluid>
            <Row>
              <Col md={10}>
                {/* <Nav pullRight> */}
                <form>
                  <input
                    placeholder="Pretrazi"
                    type="text"
                    placeholder="Search"
                    aria-label="Search"
                    name="pretraziPoljeLekara"
                    onChange={this.handleChange}
                  />
                  <Button onClick={e => this.izaberiDoktore()}>Pretrazi</Button>
                </form>
                <div>
                  <h5>Datum za pregled:</h5>
                  <DatePicker
                    placeholderText="Izaberi datum"
                    selected={this.state.datumZaPregled}
                    onSelect={this.handleChangeDate}

                    // onChange={date => setStartDate(date)}
                  />
                  <Button onClick={this.slobodniTermini}>
                    Pronadji termine
                  </Button>
                </div>
                <div>
                  <h5>Tip pregleda: </h5>
                  <NavDropdown
                    onSelect={e => {
                      // this.sortMyArray(e);
                    }}
                    title="Pregled"
                    id="dropdown"
                  >
                    <MenuItem eventKey={"pregled1"}>Vrsta pregleda 1</MenuItem>
                    <MenuItem eventKey={"pregled2"}>Vrsta pregleda 2</MenuItem>
                    <MenuItem eventKey={"pregled3"}>Vrsta pregleda 3</MenuItem>
                    <MenuItem eventKey={"pregled4"}>Vrsta pregleda 4</MenuItem>
                  </NavDropdown>
                </div>
                <div>
                  <h5>Ocena: </h5>
                  <Button value="9" onClick={e => this.podesiOcenuLekara(e)}>
                    9+
                  </Button>
                  <Button value="8" onClick={e => this.podesiOcenuLekara(e)}>
                    8+
                  </Button>
                  <Button value="7" onClick={e => this.podesiOcenuLekara(e)}>
                    7+
                  </Button>
                  <Button value="6" onClick={e => this.podesiOcenuLekara(e)}>
                    6+
                  </Button>
                  <Button value="5" onClick={e => this.podesiOcenuLekara(e)}>
                    5+
                  </Button>
                </div>
                {/* </Nav> */}
                <Card
                  title="Lekari"
                  content={
                    <form
                      onSubmit={e => {
                        this.odabranLekar(e);
                      }}
                    >
                      <div>
                        <NavDropdown
                          onSelect={e => {
                            this.sortMyArray(e);
                          }}
                          title="Sortiraj"
                          id="nav-item dropdown"
                        >
                          <MenuItem eventKey={"ime"}>Ime</MenuItem>
                          <MenuItem eventKey={"prezime"}>Prezime</MenuItem>
                          <MenuItem eventKey={"ocena"}>Ocena</MenuItem>
                        </NavDropdown>

                        <Card
                          // category="Here is a subtitle for this table"
                          ctTableFullWidth
                          ctTableResponsive
                          content={
                            <Table style={{ width: 800 }} striped hover>
                              <thead className="thead-dark">
                                <tr>
                                  <th></th>
                                  <th id="id">Id</th>
                                  <th id="ime">Ime</th>
                                  <th id="prezime"> Prezime</th>
                                  <th id="ocena">Ocena</th>
                                </tr>
                              </thead>
                              <tbody>{this.listaLekaraKlinike()}</tbody>
                            </Table>
                          }
                        />
                      </div>
                      {this.redirectReferer2}
                      <Button type="submit">DALJE</Button>
                      <h5>
                        {(this.state.izabranLekar == undefined ||
                          this.state.izabranLekar == 0) && (
                          <span className="errorMessage">
                            {this.state.formError}
                          </span>
                        )}
                      </h5>
                    </form>
                  }
                />
              </Col>
              {/* <Col md={4}>
                <Card
                  // statsIcon="fa fa-clock-o"
                  title="O Pacijentu"
                  // category="Ime"
                  content={
                    <div id="a">
                      <div className="slikaKCdiv">
                        <h2>
                          <img
                            className="slikaPacijent"
                            src={slikaPacijent}
                          ></img>
                        </h2>
                      </div>

                      <div className="typo-line">
                        <h2>
                          <p className="category">Email: </p>
                          <label className="adresaKC">{email}</label>
                        </h2>
                      </div>
                      <div className="typo-line">
                        <h2>
                          <p className="category">LBO: </p>
                          <label className="opisKC">{lbo}</label>
                        </h2>
                      </div>
                    </div>
                  }
                />
              </Col> */}
            </Row>
          </Grid>
        </div>
      );
    } else if (this.state.flag == 2) {
      return (
        <div className="content">
          <Grid fluid>
            <Row>
              <Col md={10}>
                <Card
                  title="Lekari"
                  content={
                    <form
                      onSubmit={e => {
                        this.odabranLekar(e);
                      }}
                    >
                      <div>
                        <Card
                          // category="Here is a subtitle for this table"
                          ctTableFullWidth
                          ctTableResponsive
                          content={
                            <Table style={{ width: 800 }} striped hover>
                              <thead className="thead-dark">
                                <tr>
                                  <th id="id">Klinika</th>
                                  <th id="ime">Tip pregleda</th>
                                  <th id="prezime"> Lekar</th>
                                  <th id="ocena">Cena</th>
                                </tr>
                              </thead>
                              <tbody>{this.pregledZahteva()}</tbody>
                            </Table>
                          }
                        />
                      </div>
                    </form>
                  }
                />
              </Col>
              {/* <Col md={4}>
                <Card
                  // statsIcon="fa fa-clock-o"
                  title="O Pacijentu"
                  // category="Ime"
                  content={
                    <div id="a">
                      <div className="slikaKCdiv">
                        <h2>
                          <img
                            className="slikaPacijent"
                            src={slikaPacijent}
                          ></img>
                        </h2>
                      </div>

                      <div className="typo-line">
                        <h2>
                          <p className="category">Email: </p>
                          <label className="adresaKC">{email}</label>
                        </h2>
                      </div>
                      <div className="typo-line">
                        <h2>
                          <p className="category">LBO: </p>
                          <label className="opisKC">{lbo}</label>
                        </h2>
                      </div>
                    </div>
                  }
                />
              </Col> */}
            </Row>
          </Grid>
        </div>
      );
    }
  }
}

export default ListaKlinika;
