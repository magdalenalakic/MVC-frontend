import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import "klinickiCentar.css";
import Button from "components/CustomButton/CustomButton.jsx";
import axios from "axios";
import Dialog from "react-bootstrap-dialog";
import IzmenaLekara from "views/IzmenaProfila.jsx";
import "klinickiCentar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import moment from "moment";

class SlobodniTermini extends Component {
  constructor(props) {
    super(props);
    console.log("LISTA PREGLEDA");
    console.log(this.props);
    this.state = {
      uloga: props.uloga,
      email: props.email,
      token: props.token,
      idAdmina: "",
      idKlinike: "",
      listaLekara: [],
      listaKlinika: [],
      emailLekara: "",
      imeLekara: "",
      prezimeLekara: "",
      lozinkaLekara: "",
      telefonLekara: "",
      klinikaLekara: 0,
      reirectToIzmeniLekar: false,
      pregledPacijentID: "",
      pregledLekarID: "",
      pregledTipPregledaID: "",
      pregledCijena: "",
      nazivTipPregled: "",
      tipoviPregleda: [],
      lekari: [],
      oznaceniTipPregleda: 1,
      oznaceniLekar: 0,
      nazivOznacenogPregleda: "",
      nazivOznacenogLekara: "",
      datumZaPregled: new Date(),
      izabranLekar: 0,
      izabranaKlinika: 1,
      cena: 0,
      popust: 0
    };
    this.listaSalaK = this.listaSalaK.bind(this);
    this.izaberiVrstuPregleda = this.izaberiVrstuPregleda.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    // this.dodajLekara = this.dodajLekara.bind(this);
    // this.obrisiLekara = this.obrisiLekara.bind(this);
    // this.proslediKliniku = this.proslediKliniku.bind(this);

    // this.getKlinikaValue = this.getKlinikaValue.bind(this);
  }

  getKlinikaValue() {
    console.log("get klinika value");
    return this.state.idKlinike;
  }
  handleChange = e => {
    e.preventDefault();

    this.setState({ [e.target.name]: e.target.value });
    // console.log(this.state);
    console.log("On change !!!");
    console.log({ [e.target.name]: e.target.value });
  };

  // listaKlinikaIzbor(){
  //   let res = [];

  //   let lista = this.state.listaKlinika;

  //   for (var i = 0; i < lista.length; i++) {
  //     res.push(
  //       <option value={lista[i].id} >{lista[i].naziv}</option>
  //        //<MenuItem eventKey={lista[i].id}>{lista[i].naziv}</MenuItem>
  //     );
  //   }
  //   return res;
  // }
  proslediKliniku(klinika) {
    console.log("prosledjena klinika");

    console.log("I==================D" + klinika.target.value);
    console.log("-------------------------" + this.state.idKlinike);
    this.setState(
      {
        klinikaLekara: klinika.target.value
      },
      () => console.log(this.state)
    );
  }
  listaLekara() {
    console.log("Ponovo ispisi listu bez obrisanog lekara");
    console.log("!!!!!!!!!!!!!!!11111 ID KL " + this.state.idKlinike);

    console.log("ID KLINIKE OD KOJE TRAZIM LEKARE: " + this.state.idKlinike);
    console.log("ucitaj mi kliniku");
    const urlKlinike =
      "http://localhost:8025/api/klinike/listaLekaraKlinika/" +
      this.state.idKlinike;
    axios.get(urlKlinike).then(klinika => {
      console.log("Preuzeta klinika");
      console.log(klinika.data);

      this.setState({
        idKlinika: klinika.data.id,
        listaLekara: klinika.data
      });
    });
  }

  obrisiLekara = e => {
    e.preventDefault();
    console.log("CLick brisanje lekara");
    console.log("LLL: " + e.target.id);
    console.log("--------------------------------");
    const url6 = "http://localhost:8025/api/klinike/brisanjeLekara";
    axios
      .post(url6, {
        email: e.target.id
      })
      .then(response => {
        console.log("Brisanje lekara uspelo! ");
        console.log(response.data);
        this.listaLekara();
      })
      .catch(error => {
        console.log("Brisanje leka nije uspelo! ");
      });
  };

  componentWillMount() {
    console.log("wmount");
    console.log("Preuzimanje admina klinike.....");
    var config = {
      headers: {
        Authorization: "Bearer " + this.state.token,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
    const url = "http://localhost:8025/api/adminKlinike/getAdminKlinikeByEmail";
    axios
      .get(url, config)
      .then(Response => {
        console.log("Preuzet admin klinike: ");
        console.log(Response.data);

        this.setState({
          email: Response.data.email,
          //   ime: Response.data.ime,
          //   prezime: Response.data.prezime,
          //   telefon: Response.data.telefon,
          idKlinike: Response.data.idKlinike
        });
        console.log("Ucitaj mi kliniku sa id " + this.state.idKlinike);
        console.log("ucitaj mi kliniku");
        const urlKlinike =
          "http://localhost:8025/api/klinike/listaLekaraKlinika/" +
          this.state.idKlinike;
        axios.get(urlKlinike, config).then(klinika => {
          console.log("Preuzeta klinika");
          console.log(klinika.data);

          this.setState({
            // idKlinike: klinika.data.id,
            listaLekara: klinika.data
          });
          console.log("++++++++++++++++++ Id k: " + this.state.idKlinike);
          console.log("Preuzmi mi sale za tu kliniku");
          const urlslobodni =
            "http://localhost:8025/api/ST/preuzmiSTKlinike/" +
            this.state.idKlinike;
          axios.get(urlslobodni, config).then(klinika => {
            console.log("Preuzeta lista klinika");
            console.log(klinika.data);
            console.log(klinika.data[0].tipPregledaID);
            this.setState({
              // idKlinike: klinika.data.id,
              listaLekara: klinika.data,
              pregledLekarID: klinika.data.lekarID,
              pregledPacijentID: klinika.data.pacijentID,
              pregledTipPregledaID: klinika.data[0].tipPregledaID,
              pregledCijena: klinika.data.cena
            });
          });
          console.log("Preuzmi mi sale za tu kliniku");
          const urlKlinike =
            "http://localhost:8025/api/tipPregleda/tipPregledaKlinike/" +
            this.state.idKlinike;
          axios.get(urlKlinike, config).then(resp => {
            console.log("Preuzeta lista klinika");
            console.log(resp.data);

            this.setState({
              // idKlinike: klinika.data.id,
              tipoviPregleda: resp.data,
              nazivOznacenogPregleda: resp.data[0].naziv
              // pregledLekarID: klinika.data.lekarID,
              // pregledPacijentID: klinika.data.pacijentID,
              // pregledTipPregledaID: klinika.data[0].tipPregledaID,
              // pregledCijena: klinika.data.cena,
            });
          });
          const url2 =
            "http://localhost:8025/api/klinike/listaLekaraKlinika/" +
            this.state.idKlinike;
          axios.get(url2, config).then(resp => {
            console.log("Preuzeta lista klinika");
            console.log(resp.data);

            this.setState({
              // idKlinike: klinika.data.id,
              lekari: resp.data,
              nazivOznacenogLekara: resp.data[0].ime
              // pregledLekarID: klinika.data.lekarID,
              // pregledPacijentID: klinika.data.pacijentID,
              // pregledTipPregledaID: klinika.data[0].tipPregledaID,
              // pregledCijena: klinika.data.cena,
            });
          });
        });
      })

      .catch(error => {
        console.log("Administrator klinike  nije preuzet");
      });
    console.log("************* ID KLINIKE JE:" + this.state.idKlinike);
  }

  onDropdownSelected(e) {
    console.log("THE VAL", e.target.value);
    //here you will see the current selected value of the select input
  }
  dodajNoviST = e => {
    e.preventDefault();

    console.log("--------------------------------");
    this.dialog.show({
      title: "Dodavanje novog termina",
      body: [
        <form className="formaZaDodavanjeNovogTermina">
          <div className="telefonLekara">
            <label className="lekarTelefonLabel" htmlFor="datumPregleda">
              Datum:{" "}
            </label>
            <DatePicker
              className="lekarTelefonLabel"
              name="datumPregleda"
              defaultValue=""
              placeholderText="Izaberi datum"
              selected={this.state.datumZaPregled}
              onSelect={this.handleChangeDate}
            />
          </div>
          <div className="telefonLekara">
            <label className="lekarTelefonLabel" htmlFor="prezimeLekara">
              Tip Pregleda:{" "}
            </label>
            <select
              className="lekarTelefonLabel"
              name="tipPregleda"
              onChange={e => this.biranjeTipaPregleda(e)}
            >
              {this.izaberiVrstuPregleda()}
            </select>
          </div>
          <div className="telefonLekara">
            <label className="lekarTelefonLabel" htmlFor="biranjeLekara">
              Lekar:{" "}
            </label>
            <select
              className="lekarTelefonLabel"
              name="lekadID"
              onChange={e => this.biranjeLekara(e)}
            >
              {this.izaberiLekara()}
            </select>
          </div>
          <div className="telefonLekara">
            <label className="lekarTelefonLabel" htmlFor="telefonLekara">
              Cena(RSD):{" "}
            </label>
            <input
              className="lekarTelefonLabel"
              type="number"
              name="cena"
              defaultValue=""
              onChange={this.handleChange}
            />
          </div>
          <div className="telefonLekara">
            <label className="lekarTelefonLabel" htmlFor="telefonLekara">
              Popust(%):{" "}
            </label>
            <input
              className="lekarTelefonLabel"
              type="number"
              name="popust"
              defaultValue=""
              onChange={this.handleChange}
            />
          </div>

          {/* <div className="klinikaLekara" >
            <label className="lekarKlinikaLabel" htmlFor="lekarKlinika">Klinika: </label>
            <div>
            <select name="odabirKlinike"  onChange={e => {this.proslediKliniku(e)}}>
            {this.listaKlinikaIzbor()} 
            
            </select>
          </div>
          </div> */}
        </form>
      ],
      actions: [
        Dialog.CancelAction(),
        Dialog.OKAction(() => {
          console.log("OK je kliknuto!");
          console.log(this.state.oznaceniLekar);
          console.log(this.state.idKlinike);
          console.log(this.state.oznaceniTipPregleda);
          console.log(this.state.datumZaPregled);
          axios

            .post("http://localhost:8025/api/ST/dodajNoviST", {
              lekarID: this.state.oznaceniLekar,
              klinikaID: this.state.idKlinike,
              tipPregledaID: this.state.oznaceniTipPregleda,
              cena: this.state.cena,
              popust: this.state.popust,
              datum: this.state.datumZaPregled
            })
            .then(response => {
              console.log("Dodat novi termin");
              console.log(response);
            })
            .catch(error => {
              console.log("greska ST");
              console.log(error.response);
            });
        })
      ],
      bsSize: "medium",
      onHide: dialog => {
        dialog.hide();
        console.log("closed by clicking background.");
      }
    });
  };
  handleIzmeni = e => {
    e.preventDefault();
    console.log(e.target.id);
    console.log("handle IZMENIIII LEKARA");
    this.setState({
      reirectToIzmeniLekar: true,
      emailLekara: e.target.id
    });
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
  handleChangeDate = date => {
    this.setState(
      {
        datumZaPregled: date
      },
      () => console.log(this.state)
    );
  };
  biranjeTipaPregleda(tip) {
    console.log("BIRANJE TP P");
    console.log("prosledjen pregled");
    console.log(tip.target.value);
    this.setState({
      oznaceniTipPregleda: tip.target.value
    });
    let lista = this.state.tipoviPregleda;

    for (var i = 0; i < lista.length; i++) {
      var naziv = lista[i].naziv;
      var id = lista[i].id;
      if (id == tip.target.value) {
        this.setState({
          nazivOznacenogPregleda: naziv
        });
      }
    }
  }

  biranjeLekara(lekar) {
    console.log("BIRANJE TP P");
    console.log("prosledjen lekar");
    console.log("Stari id: " + this.state.oznaceniLekar);
    const idL = lekar.target.value;
    this.setState({
      oznaceniLekar: idL
    });
    console.log("Value id:" + lekar.target.value);
    console.log("Novi id: +  " + this.state.oznaceniLekar);
    let lista = this.state.lekari;

    for (var i = 0; i < lista.length; i++) {
      var naziv = lista[i].ime;
      var id = lista[i].id;
      if (id == lekar.target.value) {
        this.setState({
          nazivOznacenogLekara: naziv
        });
      }
    }
  }
  izaberiVrstuPregleda() {
    let res = [];
    let lista = this.state.tipoviPregleda;
    for (var i = 0; i < lista.length; i++) {
      res.push(<option value={lista[i].id}>{lista[i].naziv}</option>);
    }
    return res;
  }

  izaberiLekara() {
    let res = [];
    let lista = this.state.lekari;
    for (var i = 0; i < lista.length; i++) {
      res.push(
        <option value={lista[i].id}>
          {lista[i].ime} {lista[i].prezime}{" "}
        </option>
      );
    }
    return res;
  }
  listaSalaK() {
    let res = [];
    let lista = this.state.listaLekara;

    for (var i = 0; i < lista.length; i++) {
      const dat = lista[i].datum;
      res.push(
        <tr key={i}>
          <td>
            {moment(dat).format("DD.MM.YYYY.")} {moment(dat).format("HH:mm")}
          </td>
          <td>{lista[i].tipPregledaN}</td>
          <td>
            {lista[i].lekarIme} {lista[i].lekarPrezime}
          </td>

          <td>{lista[i].cena} RSD</td>
          <td>{lista[i].popust} %</td>

          {/* <td>{lista[i].telefon}</td>    */}
          {/* <td >
             <Button  id={lista[i].id} onClick={e => this.obrisiLekara(e)}>Obrisi</Button>
             <Dialog ref={(el) => { this.dialog = el }} ></Dialog>     
       </td>
         <td>
            <Button className="OdobrenZahtev" id={lista[i].id} onClick={e => this.handleIzmeni(e)}>
              Izmeni
            </Button>
          </td> */}
        </tr>
      );
    }
    return res;
  }

  render() {
    //     const lista = this.state.listaKlinika;
    //     const reirectToIzmeniLekar = this.state.reirectToIzmeniLekar;
    //    console.log("LEKARRRRRRR : "  + this.state.emailLekara);
    //    const emailLekara = this.state.emailLekara;
    //     if (reirectToIzmeniLekar === true) {
    //       return (
    //         <BrowserRouter>
    //           <Switch>
    //             <Route

    //               path="/izmenaProfilaLekara"
    //               render={props => <IzmenaProfila {...props} email={emailLekara} />}
    //             />
    //             <Redirect from="/" to="/izmenaProfilaLekara" />
    //           </Switch>
    //         </BrowserRouter>
    //       );
    //    }
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col>
              <Row>
                <Card
                  title="Lista slobodnih termina"
                  // category="Here is a subtitle for this table"
                  ctTableFullWidth
                  ctTableResponsive
                  content={
                    <div>
                      <Button
                        className="DodajKlinikuDugme"
                        onClick={e => this.dodajNoviST(e)}
                      >
                        Dodaj novi termin za pregled
                      </Button>
                      <Dialog
                        ref={el => {
                          this.dialog = el;
                        }}
                      ></Dialog>

                      <Table striped hover>
                        <thead>
                          <tr>
                            <th id="IdPacijenta">Datum i vreme</th>
                            <th id="ImePacijenta">Tip pregleda</th>

                            <th id="lekar">Lekar</th>

                            <th id="cena">Cena</th>
                            <th id="popust">Popust</th>
                          </tr>
                        </thead>
                        <tbody>{this.listaSalaK()}</tbody>
                      </Table>
                    </div>
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
