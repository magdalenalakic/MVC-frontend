import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";

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
// import Dialog from 'react-bootstrap-dialog';

class IzmenaProfilaAdminaKC extends Component {
  constructor(props) {
    super(props);
    console.log("IZMENA PROFILA Admina KC");
    this.state = {
      email: props.email,
      uloga: props.uloga,
      ime: "",
      prezime: "",
      lozinka: "" 
    };
  }

  componentWillMount() {
    const url =
      "http://localhost:8025/api/administratoriKC/pronadjenAdministratorKC/" + this.state.email;
    axios
      .get(url)
      .then(Response => {
        console.log("Preuzet admin: ");
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
          lozinka: Response.data.lozinka
        });
      })
      .catch(error => {
        console.log("Admin KC nije preuzet");
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
    console.log("Izmena : ---------------");
    console.log(this.state.ime);
    console.log(this.state.prezime);
    axios
      .put("http://localhost:8025/api/administratoriKC/izmena", {
        ime: this.state.ime,
        prezime: this.state.prezime,
        email: this.state.email,
        adresa: this.state.lozinka
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
          lozinka: response.data.lozinka
        });
        

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
    const lozinka = this.state.lozinka;
 

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
                    className="formaIzmenaProfilaAdminaKC"
                  >
                    <div className="ime">
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

                   
                    <div className="lozinka">
                      <label htmlFor="lozinka">Lozinka: </label>
                      <input
                        type="text"
                        name="lozinka"
                        defaultValue={lozinka}
                        // placeholder={this.state.adresa}
                        // noValidate
                        onChange={this.handleChange}
                      />
                    </div>

                    <div className="izmeniPodatkeAdminKC">
                      <Button type="submit">Izmeni podatke</Button>
                    </div>
                  </form>
                  
                }
              />
            </Col>
            <Col md={4}>
              <Card
                // statsIcon="fa fa-clock-o"
                title="O Adminu"
                // category="Ime"
                content={
                  <div id="a">
                    {/* <div className="slikaKCdiv">
                      <h2>
                        <img
                          className="slikaPacijent"
                          src={slikaPacijent}
                        ></img>
                      </h2>
                    </div> */}

                    <div className="typo-line">
                      <h2>
                        <p className="category">Email: </p>
                        <label className="emailAdminaKC">{email}</label>
                      </h2>
                    </div>
                    <div className="typo-line">
                      <h2>
                        <p className="category">Ime: </p>
                        <label className="imeAdminaKC">{ime}</label>
                      </h2>
                    </div>
                    <div className="typo-line">
                      <h2>
                        <p className="category">Prezime: </p>
                        <label className="prezimeAdminaKC">{prezime}</label>
                      </h2>
                    </div>
                    <div className="typo-line">
                      <h2>
                        <p className="category">Lozinka: </p>
                        <label className="lozinkaAdminaKC">{lozinka}</label>
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

export default IzmenaProfilaAdminaKC;
