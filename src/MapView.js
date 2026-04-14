import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import API from "./api";
import L from "leaflet";

// Fix marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// 🟢 Green icon
const greenIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
  iconSize: [32, 32],
});

// 🔴 Red icon
const redIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
  iconSize: [32, 32],
});

function MapView() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("locations/");
        const locs = res.data;

        const updated = await Promise.all(
          locs.map(async (loc) => {
            try {
              const scoreRes = await API.get(`score/${loc.id}/`);
              return { ...loc, score: scoreRes.data.score };
            } catch {
              return { ...loc, score: 50 };
            }
          })
        );

        setLocations(updated);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <MapContainer
      center={[28.6139, 77.2090]}
      zoom={12}
      style={{ height: "400px", borderRadius: "15px" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {locations.map((loc) => (
        <Marker
          key={loc.id}
          position={[loc.latitude, loc.longitude]}
          icon={loc.score >= 50 ? greenIcon : redIcon}
        >
          <Popup>
            <strong>{loc.name}</strong> <br />
            Score: {loc.score}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapView;