import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Table } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";
import "izmenaProfila.css";
import "klinickiCentar.css";
//dodam link za sliku  mozda od doktora!!
import avatar from "assets/img/faces/face-3.jpg";
import "login.js";
import { log } from "util";
import Login from "login";
import slikaPacijent from "assets/img/pacijentImage.jpg";
import axios from "axios";

class PotvrdaPregleda extends Component {
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
      pregledi: []
    };
    console.log(this.state);
    this.listaPregleda = this.listaPregleda.bind(this);
    this.handleOdobren = this.handleOdobren.bind(this);
    this.handleOdbijen = this.handleOdbijen.bind(this);
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
        this.setState(
          {
            telefon: Response.data.telefon,
            adresa: Response.data.adresa,
            grad: Response.data.grad,
            drzava: Response.data.drzava,
            lbo: Response.data.lbo
          },
          () => {
            this.ucitaj();
          }
        );
      })

      .catch(error => {
        console.log("Pacijent  nije preuzet");
      });
  }
  ucitaj() {
    var config = {
      headers: {
        Authorization: "Bearer " + this.state.token,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
    axios
      .get("http://localhost:8025/api/pregledi/preglediPacijenta", config)
      .then(res => {
        console.log(res.data);
        this.setState({
          pregledi: res.data.sort((a, b) => b.id - a.id)
        });
      })
      .catch(error => {
        console.log("Pacijent  nije preuzet");
      });
  }
  handleOdobren = e => {
    e.preventDefault();
    var config = {
      headers: {
        Authorization: "Bearer " + this.state.token,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
    console.log(config);
    console.log("odobren");
    console.log(e.currentTarget.value);
    const url2 =
      "http://localhost:8025/api/pregledi/potvrda/" + e.currentTarget.value;
    axios
      .put(url2, {}, config)
      .then(response => {
        console.log("ODOBRENOOOO");
        console.log(response);
        this.props.handleClick("ZAHTEV JE POTVRDJEN");
        this.ucitaj();
      })
      .catch(error => {
        console.log(error.response);
      });
  };
  handleOdbijen = e => {
    e.preventDefault();
    console.log("odbijen");
    console.log(e.currentTarget.value);
    var config = {
      headers: {
        Authorization: "Bearer " + this.state.token,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
    const url2 =
      "http://localhost:8025/api/pregledi/odbijanje/" + e.currentTarget.value;
    axios
      .put(url2, {}, config)
      .then(response => {
        console.log("ODBIJENO");
        console.log(response);
        this.props.handleClick("ZAHTEV JE ODBIJEN");
        this.ucitaj();
      })
      .catch(error => {
        console.log(error.response);
      });
  };
  listaPregleda() {
    let res = [];
    console.log("lista kl");
    const odbij = <Tooltip id="remove_tooltip">Odbij</Tooltip>;
    const potvrdi = <Tooltip id="remove_tooltip">Potvrdi</Tooltip>;

    // const pretraga = this.state.pretraziPoljeKlinika;
    // const oc = this.state.ocenaKlinike;
    // console.log(oc);
    // if ((pretraga == "" || pretraga == undefined) && oc < 5) {
    let lista = this.state.pregledi;

    for (var i = 0; i < lista.length; i++) {
      console.log(lista[i]);
      if (lista[i].salaN == "" || lista[i].salaN == undefined) {
        res.push(
          <tr key={i}>
            <td key={lista[i].nazivKl}>{lista[i].nazivKl}</td>
            <td key={lista[i].lekarID}>
              {lista[i].imeL} {lista[i].prezimeL}
            </td>
            <td key={lista[i].nazivTP}>{lista[i].nazivTP}</td>
            <td key={lista[i].cena}>{lista[i].cena} RSD</td>

            <td align={"center"}>
              <i className="pe-7s-clock text-warning" />
            </td>
            <td align={"center"}>
              <i className="pe-7s-clock text-warning" />
            </td>
            <td></td>
            <td></td>
          </tr>
        );
      } else {
        if (lista[i].status == 1) {
          res.push(
            <tr key={i}>
              <td key={lista[i].nazivKl}>{lista[i].nazivKl}</td>
              <td key={lista[i].lekarID}>
                {lista[i].imeL} {lista[i].prezimeL}
              </td>
              <td key={lista[i].nazivTP}>{lista[i].nazivTP}</td>
              <td key={lista[i].cena}>{lista[i].cena} RSD</td>

              <td align={"center"} key={lista[i].status}>
                {" "}
                <i className="pe-7s-check text-success" />
              </td>
              <td key={lista[i].sala}>
                {lista[i].salaN} {lista[i].salaBR}
              </td>
              <td></td>
              <td></td>
            </tr>
          );
        } else if (lista[i].status == 0) {
          res.push(
            <tr key={i}>
              <td key={lista[i].nazivKl}>{lista[i].nazivKl}</td>
              <td key={lista[i].lekarID}>
                {lista[i].imeL} {lista[i].prezimeL}
              </td>
              <td key={lista[i].nazivTP}>{lista[i].nazivTP}</td>
              <td key={lista[i].cena}>{lista[i].cena} RSD</td>
              <td key={lista[i].status} align={"center"}>
                <i className="pe-7s-timer text-warning" />
              </td>
              <td key={lista[i].sala}>
                {lista[i].salaN} {lista[i].salaBR}{" "}
              </td>
              <td>
                <OverlayTrigger placement="top" overlay={potvrdi}>
                  <Button
                    bsStyle="success"
                    simple
                    type="button"
                    bsSize="sm"
                    value={lista[i].id}
                    onClick={e => this.handleOdobren(e)}
                  >
                    <i className="pe-7s-check text-success" />
                  </Button>
                </OverlayTrigger>
              </td>
              <td>
                <OverlayTrigger placement="top" overlay={odbij}>
                  <Button
                    bsStyle="danger"
                    simple
                    type="button"
                    bsSize="sm"
                    value={lista[i].id}
                    onClick={e => this.handleOdbijen(e)}
                  >
                    <i className="pe-7s-close-circle text-danger" />
                  </Button>
                </OverlayTrigger>
              </td>
            </tr>
          );
        } else if (lista[i].status == 2) {
          res.push(
            <tr key={i}>
              <td key={lista[i].nazivKl}>{lista[i].nazivKl}</td>
              <td key={lista[i].lekarID}>
                {lista[i].imeL} {lista[i].prezimeL}
              </td>
              <td key={lista[i].nazivTP}>{lista[i].nazivTP}</td>
              <td key={lista[i].cena}>{lista[i].cena} RSD</td>

              <td align={"center"} key={lista[i].status}>
                {" "}
                <i className="pe-7s-close-circle text-danger" />
              </td>
              <td key={lista[i].sala}>
                {lista[i].salaN} {lista[i].salaBR}
              </td>
              <td></td>
              <td></td>
            </tr>
          );
        }
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
            <Col md={12}>
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
                        <th id="Status">Status</th>
                        <th id="Sala">Sala</th>
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

export default PotvrdaPregleda;
