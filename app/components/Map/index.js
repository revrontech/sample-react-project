/* eslint-disable no-undef */
import React from 'react';
import { compose, withProps } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';

const MapWithADirectionsRenderer = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAG54_SovKGte2HSAC6FYHZlpZSldg-HjM&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '400px' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withScriptjs,
  withGoogleMap,
)(props => (
  <GoogleMap
    defaultZoom={4}
    defaultCenter={new google.maps.LatLng(41.8507300, -87.6512600)}
  >
    {props.data.map(({ lat, lng }, i) => (
      <Marker
        key={`${i}${lat}`}
        position={{ lat: parseFloat(lat), lng: parseFloat(lng) }}
      />
    ))}
  </GoogleMap>
));

function Direction(props) {
  return (
    <MapWithADirectionsRenderer data={props.data} />
  );
}

export default Direction;
