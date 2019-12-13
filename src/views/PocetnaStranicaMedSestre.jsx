
import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { Tasks } from "components/Tasks/Tasks.jsx";
import {
  dataPie,
  legendPie,
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales,
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar
} from "variables/Variables.jsx";
import slikaLekar from "assets/img/images.jpg";
import Login from "login.js";
import axios from "axios";
import ListaPacijenata from "views/ListaPacijenataMedSestra.jsx";
import events from "events.js";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css"; 

import moment from 'moment';

const localizer = momentLocalizer(moment);

class PocetnaStranicaMedSestre extends React.Component {
  constructor(props) {
    super(props);
    console.log("ADMINISTRATOR KLINICKOG CENTRA");
    console.log(this.props);
    this.state = {
      uloga: props.uloga,
      email: props.email,
      redirectToListaPacijenata: false,
      redirectToProfilMedSestre: false,
      redirectToZahtevZaGodOdmor: false,
      redirectToOveraRecepata: false
    };
    this.handleListaPacijenata = this.handleListaPacijenata.bind(this);
    this.handleProfilMedSestre = this.handleProfilMedSestre.bind(this);
    this.handleZahtevZaGodOdmor = this.handleZahtevZaGodOdmor.bind(this);
    this.handleOveraRecepata = this.handleOveraRecepata.bind(this);


    // console.log(this.state.uloga);
    // console.log(this.state.email);
  }
 
  handleListaPacijenata() {
    this.setState({
      redirectToListaPacijenata: true,
    });
  };
  handleProfilMedSestre() {
    this.setState({
      redirectToProfilMedSestre: true,
    });
  };
  handleZahtevZaGodOdmor(){
    this.setState({
      redirectToZahtevZaGodOdmor: true,
    });
  };
  handleOveraRecepata(){
    this.setState({
      redirectToOveraRecepata: true,
    });
  };


 
  renderRedirect = () => {
  
    if(this.state.redirectToListaPacijenata){    
      return <Redirect from="/" to="/admin/listaPacijenata"></Redirect>
    }else if(this.state.redirectToProfilMedSestre){
      return <Redirect from="/" to="/admin/izmenaProfila"></Redirect>
    }else if(this.state.redirectToZahtevZaGodOdmor){
      return <Redirect from="/" to="/admin/zahtevZaGodOdmor"></Redirect>
    }else if(this.state.redirectToOveraRecepata){
      return <Redirect from="/" to="/admin/overavanjeRecepata"></Redirect>
    }
  };

  render() {

    console.log(this.props);
   
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col lg={3} sm={6}>
              {this.renderRedirect()}
              <div onClick={this.handleListaPacijenata}>
                <StatsCard
                  bigIcon={<i className="pe-7s-server text-warning" />}
                  // statsText="Lista pacijenata"
                  // statsValue="105GB"
                  // statsIcon={<i className="fa fa-refresh" />}
                  statsIconText="Lista pacijenata"
                />
              </div>
            </Col> 
            <Col lg={3} sm={6}>
              {this.renderRedirect()}
              <div onClick={this.handleOveraRecepata}>
                <StatsCard
                  bigIcon={<i className="fa fa-twitter text-info" />}
                  statsText=""
                  // statsValue="+45"
                  // statsIcon={<i className="fa fa-refresh" />}
                  statsIconText="Overa recepata"
                />
              </div>
            </Col>         
            <Col lg={3} sm={6}>
              {this.renderRedirect()}
              <div onClick={this.handleProfilMedSestre}>
                <StatsCard
                  bigIcon={<i className="pe-7s-graph1 text-danger" />}
                  // statsText="Profil korisnika"
                  // statsValue="23"
                  // statsIcon={<i className="fa fa-clock-o" />}
                  statsIconText="Profil korisnika"
                />
              </div>
            </Col>
            <Col lg={3} sm={6}>
              {this.renderRedirect()}
              <div onClick={this.handleZahtevZaGodOdmor}>
                <StatsCard
                  bigIcon={<i className="pe-7s-graph1 text-danger" />}
                  // statsText="Profil korisnika"
                  // statsValue="23"
                  // statsIcon={<i className="fa fa-clock-o" />}
                  statsIconText="Zahtev za odmor/odsustvo"
                />
              </div>
            </Col>
            
          </Row>
          <Row>
            <Col >
              
              <Card
                title="Kalendar"
                // category="24 Hours performance"
                // stats="Updated 3 minutes ago"
                content={
              
                  <div style={{ height: 400 }}  className="ct-chart">
                    <Calendar
                        localizer={localizer}
                        events={events }
                        views={["month"]}   
                        defaultDate={new Date()}
                    />
                  </div>
                 
                }
                // legend={
                //   <div className="legend">{this.createLegend(legendSales)}</div>
                // }
              />
                
            </Col>
            
            {/* <Col md={4}>
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
                        <p className="category">Ime:</p>
                        <label className="adresaKC">ucitati data</label>
                      </h2>
                    </div>
                    <div className="typo-line">
                      <h2>
                        <p className="category">Prezime:</p>
                        <label className="adresaKC">ucitati data</label>
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
                
                
              />
            </Col> */}
          </Row>

        </Grid>
      </div>
    );
  }
}

export default PocetnaStranicaMedSestre;
