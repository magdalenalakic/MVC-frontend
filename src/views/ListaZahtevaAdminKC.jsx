import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col, Table } from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
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
import "klinickiCentar.css";
import UserCard from "components/UserCard/UserCard";
import slikaKC from "assets/img/klinickiCentar.jpg";
import Button from "components/CustomButton/CustomButton.jsx";
import axios from "axios";



class ListaZahtevaAdminKC extends Component {
  constructor(props) {
    super(props);
    console.log("ADMINISTRATOR KLINICKOG CENTRA");
    console.log(this.props);
    this.state = {
      uloga: props.uloga,
      email: props.email,
      selected: null,
      listaZahtevaZaRegistraciju: []
    };
    this.listaZahtevaZaRegistraciju = this.listaZahtevaZaRegistraciju.bind(this);

  }
  componentWillMount() {
    console.log("--------pocetak");

    const url1 = 'http://localhost:8025/api/administratoriKC/listaZahtevaZaRegistraciju/' + this.state.email; 

    console.log(url1);
    axios
      .get(url1)
      .then(response => {
        console.log("URL zahtevi za reg");
        console.log(response);
        this.setState({
          listaZahtevaZaRegistraciju: response.data
        });
      })
      .catch(error => {
        console.log("nije uspeo url1");
        console.log(error);
      });
    }

    handleChange = e => {
      e.preventDefault();
      //this.setState({ [e.target.name]: e.target.value });
      console.log(this.state);
      console.log("On click !!!");
    };
  odobrenClick = e => {
      
      e.preventDefault();
      console.log("ODOBRENO");
      this.setState({ [e.target.name]: e.target.value });
      console.log(this.state);
      console.log("On click !!!");
      // console.log(param.i)
     
      // this.setState({
      //   redirectToRegistration: true
      // });
      // axios
      // .post("http://localhost:8025/api/administratoriKC/potvrda", {

      //   // lbo: this.state.email,
      // })
      // .then(response => {
      //   console.log(response.data);
      //   // this.setState({
      //   //   uloga: response.data.uloga
      //   // });

      //   // this.setState({
      //   //   email: response.data.email
      //   // });

      //   // console.log(this.state.uloga);
      //   // this.setState({
      //   //   redirectToReferrer: true
      //   // });
      // })
      // .catch(error => {
      //   //   console.log(error.response);
      //   formErrors.log = "Pogresni kredencijali";
      //   // this.setState({ formErrors }, () => console.log(this.state));
      // });
  };

  listaZahtevaZaRegistraciju() {
    let res = [];
    let lista = this.state.listaZahtevaZaRegistraciju;
    
    for (var i = 0; i < lista.length; i++) {
     
      // this.setState({
      //   lboKlik : lista[i].lbo
      // });
      // console.log(this.state.lboKlik);
      res.push(
        <tr key = {i} >
          <td >{lista[i].id}</td>
          <td >{lista[i].lbo}</td>
          <td >{lista[i].ime}</td>
          <td >{lista[i].prezime}</td>
          <td >{lista[i].email}</td>
          <td >{lista[i].adresa}</td>
          <td >{lista[i].grad}</td>
          <td >{lista[i].drzava}</td>
          <td >{lista[i].telefon}</td>
          
          <td ><Button className="OdobrenZahtev"  onChange={this.handleChange}>Odobri</Button></td>
          <td ><Button className="OdbijenZahtev">Odbij</Button></td>
        </tr>
      );
    }
    return res;
  }

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col>
              <Row>
                <Card
                  title="Lista zahteva za registraciju od korisnika"
                  // category="Here is a subtitle for this table"
                  ctTableFullWidth
                  ctTableResponsive
                  content={
                    <Table striped hover >
                      <thead>
                        <tr>
                          <th id="IdPacijenta">Id</th>
                          <th id="LBOPacijenta">LBO</th>
                          <th id="ImePacijenta"> Ime</th>
                          <th id="PrezimePacijenta">Prezime</th>
                          <th id="EmailPacijenta">Email</th>
                          {/* <th id="LozinkaPacijenta">Lozinka</th> */}
                          <th id="AdresaPacijenta">Adresa</th>
                          <th id="GradPacijenta">Grad</th>
                          <th id="DrzavaPacijenta">Drzava</th>
                          <th id="TelefonPacijenta">Telefon</th>
                          {/* {thArray.map((prop, key) => {
                            return <th key={key}>{prop}</th>;
                          })} */}
                        </tr>
                      </thead>
                      <tbody>
                        {this.listaZahtevaZaRegistraciju()}
                        
                      </tbody>
                      
                    </Table>
                   }
                />
                
              
              </Row>
             
              
              
            </Col>
           
          
          </Row>

         
        </Grid>
      </div>
    );
  }
}

export default ListaZahtevaAdminKC;