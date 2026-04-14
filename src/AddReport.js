import React, { useState, useEffect } from "react";
import API from "./api";

function AddReport() {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [reportType, setReportType] = useState("HARASSMENT");
  const [description, setDescription] = useState("");

  // Fetch locations
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await API.get("locations/");
        setLocations(res.data);
      } catch (err) {
        console.log("ERROR FETCH:", err);
      }
    };

    fetchLocations();
  }, []);

  // Submit report
  const handleSubmit = async () => {
    try {
      if (!selectedLocation) {
        alert("Please select a location");
        return;
      }

      const token = localStorage.getItem("token");

      const data = {
        location: Number(selectedLocation),
        report_type: reportType,
        description: description,
      };

      console.log("SENDING:", data);

      const res = await API.post("reports/", data, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      console.log("SUCCESS:", res.data);
      alert("Report submitted successfully ✅");

      // reset
      setSelectedLocation("");
      setReportType("HARASSMENT");
      setDescription("");

    } catch (err) {
      console.log("FULL ERROR:", err);
      console.log("DETAILS:", err.response);

      alert("Failed to submit report ❌");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Add Safety Report</h2>

      {/* Location */}
      <select
        value={selectedLocation}
        onChange={(e) => setSelectedLocation(e.target.value)}
        style={styles.input}
      >
        <option value="">Select Location</option>
        {locations.map((loc) => (
          <option key={loc.id} value={loc.id}>
            {loc.name}
          </option>
        ))}
      </select>

      {/* Report Type */}
      <select
        value={reportType}
        onChange={(e) => setReportType(e.target.value)}
        style={styles.input}
      >
        <option value="POLICE_PATROL">🚔 Police Patrol</option>
        <option value="STREET_LIGHT">💡 Street Light</option>
        <option value="HARASSMENT">🟡 Harassment</option>
        <option value="NO_CROWD">🟠 No Crowd</option>
        <option value="THEFT">🔴 Theft</option>
        <option value="FIGHT">⚠️ Fight</option>
        <option value="CONFLICT">🚨 Conflict</option>
        <option value="RIOT">🔥 Riot</option>
      </select>

      {/* Description */}
      <textarea
        placeholder="Enter description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={styles.input}
      />

      <button onClick={handleSubmit} style={styles.button}>
        Submit Report
      </button>
    </div>
  );
}

const styles = {
  container: {
    background: "#0f172a",
    padding: "20px",
    borderRadius: "10px",
    color: "white",
    maxWidth: "400px",
    margin: "20px auto",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#22c55e",
    border: "none",
    color: "white",
    cursor: "pointer",
  },
};

export default AddReport;