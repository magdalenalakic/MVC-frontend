import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import React, { Component } from "react";
import Geocode from "react-geocode";

const mapStyles = {
    width: '90%',
    height: '80%',
  };


 
  class MapContainer extends Component {
    constructor(props) {
      super(props);
    console.log("MAPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaaa");
    console.log(props);
      this.state = {
          adresa: "Hajduk Veljkova 1",
        // stores: [{lat: 47.49855629475769, lng: -122.14184416996333},
        //         {latitude: 47.359423, longitude: -122.021071},
        //         {latitude: 47.2052192687988, longitude: -121.988426208496},
        //         {latitude: 47.6307081, longitude: -122.1434325},
        //         {latitude: 47.3084488, longitude: -122.2140121},
        //         {latitude: 47.5524695, longitude: -122.0425407}]
      }
      console.log(this.props.adresa);
    }

    
  
    displayMarkers = () => {
    //   return this.state.stores.map((store, index) => {
    //     return <Marker key={index} id={index} position={{
    //      lat: 48.8583701,
    //      // store.latitude,
    //      lng: 2.2922926
    //      //store.longitude
    //    }}
    //    onClick={() => console.log("You clicked me!")} />
    //   })
    }

   
  // Enable or disable logs. Its optional.
 
    render() {
          
//     Geocode.setApiKey("AIzaSyBO8lOU4v5gC2H64p7I4l9zZrkgq_dJ9rk");
//     // set response language. Defaults to english.
//   Geocode.setLanguage("en");
   
  // set response region. Its optional.
  // A Geocoding request with regyion=es (Spain) will return the Spanish city.
  Geocode.setRegion("sr");
     Geocode.enableDebug();
     Geocode.fromAddress(this.state.adresa).then(
        response => {
            console.log("DSADSDSADSADADAD MAPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
          const { lat, lng } = response.results[0].geometry.location;
          console.log(lat, lng);
        },
        error => {
          console.error(error);
        }
      );
      return (
          <Map
            google={this.props.google}
            zoom={8}
            style={mapStyles}
            initialCenter={{ lat: 47.444, lng: -122.176}}
          >
            {this.displayMarkers()}
          </Map>
      );
    }
  }
  export default GoogleApiWrapper({
    apiKey: 'AIzaSyBO8lOU4v5gC2H64p7I4l9zZrkgq_dJ9rk'
  })(MapContainer);

