import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ItemCard from "../components/Card";
import Footer from "../components/Footer"
import Web3 from 'web3'
import { abi } from "../abi.js";
// axios.defaults.headers['x-api-key'] = process.env.REACT_APP_API_KEY;

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
        setContract(new window.web3.eth.Contract(abi, process.env.REACT_APP_CONTRACT_ADD));
    }

    async function getItemsToSell() {
        // let cid = (await uploadJsonOnIpfs()).pinStatus.pin.cid
        console.log(contract.methods)
        await contract.methods.getItemsToSell().call({from: window.ethereum.selectedAddress})
        .then(function(res){
            setData(res)
            console.log(res)
        }).catch((err) => {
        });
    }
    
    async function getData() {
        await getItemsToSell()
        setReady(true);
    }

    async function reload() {
        await getItemsToSell()
        setReady(true);
    }

    useEffect(() => {

        if (!contract)
            initContract();
        if (contract)
            getData();

    }, [contract])


    return (
        <>
        <div>
        {ready ?
        <div className="flex flex-wrap justify-around content-center">
            {data.map((item, index) => {
            if (item?.cid)
                return<ItemCard key={index} itemToSell={{cid: item.cid, price: item.price, id: index}} reload={reload}  owned={false} sold={false}/>
            return
            })}
        </div> : <>Chargement ...</>}
        </div>
            <footer className="bg-white">  
                <Footer />
            </footer>
        </>
    );
}

export default MarketPlace;