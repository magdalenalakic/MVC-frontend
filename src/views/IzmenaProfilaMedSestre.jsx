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
import Button from "components/CustomButton/CustomButton.jsx";
import "klinickiCentar.css";



import "login.js";
import axios from "axios";
import CustomCheckbox from "components/CustomCheckbox/CustomCheckbox";
// import Dialog from 'react-bootstrap-dialog';

class IzmenaProfilaMedSestre extends Component {
  constructor(props) {
    super(props);
    console.log("IZMENA PROFILA Med sestre");
    this.state = {
      email: props.email,
      uloga: props.uloga,
      token: props.token,
      ime: "",
      prezime: "",
      lozinka: "", 
      menjanjeLozinke: "password",
      brTelefona: "",
      imeN: "",
      prezimeN: "",
      lozinkaN: "", 
      brTelefonaN: "",
      adresaN: "",
      is_checked: false
    };
    this.config = {
      headers: {
        Authorization: "Bearer " + this.state.token,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }

    this.handleCheckBox = this.handleCheckBox.bind(this);
  }

  componentWillMount() {
    const url =
      "http://localhost:8025/api/medicinskaSestra/medicinskaSestra" ;
    axios
      .get(url, this.config)
      .then(Response => {
        console.log("Preuzeta med sestra: ");
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
        this.setState({
            brTelefona: Response.data.brTelefona
        });
      })
      .catch(error => {
        console.log("Med sestra nije preuzeta");
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
    console.log("Izmena : ---------------");
    axios
      .put("http://localhost:8025/api/medicinskaSestra/izmena", {
        ime: this.state.imeN,
        prezime: this.state.prezimeN,
        email: this.state.email,
        lozinka: this.state.lozinkaN,
        brTelefona: this.state.brTelefonaN
      }, this.config)
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

        this.setState({
          brTelefona: response.data.brTelefona
        });
        

      })
      .catch(error => {
        console.log("Izmena nije uspela! ");
      });
  };
//prikaz pass
  handleCheckBox() {
    if(this.state.is_checked == true){
      this.setState({ is_checked: false });
      this.setState({ menjanjeLozinke : "password"});
    }else{
      this.setState({ is_checked: true });
      this.setState({ menjanjeLozinke : "text"});
    }
    
  }

  render() {
    const email = this.state.email;
    const uloga = this.state.uloga;
    const ime = this.state.ime;
    const prezime = this.state.prezime;
    const lozinka = this.state.lozinka;
    const brTelefona = this.state.brTelefona;
 

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
                    className="formaIzmenaProfilaMedSestre"
                  >
                  
                    <div className="formaPolje">
                      <label className="formaPolje" htmlFor="ime">Ime: </label>
                      <input className="formaPolje"
                        type="text"
                        name="imeN"
                        defaultValue={ime}
                        // placeholder={this.state.ime}
                        // noValidate
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="formaPolje">
                      <label className="formaPolje" htmlFor="prezime">Prezime: </label>
                      <input className="formaPolje"
                        type="text"
                        name="prezimeN"
                        defaultValue={prezime}
                        // placeholder="prezime"
                        // noValidate
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="formaPolje">
                      <label className="formaPolje" htmlFor="prezime">Email: </label>
                      <input className="formaPolje"
                        type="text"
                        name="email"
                        defaultValue={email}
                        // placeholder="prezime"
                        // noValidate
                        disabled="disabled"
                        // onChange={this.handleChange}
                      />
                    </div>
                    <div className="formaPolje">
                      <label className="formaPolje" htmlFor="lozinka">Lozinka: </label>
                      <input className="formaPolje"
                        type={this.state.menjanjeLozinke}
                        name="lozinkaN"
                        defaultValue={lozinka}
                        // placeholder={this.state.adresa}
                        // noValidate
                        onChange={this.handleChange}
                      />
                      <div className="checkbox">
                        <input
                          id="check"
                          type="checkbox"
                          onChange={this.handleCheckBox}
                          checked={this.state.is_checked}
                         
                        />
                        <label htmlFor="check">prikazi lozinku</label>
                      </div> 
                    </div>
                    <div className="formaPolje">
                      <label className="formaPolje" htmlFor="brTelefona">Br. Telefona: </label>
                      <input className="formaPolje"
                        type="text"
                        name="brTelefonaN"
                        defaultValue={brTelefona}
                        // placeholder={this.state.adresa}
                        // noValidate
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="formaDugme">
                      <Button type="submit">Izmeni podatke</Button>
                    </div>
                  
                  </form>
                  
                }
              />
            </Col>
            <Col md={4}>
              <Card
                // statsIcon="fa fa-clock-o"
                title="O Medicinskoj sestri"
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
                    {/* <div className="typo-line">
                      <h2>
                        <p className="category">Lozinka: </p>
                        <label className="lozinkaAdminaKC">{lozinka}</label>
                      </h2>
                    </div> */}
                    <div className="typo-line">
                      <h2>
                        <p className="category">Br. telefona: </p>
                        <label className="lozinkaAdminaKC">{brTelefona}</label>
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

export default IzmenaProfilaMedSestre;
