
import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col, Table } from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { Tasks } from "components/Tasks/Tasks.jsx";
import ProfilPacijenta from "views/ProfilPacijenta.jsx"
import Button from "components/CustomButton/CustomButton.jsx";
import Dialog from 'react-bootstrap-dialog';


import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
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
import { render } from "react-dom";
import events from "events.js";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css"; 

import moment from 'moment';
 

const localizer = momentLocalizer(moment);
class PocetnaStranicaLekara extends React.Component {
  constructor(props){
    super(props);
    console.log("POCETNA STRANICA LEKARA");
    console.log(props);
    this.state = {
      email: props.email,
      uloga: props.uloga, 
      ime: "",
      telefon: "",
      prezime: "",
      listaPacijenata:[],
      redirectToProfilPacijenta: false,
      emailPacijenta: "",
    };
    this.listaPacijenataLekara = this.listaPacijenataLekara.bind(this);
  }

  handleClick = e => {
    e.preventDefault();
    console.log("CLICK *** ");  
    console.log("PPPPPPPPPPPP: " + e.target.id);
    // this.props.onClick(this.props.value);
    // console.log(e.lista.email);
    console.log("prikaz profila pacijenta");
    this.setState({
      redirectToProfilPacijenta: true,
      emailPacijenta: e.target.id,
  
    });
    console.log("----------------------------------------------------");
    console.log(this.state.emailPacijenta);
  };

  componentWillMount(){
    console.log("wmount")
    const url = 'http://localhost:8025/api/lekari/getLekarByEmail/' + this.state.email;
    // console.log('Email: ' + this.state.email);
    // console.log('url: ' + url);
    axios.get(url)
      .then(Response => {
        console.log("Preuzet lekar: ");
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
          telefon: Response.data.telefon
        });
      })
      
      .catch(error => {
        console.log("Lekar  nije preuzet")
      })

      console.log("------***********--pocetak");
      const url1 = 'http://localhost:8025/api/lekari/listaPacijenataLekara/' + this.state.email; 
      console.log(url1);
      axios.get(url1)
        .then(response => {
          console.log("URL 111");
          console.log(response);
          this.setState({
            listaPacijenata: response.data
          });
        })
        .catch(error => {
            console.log("nije uspeo url1");
            console.log(error);
        })

  }


  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }


  listaPacijenataLekara(){
    let res=[];
    let lista = this.state.listaPacijenata;
    for(var i=0; i< lista.length;i++){
      console.log( "Pacijent : "  + lista[i].email);
     // this.state.emailPacijenta = lista[i].email;
      console.log(this.state.emailPacijenta);
      res.push(
       
        <tr key = {i}>
          {/* <td key={lista[i].id}>{lista[i].id}</td>
          <td key={lista[i].naziv}>{lista[i].ime}</td>
          <td key={lista[i].adresa}>{lista[i].prezime}</td>
          <td key={lista[i].opis}>{lista[i].email}</td> */}
          <td key={lista[i].id}>{lista[i].id}</td>
          <td>{lista[i].ime}</td>
          <td>{lista[i].prezime}</td>
          <td key={lista[i].email}>{lista[i].email}</td>
          <td ><Button className="OdobrenZahtev"
              id={lista[i].email}
              onClick={e => this.handleClick(e)}> Prikazi profil </Button></td>
          {/* <td><link to="/admin/login">Prikazi profil</link></td> */}
         {/* <td key={lista[i].ocena}>{lista[i].ocena}</td> */}
     
         </tr>
      )
    }
    return res;
  }

  render() {
    // console.log("Ispisi  props u pocetna stranica lekara: "); 
    // console.log(this.props);
    const emailPacijenta = this.state.emailPacijenta;
    const redirectToProfilPacijenta = this.state.redirectToProfilPacijenta;
    const email = this.state.email;
    const uloga = this.state.uloga;
    const ime = this.state.ime;
    const prezime = this.state.prezime;
    const telefon = this.state.telefon;
    // console.log("Render ps email: " + email);
    // console.log("Render ps uloga: " + uloga);
    // console.log("Render ps ime: " + ime);
    // console.log("Render ps prezime: " + prezime);
    // console.log("Render ps telefon: " + telefon)
    if (redirectToProfilPacijenta === true) {
      return (
        <BrowserRouter>
          <Switch>
            <Route
              path="/profilPacijenta"
              render={props => <ProfilPacijenta {...props} emailPacijenta={emailPacijenta} />}
            />
            <Redirect from="/" to="/profilPacijenta" />
          </Switch>
        </BrowserRouter>
      );
    }

    
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-server text-warning" />}
                // statsText="Lista pacijenata"
                // statsValue="105GB"
                // statsIcon={<i className="fa fa-refresh" />}
                 statsIconText="Kalendar"
                
                //  <BigCalendar
                //    events={events}
                //    views={["month"]}
                //    defaultDate={new Date(2018, 3, 1)}
                //  />
             
              />
            </Col>
            {/* <h1>{this.state}</h1> */}
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-wallet text-success" />}
                // statsText="Pocetak pregleda"
                // statsValue="$1,345"
                // statsIcon={<i className="fa fa-calendar-o" />}
                 statsIconText="Pocetak pregleda"
              />
            </Col>
            {/* <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-graph1 text-danger" />}
                // statsText="Profil korisnika"
                // statsValue="23"
                // statsIcon={<i className="fa fa-clock-o" />}
                 statsIconText="Profil korisnika"
              />
            </Col> */}
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-graph1 text-danger" />}
                // statsText="Profil korisnika"
                // statsValue="23"
                // statsIcon={<i className="fa fa-clock-o" />}
                 statsIconText="Zahtev za odmor/odsustvo"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="fa fa-twitter text-info" />}
                statsText=""
                // statsValue="+45"
                // statsIcon={<i className="fa fa-refresh" />}
                 statsIconText="Zakazivanje pregleda i operacija"
              />
            </Col>
          </Row>
          <Row>
            <Col md={18}>
              <Card
              
                title="Lista pacijenata"
                // category="24 Hours performance"
                // stats="Updated 3 minutes ago"
                ctTableFullWidth
                ctTableResponsive
                 content={
                  <Table striped hover>
                  <thead>
                    <tr>
                      {/*                             
                      {listaKlinika.map((prop, key) => {
                        return <th key={key}>{prop}</th>;
                      })} */}
                      <th id="Id">Id</th>
                      <th id="Ime">Ime</th>
                      <th id="Prezime"> Prezime</th>
                      <th id="Email">Email</th>
                  
                    </tr>
                   
                  </thead>
                  <tbody>
                      {this.listaPacijenataLekara()}
                    
                  </tbody>
                </Table>
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
                        <label className="adresaKC"> {this.state.ime} </label>
                      </h2>
                    </div>
                    <div className="typo-line">
                      <h2>
                        <p className="category">Prezime:</p>
                        <label className="adresaKC">{this.state.prezime} </label>
                      </h2>
                    </div>
                    <div className="typo-line">
                      <h2>
                        <p className="category">Telefon:</p>
                <label className="adresaKC">{this.state.telefon}</label>
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
            </Col> */}
          </Row>
          <Row>
            <Col md={14} >
              <Card
                title=""
                // category="24 Hours performance"
                // stats="Updated 3 minutes ago"
                content={
              
                     <div style={{ height: 500 }}  className="ct-chart">
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
            </Row>
{/* 
          <Row>
            <Col md={6}>
              <Card
                id="chartActivity"
                title="2014 Sales"
                category="All products including Taxes"
                stats="Data information certified"
                statsIcon="fa fa-check"
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={dataBar}
                      type="Bar"
                      options={optionsBar}
                      responsiveOptions={responsiveBar}
                    />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendBar)}</div>
                }
              />
            </Col>

            <Col md={6}>
              <Card
                title="Tasks"
                category="Backend development"
                stats="Updated 3 minutes ago"
                statsIcon="fa fa-history"
                content={
                  <div className="table-full-width">
                    <table className="table">
                      <Tasks />
                    </table>
                  </div>
                }
              />
            </Col>
          </Row> */}
        </Grid>
      </div>
    );
  }
}

export default PocetnaStranicaLekara;
