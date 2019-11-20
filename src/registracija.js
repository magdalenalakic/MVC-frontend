import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./registracija.css";
import AdminLayout from "layouts/Admin.jsx";
import axios from "axios";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = formErrors => {
  let valid = true;
  Object.values(formErrors).forEach(val => val.length > 0 && (valid = false));
  return valid;
};

class Registracija extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ime: null,
      prezime: null,
      adresa: null,
      grad: null,
      drzava: null,
      email: null,
      telefon: null,
      brojOsiguranika: null,
      lozinka: null,
      potvrdaLozinke: null,
      registrovan: false,
      formErrors: {
        ime: "",
        prezime: "",
        adresa: "",
        grad: "",
        drzava: "",
        email: "",
        telefon: "",
        brojOsiguranika: "",
        lozinka: "",
        potvrdaLozinke: ""
      }
    };
  }
  handleSumbit = e => {
    e.preventDefault();
    if (formValid(this.state.formErrors)) {
      console.log(`Ime: ${this.state.ime}`);
      axios
        .post("http://localhost:8021/api/pacijenti/register", {
          lozinka: this.state.lozinka,
          ime: this.state.ime,
          prezime: this.state.prezime,
          adresa: this.state.adresa,
          grad: this.state.grad,
          drzava: this.state.drzava,
          email: this.state.email,
          telefon: this.state.telefon,
          lbo: this.state.brojOsiguranika
        })
        .then(response => {
          console.log(response);
          this.setState({
            redirectToReferrer: true
          });
        })
        .catch(error => {
          console.log(error.response);
        });
      this.setState({
        registrovan: true
      });
    } else {
      console.error("FORM invalid");
    }
  };
  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;

    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "ime":
        formErrors.ime =
          value.length < 3 && value.length > 0 ? "min 3 karaktera  " : "";
        break;
      case "prezime":
        formErrors.prezime =
          value.length < 3 && value.length > 0 ? "min 3 karaktera" : "";
        break;
      case "adresa":
        formErrors.adresa =
          value.length < 3 && value.length > 0 ? "min 3 karaktera" : "";
        break;
      case "grad":
        formErrors.grad =
          value.length < 3 && value.length > 0 ? "min 3 karaktera" : "";
        break;
      case "drzava":
        formErrors.drzava =
          value.length < 3 && value.length > 0 ? "min 3 karaktera" : "";
        break;
      case "email":
        formErrors.email =
          value.length < 3 && value.length > 0 ? "min 3 karaktera" : "";
        break;
      case "telefon":
        formErrors.telefon =
          value.length < 3 && value.length > 0 ? "min 3 karaktera" : "";
        break;
      case "brojOsiguranika":
        formErrors.brojOsiguranika =
          value.length < 3 && value.length > 0 ? "min 3 karaktera" : "";
        break;

      case "lozinka":
        formErrors.lozinka =
          value.length < 3 && value.length > 0 ? "min 3 karaktera" : "";
        break;
      case "potvrdaLozinke":
        formErrors.potvrdaLozinke =
          value.length < 3 && value.length > 0 ? "min 3 karaktera" : "";
        break;
    }
    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {
    const { formErrors } = this.state;
    const registrovan = this.state.registrovan;
    if (registrovan === true) {
      return (
        <BrowserRouter>
          <Switch>
            <Route path="/admin" render={props => <AdminLayout {...props} />} />
            <Redirect from="/" to="/admin/dashboard" />
          </Switch>
        </BrowserRouter>
      );
    }

    return (
      <div>
        <div className="regForm">
          <div className="form-regForm">
            <h1>Registracija</h1>
            <form onSubmit={this.handleSumbit} noValidate>
              <div className="ime">
                <label htmlFor="ime">Ime: </label>
                <input
                  type="text"
                  name="ime"
                  placeholder="Ime"
                  noValidate
                  onChange={this.handleChange}
                />
                {formErrors.ime.length > 0 && (
                  <span className="errorMessage">{formErrors.ime}</span>
                )}
              </div>
              <div className="prezime">
                <label htmlFor="prezime">Prezime: </label>
                <input
                  type="text"
                  name="prezime"
                  placeholder="Prezime"
                  noValidate
                  onChange={this.handleChange}
                />
                {formErrors.prezime.length > 0 && (
                  <span className="errorMessage">{formErrors.prezime}</span>
                )}
              </div>
              <div className="adresa">
                <label htmlFor="adresa">Adresa: </label>
                <input
                  type="text"
                  name="adresa"
                  placeholder="Adresa"
                  noValidate
                  onChange={this.handleChange}
                />
                {formErrors.adresa.length > 0 && (
                  <span className="errorMessage">{formErrors.adresa}</span>
                )}
              </div>
              <div className="grad">
                <label htmlFor="grad">Grad: </label>
                <input
                  type="text"
                  name="grad"
                  placeholder="Grad"
                  noValidate
                  onChange={this.handleChange}
                />
                {formErrors.grad.length > 0 && (
                  <span className="errorMessage">{formErrors.grad}</span>
                )}
              </div>
              <div className="drzava">
                <label htmlFor="drzava">Drzava: </label>
                <input
                  type="text"
                  name="drzava"
                  placeholder="Drzava"
                  noValidate
                  onChange={this.handleChange}
                />
                {formErrors.drzava.length > 0 && (
                  <span className="errorMessage">{formErrors.drzava}</span>
                )}
              </div>
              <div className="email">
                <label htmlFor="email">E-mail: </label>
                <input
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  noValidate
                  onChange={this.handleChange}
                />
                {formErrors.email.length > 0 && (
                  <span className="errorMessage">{formErrors.email}</span>
                )}
              </div>
              <div className="telefon">
                <label htmlFor="telefon">Telefon: </label>
                <input
                  type="number"
                  name="telefon"
                  placeholder="Telefon"
                  noValidate
                  onChange={this.handleChange}
                />
                {formErrors.telefon.length > 0 && (
                  <span className="errorMessage">{formErrors.telefon}</span>
                )}
              </div>
              <div className="brojOsiguranika">
                <label htmlFor="brojOsiguranika">Broj osiguranika: </label>
                <input
                  type="number"
                  name="brojOsiguranika"
                  placeholder="Broj osiguranika"
                  noValidate
                  onChange={this.handleChange}
                />
                {formErrors.brojOsiguranika.length > 0 && (
                  <span className="errorMessage">
                    {formErrors.brojOsiguranika}
                  </span>
                )}
              </div>

              <div className="lozinka">
                <label htmlFor="lozinka">Lozinka: </label>
                <input
                  type="password"
                  name="lozinka"
                  placeholder="Lozinka"
                  noValidate
                  onChange={this.handleChange}
                />
                {formErrors.lozinka.length > 0 && (
                  <span className="errorMessage">{formErrors.lozinka}</span>
                )}
              </div>
              <div className="potvrdaLozinke">
                <label htmlFor="potvrdaLozinke">Potvrdi lozinku: </label>
                <input
                  type="password"
                  name="potvrdaLozinke"
                  placeholder="Potvrdi lozinku"
                  noValidate
                  onChange={this.handleChange}
                />
                {formErrors.potvrdaLozinke.length > 0 && (
                  <span className="errorMessage">
                    {formErrors.potvrdaLozinke}
                  </span>
                )}
              </div>
              <div className="createAccount">
                <button type="submit">Registruj se</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Registracija;
