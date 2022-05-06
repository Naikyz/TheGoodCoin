import { BrowserRouter, Route, Routes as Router } from "react-router-dom";
import Login from './routes/Login';
import './App.css';

function App() {
  return (
    <BrowserRouter>
    <Router>
      <Route
        path="/"
        element={
          <div style={{ marginTop: 20 }}>
            <h1>HOME</h1>
          </div>
        }
      />
      <Route path="login" element={<Login />} />
    </Router>
  </BrowserRouter>
  );
}

export default App;
