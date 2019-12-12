import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col, Table, NavItem, Nav, NavDropdown, MenuItem } from "react-bootstrap";

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
import Dialog from 'react-bootstrap-dialog';


class ListaPacijenataMedSestra extends Component {
  constructor(props) {
    super(props);
    console.log("MEDICINSKA SESTRA");
    console.log(this.props);
    this.state = {
      uloga: props.uloga,
      email: props.email,
      selected: null,
      listaPacijenata: [],
      adresaP: "",
      drzavaP: "",
      emailP: "",
      gradP: "",
      idP: "",
      imeP: "",
      lboP: "",
      lozinkaP: "",
      prezimeP: "",
      telefonP:"",
    };
    this.listaPacijenata = this.listaPacijenata.bind(this);
    this.handlePrikazProfila = this.handlePrikazProfila.bind(this);
    this.sortMyArray = this.sortMyArray.bind(this);
  };
  componentWillMount() {
    console.log("--------pocetak");

    const url1 = 'http://localhost:8025/api/medicinskaSestra/listaPacijenata/' + this.state.email; 

    console.log(url1);
    axios
      .get(url1)
      .then(response => {
        console.log("URL lista pacijenata");
        console.log(response);
        this.setState({
          listaPacijenata: response.data
        });
      })
      .catch(error => {
        console.log("nije uspelo ucitavanje liste pacijenata");
        console.log(error);
      });
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

  handlePrikazProfila = e => {
    e.preventDefault();
    console.log("CLICK  **** otvori mi dijalog na klik ");  
    console.log( e.target.id);
    const url2 = "http://localhost:8025/api/pacijenti/findPacijentEmail/" + e.target.id;
    axios
      .get(url2)
      .then(response => {
              console.log("Preuzimanje pacijenta uspelo! ");
              console.log(response.data);
              
              // this.setState({
              //   dijagnozaNaziv : response.data.naziv,
              //   dijagnozaOznaka : response.data.oznaka,
              //   dijagnozaOpis : response.data.opis
              // })
            //   this.dialog.show({
            //   title: 'Izmena dijagnoze',
            //   body: [
            //   <form className="formaZaIzmenuDijagnoze">
                
            //     <div className="dijagnozaNaziv" >
            //       <label className="dijagnozaNazivLabel" htmlFor="dijagnozaNaziv">Naziv: </label>
            //       <input className="dijagnozaNazivLabel"
            //         type="text"
            //         name="dijagnozaNaziv"
            //         defaultValue= {response.data.naziv}
            //         // placeholder={this.state.ime}
            //         // noValidate
            //         onChange={this.handleChange}
            //       />
            //     </div>
            //     <div className="dijagnozaOznaka" >
            //       <label className="dijagnozaOznakaLabel" htmlFor="dijagnozaOznaka">Oznaka: </label>
            //       <input
            //         className="dijagnozaOznakaLabel"
            //         type="text"
            //         name="dijagnozaOznaka"
            //         defaultValue={response.data.oznaka}
            //         onChange={this.handleChange}
            //       />
            //     </div>
            //     <div className="dijagnozaOpis" >
            //       <label className="dijagnozaOpisLabel" htmlFor="dijagnozaOpis">Opis (latinski naziv): </label>
            //       <input
            //         className="dijagnozaOpisLabel"
            //         type="text"
            //         name="dijagnozaOpis"
            //         defaultValue={response.data.opis}
            //         onChange={this.handleChange}
            //       />
            //     </div>

                 

            //   </form> 
            //   ],
            //   actions: [
            //     Dialog.CancelAction(),
            //     Dialog.OKAction(() => {
                  
            //       console.log('OK je kliknuto!');
            //       const url3 = "http://localhost:8025/api/administratoriKC/izmenaDijagnoze";
            //       axios
            //         .put(url3, {
            //           id : response.data.id,
            //           naziv : this.state.dijagnozaNaziv,
            //           oznaka : this.state.dijagnozaOznaka,
            //           opis : this.state.dijagnozaOpis
                      
            //         })
            //         .then(response2 => {
            //           console.log("Izmena dijagnoze uspela! ");
            //           console.log(response2.data);
            //           this.listaDijagnoza();

            //         })
            //         .catch(error => {
            //           console.log("Izmena dijagnoze nije uspela! ");
            //         });
            //     })
            //   ],
            //   bsSize: 'medium',
            //   onHide: (dialog) => {
            //     dialog.hide()
            //     console.log('closed by clicking background.')
            //   }
            // })

      })
      .catch(error => {
          console.log("Preuzimanje pacijenta nije uspelo! ");
       });
    
    
  };

  listaPacijenata() {
    let res = [];
    let lista = this.state.listaPacijenata;
    
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
          <td ><Button className="OdobrenZahtev"
              id={lista[i].email}
              onClick={e => this.handlePrikazProfila(e)}> Profil</Button>
              <Dialog ref={(el) => { this.dialog = el }} ></Dialog>
          </td>
          <td ><Button className="OdobrenZahtev"
              id={lista[i].email}
              // onClick={e => this.handlePrikazProfila(e)}
              > ZK </Button>
              {/* <Dialog ref={(el) => { this.dialog = el }} ></Dialog> */}
          </td>
          {/* <td ><Button className="OdobrenZahtev"  onChange={this.handleChange}>Odobri</Button></td>
          <td ><Button className="OdbijenZahtev">Odbij</Button></td> */}
        </tr>
      );
    }
    return res;
  };

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
    } else if (sortBy === "adresa") {
      console.log("adresa");
      this.setState({
        listaPacijenata: lista.sort((a, b) => a.adresa.localeCompare(b.adresa))
      });
    } else if (sortBy === "grad") {
      console.log("grad");
      this.setState({
        listaPacijenata: lista.sort((a, b) =>  a.grad.localeCompare(b.grad))
      });
    } else if (sortBy === "drzava") {
      console.log("drzava");
      this.setState({
        listaPacijenata: lista.sort((a, b) => a.drzava.localeCompare(b.drzava))
      });
    } else if (sortBy === "telefon") {
      console.log("telefon");

      this.setState({
        listaPacijenata: lista.sort((a, b) => a.telefon - b.telefon)
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
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col>
              <Card 
                  title="Lista pacijenata"
                  // category="Here is a subtitle for this table"
                  // ctFullWidth
                  // ctResponsive
                 
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
                      <MenuItem eventKey={"adresa"}>Adresa</MenuItem>
                      <MenuItem eventKey={"grad"}>Grad</MenuItem>
                      <MenuItem eventKey={"drzava"}>Drzava</MenuItem>
                      <MenuItem eventKey={"telefon"}>Telefon</MenuItem>
                    </NavDropdown>

                    <Card 
                      // category="Here is a subtitle for this table"
                      ctTableFullWidth
                      ctTableResponsive
                      className="TabelaListePacijenata"
                      content={
                        <Table striped hover >
                          <thead  className="thead-dark" >
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
                              
                            </tr>
                          </thead>
                          <tbody>
                            {this.listaPacijenata()}  
                          </tbody>   
                    </Table>
                        
                        
                      }
                    />
                    
                    </form>
                }
              />
                
              
              
             
              
              
            </Col>
           
          
          </Row>

         
        </Grid>
      </div>
    );
  }

}

export default ListaPacijenataMedSestra;