import React from "react";
import GaugeChart from "react-gauge-chart";

function ScoreCard({ scoreData }) {
  if (!scoreData) return null;

  return (
    <div style={styles.card}>
      <h3>{scoreData.location}</h3>

      <div style={{ width: "180px", margin: "10px auto" }}>
        <GaugeChart
          id="gauge-chart"
          nrOfLevels={3}
          percent={(scoreData?.score || 0) / 100}
          colors={["#ff0000", "#f9c74f", "#00ff00"]}
          arcWidth={0.2}
          textColor="#ffffff"
        />
      </div>

      <h2>{scoreData.score} / 100</h2>
      <p>Total Reports: {scoreData.total_reports}</p>
    </div>
  );
}

const styles = {
  card: {
    background: "#1e293b",
    padding: "15px",
    borderRadius: "10px",
    color: "white",
    textAlign: "center",
    maxWidth: "300px",
    margin: "20px auto",
  },
};

export default ScoreCard;