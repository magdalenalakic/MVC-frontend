
import React from "react";
// react components used to create a google map
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

// function Maps(){
//   return <GoogleMap
//    defaultZoom = {13}
//     defaultCenter = {{lat : 45.267136, lng: 19.833549}}
//     defaultOptions={{
//               scrollwheel: false,
//               zoomControl: true
//             }}
  
//   >

//   </GoogleMap>

 
// }
// const WrappedMap = withScriptjs(withGoogleMap(Maps))


const WrappedMap = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap

      defaultZoom={13}
      defaultCenter={{lat : 45.267136, lng: 19.833549}}
      defaultOptions={{
        scrollwheel: false,
        zoomControl: true
      }}
    >
      {/* <Marker position={{ lat: 110.748817, lng: -173.985428 }} /> */}
    </GoogleMap>
  ))
);

// //AIzaSyBO8lOU4v5gC2H64p7I4l9zZrkgq_dJ9rk api key

function Maps({ ...prop }) {
  // console.log(this.prop);
  return (
    <WrappedMap
      googleMapURL="https://maps.googleapis.com/maps/api/js?keys=AIzaSyBO8lOU4v5gC2H64p7I4l9zZrkgq_dJ9rk"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `100vh` }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
  );
}

export default Maps;
