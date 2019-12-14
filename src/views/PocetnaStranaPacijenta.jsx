import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { Tasks } from "components/Tasks/Tasks.jsx";
import axios from "axios";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import routes from "routesPacijent.js";
import AdministatorKlinike from "views/AdministatorKlinike.jsx";
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
import slikaZakaziPregled from "assets/img/zakaziPregled.jpg";
import Login from "login.js";
import ListaKlinika from "./ListaKlinika";


class PocetnaStranaPacijenta extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    console.log(props.email);
    this.state = {
      email: props.email,
      uloga: props.uloga,
      ime: "",
      prezime: "",
      adresa: "",
      grad: "",
      drzava: "",
      telefon: "",
      brojOsiguranika: "",
      lozinka: "",
      redirectToZahtevZaPregled: false,
      redirectZdravstveniKarton: false,
      redirectIstorijaPO: false,
      redirectBrzoZakazivanje: false
    };
    this.handleZahtevZaPregled = this.handleZahtevZaPregled.bind(this);
    this.handleZdravstveniKarton = this.handleZdravstveniKarton.bind(this);
    this.handleIstorijaPO = this.handleIstorijaPO.bind(this);
    this.handleBrzoZakazivanje = this.handleBrzoZakazivanje.bind(this);
    console.log(this.state.email);
  }
  componentWillMount() {
    console.log("treba get zahtev da se iskuca");
    const email = this.state.email;
    console.log(email);

    axios
      .get("http://localhost:8025/api/pacijenti/findPacijentEmail/" + email)

      .then(Response => {
        console.log("URL 111");
        console.log(Response);
        this.setState({
          email: Response.data.email,
          ime: Response.data.ime,
          prezime: Response.data.prezime,
          telefon: Response.data.telefon,
          adresa: Response.data.adresa,
          grad: Response.data.grad,
          drzava: Response.data.drzava,
          lbo: Response.data.lbo
        });
        console.log(this.state);
      })
      .catch(error => {
        console.log("nije uspeo url1");
        console.log(error);
      });
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
  handleZahtevZaPregled() {
    this.setState({
      redirectToZahtevZaPregled: true
    });
  }
  handleZdravstveniKarton() {
    this.setState({
      redirectZdravstveniKarton: true
    });
  }
  handleIstorijaPO() {
    this.setState({
      redirectIstorijaPO: true
    });
  }
  handleBrzoZakazivanje() {
    this.setState({
      redirectBrzoZakazivanje: true
    });
  }

  renderRedirect = () => {
    if (this.state.redirectToZahtevZaPregled == true) {
      return <Redirect from="/" to="/admin/klinike" />;
    } else if (this.state.redirectBrzoZakazivanje == true) {
      // return <Redirect from="/" to="/admin/klinike" />;
    } else if (this.state.redirectIstorijaPO == true) {
      // return <Redirect from="/" to="/admin/klinike" />;
    } else if (this.state.redirectZdravstveniKarton == true) {
      return <Redirect from="/" to="/admin/zdravstveniKarton" />;
    }
  };

  render() {
    const email = this.state.email;
    const uloga = this.state.uloga;
    const ime = this.state.ime;
    const prezime = this.state.prezime;
    const telefon = this.state.telefon;
    const adresa = this.state.adresa;
    const grad = this.state.grad;
    const drzava = this.state.drzava;
    const lbo = this.state.lbo;
    console.log(this.props);
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col lg={3} sm={6}>
              {this.renderRedirect()}
              <div onClick={this.handleZahtevZaPregled}>
                <StatsCard
                  bigIcon={
                    <img
                      className="slikaPacijent"
                      src={slikaZakaziPregled}
                      width="30"
                      height="30"
                    ></img>
                  }
                  // statsText="Lista pacijenata"
                  // statsValue="105GB"
                  // statsIcon={<i className="fa fa-refresh" />}

                  statsIconText="Zahtev za pregled"
                />
              </div>
            </Col>
            {/* <h1>{this.state}</h1> */}
            <Col lg={3} sm={6}>
              {this.renderRedirect()}
              <div onClick={this.handleZdravstveniKarton}>
                <StatsCard
                  bigIcon={<i className="pe-4s-wallet text-success" />}
                  // statsText="Pocetak pregleda"
                  // statsValue="$1,345"
                  statsIcon={<i className="fa fa-calendar-o" />}
                  statsIconText="Pregled zdravstvenog kartona"
                />
              </div>
            </Col>
            <Col lg={3} sm={6}>
              {this.renderRedirect()}
              <div onClick={this.handleIstorijaPO}>
                <StatsCard
                  bigIcon={<i className="pe-7s-graph1 text-danger" />}
                  // statsText="Profil korisnika"
                  // statsValue="23"
                  // statsIcon={<i className="fa fa-clock-o" />}
                  statsIconText="Istorija pregleda/operacija"
                />
              </div>
            </Col>
            <Col lg={3} sm={6}>
              {this.renderRedirect()}
              <div onClick={this.handleBrzoZakazivanje}>
                <StatsCard
                  bigIcon={<i className="pe-7s-wallet text-success" />}
                  // statsText="Profil korisnika"
                  // statsValue="23"
                  // statsIcon={<i className="fa fa-clock-o" />}
                  statsIconText="Brzo zakazivanje pregleda"
                />
              </div>
            </Col>
            {/* <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="fa fa-twitter text-info" />}
                statsText=""
                // statsValue="+45"
                // statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Vidi klinike"
              />
            </Col> */}
          </Row>
          <Row>
            <Col md={8}>
              <Card
                title=""
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
                // legend={
                //   <div className="legend">{this.createLegend(legendSales)}</div>
                // }
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

export default PocetnaStranaPacijenta;
