import React, { useState } from 'react';
import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Login from 'pages/Login';
import Home from 'pages/Home';
import Viewer from 'pages/Viewer';

function App() {
  const [token, setToken] = useState(null);
  const requireAuth = process.env.REACT_APP_REQUIRE_AUTH === 'true';
  console.log('Require Auth:', requireAuth);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route
          path="/"
          element={requireAuth && !token ? <Navigate to="/login" /> : <Home />}
        />
        <Route path="/viewer" element={<Viewer />} />
      </Routes>
    </Router>
  );
}

export default App;
