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
import ChartistGraph from "react-chartist";
import { Grid, Row, Col, Table } from "react-bootstrap";

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

class PocetnaStranicaLekara extends React.Component {
  constructor(props){
    super(props);
    console.log("POCETNA STRANICA LEKARA");
    this.state = {
      email: props.email,
      uloga: props.uloga, 
      ime: "",
      telefon: "",
      prezime: "",
      listaPacijenata:[],
    };
    this.listaPacijenataLekara = this.listaPacijenataLekara.bind(this);
  }
  // componentDidMount(){
  //   fetch().
  //   then((Response)=>Response.json()).
  //   then((findresponse)=>{
  //     console.log(findresponse)

  //   })
  // // }
  // componentDidMount() {
  //   console.log("in mount component $$$$$$$$$$$$$$$$$$$$$");
  //   console.log(this.state);
  // }


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
      res.push(
        <tr key = {i}>
          {/* <td key={lista[i].id}>{lista[i].id}</td>
          <td key={lista[i].naziv}>{lista[i].ime}</td>
          <td key={lista[i].adresa}>{lista[i].prezime}</td>
          <td key={lista[i].opis}>{lista[i].email}</td> */}
          <td key={lista[i].id}>{lista[i].id}</td>
          <td>{lista[i].ime}</td>
          <td>{lista[i].prezime}</td>
          <td >{lista[i].email}</td>
          <td><a href="#">Prikazi profil</a></td>
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
            <Col md={8}>
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
                      <th id="profilPacijenta"> # </th>
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
