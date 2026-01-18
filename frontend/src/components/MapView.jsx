import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function MapView({ samples, onMarkerClick }) {
  return (
    <MapContainer
      center={[6.5244, 3.3792]}
      zoom={10}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap"
      />
      {samples.map((sample) => (
        <Marker
          key={sample.id}
          position={[sample.latitude, sample.longitude]}
          eventHandlers={{ click: () => onMarkerClick(sample) }}
        >
          <Popup>
            <strong>{sample.sample_id}</strong>
            <br />
            {sample.rock_type}
            <br />
            Strike: {sample.strike}° Dip: {sample.dip}°
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
