import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import "klinickiCentar.css";
import axios from "axios";

class Sifrarnik extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      uloga: props.uloga,
      email: props.email,
      listaLekova:[],
      listaDijagnoza:[]
      
     
    };
    this.listaLekovaUKC = this.listaLekovaUKC.bind(this);
    this.listaDijagnozaUKC = this.listaDijagnozaUKC.bind(this);
    
    console.log(this.state.uloga);
    console.log(this.state.email);

  }

  listaLekovaUKC(){
    let res=[];
    let lista = this.state.listaLekova;
    for(var i=0; i< lista.length;i++){
      res.push(
        <tr key = {i}>
          <td key={lista[i].id}>{lista[i].id}</td>
          <td key={lista[i].naziv}>{lista[i].naziv}</td>
          <td key={lista[i].sifra}>{lista[i].sifra}</td>
        </tr>
      )
    }
    return res;
  }
  listaDijagnozaUKC(){
    let res=[];
    let lista = this.state.listaDijagnoza;
    for(var i=0; i< lista.length;i++){
      res.push(
        <tr key = {i}>
          <td key={lista[i].id}>{lista[i].id}</td>
          <td key={lista[i].naziv}>{lista[i].naziv}</td>
          <td key={lista[i].opis}>{lista[i].opis}</td>
        </tr>
      )
    }
    return res;
  }
  
  componentWillMount(){
    console.log("--------pocetak");
    const url1 = 'http://localhost:8028/api/administratoriKC/listaLekova/' + this.state.email; 
    console.log(url1);
    axios.get(url1)
      .then(response => {
        console.log("URL Lek");
        console.log(response);
        this.setState({
          listaLekova: response.data
        });
      })
      .catch(error => {
          console.log("nije uspeo url lekova");
          console.log(error);
      })
  console.log("--------pocetak");
  const url2 = 'http://localhost:8028/api/administratoriKC/listaDijagnoza/' + this.state.email; 
  console.log(url2);
  axios.get(url2)
      .then(response => {
        console.log("URL Dijagnoza");
        console.log(response);
        this.setState({
          listaDijagnoza: response.data
        });
      })
      .catch(error => {
          console.log("nije uspeo url dijagnoza");
          console.log(error);
      })
  }

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
               <Card
                  title="Lista lekova"
                  // category="Here is a subtitle for this table"
                  ctTableFullWidth
                  ctTableResponsive
                  content={
                    <Table striped hover>
                      <thead>
                        <tr>
                          <th id="IdLeka">Id</th>
                          <th id="NazivLeka">Naziv</th>
                          <th id="SifraLeka">Sifra</th>
                          {/* {thArray.map((prop, key) => {
                            return <th key={key}>{prop}</th>;
                          })} */}
                        </tr>
                      </thead>
                      <tbody>
                        {this.listaLekovaUKC()}
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
                  title="Lista dijagnoza"
                  // category="Here is a subtitle for this table"
                  ctTableFullWidth
                  ctTableResponsive
                  content={
                    <Table striped hover>
                      <thead>
                        <tr>
                          <th id="Idijagnoze">Id</th>
                          <th id="NazivDijagnoze">Naziv</th>
                          <th id="OpisDijagnoze">Opis</th>
                          {/* {thArray.map((prop, key) => {
                            return <th key={key}>{prop}</th>;
                          })} */}
                        </tr>
                      </thead>
                      <tbody>
                       {this.listaDijagnozaUKC()}
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

         
        </Grid>
      </div>
    );
  }
}

export default Sifrarnik;