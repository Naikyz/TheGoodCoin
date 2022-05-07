import { BrowserRouter, Route, Routes as Router } from "react-router-dom";
import './App.css';
import About from "./routes/About";
import AddProduct from "./routes/AddProduct";
import MarketPlace from "./routes/MarketPlace";
import Profile from "./routes/Profile";
import Nav from "./components/Nav";
import { Web3ReactProvider } from '@web3-react/core'
import Web3 from 'web3'
import MetamaskProvider from "./components/web3Provider";

function getLibrary(provider) {
  return new Web3(provider)
}

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <MetamaskProvider>
        <Nav />
        <BrowserRouter>
          <Router>
            <Route
              path="/"
              element={
                <div>
                </div>
              }
            />
            <Route path="about" element={<About />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path="profile" element={<Profile />} />
            <Route path="marketplace" element={<MarketPlace />} />
          </Router>
        </BrowserRouter>
      </MetamaskProvider>
    </Web3ReactProvider>
  );
}

export default App;
