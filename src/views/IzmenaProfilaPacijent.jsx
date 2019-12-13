import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";
import { Button } from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";
import "izmenaProfila.css";

//dodam link za sliku  mozda od doktora!!
import avatar from "assets/img/faces/face-3.jpg";
import "login.js";
import { log } from "util";
import Login from "login";
import slikaPacijent from "assets/img/pacijentImage.jpg";
import axios from "axios";

class IzmenaProfilaPacijent extends Component {
  constructor(props) {
    super(props);
    console.log("IZMENA PROFILA Pacijent");
    this.state = {
      email: props.email,
      uloga: props.uloga,
      ime: "",
      telefon: "",
      prezime: "",
      lbo: "",
      lozinka: "",
      adresa: "",
      grad: "",
      drzava: "",
      imeN: "",
      telefonN: "",
      prezimeN: "",
      lboN: "",
      lozinkaN: "",
      adresaN: "",
      gradN: "",
      drzavaN: ""
    };
  }

  componentWillMount() {
    const url =
      "http://localhost:8025/api/pacijenti/findPacijentEmail/" +
      this.state.email;
    axios
      .get(url)
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
      })

      .catch(error => {
        console.log("Pacijent  nije preuzet");
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
        ime: this.state.imeN,
        prezime: this.state.prezimeN,
        telefon: this.state.telefonN,
        email: this.state.emailN,
        adresa: this.state.adresaN,
        grad: this.state.gradN,
        drzava: this.state.drzavaN,
        lbo: this.state.lboN
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
            <Col md={8}>
              <Card
                title="Izmena podataka"
                content={
                  <form
                    onSubmit={this.handleSumbit}
                    className="formaIzmenaProfilaPacijent"
                  >
                    <div className="ime">
                      <label htmlFor="ime">Ime: </label>
                      <input
                        type="text"
                        name="imeN"
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
                        name="prezimeN"
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
                    <div className="adresa">
                      <label htmlFor="adresa">Adresa: </label>
                      <input
                        type="text"
                        name="adresa"
                        defaultValue={adresa}
                        // placeholder={this.state.adresa}
                        // noValidate
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="grad">
                      <label htmlFor="grad">Grad: </label>
                      <input
                        type="text"
                        name="gradN"
                        defaultValue={grad}
                        // placeholder={this.state.grad}
                        // noValidate
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="drzava">
                      <label htmlFor="drzava">Drzava: </label>
                      <input
                        type="text"
                        name="drzavaN"
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
                        name="telefonN"
                        defaultValue={this.state.telefon}
                        // placeholder="telefon"
                        // noValidate
                        onChange={this.handleChange}
                      />

                      {/* <div className="">
                        <label htmlFor="">: </label>
                        <input
                          type="text"
                          name=""
                          placeholder=""
                          // noValidate
                          // onChange={this.handleChange}
                        />*/}
                    </div>
                    <div className="izmeniPodatkePacijent">
                      <Button variant="outline-primary" type="submit">
                        Izmeni podatke
                      </Button>
                    </div>
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
                  // </form>
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

export default IzmenaProfilaPacijent;
