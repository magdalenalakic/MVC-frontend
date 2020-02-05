
import React, { Component } from "react";
import Button from "components/CustomButton/CustomButton.jsx";
import { Grid, Row, Col, Table, NavItem, Nav, NavDropdown, MenuItem } from "react-bootstrap";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import Dialog from 'react-bootstrap-dialog';
import axios from "axios";
import slikaPacijent from "assets/img/pacijentImage.jpg";
import Pregled from "views/Pregled.jsx";
import ListaPacijenataLekar from "views/ListaPacijenataLekar.jsx";
import "klinickiCentar.css";
import moment from "moment";

class PregledProfilaPacijenta extends Component {
  constructor(props) {
   
    super(props);
    console.log(this.props);
    console.log(props.emailPacijenta);
    this.state = {
      uloga: props.uloga,
      token: props.token,
      email: props.email,
      emailPacijenta: props.emailPacijenta,
      idPregleda: 0,
      ime: "",
      prezime: "",
      adresa: "",
      grad: "",
      drzava: "",
      telefon: "",
      brojOsiguranika: "",
      lozinka: "",
      listaPregleda: [],
      ZKpacijenta: [],
      zkOpen: false,
      redirectToPregled: false,
      redirectToListaPac: false,
      prikaziZK: false
    };
    this.config = {
      headers: {
        Authorization: "Bearer " + this.state.token,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }
    
    this.ucitavanjePacijenta = this.ucitavanjePacijenta.bind(this);
    this.ucitavanjeZakazanihPregleda = this.ucitavanjeZakazanihPregleda.bind(this);
    this.handleZapocniPregled = this.handleZapocniPregled.bind(this);
    this.listaPregledaPacijenta = this.listaPregledaPacijenta.bind(this);
    this.handleNazad = this.handleNazad.bind(this);
  }

  ucitavanjePacijenta(){
    console.log("OVO JE PACIJENT " + this.state.emailPacijenta)
    axios
    .get('http://localhost:8025/api/pacijenti/findPacijentLekar/' + this.state.emailPacijenta ,
     this.config)
      .then(Response => {
        console.log("Ucitavanje pacijenta");
        console.log(Response);
        this.setState({
          emailPacijenta: Response.data.id,
          ime: Response.data.ime,
          prezime: Response.data.prezime,
          telefon: Response.data.telefon,
          adresa: Response.data.adresa,
          grad: Response.data.grad,
          drzava: Response.data.drzava,
          lbo: Response.data.lbo
        }, ()=> {
          console.log("usaooo u proveru ");
          console.log(this.state.token);
          axios
          .post('http://localhost:8025/api/lekari/mogucPrikazZKPacijenta' ,
          { email: Response.data.id}, this.config)
            .then(Response => {
              console.log("Da li je odobren ili ne uvid u zk ");
              console.log(Response.data);
             if(Response.data == "MOZE"){
               console.log("MOZE DA PRISTUPI");
               this.setState({
                prikaziZK: true
               })
             }else{
               console.log("NE MOZE DA PRISTUPI")
               this.setState({
                prikaziZK: false
               })
             }
            })
            .catch(error => {
              console.log("nije uspeo url1");
              console.log(error);
            });
            
        });

        
        console.log(this.state);
      })
      .catch(error => {
        console.log("nije uspeo url1");
        console.log(error);
      });
  }

  ucitavanjeZakazanihPregleda(){
    axios
        .get('http://localhost:8025/api/pregledi/pregledPacijenta/' + this.state.emailPacijenta ,
        this.config)
        .then(Response => {
            console.log("Ucitavanje pregleda");
            console.log(Response.data);
            this.setState({
              listaPregleda : Response.data
            })
           
        })
        .catch(error => {
            console.log("nije uspelo ucitavanje pregleda pacijenta");
            console.log(error);
        });
  }

  componentWillMount() {
    console.log("treba get zahtev da se iskuca");
    
    console.log(this.state.emailPacijenta);
    this.ucitavanjePacijenta();
    this.ucitavanjeZakazanihPregleda();
  }

  handleZapocniPregled = e =>{
    // e.preventDefault();
    console.log(e.currentTarget.id);
    // this.setState({
    //   emailPacijenta: e.currentTarget.id
    // })
    this.setState({
      idPregleda : e.currentTarget.id
    }, ()=> {
      this.setState({
        redirectToPregled: true,
    })
    })
    

  }
  handleNazad (){
    this.setState({
      redirectToListaPac: true,
      
    })
  }

  listaPregledaPacijenta(){
    let res = [];
    let lista = this.state.listaPregleda;
    for (var i = 0; i < lista.length; i++) {
      let datum = new Date(lista[i].datum);
      datum.setHours(lista[i].termin);

      res.push(
        <tr key = {i}>

          <td >{moment(datum).format("DD.MM.YYYY HH:mm")}</td>
          <td >{lista[i].nazivTP}</td>
          <td>{lista[i].salaBR + " "+ lista[i].salaN}</td>
          
         
          
          <td >
              
              <Button className="OdobrenZahtev"
                id={lista[i].id}
                onClick={e => this.handleZapocniPregled(e)}
              > Zapocni pregled</Button>
             
          </td>

          
            

          
        </tr>
      );
    }
    return res;
  }

 
 
  render() {

    if (this.state.redirectToPregled === true) {
        return (
          <BrowserRouter>
            <Switch>
              <Route
                path="/pregled"
                render={props => <Pregled {...props}
                token={this.state.token}
                email={this.state.email} 
                uloga={this.state.uloga}
                idPregleda ={this.state.idPregleda}
               //nije emailPacijenta vec je id al dobro
                emailPacijenta={this.state.emailPacijenta}   />}
              />
              <Redirect from="/" to="/pregled" />
            </Switch>
          </BrowserRouter>
        );
    }
    if(this.state.redirectToListaPac === true){
        return (
          <BrowserRouter>
            <Switch>
              <Route
                path="/listaPacijenataLekar"
                render={props => <ListaPacijenataLekar {...props}
                    token={this.state.token}
                    email={this.state.email} 
                    uloga={this.state.uloga}
                  //nije emailPacijenta vec je id al dobro
                    emailPacijenta={this.state.emailPacijenta}   />}
              />
              <Redirect from="/" to="/listaPacijenataLekar" />
            </Switch>
          </BrowserRouter>
        );
    }
    
    const ime = this.state.ime;
    const prezime = this.state.prezime;
    const telefon = this.state.telefon;
    
    // console.log(this.props);
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            
         
            
            {
              this.state.prikaziZK ?
              <Col lg={3} sm={6}>
                <Button className="pregledDugme" onClick={()=> this.setState({
                  zkOpen: true
                })}>Zdravstveni karton</Button>
              </Col>
              : null
            }
            
            <Col lg={3} sm={6}>
              <Button className="pregledDugme" onClick={this.handleNazad}>Izadji iz profila</Button>
            </Col>
            
            
          </Row>
          <Row>
            
            {
              this.state.zkOpen ?
              <Col md={8}>
              <Card
                title="Zdravstveni karton"
                
                content={
                  <div className="ct-chart">
                    {/* <ChartistGraph
                      data={dataSales}
                      type="Line"
                      options={optionsSales}
                      responsiveOptions={responsiveSales}
                    /> */}
                    <p></p>
                    <Button className="izadjiDugme" onClick={()=> this.setState({
                      zkOpen: false
                    })}>Izadji</Button>

                  </div>
                }
               
              />
            </Col>
            : <Col md={8}>
            
                <Card
                  title="Lista pregleda"
                  // category="Here is a subtitle for this table"
                  ctTableFullWidth
                  ctTableResponsive
                  content={
                    <div>
                    
                   
                    <Table striped hover>
                      <thead>
                        <tr>
                          <th id="IdPacijenta">Datum</th>
                          <th id="ImePacijenta">Tip pregleda</th>
                          <th>Sala</th>
                                
                        </tr>
                      </thead>
                      <tbody>
                      {this.listaPregledaPacijenta()}
                      </tbody>
                    </Table>
                    </div>
                  }
                />
              
              
            </Col>
            }
            


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
