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
                  <form className="formUserProfile">
                    <FormInputs
                      ncols={["col-md-10", "col-md-10"]}
                      properties={[
                        {
                          // label: "Klinika (disabled)",
                          label: "Klinika ",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Company",
                          defaultValue: "staviti ime od klinike",
                          disabled: true
                        },
                        {
                          label: "Email adresa",
                          type: "email",
                          bsClass: "form-control",
                          placeholder: "Email",
                          defaultValue: "Emai"
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-10", "col-md-10"]}
                      properties={[
                        {
                          label: "Ime",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "First name",
                          defaultValue: "ime"
                        },
                        {
                          label: "Prezime",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Last name",
                          defaultValue: "Neko prezime"
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-10000"]}
                      properties={[
                        {
                          label: "Adress",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Home Adress",
                          defaultValue:
                            "Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                        }
                      ]}
                    />

                    <Row>
                      <Col md={12}>
                      </Col>
                    </Row>
                    <Button bsStyle="info" pullRight fill type="submit">
                      Izmeni profil
                    </Button>
                    <div className="clearfix" />
                  </form>
                }
              />
            </Col>
            <Col md={4}>
              <UserCard
                bgImage="https://sumadinac.rs/wp-content/uploads/2017/07/stetoskop-doktor-lekar.jpg "
                // avatar={avatar} // navedena slika
                avatar = "https://opusteno.rs/slike/2017/03/zadovoljan-lekar-32511/zadovoljan-lekar-sp.jpg"
                name= "Ime i prz"
                email="email lekara"
                description={
                  <span>
                    Moze ovdje neki 
                    <br />
                    njegov opis ako ga ima
                  </span>
                }
                // socials={
                //   <div>
                //     <Button simple>
                //       <i className="fa fa-facebook-square" />
                //     </Button>
                //     <Button simple>
                //       <i className="fa fa-twitter" />
                //     </Button>
                //     <Button simple>
                //       <i className="fa fa-google-plus-square" />
                //     </Button>
                //   </div>
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
