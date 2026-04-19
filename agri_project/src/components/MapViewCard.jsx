import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";

export default function MapViewCard({
  lat,
  lng,
  label = "Location",
}) {
  if (typeof lat !== "number" || typeof lng !== "number") return null;

  return (
    <div className="map-view-card">
      <MapContainer
        center={[lat, lng]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "220px", width: "100%", borderRadius: "18px" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <CircleMarker center={[lat, lng]} radius={10}>
          <Popup>{label}</Popup>
        </CircleMarker>
      </MapContainer>
    </div>
  );
}