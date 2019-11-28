import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col, Table } from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
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
import "klinickiCentar.css";
import UserCard from "components/UserCard/UserCard";
import slikaKC from "assets/img/klinickiCentar.jpg";

class KlinickiCentarPocetna extends Component {
  constructor(props) {
    super(props);
    console.log("ADMINISTRATOR KLINICKOG CENTRA");
    console.log(this.props);
    this.state = {
      uloga: props.uloga,
      email: props.email,
      listaKlinika: [],
      listaAdministratoraKlinika: [],
      listaAdministratoraKC: [],
      kCentar: []
    };
    this.listaKlinikaUKC = this.listaKlinikaUKC.bind(this);
    this.listaAdminaKlinikaUKC = this.listaAdminaKlinikaUKC.bind(this);
    this.listaAdminaUKC = this.listaAdminaUKC.bind(this);

    console.log(this.state.uloga);
    console.log(this.state.email);
  }

  componentWillMount() {
    console.log("--------pocetak");

    const url1 = 'http://localhost:8025/api/administratoriKC/listaKlinika/' + this.state.email; 

    console.log(url1);
    axios
      .get(url1)
      .then(response => {
        console.log("URL 111");
        console.log(response);
        this.setState({
          listaKlinika: response.data
        });
      })
      .catch(error => {
        console.log("nije uspeo url1");
        console.log(error);
      });


      console.log("--------pocetak2");
      const url2 = 'http://localhost:8025/api/administratoriKC/listaAdministratoraKlinika/' + this.state.email; 
      console.log(url2);
      axios.get(url2)
        .then(response => {
          console.log("url 22222");
          console.log(response);
          this.setState({
            listaAdministratoraKlinika: response.data
          });
        })
        .catch(error => {
            console.log("nije uspeo url2");
            console.log(error);
        })
    console.log("--------pocetak3");
    const url3 = 'http://localhost:8025/api/administratoriKC/svi'; 

    console.log(url3);
    axios
      .get(url3)
      .then(response => {
        console.log("URL 333");
        console.log(response);
        this.setState({
          listaAdministratoraKC: response.data
        });
      })
      .catch(error => {

          console.log("nije uspeo url3");
          console.log(error);
      })
  console.log("--------pocetak4");
  const url4 = 'http://localhost:8025/api/administratoriKC/klinickiCentar/' + this.state.email; 
  console.log(url4);
    axios.get(url4)

      .then(response => {
        console.log("url 44444");
        console.log(response);
        this.setState({
          kCentar: response.data
        });
      })
      .catch(error => {
        console.log("nije uspeo url4");
        console.log(error);
      });
  }

  listaKlinikaUKC() {
    let res = [];
    let lista = this.state.listaKlinika;
    for (var i = 0; i < lista.length; i++) {
      res.push(
        <tr key={i}>
          <td key={lista[i].id}>{lista[i].id}</td>
          <td key={lista[i].naziv}>{lista[i].naziv}</td>
          <td key={lista[i].adresa}>{lista[i].adresa}</td>
          <td key={lista[i].opis}>{lista[i].opis}</td>
          <td key={lista[i].ocena}>{lista[i].ocena}</td>
        </tr>
      );
    }
    return res;
  }
  listaAdminaKlinikaUKC() {
    let res = [];
    let lista = this.state.listaAdministratoraKlinika;
    for (var i = 0; i < lista.length; i++) {
      res.push(
        <tr key={i}>
          <td key={lista[i].id}>{lista[i].id}</td>
          <td key={lista[i].ime}>{lista[i].ime}</td>
          <td key={lista[i].prezime}>{lista[i].prezime}</td>
          <td key={lista[i].email}>{lista[i].email}</td>
        </tr>
      );
    }
    return res;
  }
  listaAdminaUKC() {
    let res = [];
    let lista = this.state.listaAdministratoraKC;
    for (var i = 0; i < lista.length; i++) {
      res.push(
        <tr key={i}>
          <td key={lista[i].id}>{lista[i].id}</td>
          <td key={lista[i].ime}>{lista[i].ime}</td>
          <td key="C">{lista[i].prezime}</td>
          <td key={lista[i].email}>{lista[i].email}</td>
        </tr>
      );
    }
    return res;
  }

  render() {
    const kc = this.state.kCentar;

    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={8}>
              <Row>
                <Card
                  title="Lista klinika"
                  // category="Here is a subtitle for this table"
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
                          <th id="Naziv">Naziv</th>
                          <th id="Adresa"> Adresa</th>
                          <th id="Opis">Opis</th>
                          <th id="Ocena">Ocena</th>
                        </tr>
                      </thead>
                      <tbody>{this.listaKlinikaUKC()}</tbody>
                    </Table>
                  }
                />
              </Row>
              <Row>
                <Card
                  title="Lista administratora klinickog centra"
                  // category="Here is a subtitle for this table"
                  ctTableFullWidth
                  ctTableResponsive
                  content={
                    <Table striped hover>
                      <thead>
                        <tr>
                          <th id="IdAdminaKC">Id</th>
                          <th id="ImeAdminaKC">Ime</th>
                          <th id="PrezimeAdminaKC"> Prezime</th>
                          <th id="EmailAdminaKC">Email</th>
                          {/* {thArray.map((prop, key) => {
                              return <th key={key}>{prop}</th>;
                            })} */}
                        </tr>
                      </thead>
                      <tbody>
                        {this.listaAdminaUKC()}
                        {/* {tdArray.map((prop, key) => {
                            return (
                              <tr key={key}>
                                {prop.map((prop, key) => {
                                  return <td key={key}>{prop}</td>;
                                })}
                              </tr>
                            );
                          })} */}
                      </tbody>
                    </Table>
                  }
                />
              </Row>
              <Row>
                <Card
                  title="Lista administratora klinika"
                  // category="Here is a subtitle for this table"
                  ctTableFullWidth
                  ctTableResponsive
                  content={
                    <Table striped hover>
                      <thead>
                        <tr>
                          <th id="IdAdminaKlinike">Id</th>
                          <th id="ImeAdminaKlinike">Ime</th>
                          <th id="PrezimeAdminaKlinike"> Prezime</th>
                          <th id="EmailAdminaKlinike">Email</th>
                          {/* {thArray.map((prop, key) => {
                                return <th key={key}>{prop}</th>;
                              })} */}
                        </tr>
                      </thead>
                      <tbody>
                        {this.listaAdminaKlinikaUKC()}
                        {/* {tdArray.map((prop, key) => {
                              return (
                                <tr key={key}>
                                  {prop.map((prop, key) => {
                                    return <td key={key}>{prop}</td>;
                                  })}
                                </tr>
                              );
                            })} */}
                      </tbody>
                    </Table>
                  }
                />
              </Row>
            </Col>
            <Col md={4}>
              <Card
                // statsIcon="fa fa-clock-o"
                title="O klinickom centru"
                category={kc.naziv}
                content={
                  <div id="opisKlinickogCentra">
                    <div className="slikaKCdiv">
                      <h2>
                        <img className="slikaKC" src={slikaKC}></img>
                      </h2>
                    </div>

                    <div className="typo-line">
                      <h2>
                        <p className="category">Adresa</p>
                        <label className="adresaKC">{kc.adresa}</label>
                      </h2>
                    </div>
                    <div className="typo-line">
                      <h2>
                        <p className="category">Opis</p>
                        <label className="opisKC">{kc.opis}</label>
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

          {/* <Row>
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

export default KlinickiCentarPocetna;
