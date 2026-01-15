import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "70%",
  height: "500px"
};


const center = {
  lat: parseFloat(import.meta.env.VITE_LAT),
  lng: parseFloat(import.meta.env.VITE_LNG)
};

const Map = () => {

    return (
        <>
            <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLEMAP_API_KEY}>
                <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={17}>
                    <Marker position={center} />
                </GoogleMap>
            </LoadScript>
        </>
    );

}

export default Map