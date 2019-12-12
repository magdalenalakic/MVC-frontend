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
      pretraziPolje: "",
      datumZaPregled: new Date(),
      ocena: 0,
      izabranaKlinika: 1,
      formError: "",
      flag: 0,
      redirectNext: false,
      listaLekara: [],
      izabranLekar: 0,
      tipoviPregleda:[]
    };
    console.log(this.state);
    this.listaKlinikaUKC = this.listaKlinikaUKC.bind(this);
    this.sortMyArray = this.sortMyArray.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.podesiOcenu = this.podesiOcenu.bind(this);
    this.slobodniTermini = this.slobodniTermini.bind(this);
    this.promenjenOdabirKlinike = this.promenjenOdabirKlinike.bind(this);
    this.promenjenOdabirLekara = this.promenjenOdabirLekara.bind(this);
    this.redirectReferer = this.redirectReferer(this);
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
          listaKlinika: Response.data
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
        // this.setState({
        //   listaKlinika: Response.data
        // });
        // console.log(this.state.listaKlinika);
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
    this.listaKlinikaUKC();
  };
  promenjenOdabirLekara = e => {
    this.setState(
      {
        izabranLekar: e.currentTarget.value
      },
      () => console.log(this.state.izabranLekar)
    );
    this.listaLekaraKlinike();
  };
  listaKlinikaUKC() {
    let res = [];
    console.log("lista kl");

    const pretraga = this.state.pretraziPolje;
    const oc = this.state.ocena;
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
  listaLekaraKlinike() {
    let res = [];
    console.log("lista lekara");

    const pretraga = this.state.pretraziPolje;
    const oc = this.state.ocena;
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
        var naziv = lista[i].naziv;
        var adresa = lista[i].adresa;
        var opis = lista[i].opis;
        var ocena = lista[i].ocena;
        if (naziv.toLowerCase().includes(pretraga.toLowerCase()) ||
          adresa.toLowerCase().includes(pretraga.toLowerCase()) ||
          opis.toLowerCase().includes(pretraga.toLowerCase())
        ) {
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
  izaberiKliniku() {
    console.log("pretraga");
    console.log(this.state.pretraziPolje);
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
  podesiOcenu = e => {
    e.preventDefault();
    if (e.target.value == "9") {
      this.setState({
        ocena: 9
      });
      this.listaKlinikaUKC();
    } else if (e.target.value == "8") {
      this.setState({
        ocena: 8
      });
      this.listaKlinikaUKC();
    } else if (e.target.value == "7") {
      this.setState({
        ocena: 7
      });
      this.listaKlinikaUKC();
    } else if (e.target.value == "6") {
      this.setState({
        ocena: 6
      });
      this.listaKlinikaUKC();
    } else if (e.target.value == "5") {
      this.setState({
        ocena: 5
      });
      this.listaKlinikaUKC();
    }
    console.log(this.state.ocena);
  };
  slobodniTermini() {
    //get zahtev za preuzimanje termina iz baze za zadati datum
  }

  odabranaKlinika = e => {
    //treba redirektovati na pretragu i filtriranje lekara
    e.preventDefault();
    this.setState({
      redirectNext: true
    });
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
          listaLekara: Response.data
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
              listaLekara={this.state.listaLekara}
            />
          )}
        >
          <Redirect from="/" to="/admin/klinike" />
        </Route>
      );
    }
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
    // const [startDate, setStartDate] = useState(new Date());
    if (this.state.redirectNext == 0) {
      return (
        <div className="content">
          <Grid fluid>
            <Row>
              <Col md={8}>
                {/* <Nav pullRight> */}
                <form>
                  <input
                    placeholder="Pretrazi"
                    type="text"
                    aria-label="Search"
                    name="pretraziPolje"
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
                  <Button value="9" onClick={e => this.podesiOcenu(e)}>
                    9+
                  </Button>
                  <Button value="8" onClick={e => this.podesiOcenu(e)}>
                    8+
                  </Button>
                  <Button value="7" onClick={e => this.podesiOcenu(e)}>
                    7+
                  </Button>
                  <Button value="6" onClick={e => this.podesiOcenu(e)}>
                    6+
                  </Button>
                  <Button value="5" onClick={e => this.podesiOcenu(e)}>
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
                          <Table striped hover>
                            <thead className="thead-dark">
                              <tr>
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
              <Col md={4}>
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
              </Col>
            </Row>
          </Grid>
        </div>
      );
    } else {
      return (
        <div className="content">
          <Grid fluid>
            <Row>
              <Col md={8}>
                {/* <Nav pullRight> */}
                <form>
                  <input
                    placeholder="Pretrazi"
                    type="text"
                    placeholder="Search"
                    aria-label="Search"
                    name="pretraziPolje"
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
                  <Button value="9" onClick={e => this.podesiOcenu(e)}>
                    9+
                  </Button>
                  <Button value="8" onClick={e => this.podesiOcenu(e)}>
                    8+
                  </Button>
                  <Button value="7" onClick={e => this.podesiOcenu(e)}>
                    7+
                  </Button>
                  <Button value="6" onClick={e => this.podesiOcenu(e)}>
                    6+
                  </Button>
                  <Button value="5" onClick={e => this.podesiOcenu(e)}>
                    5+
                  </Button>
                </div>
                {/* </Nav> */}
                <Card
                  title="Lekari"
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
                          <Table striped hover>
                            <thead className="thead-dark">
                              <tr>
                                <th id="Id">Id</th>
                                <th id="Naziv">Naziv</th>
                                <th id="Adresa"> Adresa</th>
                                <th id="Opis">Opis</th>
                                <th id="Ocena">Ocena</th>
                              </tr>
                            </thead>
                            <tbody>{this.listaLekaraKlinike()}</tbody>
                          </Table>
                        }
                      />
                      {this.redirectReferer}
                      <Button type="submit">DALJE</Button>
                    </form>
                  }
                />
              </Col>
              <Col md={4}>
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
              </Col>
            </Row>
          </Grid>
        </div>
      );
    }
  }
}

export default ListaKlinika;
