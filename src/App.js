import React, { useState } from "react";
import Login from "./Login";
import AddLocation from "./AddLocation";
import AddReport from "./AddReport";
import Dashboard from "./Dashboard";
import API from "./api";
import "./App.css";
import MapView from "./MapView";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const [score, setScore] = useState(null);

  // 🔥 Fetch score
  const fetchScore = async (locationId) => {
    try {
      const res = await API.get(`score/${locationId}/`);
      setScore(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!loggedIn) {
    return <Login setLoggedIn={setLoggedIn} />;
  }

  return (
    <div className="main">
      <div className="navbar">
        <h2>🌬️ Crowd Trust</h2>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.reload();
          }}
        >
          Logout
        </button>
      </div>

      <div className="dashboard">
        <div className="left-panel">
          <div className="card">
            <AddLocation />
          </div>

          <div className="card">
            <AddReport fetchScore={fetchScore} />
          </div>
        </div>

        <div className="right-panel">
  <div className="card">
    <Dashboard score={score} fetchScore={fetchScore} />
  </div>

  <div className="card">
    <MapView />
  </div>
</div>
      </div>
    </div>
  );
}

export default App;