import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";
import { NavItem, Nav, NavDropdown, MenuItem } from "react-bootstrap";
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
      listaPregleda: []
    };
    this.redirectReferer = this.redirectReferer(this);
  }

  componentWillMount() {
    const url = "http://localhost:8025/api/ST/unapredDef";
    axios
      .get(url)
      .then(Response => {
        console.log("Preuzeti unapred def pregledi: ");
        console.log(Response.data);

        this.setState(
          {
            listaPregleda: Response.data
          },
          () => console.log(this.state.listaPregleda)
        );
      })

      .catch(error => {
        console.log("Pacijent  nije preuzet");
      });
  }
  promenjenOdabirPregleda() {
    console.log("promenjen odabrir");
  }
  odabranPrelged = e => {
    //treba redirektovati na pretragu i filtriranje lekara
    e.preventDefault();
    this.setState({
      redirectNext: true
    });
  };
  listaUnapredDefinisanihPregleda() {
    let res = [];
    console.log("lista kl");

    // const pretraga = this.state.pretraziPoljeKlinika;
    // const oc = this.state.ocenaKlinike;
    // console.log(oc);
    // if ((pretraga == "" || pretraga == undefined) && oc < 5) {
    let lista = this.state.listaPregleda;

    for (var i = 0; i < lista.length; i++) {
      res.push(
        <tr key={i}>
          <td>
            <input
              name="odabranPregled"
              type="radio"
              value={lista[i].id}
              checked={this.state.odabranPregled == lista[i].id}
              onChange={e => {
                this.promenjenOdabirPregleda(e);
              }}
            ></input>
          </td>
          <td key={lista[i].id}>{lista[i].id}</td>
          <td key={lista[i].datum}>{lista[i].datum}</td>
          <td key={lista[i].tipPregledaId}>{lista[i].tipPregledaN}</td>
          <td key={lista[i].klinikaId}>{lista[i].klinikaN}</td>
          <td key={lista[i].lekarId}>
            {lista[i].lekarIme} {lista[i].lekarPrezime}
          </td>

          <td key={lista[i].cena}>{lista[i].cena} RSD</td>
          <td key={lista[i].popust}>{lista[i].popust}%</td>
        </tr>
      );
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
    //       }
    //     }
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
            <Col md={10}>
              <Card
                title="Izaberi kliniku za pregled"
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
                              <th id="Datum">Datum</th>
                              <th id="Tip pregleda"> Tip pregleda</th>
                              <th id="Klinika">Klinika</th>
                              <th id="Lekar">Lekar</th>
                              <th id="Cena">Cena</th>
                              <th id="Popust">Popust</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.listaUnapredDefinisanihPregleda()}
                          </tbody>
                        </Table>
                      }
                    />
                    {this.redirectReferer}
                    <Button type="submit">DALJE</Button>
                  </form>
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
