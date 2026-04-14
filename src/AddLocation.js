import React, { useState } from "react";
import API from "./api";

function AddLocation() {
  const [name, setName] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  const submit = async () => {
  try {
    await API.post("locations/", {
      name,
      latitude: parseFloat(lat),
      longitude: parseFloat(lng),
    });
    alert("Location Added");
  } catch (err) {
    console.log(err.response.data);  // 🔥 IMPORTANT
    alert("Error adding location");
  }
};

  return (
    <div>
      <h2>Add Location</h2>
      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input placeholder="Latitude" onChange={(e) => setLat(e.target.value)} />
      <input placeholder="Longitude" onChange={(e) => setLng(e.target.value)} />
      <button onClick={submit}>Add</button>
    </div>
  );
}

export default AddLocation;