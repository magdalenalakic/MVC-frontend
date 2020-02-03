
import React, { Component } from "react";
import { Grid, Row, Col, Table  } from "react-bootstrap";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import DatePicker from "react-datepicker";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import "react-datepicker/dist/react-datepicker.css";
import { Card } from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import axios from "axios";
import Dialog from 'react-bootstrap-dialog';
import ListaPacijenataLekar from "views/ListaPacijenataLekar.jsx";
import "klinickiCentar.css";

import Slikalekari from "assets/img/lekari.jpg";
import slikaPregledi from "assets/img/pregled.jpg"
import kalendarSlika from "assets/img/calendar.png"



class Pregled extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      uloga: props.uloga,
      email: props.email,
      token: props.token,
      emailPacijenta: props.emailPacijenta,
      idPregleda : props.idPregleda,
      id: "",  
      opis: "",
      idMedSestre: 0, 
      imeMS: "",
      prezimeMS: "",
      redirectToOdustani: false,
      listaDijagnoza: [],
      izabranaDijagnoza: null,
      sifraOznaceneDijagnoze: "",
      nazivOznaceneDijagnoze: "",
      listaLekova: [],
      izabraniLekovi:[],
      recepti: [],
      izabranLek: null,
      misljenje: "",


      
    };
    this.config = {
      headers: {
        Authorization: "Bearer " + this.state.token,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }
    
    this.handleChange = this.handleChange.bind(this);
    
    this.handleOdustani = this.handleOdustani.bind(this);

    //dijagnoze
    this.dodavanjeDijagnoze = this.dodavanjeDijagnoze.bind(this);
    this.listaDijagnoza = this.listaDijagnoza.bind(this);
    this.listaDijagnozaUKC= this.listaDijagnozaUKC.bind(this);
    this.biranjeDijagnoze = this.biranjeDijagnoze.bind(this);

    //za lekove
    this.listaLekova = this.listaLekova.bind(this);
    this.prekopirajListu = this.prekopirajListu.bind(this);
    this.listaLekovaUKC = this.listaLekovaUKC.bind(this);
    this.dodavanjeLeka = this.dodavanjeLeka.bind(this);
    this.biranjeLeka = this.biranjeLeka.bind(this);
    this.izabraniLekovi = this.izabraniLekovi.bind(this);

    this.zavrsiPregled = this.zavrsiPregled.bind(this);

    
  }


  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;

    this.setState({ [name]: value }, () => console.log(this.state));
  };
 
  handleOdustani(){
    this.setState({
      redirectToOdustani: true
    })
  }  

  componentWillMount() {
    this.listaDijagnoza();
    this.listaLekova();

    


    const url = "http://localhost:8025/api/lekari/getLekarByEmail";

  axios
    .get(url, this.config)
    .then(Response => {
      console.log("Preuzet lekar: ");
      console.log(Response.data);

      this.setState({
        id: Response.data.id
      });
      this.setState({
        imeMS: Response.data.ime
      })
      this.setState({
        prezimeMS: Response.data.prezime
      })

     
    })
    .catch(error => {
      console.log("Med sestra nije preuzeta");
    });
  }
 

  listaDijagnozaUKC(){
    let res=[];
    let lista = this.state.listaDijagnoza;
    // for (var i = 0; i < lista.length; i++) {
    //   res.push(<option value={lista[i].id}>{lista[i].oznaka}, {lista[i].naziv}, {lista[i].opis} </option>);
    // }

    for(var i=0; i< lista.length;i++){
      res.push(
        <tr key = {i}>
          
            <td>
              <input
                name="odabranaSala"
                type="radio"
                value={lista[i].id}
                checked={this.state.izabranaDijagnoza == lista[i].id}
                onChange={e => {
                  this.biranjeDijagnoze(e);
                }}
              ></input>
            </td>
           <td >{lista[i].oznaka}</td>
           <td >{lista[i].naziv}</td>
           <td >{lista[i].opis}</td>
          
          
         </tr>
       )
     }
    return res;
  }
  listaLekovaUKC(){
    let res=[];
    let lista = this.state.izabraniLekovi;
    

    for(var i=0; i< lista.length;i++){
      res.push(
        <tr key = {i}>
          
            <td>
              <input
                name="odabranaSala"
                type="checkbox"
                value={lista[i].id}
                checked={lista[i].oznacen}
                onChange={e=> this.biranjeLeka(e)}
                
              ></input>
            </td>
           <td >{lista[i].sifra}</td>
           <td >{lista[i].naziv}</td>
         </tr>
       )
    }
    return res;
  }
  listaDijagnoza(){
    console.log("--------lista dijagnoza");
    const url2 = 'http://localhost:8025/api/dijagnoze/listaDijagnoza/'; 
    console.log(url2);
    axios.get(url2, this.config)
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
  listaLekova(){
    console.log("--------lista dijagnoza");
    const url2 = 'http://localhost:8025/api/lekovi/listaLekova/'; 
    console.log(url2);
    axios.get(url2, this.config)
      .then(response => {
        console.log("URL Lista Lekova");
        console.log(response);
        this.setState({
          listaLekova: response.data
        }, ()=> this.prekopirajListu());
        
      })
      .catch(error => {
          console.log("nije uspeo url lekova");
          console.log(error);
      })
  }
  prekopirajListu(){
    for(var i = 0; i < this.state.listaLekova.length; i++){
      this.state.izabraniLekovi.push({
        
        id: this.state.listaLekova[i].id,
        sifra: this.state.listaLekova[i].sifra,
        naziv: this.state.listaLekova[i].naziv,
        oznacen: false
        
      })
    }
    this.izabraniLekovi();
  }

  biranjeDijagnoze(dijagnoza){

    const idL = dijagnoza.target.value;

    this.setState({
      izabranaDijagnoza: dijagnoza.target.value
    });

    console.log("Value id:" + dijagnoza.target.value);
    
    let lista = this.state.listaDijagnoza;

    for (var i = 0; i < lista.length; i++) {
      var naziv = lista[i].naziv;
      var id = lista[i].id;
      var sifra = lista[i].oznaka;

      if (id == dijagnoza.target.value) {
        this.setState({
          nazivOznaceneDijagnoze: naziv,
          sifraOznaceneDijagnoze: sifra
        }, ()=> this.dialog.hide());
       
        
      }
      
    }
    
  }

  biranjeLeka(lek){
    console.log("BIRANJE LEKA : " + lek.target.value);
    
    let lista = this.state.izabraniLekovi;
    console.log("duzina niza lekova: " + lista.length);
    
    for (var i = 0; i < lista.length; i++) {
        if (lista[i].id == lek.target.value) {
          if(lista[i].oznacen == false){
            console.log("PRE: " + lista[i].id + " " + lista[i].sifra + " oznacen " + lista[i].id);
            lista[i].oznacen = true;
            console.log("POSLE: " + lista[i].id + " " + lista[i].sifra + " oznacen " + lista[i].id);
            
            

          }else{
            console.log("PRE: " + lista[i].id + " " + lista[i].sifra + " oznacen " + lista[i].id);
            lista[i].oznacen = false;
            console.log("POSLE: " + lista[i].id + " " + lista[i].sifra + " oznacen " + lista[i].id);
            
            
            
          }    
        } 
    }
    this.izabraniLekovi();
    this.dialog.hide();
    

  }

  izabraniLekovi(){
    let rez=[];
    let lista = this.state.izabraniLekovi;
    this.state.recepti = [];
    for(var i=0; i< lista.length; i++){
      if(lista[i].oznacen == true){
        this.state.recepti.push( lista[i].id);
        
        rez.push(
          <tr key = {i}>
             <td >{lista[i].sifra}</td>
             <td >{lista[i].naziv}</td>
           </tr>
         )

      }

     }
    
    return rez;
  }

  dodavanjeDijagnoze(){
    console.log("DODAVANJE DIJAGNOZE");
    this.dialog.show({
      title: 'Dijagnoze',
      body: [
        
        <div>  
            
            <Table striped hover>
              <thead>
                <tr>
                  <th id="Idijagnoze"></th>
                  <th id="OznakaDijagnoze">Oznaka</th>
                  <th id="NazivDijagnoze">Naziv</th>
                  <th id="OpisDijagnoze">Opis</th>           
                </tr>
              </thead>
              <tbody>
                {this.listaDijagnozaUKC()}  
              </tbody>
          </Table>
        </div>
              
      ],
      
      
      bsSize: 'medium',
      onHide: (dialog) => {
        dialog.hide()
        console.log('closed by clicking background.')
      }
    })

   
  }

  dodavanjeLeka(){
    console.log("DODAVANJE LEKA");
    
    this.dialog.show({
      title: 'Lekovi',
      body: [
        
        <div>  
           
            <Table striped hover>
              <thead>
                <tr>
                  <th id="Idijagnoze"></th>
                  <th id="OznakaDijagnoze">Sifra</th>
                  <th id="NazivDijagnoze">Naziv</th>
                           
                </tr>
              </thead>
              <tbody>
                {this.listaLekovaUKC()}  
              </tbody>
          </Table>
        </div>
              
      ],
      
      bsSize: 'medium',
      onHide: (dialog) => {
        dialog.hide()
        console.log('closed by clicking background.')
      }
    })
  }

  zavrsiPregled(){
    
    console.log("PREGLED: ");
    console.log("Dijagnoza: "+this.state.izabranaDijagnoza);
    console.log("Sadrzaj: "+this.state.misljenje);
    console.log("Recepti broj: "+this.state.recepti.length);
    console.log("Svi oznaceni recepti:  ");
    for(var i= 0; i < this.state.recepti.length; i++){
      console.log(this.state.recepti[i]);
    }
    let lekovi = "";
    for(var i=0; i < this.state.izabraniLekovi.length; i++){
      if(this.state.izabraniLekovi[i].oznacen == true){
        lekovi += this.state.izabraniLekovi[i].naziv + ", ";
      }
    }
    console.log("Pregled : " + this.state.idPregleda);
    
    this.dialog.show({
      title: 'Izvestaj o pregledu',
      body: [
        
        <div>  
          <Grid>
            <Row>
              <h4>Misljenje: </h4>
              <h5>{this.state.misljenje}</h5>
            </Row>
            <Row>
              <h4>Dijagnoza: </h4>
              <h5>{this.state.sifraOznaceneDijagnoze + " " + this.state.nazivOznaceneDijagnoze}</h5>
            </Row>
            <Row>
              <h4>Recepti: </h4>
              <h5>{lekovi}</h5>
            </Row>
          </Grid>
            
        </div>
              
      ],
      actions: [
        Dialog.CancelAction(),
        Dialog.OKAction(() => {
          console.log("OK je kliknuto!");
          const url3 = "http://localhost:8025/api/izvestajOP/zavrsetakPregleda";
          axios
            .post(url3, { 
              dijagnozaID : this.state.izabranaDijagnoza,
              sadrzaj: this.state.misljenje,
              pregledID: this.state.idPregleda,
              recepti: this.state.recepti
            }, this.config)
            .then(response => {
              console.log("ZAVRSEN PREGLED! ");
              console.log(response.data);
              this.setState({
                redirectToOdustani: true
              })
              
    
            })
            .catch(error => {
              console.log("NIJE USPEO PREGLED DA SE ZAVRSI! ");
            });
          
         
        })
      ], 
      bsSize: 'medium',
      onHide: (dialog) => {
        dialog.hide()
        console.log('closed by clicking background.')
      }
    })

     
    
  }



  render() {
    console.log(this.props);

    if(this.state.redirectToOdustani === true){
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
                  emailPacijenta={this.state.emailPacijenta}  
                   />}
            />
            <Redirect from="/" to="/listaPacijenataLekar" />
          </Switch>
        </BrowserRouter>
      );
    }

    return (
        <Grid>
            <Row className="linkoviPregled">
                <Col lg={3} sm={6}>
                    {/* {this.renderRedirect()} */}
                    <div 
                    // onClick={this.handleListaPacijenata}
                    >
                        <StatsCard
                            bigIcon={<div> <img src = { kalendarSlika} width="30" height="20" /></div>}
                            // statsText="Lista pacijenata"
                            // statsValue="105GB"
                            // statsIcon={<i className="fa fa-refresh" />}
                            statsIconText="Zdravstveni karton"
                        />
                    </div>                    
                </Col>
                <Col lg={3} sm={6}>
                    {/* {this.renderRedirect()} */}
                    <div 
                    // onClick={this.handleListaPacijenata}
                    >
                        <StatsCard
                            bigIcon={<div> <img src = { kalendarSlika} width="30" height="20" /></div>}
                            // statsText="Lista pacijenata"
                            // statsValue="105GB"
                            // statsIcon={<i className="fa fa-refresh" />}
                            statsIconText="Informacije o pacijentu"
                        />
                    </div>                    
                </Col>
                <Col lg={3} sm={6}>
                    {/* {this.renderRedirect()} */}
                    <div 
                    // onClick={this.handleListaPacijenata}
                    >
                        <StatsCard
                            bigIcon={<div> <img src = { kalendarSlika} width="30" height="20" /></div>}
                            // statsText="Lista pacijenata"
                            // statsValue="105GB"
                            // statsIcon={<i className="fa fa-refresh" />}
                            statsIconText="Informacije o pregledu"
                        />
                    </div>                    
                </Col>  
                <Col lg={3} sm={6}>
                    {/* {this.renderRedirect()} */}
                    <div 
                    // onClick={this.handleListaPacijenata}
                    >
                        <StatsCard
                            bigIcon={<div> <img src = { kalendarSlika} width="30" height="20" /></div>}
                            // statsText="Lista pacijenata"
                            // statsValue="105GB"
                            // statsIcon={<i className="fa fa-refresh" />}
                            statsIconText="Zakazi pregled"
                        />
                    </div>                    
                </Col>                   
            </Row>
            <Row>
                <div className="formaPregleda">

                    <Card
                        title="Pregled"
                        // category="24 Hours performance"
                        // stats="Updated 3 minutes ago"
                        content={
                            <div className="formaPregleda" >
                            <Grid fluid>
                               
                                <Row >
                                    
                                        <Col md={4} lg={4} className="dijagnozaRecept">
                                            <h4 className="poljePregled">Dodavanje dijagnoze</h4>  
                                            
                                            <input className="poljePregled" 
                                             disabled="disabled" 
                                             type="text"
                                              name="lekNaziv"
                                              // defaultValue = "" 
                                              value={this.state.sifraOznaceneDijagnoze + " " + this.state.nazivOznaceneDijagnoze}
                                                // onChange={this.handleChange}
                                            ></input>
                                            <Button className="pregledDugme" 
                                            onClick={this.dodavanjeDijagnoze}
                                            >Dodavanje dijagnoze</Button>
                                            <Dialog ref={(el) => { this.dialog = el }} ></Dialog>
                                        </Col>
                                        <Col md={4} lg={4} className="dijagnozaRecept">
                                            <h4 className="poljePregled">Izdavanje recepta</h4>
                                            
                                            {/* mozda bolje tabela sa jednom kolonom  */}
                                            {/* <input className="poljePregled"  disabled="disabled"
                                             type="text"
                                              name="lekNaziv"
                                              // defaultValue = "" 
                                              // value={this.state. + " " + this.state.nazivOznaceneDijagnoze}
                                                // onChange={this.handleChange}
                                            ></input> */}
                                            <Table striped hover>
                                              <thead>
                                                <tr>
                                                  
                                                  <th id="OznakaDijagnoze">Sifra</th>
                                                  <th id="NazivDijagnoze">Naziv</th>
                                                          
                                                </tr>
                                              </thead>
                                              <tbody>
                                                {this.izabraniLekovi()}
                                              </tbody>
                                          </Table>
                                            <Button className="pregledDugme" 
                                            onClick={this.dodavanjeLeka}
                                            >Izaberi lek</Button>
                                            {/* <Dialog ref={(el) => { this.dialog = el }} ></Dialog> */}

                                            

                                        </Col>
                                   
                                </Row>

                                <Row >
                                  <Col className="misljenjeOkvir">
                                    <h4 className="poljePregled">Misljenje</h4>
                                    <textarea
                                    className="misljenjePolje"
                                        type="text"
                                        name="misljenje"
                                        onChange={this.handleChange}
                                    >
                                    </textarea>  
                                  </Col>
                            </Row>
                                <Row >
                                    <Col>

                                        <Button 
                                        className="dugmeZavrsiPregled" 
                                        onClick={this.handleOdustani}
                                        >Odustani</Button>

                                        <Button 
                                        className="dugmeZavrsiPregled" 
                                        onClick={this.zavrsiPregled}
                                        >Zavrsi pregled</Button>

                                    </Col>
                                </Row>
                            </Grid>
                        
                            </div>
                        }
                    />
                </div>
            </Row>
            
        </Grid>
     
    );
  }
}

export default Pregled;
