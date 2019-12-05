import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";
import { Table } from "react-bootstrap";
import { NavItem, Nav, NavDropdown, MenuItem } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import "izmenaProfila.css";

//dodam link za sliku  mozda od doktora!!
import avatar from "assets/img/faces/face-3.jpg";
import "login.js";
import { log } from "util";
import Login from "login";
import slikaPacijent from "assets/img/pacijentImage.jpg";
import axios from "axios";

class ListaKlinika extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: props.email,
      uloga: props.uloga,
      listaKlinika: []
    };
    this.listaKlinikaUKC = this.listaKlinikaUKC.bind(this);
    this.sortMyArray = this.sortMyArray.bind(this);
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
  listaKlinikaUKC() {
    let res = [];
    let lista = this.state.listaKlinika;

    for (var i = 0; i < lista.length; i++) {
      res.push(
        <tr key={i}>
          <td key={lista[i].id}>{lista[i].id}</td>
          <td key={lista[i].naziv}>{lista[i].naziv}</td>
          <td key={lista[i].adresa}>{lista[i].adresa}</td>
          <td key={lista[i].opis}>{lista[i].opis}</td>
          <td key={lista[i].ocena}>{lista[i].ocena}</td>
        </tr>
      );
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

    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={8}>
              <Card
                title="Klinike"
                content={
                  <form
                    onSubmit={this.handleSumbit}
                    className="formaIzmenaProfilaPacijent"
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
                            {/* <select
                              onChange={e => {
                                this.sortMyArray(e.target.value);
                              }}
                            >
                              <option value="naziv">Naziv</option>
                              <option value="opis">Opis</option>
                              <option value="adresa">Adresa</option>
                              <option value="ocena">Ocena</option>
                            </select> */}

                            <tr>
                              {/*                             
                            {listaKlinika.map((prop, key) => {
                              return <th key={key}>{prop}</th>;
                            })} */}
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
                    {/* <div className="ime">
                      <label htmlFor="ime">Ime: </label>
                      <input
                        type="text"
                        name="ime"
                        defaultValue={ime}
                        // placeholder={this.state.ime}
                        // noValidate
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="prezime">
                      <label htmlFor="prezime">Prezime: </label>
                      <input
                        type="text"
                        name="prezime"
                        defaultValue={prezime}
                        // placeholder="prezime"
                        // noValidate
                        onChange={this.handleChange}
                      />
                    </div>

                    {/* <div className="klinikaK">
                        <label htmlFor="klinikaK">klinika: </label>
                        <input
                          type="text"
                          name="klinikaK"
                          placeholder="klinikaK"
                          // noValidate
                          // onChange={this.handleChange}
                        />
                      </div> */}
                    {/* <div className="klinika">
                        <label htmlFor="klinika">Klinika: </label>
                        <input
                          type="text"
                          name="klinika"
                          placeholder="klinika"
                          // noValidate
                          // onChange={this.handleChange}
                        />
                      </div> */}
                    {/* <div className="adresa">
                      <label htmlFor="adresa">Adresa: </label>
                      <input
                        type="text"
                        name="adresa"
                        defaultValue={adresa}
                        // placeholder={this.state.adresa}
                        // noValidate
                        onChange={this.handleChange}
                      />
                    </div> */}
                    {/* <div className="grad">
                      <label htmlFor="grad">Grad: </label>
                      <input
                        type="text"
                        name="grad"
                        defaultValue={grad}
                        // placeholder={this.state.grad}
                        // noValidate
                        onChange={this.handleChange}
                      />
                    </div> */}
                    {/* <div className="drzava">
                      <label htmlFor="drzava">Drzava: </label>
                      <input
                        type="text"
                        name="drzava"
                        defaultValue={drzava}
                        // placeholder={this.state.drzava}
                        // noValidate
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="telefon">
                      <label htmlFor="telefon">Broj telefona: </label>
                      <input
                        type="text"
                        name="telefon"
                        defaultValue={this.state.telefon}
                        // placeholder="telefon"
                        // noValidate
                        onChange={this.handleChange}
                      /> */}

                    {/* <div className="">
                        <label htmlFor="">: </label>
                        <input
                          type="text"
                          name=""
                          placeholder=""
                          // noValidate
                          // onChange={this.handleChange}
                        />*/}

                    {/* <div className="izmeniPodatkePacijent">
                      <button type="submit">Izmeni podatke</button>
                    </div> */}
                  </form>
                  // <form className="formUserProfile">
                  //   <FormInputs
                  //     ncols={["col-md-100", "col-md-10"]}
                  //     properties={[
                  //       {
                  //         // label: "Klinika (disabled)",
                  //         label: "Klinika ",
                  //         type: "text",
                  //         bsClass: "form-control",
                  //         placeholder: "Company",
                  //         defaultValue: "staviti ime od klinike",
                  //         disabled: true
                  //       },
                  //       {
                  //         label: "Email adresa",
                  //         type: "email",
                  //         bsClass: "form-control",
                  //         placeholder: "Email",
                  //         defaultValue: "Emai"
                  //       }
                  //     ]}
                  //   />
                  //    <FormInputs
                  //     ncols={["col-md-10", "col-md-10"]}
                  //     properties={[
                  //       {
                  //         label: "Ime",
                  //         type: "text",
                  //         bsClass: "form-control",
                  //         placeholder: "First name",
                  //         defaultValue: "ime"
                  //       },
                  //       {
                  //         label: "Prezime",
                  //         type: "text",
                  //         bsClass: "form-control",
                  //         placeholder: "Last name",
                  //         defaultValue: "Neko prezime"
                  //       }
                  //     ]}
                  //   />
                  //   <FormInputs
                  //     ncols={["col-md-10000"]}
                  //     properties={[
                  //       {
                  //         label: "Adress",
                  //         type: "text",
                  //         bsClass: "form-control",
                  //         placeholder: "Home Adress",
                  //         defaultValue:
                  //           "Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                  //       }
                  //     ]}
                  //   />

                  //   <Row>
                  //     <Col md={12}>
                  //     </Col>
                  //   </Row>
                  //   <Button bsStyle="info" pullRight fill type="submit">
                  //     Izmeni profil
                  //   </Button>
                  //   <div className="clearfix" />
                  // </form> */}
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

                // category="opis ... naziv adresa i opis  "
                // stats="Campaign sent 2 days ago"
                // content={
                //   <div
                //     id="chartPreferences"
                //     className="ct-chart ct-perfect-fourth"
                //   >
                //     <ChartistGraph data={dataPie} type="Pie" />
                //   </div>
                // }
                // legend={
                //   <div className="legend">{this.createLegend(legendPie)}</div>
                // }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default ListaKlinika;
