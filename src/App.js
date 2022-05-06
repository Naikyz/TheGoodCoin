import { BrowserRouter, Route, Routes as Router } from "react-router-dom";
import './App.css';
import About from "./routes/About";
import AddProduct from "./routes/AddProduct";
import MarketPlace from "./routes/MarketPlace";
import Profile from "./routes/Profile";
import Nav from "./components/Nav";

function App() {
  return (
    <BrowserRouter>
    <Router>
      <Route
        path="/"
        element={
          <div>

              <Nav />
          </div>
        }
      />
      <Route path="about" element={<About  />} />
      <Route path="add-product" element={<AddProduct />} />
      <Route path="marketplace" element={<MarketPlace />} />
      <Route path="profile" element={<Profile />} />
    </Router>
  </BrowserRouter>
  );
}

export default App;
