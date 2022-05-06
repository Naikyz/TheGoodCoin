import { BrowserRouter, Route, Routes as Router } from "react-router-dom";
import './App.css';
import Login from './routes/Login';
import Register from "./routes/Register";
import AddProduct from "./routes/AddProduct";
import MarketPlace from "./routes/MarketPlace";
import Profile from "./routes/Profile";

function App() {
  const axios = require("axios");
  return (
    <BrowserRouter>
    <Router>
      <Route
        path="/"
        element={
          <div style={{ marginTop: 20 }}>
            <button onClick={() => {
                const http = axios.create({
                    baseURL: "https://api.starton.io/v2",
                    headers: {
                        "x-api-key": 'VN1V84XJ2undibI57qrvFpKSnMlNFDta',
                    },
                })
                http.get('/smart-contract-template').then(response => {
                console.log(response.data)
                })
            }
}>CALL API</button>
            <h1>HOME</h1>
          </div>
        }
      />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="add-product" element={<AddProduct />} />
      <Route path="marketplace" element={<MarketPlace />} />
      <Route path="profile" element={<Profile />} />
    </Router>
  </BrowserRouter>
  );
}

export default App;
