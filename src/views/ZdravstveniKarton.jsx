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
import { Form } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
// import "izmenaProfila.css";

//dodam link za sliku  mozda od doktora!!
import avatar from "assets/img/faces/face-3.jpg";

import { log } from "util";
import slikaPacijent from "assets/img/pacijentImage.jpg";
import axios from "axios";

class ZdravstveniKarton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: props.email,
      uloga: props.uloga,
      visina: "",
      tezina: "",
      krvnaGrupa: "",
      lbo: "",
      ime: "",
      prezime: ""
    };
  }

  componentWillMount() {
    const url =
      "http://localhost:8025/api/pacijenti/findZK/" + this.state.email;
    axios
      .get(url)
      .then(Response => {
        console.log("Preuzet pacijent: ");
        console.log(Response.data);

        this.setState({
          tezina: Response.data.tezina
        });
        this.setState({
          visina: Response.data.visina,
          krvnaGrupa: Response.data.krvnaGrupa
        });
        axios
          .get(
            "http://localhost:8025/api/pacijenti/findPacijentEmail/" +
            this.state.email
          )

          .then(Response => {
            console.log("URL 111");
            console.log(Response);
            this.setState({
              ime: Response.data.ime,
              prezime: Response.data.prezime,
              lbo: Response.data.lbo
            });
            console.log(this.state);
          })
          .catch(error => {
            console.log("nije uspeo url1");
            console.log(error);
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
    const visina = this.state.visina;
    const tezina = this.state.tezina;
    const krvnaGrupa = this.state.krvnaGrupa;

    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={8}>
              <Card
                title="Zdravstveni karton"
                content={
                  <div>
                    <Table striped hover>
                      <tbody>
                        <tr>
                          <td>
                            <label>Ime: </label>
                          </td>
                          <td>
                            <input
                              type="text"
                              name="ime"
                              defaultValue={ime}
                              disabled="disabled"
                              // placeholder={this.state.ime}
                              // noValidate
                              onChange={this.handleChange}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label>Prezime: </label>
                          </td>
                          <td>
                            <input
                              type="text"
                              name="prezime"
                              defaultValue={prezime}
                              disabled="disabled"
                              // placeholder={this.state.prezime}
                              // noValidate
                              onChange={this.handleChange}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label>Jedinstveni broj osiguranika: </label>
                          </td>
                          <td>
                            <input
                              type="text"
                              name="lbo"
                              defaultValue={lbo}
                              disabled="disabled"
                              // placeholder={this.state.lbo}
                              // noValidate
                              onChange={this.handleChange}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label>Visina: </label>
                          </td>
                          <td>
                            <input
                              type="text"
                              name="visina"
                              defaultValue={visina}
                              disabled="disabled"
                              // placeholder={this.state.visina}
                              // noValidate
                              onChange={this.handleChange}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label>Tezina: </label>
                          </td>
                          <td>
                            <input
                              type="text"
                              name="tezina"
                              defaultValue={tezina}
                              disabled="disabled"
                              // placeholder={this.state.tezina}
                              // noValidate
                              onChange={this.handleChange}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label>Krvna grupa: </label>
                          </td>
                          <td>
                            <input
                              type="text"
                              name="krvnaGrupa"
                              defaultValue={krvnaGrupa}
                              disabled="disabled"
                              // placeholder={this.state.krvnaGrupa}
                              // noValidate
                              onChange={this.handleChange}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
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

export default ZdravstveniKarton;
