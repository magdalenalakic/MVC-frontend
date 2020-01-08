/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import { NavItem, Nav, NavDropdown, MenuItem } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import Login from "login";
import axios from "axios";
import Pacijent from "views/Pacijent.jsx";
import ListaPregleda from "views/ListaPregleda";
import Button from "components/CustomButton/CustomButton.jsx";

class PacijentNavbarLinks extends Component {
  constructor(props) {
    super(props);

    console.log(this.props);
    this.state = {
      uloga: this.props.uloga,
      email: this.props.email,
      token: this.props.token,
      pregledi: [],
      brObavestenja: 0,
      obavestenja: [],
      redirectToPotvrdaPregleda: false,
      menuIsOpened: false
    };
    this.listaPregleda = this.listaPregleda.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handlePonistiObavestenja = this.handlePonistiObavestenja.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    console.log(this.state);
  }
  handleClick = e => {
    e.preventDefault();
    console.log(e.currentTarget.value);
    if (e.currentTarget.value == "Potvrdite zahtev za pregled") {
      this.setState(
        {
          redirectToPotvrdaPregleda: true,
          menuIsOpened: false
        },
        () => this.handlePonistiObavestenja()
      );
    }
  };
  handleToggle(toggle) {
    //you code here, change state of menuIsOpened if you want to open or close
    this.setState({
      menuIsOpened: true
    });
  }
  handlePonistiObavestenja() {
    console.log("handle ponisti o");
    this.setState({
      brObavestenja: 0
    });
  }
  componentWillMount() {
    var config = {
      headers: {
        Authorization: "Bearer " + this.state.token,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
    axios
      .get("http://localhost:8025/api/pregledi/preglediPacijenta", config)
      .then(res => {
        console.log(res.data);
        this.setState(
          {
            pregledi: res.data
          },
          () => {
            this.listaPregleda();
          }
        );
      })
      .catch(error => {
        console.log("Pacijent  nije preuzet");
      });
  }
  listaPregleda() {
    let res = [];
    let lista = this.state.pregledi;
    for (var i = 0; i < lista.length; i++) {
      if (lista[i].status == 0) {
        if (lista[i].salaID != undefined || lista[i].salaID != null) {
          this.setState(
            {
              brObavestenja: this.state.brObavestenja + 1,
              obavestenja: this.state.obavestenja.concat(
                "Potvrdite zahtev za pregled"
              )
            },
            () => console.log(this.state)
          );
        }
      }
    }
  }
  renderRedirect() {
    console.log("renderredirect");
    if (this.state.redirectToPotvrdaPregleda == true) {
      console.log("the same");
      return <Redirect from="/" to="/admin/potvrdaPregleda" />;
    }
  }
  handleC() {
    console.log("handle c");
    if (this.state.redirectToPotvrdaPregleda == true) {
      this.setState({
        redirectToPotvrdaPregleda: false
      });
    }
  }
  render() {
    this.handleC();
    var notification;

    if (this.state.brObavestenja == 0) {
      console.log("br obavestenja 0");
      notification = (
        <div>
          <i className="fa fa-globe" />
          <b className="caret" />
          {/* <span className="notification"></span> */}
          <p className="hidden-lg hidden-md">Notification</p>
        </div>
      );
      return (
        <div>
          <Nav>
            {/* <NavItem eventKey={1} href="#">
                  <i className="fa fa-dashboard" />
                  <p className="hidden-lg hidden-md">Dashboard</p>
                </NavItem> */}
            <NavDropdown
              eventKey={2}
              title={notification}
              noCaret
              id="basic-nav-dropdown"
              open={this.state.menuIsOpened}
              onToggle={this.handleToggle}
            >
              <MenuItem>Nema novih obavestenja</MenuItem>

              {/* <Alert
                    bsStyle="info"
                    value={poruka}
                    onClick={e => this.handleClick(e)}
                  >
                    <span>{poruka}</span>
                  </Alert>  */}

              {/* <MenuItem eventKey={2.1}>Notification 1</MenuItem>
                  <MenuItem eventKey={2.2}>Notification 2</MenuItem>
                  <MenuItem eventKey={2.3}>Notification 3</MenuItem>
                  <MenuItem eventKey={2.4}>Notification 4</MenuItem>
                  <MenuItem eventKey={2.5}>Another notifications</MenuItem> */}
            </NavDropdown>
            {/* <NavItem eventKey={3} href="#">
                  <i className="fa fa-search" />
                  <p className="hidden-lg hidden-md">Search</p>
                </NavItem> */}
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={3} href="http://localhost:3000/login">
              Odjava
            </NavItem>
          </Nav>
        </div>
      );
    } else {
      notification = (
        <div>
          <i className="fa fa-globe" />
          <b className="caret" />
          <span className="notification">{this.state.brObavestenja}</span>
          <p className="hidden-lg hidden-md">Notification</p>
        </div>
      );
      return (
        <div>
          {this.renderRedirect()}
          <Nav>
            {/* <NavItem eventKey={1} href="#">
                  <i className="fa fa-dashboard" />
                  <p className="hidden-lg hidden-md">Dashboard</p>
                </NavItem> */}
            <NavDropdown
              eventKey={2}
              title={notification}
              noCaret
              id="basic-nav-dropdown"
              open={this.state.menuIsOpened}
              onToggle={this.handleToggle}
            >
              {this.state.obavestenja.map(poruka => {
                return (
                  /* <MenuItem
                    key={poruka}
                    onClick={() => this.handleClick(poruka)}
                  >
                    {poruka}
                  </MenuItem> */
                  <Button
                    fill
                    bsStyle="info"
                    value={poruka}
                    onClick={e => this.handleClick(e)}
                  >
                    <span>{poruka}</span>
                  </Button>
                  /* <Alert
                    bsStyle="info"
                    value={poruka}
                    onClick={e => this.handleClick(e)}
                  >
                    <span>{poruka}</span>
                  </Alert> */
                );
              })}
              {/* <MenuItem eventKey={2.1}>Notification 1</MenuItem>
                  <MenuItem eventKey={2.2}>Notification 2</MenuItem>
                  <MenuItem eventKey={2.3}>Notification 3</MenuItem>
                  <MenuItem eventKey={2.4}>Notification 4</MenuItem>
                  <MenuItem eventKey={2.5}>Another notifications</MenuItem> */}
            </NavDropdown>
            {/* <NavItem eventKey={3} href="#">
                  <i className="fa fa-search" />
                  <p className="hidden-lg hidden-md">Search</p>
                </NavItem> */}
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={3} href="http://localhost:3000/login">
              Odjava
            </NavItem>
          </Nav>
        </div>
      );
    }
  }
}

export default PacijentNavbarLinks;
