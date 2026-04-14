import React, { useState, useEffect } from "react";
import API from "./api";
import ScoreCard from "./ScoreCard";

function Dashboard() {
  const [locations, setLocations] = useState([]);
  const [score, setScore] = useState(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await API.get("locations/");
        setLocations(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchLocations();
  }, []);

  const fetchScore = async (id) => {
    try {
      const res = await API.get(`score/${id}/`);
      setScore(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Locations</h2>

      {locations.map((loc) => (
        <div
          key={loc.id}
          onClick={() => fetchScore(loc.id)}
          style={{
            padding: "8px",
            margin: "5px",
            background: "#1e293b",
            color: "white",
            cursor: "pointer",
          }}
        >
          {loc.name}
        </div>
      ))}

      {score && <ScoreCard scoreData={score} />}
    </div>
  );
}

export default Dashboard;