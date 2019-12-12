
import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col, Table , NavItem, Nav, NavDropdown, MenuItem} from "react-bootstrap";

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
      lbo: "",
      klinikaID: "", 
      listaPacijenata:[],
      redirectToProfilPacijenta: false,
      emailPacijenta: "",
    };
    this.listaPacijenataLekara = this.listaPacijenataLekara.bind(this);
    this.sortMyArray = this.sortMyArray.bind(this);
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
        console.log("Preuzet lekar: //////////////////////////////////////////");
        console.log(Response.data);
        this.setState({
          email: Response.data.email,
          klinikaID: Response.data.klinikaID,
          ime: Response.data.ime,
          prezime: Response.data.prezime,
          telefon: Response.data.telefon
        });

        const url1 = 'http://localhost:8025/api/klinike/pacijentiKlinike/' + this.state.klinikaID; 
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
      })
      
      .catch(error => {
        console.log("Lekar  nije preuzet")
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

      res.push(
       
        <tr key = {i}>
          {/* <td key={lista[i].id}>{lista[i].id}</td>
          <td key={lista[i].naziv}>{lista[i].ime}</td>
          <td key={lista[i].adresa}>{lista[i].prezime}</td>
          <td key={lista[i].opis}>{lista[i].email}</td> */}
          <td key={lista[i].id}>{lista[i].id}</td>
          <td>{lista[i].ime}</td>
          <td>{lista[i].prezime}</td>
          <td>{lista[i].lbo}</td>
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
  sortMyArray(sortBy) {
    console.log("sort funkcija");
    console.log(sortBy);
    const lista = this.state.listaPacijenata;
    if (sortBy === "lbo") {
      console.log("lbo");
      this.setState({
        listaPacijenata: lista.sort((a, b) => a.lbo - b.lbo)
      });
    } else if (sortBy === "ime") {
      console.log("ime");
      this.setState({
        listaPacijenata: lista.sort((a, b) => a.ime.localeCompare(b.ime))
      });
    } else if (sortBy === "prezime") {
      console.log("prezime");
      this.setState({
        listaPacijenata: lista.sort((a, b) => a.prezime.localeCompare(b.prezime))
      });
    } else if (sortBy === "email") {
      console.log("email");

      this.setState({
        listaPacijenata: lista.sort((a, b) => a.email.localeCompare(b.email))
      });
    
    } else if (sortBy === "idOpadajuce") {
      console.log("idOpadajuce");

      this.setState({
        listaPacijenata: lista.sort((a, b) => b.id - a.id)
      });
    } else if (sortBy === "idRastuce") {
      console.log("idRastuce");

      this.setState({
        listaPacijenata: lista.sort((a, b) => a.id - b.id)
      });
    }
    
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
    const lbo = this.state.lbo;
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
            <Col lg={3} sm={6} >
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
            <Col md={6}>
              <Card
                title="Lista pacijenata"
                // category="24 Hours performance"
                // stats="Updated 3 minutes ago"
                content={
                  <form
                  onSubmit={this.handleSumbit}
                  className="formaIzmenaProfilaPacijent"
                  >
                  <NavDropdown
                    onSelect={e => {
                      this.sortMyArray(e);
                    }}
                    className="SortListePacijenata"
                    title="Sortiraj"
                    id="nav-item dropdown"
                    
                  >
                    <MenuItem eventKey={"idRastuce"}>Id (rastuce)</MenuItem>
                    <MenuItem eventKey={"idOpadajuce"}>Id (opadajuce)</MenuItem>
                    <MenuItem eventKey={"lbo"}>LBO</MenuItem>
                    <MenuItem eventKey={"ime"}>Ime</MenuItem>
                    <MenuItem eventKey={"prezime"}>Prezime</MenuItem>
                    <MenuItem eventKey={"email"}>Email</MenuItem>
  
                  </NavDropdown>
             <Card 
                ctTableFullWidth
                ctTableResponsive
                 content={
                  <Table striped hover style={{ wiidth: 1000 }}>
                  <thead>
                    <tr>
                      {/*                             
                      {listaKlinika.map((prop, key) => {
                        return <th key={key}>{prop}</th>;
                      })} */}
                      <th id="Id">Id</th>
                      <th id="Ime">Ime</th>
                      <th id="Prezime"> Prezime</th>
                      <th id="Lbo"> Lbo</th>
                      <th id="Email">Email</th>
                  
                    </tr>
                   
                  </thead>
                  <tbody>
                      {this.listaPacijenataLekara()}
                    
                  </tbody>
                </Table>
                 }
           
                />
                </form>
              }
             />
                
          </Col>
          <Col md={6} >
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
          <Row>
           
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
