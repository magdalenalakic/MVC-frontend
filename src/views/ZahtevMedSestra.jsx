
import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Card } from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import axios from "axios";
import "klinickiCentar.css";


class ZahtevMedSestra extends React.Component {
  constructor(props) {
    super(props);
    console.log("MED SESTRA");
    console.log(this.props);
    this.state = {
      uloga: props.uloga,
      email: props.email,
      token: props.token,

      
    };
   

    console.log(this.state.uloga);
    console.log(this.state.email);
  }
 
  
  render() {
    console.log(this.props);
    return (
      <div className="content">
              <Card
              
                title="Zahtev za godisnji odmor/odsustvo"
                // category="24 Hours performance"
                // stats="Updated 3 minutes ago"
                 content={
                  <div className="formaGodOdomorOdsustvo" >
                    <Grid fluid>
                      <Row>
                        <Col lg={3} sm={6}> 
                          <h5>Tip (odmor/odsustvo): </h5>
                          <div>
                            <select className="izbor"
                             // name="odabir" 
                              // defaultValue={this.state.klinikaIzmenjenogAK}
                            // onChange={e => {this.proslediKlinikuIzmena(e)}}
                            >
                              <option 
                              //value={lista[i].id} 
                              >ODMOR</option>

                              <option 
                              //value={lista[i].id} 
                              >ODSUSTVO</option>
                            
                            </select>
                          </div>
                        </Col>
                        <Col lg={3} sm={6}>
                          <h5>Datum pocetka:</h5>
                          <DatePicker
                            placeholderText="Izaberi datum"
                            //selected={this.state.datumZaPregled}
                            //onSelect={this.handleChangeDate}

                            // onChange={date => setStartDate(date)}
                            />
                        </Col>
                        <Col lg={3} sm={6}>
                          <h5>Datum kraja:</h5>
                          <DatePicker
                              placeholderText="Izaberi datum"
                              //selected={this.state.datumZaPregled}
                              //onSelect={this.handleChangeDate}

                              // onChange={date => setStartDate(date)}
                          />
                        </Col>
                        
                      </Row>
                      <Row >
                        <Col lg={3} >
                        <h5 >Razlog: </h5>
                         <input className="razlogPolje"
                          type="text"
                          name="razlog"
                         // defaultValue={ime}
                          // placeholder={this.state.ime}
                          // noValidate
                          //onChange={this.handleChange}
                        /> 
                        </Col>
                      </Row>
                      <Row >
                        <Col lg={3} >
                          <Button className="dugmePosalji">Pošalji</Button>
                        </Col>
                      </Row>
                    </Grid>
                    
                  </div>
                 }
              />


            {/* </Col>
          </Row>

        </Grid> */}
      </div>
    );
  }
}

export default ZahtevMedSestra;
