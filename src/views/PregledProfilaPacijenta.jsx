
import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { Tasks } from "components/Tasks/Tasks.jsx";
import axios from "axios";
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
import slikaPacijent from "assets/img/pacijentImage.jpg";
import Login from "login.js";

class PregledProfilaPacijenta extends React.Component {
  constructor(props) {
    console.log("PROFIL PACIJENTA")
    super(props);
    console.log(this.props);
    console.log(props.emailPacijenta);
    this.state = {
        uloga: props.uloga,
        token: props.token,
        email: props.email,
        emailPacijenta: props.emailPacijenta,
      ime: "",
      prezime: "",
      adresa: "",
      grad: "",
      drzava: "",
      telefon: "",
      brojOsiguranika: "",
      lozinka: "",
      listaPregleda: []
    };
    console.log("MEJL : " + this.state.emailPacijenta);
  }

  componentWillMount() {
    console.log("treba get zahtev da se iskuca");
    const emailPacijenta = this.state.emailPacijenta;
    console.log(emailPacijenta);

    axios
    .get("http://localhost:8025/api/pacijenti/findPacijentEmailMS",
        {email: this.state.emailPacijenta}, this.config)

      .then(Response => {
        console.log("Ucitavanje pacijenta");
        console.log(Response);
        this.setState({
            emailPacijenta: Response.data.email,
          ime: Response.data.ime,
          prezime: Response.data.prezime,
          telefon: Response.data.telefon,
          adresa: Response.data.adresa,
          grad: Response.data.grad,
          drzava: Response.data.drzava,
          lbo: Response.data.lbo
        });
        //ucitavanje zakazanih pregleda 
        axios
        .get("http://localhost:8025/api/pregledi/pregledPacijenta",{email: this.state.emailPacijenta}, this.config)
        .then(odgovor=> {
            console.log("Ucitavanje pregleda");
            console.log(odgovor.data);
            this.setState({
                listaPregleda: odgovor.data
            })

        })
        .catch(error => {
            console.log("nije uspelo ucitavanje pregleda pacijenta");
            console.log(error);
        });
        
        console.log(this.state);
      })
      .catch(error => {
        console.log("nije uspeo url1");
        console.log(error);
      });
  }

 
 
  render() {
    
    const ime = this.state.ime;
    const prezime = this.state.prezime;
    const telefon = this.state.telefon;
    
    console.log(this.props);
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
                statsIconText="Zahtev za pregled"
              />
            </Col>
         
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-wallet text-success" />}
                // statsText="Pocetak pregleda"
                // statsValue="$1,345"
                // statsIcon={<i className="fa fa-calendar-o" />}
                statsIconText="Pregled zdravstvenog kartona"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-graph1 text-danger" />}
                // statsText="Profil korisnika"
                // statsValue="23"
                // statsIcon={<i className="fa fa-clock-o" />}
                statsIconText="Istorija pregleda/operacija"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-graph1 text-danger" />}
                // statsText="Profil korisnika"
                // statsValue="23"
                // statsIcon={<i className="fa fa-clock-o" />}
                statsIconText="Brzo zakazivanje pregleda"
              />
            </Col>
            
          </Row>
          <Row>
            <Col md={8}>
              <Card
                title="Zdravstveni karton"
                // category="24 Hours performance"
                // stats="Updated 3 minutes ago"
                content={
                  <div className="ct-chart">
                    {/* <ChartistGraph
                      data={dataSales}
                      type="Line"
                      options={optionsSales}
                      responsiveOptions={responsiveSales}
                    /> */}
                    <p></p>
                  </div>
                }
               
              />
            </Col>

            <Col md={4}>
              <Card
                // statsIcon="fa fa-clock-o"
                title="O pacijentu"
                // category="Ime"
                content={
                  <div id="a">
                    <div className="slikaKCdiv">
                      <h2>
                        <img
                          className="slikaPacijent"
                          src={slikaPacijent}
                        ></img>
                      </h2>
                    </div>
                    <div className="typo-line">
                      <h2>
                        <p className="category">Ime:</p>
                        <label className="adresaKC">{ime}</label>
                      </h2>
                    </div>
                    <div className="typo-line">
                      <h2>
                        <p className="category">Prezime:</p>
                        <label className="adresaKC">{prezime}</label>
                      </h2>
                    </div>

                    <div className="typo-line">
                      <h2>
                        <p className="category">Telefon:</p>
                        <label className="telefon">{telefon}</label>
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

export default PregledProfilaPacijenta;
