import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ItemCard from "../components/Card";
import Footer from "../components/Footer"
import Web3 from 'web3'
import { abi } from "../abi.js";
axios.defaults.headers['x-api-key'] = process.env.REACT_APP_API_KEY;

const ethEnabled = async () => {
    if (window.ethereum) {
      await window.ethereum.request({method: 'eth_requestAccounts'});
        window.web3 = new Web3(Web3.givenProvider)
      return true;
    }
    return false;
}

function MarketPlace() {

    const starton = axios.create({
        baseURL: "https://api.starton.io/v2",
    });

    const [ready, setReady] = useState(false);
    const [data, setData] = useState([{}]);
    const [contract, setContract] = useState(null)

    async function initContract() {
        if (await ethEnabled() === false) console.log("NOT ENABLED"); else console.log("bob");
        console.log(abi)
        setContract(new window.web3.eth.Contract(abi, "0x1B88D077fbAaf5eCC2FE4691B235Ea81abdc6010"));
    }

    async function itemsToSell() {
        // let cid = (await uploadJsonOnIpfs()).pinStatus.pin.cid
        for (let i = 0; ; i += 1) {
            contract.methods.itemsToSell(3).call({from: window.ethereum.selectedAddress})
            .then(function(res){
                console.log(res)
            }).catch((err) => {});
        }
    }
    
    async function getData() {
        setData(await starton.get(process.env.REACT_APP_BACKEND_URL + "/CID"));
        setReady(true);
    }

    async function reload() {
        setData(await starton.get(process.env.REACT_APP_BACKEND_URL + "/CID"));
        setReady(true);
    }

    useEffect(() => {

        initContract();
        getData();

    }, [ready])


    return (
        <>

        <button onClick={itemsToSell} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" type="submit"  name="upload">
            mint thingy
        </button> 
        <div>
        {ready ?
        <div className="flex flex-wrap justify-around content-center">
            {data.data.map((item) => (<ItemCard key={item.CID} item={item} reload={reload}  owned={false} sold={false}/>))}
        </div> : <>Chargement ...</>}
        </div>
            <footer className="bg-white">  
                <Footer />
            </footer>
        </>
    );
}

export default MarketPlace;