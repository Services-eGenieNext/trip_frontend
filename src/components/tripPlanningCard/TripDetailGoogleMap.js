import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyles = {
  width: 'auto',
  height: '250px'
};

const TripDetailGoogleMap = (props) => {

    return (
        <Map
            google={props.google}
            style={mapStyles}
            zoom={8}
            initialCenter={{ lat: 48.00, lng: -122.00 }}
        >
        <Marker position={{ lat: 48.00, lng: -122.00}} />
        </Map>
    )
}

export default GoogleApiWrapper({
    apiKey: process.env.NEXT_PUBLIC_GOOGLEMAP_API_KEY ?? ''
})(TripDetailGoogleMap);
  