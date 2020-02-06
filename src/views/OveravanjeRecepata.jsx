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


class OveravanjeRecepata extends Component {
  constructor(props) {
    super(props);
    console.log("MEDICINSKA SESTRA");
    console.log(this.props);
    this.state = {
      uloga: props.uloga,
      token: props.token,
      email: props.email,
      selected: null,
      recepti: []
    };
    this.config = {
      headers: {
        Authorization: "Bearer " + this.state.token,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }
    this.listaRecepata = this.listaRecepata.bind(this);
    this.overaRecepta = this.overaRecepta.bind(this);
    this.ucitavanjeListeRecepata =this.ucitavanjeListeRecepata.bind(this);
  };

  ucitavanjeListeRecepata(){
    const url1 = 'http://localhost:8025/api/medicinskaSestra/listaRecepata'; 
    axios
      .get(url1, this.config)
      .then(response => {
        console.log("PREUZETA LISTA RECEPATA");
        console.log(response.data);
        this.setState({
          recepti: response.data
        });
      })
      .catch(error => {
        console.log("nije preuzeta lista recepata");
        console.log(error);
      });
  }

  componentWillMount() {
    console.log("--------pocetak");
    this.ucitavanjeListeRecepata();
    
    };

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

  listaRecepata(){
    let res = [];
    let lista = this.state.recepti;
    
    for (var i = 0; i < lista.length; i++) {
     
      res.push(
        <tr key = {i} >
          <td >{lista[i].nazivLeka}</td>
          <td >{lista[i].datumIzvestaja}</td>
          <td >{lista[i].imeL}</td>
          <td >{lista[i].prezimeL}</td>

          <td ><Button className="OdobrenZahtev"  
          id={lista[i].id}
          onClick={e=> this.overaRecepta(e)}
          >Overi</Button></td>
          
        </tr>
      );
    }
    return res;
  };

  overaRecepta= e => {
    console.log("OVERA RECEPTA; " + e.target.id)
   
    const url1 = 'http://localhost:8025/api/medicinskaSestra/overa/' + e.target.value; 
    axios
      .put(url1, this.config)
      .then(response => {
        console.log("PREUZETA LISTA RECEPATA");
        console.log(response.data);
        this.ucitavanjeListeRecepata();
      })
      .catch(error => {
        console.log("nije preuzeta lista recepata");
        console.log(error);
      });
  }

  render() {
    return (
      <div className="content">
        <Grid fluid>
          
              <Row >
                <Card
                  title="Lista pristiglih recepata od pacijenata"
                  // category="Here is a subtitle for this table"
                  ctTableFullWidth
                  ctTableResponsive
                  content={
                    <Table striped hover >
                      <thead>
                        <tr>
                        
                          <th id="IdPacijenta">Naziv leka</th>
                          <th id="LBOPacijenta">Datum</th> 
                          <th id="ImePacijenta"> Ime lekara</th>
                          <th id="PrezimePacijenta">Prezime lekara</th>
                         
                        </tr>
                      </thead>
                      <tbody>
                        {this.listaRecepata()}
                        
                      </tbody>
                      
                    </Table>
                   }
                />
                
              
              </Row>
             

         
        </Grid>
      </div>
    );
  }

}

export default OveravanjeRecepata;