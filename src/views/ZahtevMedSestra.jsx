
import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Card } from "components/Card/Card.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";
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
import slikaLekar from "assets/img/images.jpg";
import Login from "login.js";
import axios from "axios";


class ZahtevMedSestra extends React.Component {
  constructor(props) {
    super(props);
    console.log("MED SESTRA");
    console.log(this.props);
    this.state = {
      uloga: props.uloga,
      email: props.email,
      token: props.token,

      
    };
   

    console.log(this.state.uloga);
    console.log(this.state.email);
  }
  // createLegend(json) {
  //   var legend = [];
  //   for (var i = 0; i < json["names"].length; i++) {
  //     var type = "fa fa-circle text-" + json["types"][i];
  //     legend.push(<i className={type} key={i} />);
  //     legend.push(" ");
  //     legend.push(json["names"][i]);
  //   }
  //   return legend;
  // }
  
  render() {
    console.log(this.props);
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col >
              <Card
              
                title="Zahtev za godisnji odmor"
                // category="24 Hours performance"
                // stats="Updated 3 minutes ago"
                 content={
                  <div >
                    <h5>Datum pocetka:</h5>
                    <DatePicker
                      placeholderText="Izaberi datum"
                      //selected={this.state.datumZaPregled}
                      //onSelect={this.handleChangeDate}

                      // onChange={date => setStartDate(date)}
                    />
                  </div>
                 }
                // legend={
                //   <div className="legend">{this.createLegend(legendSales)}</div>
                // }
              />
            </Col>
          </Row>

        </Grid>
      </div>
    );
  }
}

export default ZahtevMedSestra;
