
import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import "react-datepicker/dist/react-datepicker.css";
import { Card } from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import axios from "axios";
import "klinickiCentar.css";

import Slikalekari from "assets/img/lekari.jpg";
import slikaPregledi from "assets/img/pregled.jpg"
import kalendarSlika from "assets/img/calendar.png"


class Pregled extends React.Component {
  constructor(props) {
    super(props);
    console.log("LEKAR");
    console.log(this.props);
    this.state = {
      uloga: props.uloga,
      email: props.email,
      token: props.token,
      id: "",
      tipOdmorOdsustvo: "ODMOR",
      datumPocetka: new Date(),
      datumKraja : new Date(),
      opis: "",
      idMedSestre: 0, 
      imeMS: "",
      prezimeMS: ""

      
    };
    this.config = {
      headers: {
        Authorization: "Bearer " + this.state.token,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }
    this.izaberiTip = this.izaberiTip.bind(this);
    this.zahtevOdmorOdsustvo = this.zahtevOdmorOdsustvo.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeDatePocetka = this.handleChangeDatePocetka.bind(this);
    this.handleChangeDateKraja = this.handleChangeDateKraja.bind(this);
    console.log(this.state.uloga);
    console.log(this.state.email);
  }

  izaberiTip(izbor) {
    
    console.log("izbor odmor odsustvo");

    console.log(izbor.target.value);

    this.setState({
      tipOdmorOdsustvo : izbor.target.value
      
    },() => console.log(this.state.tipOdmorOdsustvo));
  
  };
  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;

    this.setState({ [name]: value }, () => console.log(this.state));
  };
  handleChangeDatePocetka = date => {
    console.log(date)
    this.setState(
      {
        datumPocetka: date
      },
      () => console.log(this.state)
    );
  };
  handleChangeDateKraja = date => {
    console.log(date)
    this.setState(
      {
        datumKraja: date
      },
      () => console.log(this.state)
      
    );
  };

  componentWillMount() {
    const url =
    "http://localhost:8025/api/lekari/getLekarByEmail" ;
  axios
    .get(url, this.config)
    .then(Response => {
      console.log("Preuzet lekar: ");
      console.log(Response.data);

      this.setState({
        id: Response.data.id
      });
      this.setState({
        imeMS: Response.data.ime
      })
      this.setState({
        prezimeMS: Response.data.prezime
      })

     
    })
    .catch(error => {
      console.log("Med sestra nije preuzeta");
    });
  }
  zahtevOdmorOdsustvo() {

    const url = "http://localhost:8025/api/odmorodsustvo/posaljiZahtevLekar";
    axios
      .post(url,{ 
        datumOd : this.state.datumPocetka,
        datumDo : this.state.datumKraja,
        opis : this.state.opis,
        status: false,
        idLekara : this.state.id,
        imeL: this.state.imeMS,
        prezimeL: this.state.prezimeMS,
        emailL: this.state.email,
        tip : this.state.tipOdmorOdsustvo
      }, this.config)
      .then(Response => {
        
        console.log("uspesno poslat zahtev")
        console.log(Response.data);

      })
      .catch(error => {
        console.log("Zahtev nije poslat");
      });
  };

  render() {
    console.log(this.props);
    return (
        <Grid>
            <Row className="linkoviPregled">
                <Col lg={3} sm={6}>
                    {/* {this.renderRedirect()} */}
                    <div 
                    // onClick={this.handleListaPacijenata}
                    >
                        <StatsCard
                            bigIcon={<div> <img src = { kalendarSlika} width="30" height="20" /></div>}
                            // statsText="Lista pacijenata"
                            // statsValue="105GB"
                            // statsIcon={<i className="fa fa-refresh" />}
                            statsIconText="Zdravstveni karton"
                        />
                    </div>                    
                </Col>
                <Col lg={3} sm={6}>
                    {/* {this.renderRedirect()} */}
                    <div 
                    // onClick={this.handleListaPacijenata}
                    >
                        <StatsCard
                            bigIcon={<div> <img src = { kalendarSlika} width="30" height="20" /></div>}
                            // statsText="Lista pacijenata"
                            // statsValue="105GB"
                            // statsIcon={<i className="fa fa-refresh" />}
                            statsIconText="Informacije o pacijentu"
                        />
                    </div>                    
                </Col>
                <Col lg={3} sm={6}>
                    {/* {this.renderRedirect()} */}
                    <div 
                    // onClick={this.handleListaPacijenata}
                    >
                        <StatsCard
                            bigIcon={<div> <img src = { kalendarSlika} width="30" height="20" /></div>}
                            // statsText="Lista pacijenata"
                            // statsValue="105GB"
                            // statsIcon={<i className="fa fa-refresh" />}
                            statsIconText="Informacije o pregledu"
                        />
                    </div>                    
                </Col>  
                <Col lg={3} sm={6}>
                    {/* {this.renderRedirect()} */}
                    <div 
                    // onClick={this.handleListaPacijenata}
                    >
                        <StatsCard
                            bigIcon={<div> <img src = { kalendarSlika} width="30" height="20" /></div>}
                            // statsText="Lista pacijenata"
                            // statsValue="105GB"
                            // statsIcon={<i className="fa fa-refresh" />}
                            statsIconText="Zakazi pregled"
                        />
                    </div>                    
                </Col>                   
            </Row>
            <Row>
                <div className="formaPregleda">

                    <Card
                        title="Pregled"
                        // category="24 Hours performance"
                        // stats="Updated 3 minutes ago"
                        content={
                            <div className="formaPregleda" >
                            <Grid fluid>
                               
                                <Row >
                                    
                                        <Col md={4} lg={4} className="dijagnozaRecept">
                                            <h4 className="poljePregled">Dodavanje dijagnoze</h4>  
                                            
                                            <input className="poljePregled"  disabled="disabled" ></input>
                                            <Button className="pregledDugme" >Dodavanje dijagnoze</Button>
                                            
                                            
                                        </Col>
                                        <Col md={4} lg={4} className="dijagnozaRecept">
                                            <h4 className="poljePregled">Izdavanje recepta</h4>
                                            
                                            
                                            <input className="poljePregled"  disabled="disabled" ></input>
                                            <Button className="pregledDugme" >Izaberi lek</Button>

                                            

                                        </Col>
                                   
                                </Row>
                                <Row >
                                    <Col className="misljenjeOkvir">
                                    <h4 className="poljePregled">Misljenje</h4>
                                    <textarea
                                    className="misljenjePolje"
                                        type="text"
                                        name="opis"
                                        onChange={this.handleChange}
                                    >

                                    </textarea>
                                    {/* <input
                                        className="misljenjePolje"
                                        type="text"
                                        name="opis"
                                        // defaultValue={ime}
                                        // placeholder={this.state.ime}
                                        // noValidate
                                        onChange={this.handleChange}
                                    />  */}
                                    </Col>
                            </Row>
                                <Row >
                                    <Col  >
                                        <Button 
                                        className="dugmeZavrsiPregled" 
                                        // onClick={this.zahtevOdmorOdsustvo}
                                        >Zavrsi pregled</Button>
                                    </Col>
                                </Row>
                            </Grid>
                        
                            </div>
                        }
                    />
                </div>
            </Row>
            
        </Grid>
     
    );
  }
}

export default Pregled;
