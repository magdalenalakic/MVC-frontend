/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
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
import slikaLekar from "assets/img/images.jpg"

class izmenaProfila extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={8}>
              <Card
                title="Izmena podataka"
                content={
                  <form className="formaIzmenaProfilaLekara">
                     <div className="ime">
                        <label htmlFor="ime">Ime: </label>
                        <input
                          type="text"
                          name="ime"
                          placeholder="Ime"
                          // noValidate
                          // onChange={this.handleChange}
                        />
                      </div>
                      <div className="prezime">
                        <label htmlFor="prezime">Prezime: </label>
                        <input
                          type="text"
                          name="prezime"
                          placeholder="prezime"
                          // noValidate
                          // onChange={this.handleChange}
                        />
                      </div>
                      <div className="email">
                        <label htmlFor="email">Email: </label>
                        <input
                          type="email"
                          name="email"
                          placeholder="email"
                          // noValidate
                          // onChange={this.handleChange}
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
                      <div className="telefon">
                        <label htmlFor="telefon">Broj telefona: </label>
                        <input
                          type="number"
                          name="telefon"
                          placeholder="telefon"
                          // noValidate
                          // onChange={this.handleChange}
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
                      <div className="izmeniPodatkeLekar">
                         <button type="submit">Izmeni podatke</button>
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
                title="O lekaru"
                // category="Ime"
                content={
                  <div id="a">
                    <div className="slikaKCdiv">
                      <h2> 
                        <img className="slikaLekar" src={slikaLekar}></img>
                      </h2>
                    </div>
                    
                    <div className="typo-line">
                      <h2>
                        <p className="category">Klinika:</p>
                        <label className="adresaKC">ucitati data</label>
                      </h2>
                    </div>
                    <div className="typo-line">
                      <h2>
                        <p className="category">Opis posla:</p>
                        <label className="opisKC">ucitati data</label>
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

export default izmenaProfila;
