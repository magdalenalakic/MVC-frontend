import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import "klinickiCentar.css";
import Button from "components/CustomButton/CustomButton.jsx";
import axios from "axios";
import Dialog from 'react-bootstrap-dialog';

class SlobodniTermini extends Component {
  constructor(props) {
    super(props);
    console.log("LISTA LEKARA");
    console.log(this.props);
    this.state = {
      uloga: props.uloga,
      email: props.email,
      id: "",
      idKlinike: "",
      listaLekara: []
    };
    
    this.listaLekara = this.listaLekara.bind(this);
    // this.handleOdobren = this.handleOdobren.bind(this);
    // this.handleOdbijen = this.handleOdbijen.bind(this);
    // this.handleChange = this.handleChange.bind(this);
  }

//   ucitajPonovo(){
//     const url1 =
//       "http://localhost:8025/api/administratoriKC/listaZahtevaZaRegistraciju/" +
//       this.state.email;

//     console.log(url1);
//     axios
//       .get(url1)
//       .then(response => {
//         console.log("URL zahtevi za reg");
//         console.log(response);
//         this.setState({
//           listaZahtevaZaRegistraciju: response.data
//         });
//       })
//       .catch(error => {
//         console.log("nije uspeo url1");
//         console.log(error);
//       });
//   }
componentWillMount(){
    console.log("wmount")
    // console.log("Preuzimanje admina klinike.....")
    // const url = 'http://localhost:8025/api/adminKlinike/getAdminKlinikeByEmail/' + this.state.email;
    // axios.get(url)
    //   .then(Response => {
    //     console.log("Preuzet admin klinike: ");
    //     console.log(Response.data);

    //     this.setState({
    //       email: Response.data.email,
    //     //   ime: Response.data.ime,
    //     //   prezime: Response.data.prezime,
    //     //   telefon: Response.data.telefon,
    //     idKlinike: Response.data.idKlinike,
    //     });

    //     console.log("ucitaj mi kliniku");
    //     const urlKlinike = 'http://localhost:8025/api/klinike/listaLekaraKlinika/' + this.state.idKlinike;    
    //     axios.get(urlKlinike)
    //       .then(klinika => {
    //         console.log("Preuzeta klinika");
    //         console.log(klinika.data);
   
    //         this.setState({
    //             id: klinika.data.id,
    //             listaLekara: klinika.data,
             
    //         });
       
    //       })
      
    //   })
      
    //   .catch(error => {
    //     console.log("Administrator klinike  nije preuzet")
    //   })

    //   //za kliniku ovdje
    
  }
//   handleChange = e => {
//     e.preventDefault();
    
//     this.setState({ [e.target.name]: e.target.value });
//     console.log(this.state);
//     console.log("On change !!!");
//   };
 
handleIzmeni = e => {
    e.preventDefault();
    console.log(e.target.id);
    console.log("handle IZMENIIII")
    // const url2 = "http://localhost:8025/api/lekari/update/" + e.target.id;
    // axios
    // .post(url2, {})
    // .then(response => {
    //   console.log("ODOBRENOOOO");
    //   console.log(response);
    //   this.ucitajPonovo();
    // })
    // .catch(error => {
    //     console.log(error.response);
    // });

  };
//   handleOdbijen = e => {
    
//     e.preventDefault();
//     let za = e.target.id;
//     this.setState({
//       za : za
//     })
//     console.log("--------------------------------");

//     this.dialog.show({
//       title: 'Odbijanje zahteva za registraciju',
//       body: [
//         <form className="formaZaSlanjeRazlogaOdbijanja">
//           <div >
//             <label htmlFor="za">Za: </label>
//             <input
//               type="text"
//               name="za"
//               value = {za}
//               // defaultValue= {za}
//               // placeholder={this.state.ime}
//               // noValidate
//               // onChange={this.handleChange}
//             />
//           </div>
//           <div >
//             <label htmlFor="razlogOdbijanja">Razlog odbijanja: </label>
//             <input
//               type="text"
//               name="razlogOdbijanja"
//               defaultValue=""
//               onChange={this.handleChange}
//             />
//           </div>
//       </form>
//       ],
//       actions: [
//         Dialog.CancelAction(),
//         Dialog.OKAction(() => {
//           console.log('OK je kliknuto!');
//           console.log("Poslat razlog : ---------------");
//           console.log(this.state.za);
//           console.log(this.state.razlogOdbijanja);
//           const url3 = "http://localhost:8025/api/administratoriKC/odbijanje/" + this.state.za + "/" + this.state.razlogOdbijanja;
//           axios
//             .post(url3, {})
//             .then(response => {
//               console.log("Odbijanje uspelo! ");
//               console.log(response.data);
//               this.ucitajPonovo();

//             })
//             .catch(error => {
//               console.log("Odbijanje nije uspelo! ");
//             });
//         })
//       ],
//       bsSize: 'medium',
//       onHide: (dialog) => {
//         dialog.hide()
//         console.log('closed by clicking background.')
//       }
//     })
    
//   }

listaLekara() {
    let res = [];
    let lista = this.state.listaLekara;

    for (var i = 0; i < lista.length; i++) {
      
      res.push(
        <tr key={i}>
          <td>{lista[i].id}</td>
         
          <td>{lista[i].ime}</td>
          <td>{lista[i].prezime}</td>
          <td>{lista[i].email}</td>
       
          <td>{lista[i].telefon}</td>

         <td>
            <Button className="OdobrenZahtev" id={lista[i].email} onClick={e => this.handleIzmeni(e)}>
              Izmeni
            </Button>
          </td>
 
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
                  title="Lista slobodnih termina klinike"
                  // category="Here is a subtitle for this table"
                  ctTableFullWidth
                  ctTableResponsive
                  content={
                    <Table striped hover>
                      <thead>
                        <tr>
                          {/* <th id="IdPacijenta">Id</th> */}
                         
                          <th id="ImePacijenta"> Datum i vreme</th>
                          <th id="PrezimePacijenta">Tip</th>
                          <th id="EmailPacijenta">Trajanje</th>
                          <th id="TelefonPacijenta">Sala</th>
                          <th id="TelefonPacijenta">Lekar</th>
                          <th id="TelefonPacijenta">Cena</th>
                          {/* {thArray.map((prop, key) => {
                            return <th key={key}>{prop}</th>;
                          })} */}
                        </tr>
                      </thead>
                      <tbody>{this.listaLekara()}</tbody>
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

export default SlobodniTermini;
