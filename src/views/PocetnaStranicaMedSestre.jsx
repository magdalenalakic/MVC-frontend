
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

import Button from "components/CustomButton/CustomButton.jsx";
import Dialog from 'react-bootstrap-dialog';


const localizer = momentLocalizer(moment);
const listaRadnihDana = [];
const listaPregleda = [
  {
    title: "Odsustvo/Odmor",
    start: "2019-12-03 02:00",
    end: "2019-12-06 06:59",
    up_down_ind: "N"
  }
  ,
    {
      title: "Radni dani",
      start: "2019-12-09 13:00",
      end: "2019-12-13 13:59",
      up_down_ind: "Y"
    },
    {
      title: "Radni dani",
      start: "2019-12-02 13:00",
      end: "2019-12-02 13:59",
      up_down_ind: "Y"
    }
    ,{
      title: "Radni dani",
      start: "2019-12-16 13:00",
      end: "2019-12-20 13:59",
      up_down_ind: "Y"
    }
    ,{
      title: "Radni dani",
      start: "2019-12-23 13:00",
      end: "2019-12-27 13:59",
      up_down_ind: "Y"
    }
  //   {
  //     title: "Zakazan pregled",
  //     start: "2019-12-11 14:00",
  //     end: "2019-12-11 14:59",
  //     up_down_ind: "Y"
  //   }
];


class PocetnaStranicaMedSestre extends React.Component {
  constructor(props) {
    super(props);
    console.log("ADMINISTRATOR KLINICKOG CENTRA");
    console.log(this.props);
    this.state = {
      uloga: props.uloga,
      email: props.email,
      token: props.token,
      redirectToListaPacijenata: false,
      redirectToProfilMedSestre: false,
      redirectToZahtevZaGodOdmor: false,
      redirectToOveraRecepata: false,
      redirectToPocetnaStranica: false,
      listaRadnihDana : [],
      listaOdmor : [],
      listaOdsustvo: []
      //vezano za kalendar
      
      
    };
    this.config = {
      headers: {
        Authorization: "Bearer " + this.state.token,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }
    this.handleListaPacijenata = this.handleListaPacijenata.bind(this);
    this.handleProfilMedSestre = this.handleProfilMedSestre.bind(this);
    this.handleZahtevZaGodOdmor = this.handleZahtevZaGodOdmor.bind(this);
    this.handleOveraRecepata = this.handleOveraRecepata.bind(this);
    this.ucitavanjeRadnihDana = this.ucitavanjeRadnihDana.bind(this);
    this.dodavanjeRadnihDanaUKalendar = this.dodavanjeRadnihDanaUKalendar.bind(this);
    this.prikaziRadneDane = this.prikaziRadneDane.bind(this);

    this.ucitavanjeListeOdmorOdsustvo = this.ucitavanjeListeOdmorOdsustvo.bind(this);

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
  ucitavanjeListeOdmorOdsustvo(){
    const url1 = 'http://localhost:8025/api/medicinskaSestra/listaOdmor';
    console.log(url1);
    axios
      .get(url1, this.config)
      .then(response => {
        console.log("ucitana lista odmor odsustvo");
        console.log(response);
        this.setState({
          listaOdmor: response.data
        }
       , 
       //()=> this.dodavanjeRadnihDanaUKalendar()
        );
      })
      .catch(error => {
        console.log("nije ucitana lista odmor odsustvo");
        console.log(error);
      });

    const url2 = 'http://localhost:8025/api/medicinskaSestra/listaOdsustvo';
    console.log(url2);
    axios
      .get(url2, this.config)
      .then(response => {
        console.log("ucitana lista odmor odsustvo");
        console.log(response);
        this.setState({
          listaOdsustvo: response.data
        }
       , 
       //()=> this.dodavanjeRadnihDanaUKalendar()
        );
      })
      .catch(error => {
        console.log("nije ucitana lista odmor odsustvo");
        console.log(error);
      });
  }
  ucitavanjeRadnihDana(){
    const url1 = 'http://localhost:8025/api/medicinskaSestra/listaRadnihDana/' + this.state.email; 

    console.log(url1, this.config);
    axios
      .get(url1)
      .then(response => {
        console.log("ucitana lista radnih dana");
        console.log(response);
        this.setState({
          listaRadnihDana: response.data
        }
       , ()=> this.dodavanjeRadnihDanaUKalendar()
        );
      })
      .catch(error => {
        console.log("nije ucitana lista radnih dana");
        console.log(error);
      });
  }
  dodavanjeRadnihDanaUKalendar(){
    
    let lista = this.state.listaRadnihDana;
    for (var i = 0; i < lista.length; i++) {
      
      let start = lista[i].datumPocetka;
      console.log(start);
      let datum= start.split('T')[0];
      let sat = start.split('T')[1].split(':')[0];
      let minut = start.split('T')[1].split(':')[1];
      let vreme = sat + ":" + minut;
      console.log(datum);
      console.log(vreme);
      start = datum + " " + vreme;
      console.log(start);
      
      let end = lista[i].datumKraja;
      let datumend= end.split('T')[0];
      let satend = end.split('T')[1].split(':')[0];
      let minutend = end.split('T')[1].split(':')[1];
      let vremeend = satend + ":" + minutend;
      end = datumend + " " + vremeend;
      console.log(end);

      listaPregleda.push({
        title: "radni dan",
        start: start,
        end: end,
        up_down_ind: "Y"
      });
      
     
    }
    
  }

  componentWillMount(){
    this.ucitavanjeListeOdmorOdsustvo()
  }

 
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
  
  dodajDogadjaj = e => {
    e.preventDefault();
    console.log("dodavanje dogadjaja");
    listaPregleda.push({
      title: "dogadjaj",
      start: "2019-12-09 14:00",
      end: "2019-12-09 14:59",
      up_down_ind: "Y"
    });
    
  };
  prikaziRadneDane = e => {
    e.preventDefault();
    console.log("dodavanje dogadjaja");
    
    this.ucitavanjeRadnihDana();
  }
  

  

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
                  // bigIcon={<i className="pe-7s-server text-warning" />}
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
                  // bigIcon={<i className="fa fa-twitter text-info" />}
                  // statsText=""
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
                  // bigIcon={<i className="pe-7s-graph1 text-danger" />}
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
                  // bigIcon={<i className="pe-7s-graph1 text-danger" />}
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
                    
                    {/* <Button onClick={this.prikaziRadneDane}>Radni dani</Button> */}
                    {/* <Button onClick={this.dodajDogadjaj}>Dodaj dogadjaj</Button> */}
                    <Calendar

                        localizer={localizer}
                        //events={events}
                        
                        events={listaPregleda}
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
