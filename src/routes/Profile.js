import React, {useState, useEffect} from 'react';
import Footer from "../components/Footer";
import { Jazzicon } from '@ukstv/jazzicon-react';
import styled from '@emotion/styled';
import axios from 'axios';
import ItemCard from "../components/Card";
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import { abi } from "../abi.js";
import Web3 from 'web3'
// axios.defaults.headers['x-api-key'] = process.env.REACT_APP_API_KEY;

const ethEnabled = async () => {
    if (window.ethereum) {
      await window.ethereum.request({method: 'eth_requestAccounts'});
        window.web3 = new Web3(Web3.givenProvider)
      return true;
    }
    return false;
}

function Profile() {
    const starton = axios.create({
        baseURL: "https://api.starton.io/v2",
    });
    const [ready, setReady] = useState(false);
    const [owned, setOwned] = useState([]);
    const [selling, setSelling] = useState([]);
    const [contract, setContract] = useState(null)

    let account = localStorage.getItem('account');

    async function initContract() {
        if (await ethEnabled() === false) console.log("NOT ENABLED"); else console.log("bob");
        console.log(abi)
        setContract(new window.web3.eth.Contract(abi, process.env.REACT_APP_CONTRACT_ADD));
    }

    async function getOwned(account) {
        await contract.methods.getCommandsByAddress(window.ethereum.selectedAddress).call({from: window.ethereum.selectedAddress})
        .then(function(res){
            console.log(res)
            setOwned(res)
        }).catch((err) => {
        });
    }

    async function getSelling(account) {
        await contract.methods.getItemsToSellByAddress(window.ethereum.selectedAddress).call({from: window.ethereum.selectedAddress})
        .then(function(res){
            console.log(res)
            setSelling(res)
        }).catch((err) => {
        });
    }
    
    useEffect(() => {
        if (!contract)
            initContract()
        if (contract) {
            getOwned(account);
            getSelling(account);
        }
    }, [contract])

    const ModifiedJazzicon = styled(Jazzicon)({
        width: 100,
        height: 100,
        marginLeft: 'auto',
        marginRight: 'auto'
      });

    return (
        <div>
            <div className="h-full py-20 px-3">
                <div className="max-w-md mx-auto md:max-w-lg">
                    <div className="w-full">
                        <div className="bg-white p-3 text-center py-5 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                            <div className="text-center">
                                <ModifiedJazzicon address={account} />
                                <h1 className="text-xl mt-2">Your wallet adress is {account}</h1>
                                <div className="flex justify-around mt-3 px-4">
                                    <div className="flex flex-col">
                                        <span className="font-bold text-2xl">{(owned?.length)? owned.length : 0}</span>
                                        <span className="text-sm text-gray-800">Under Delivery</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-2xl">0</span>
                                        <span className="text-sm text-gray-800">Received</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-2xl">{(selling?.length)? selling.length : 0}</span>
                                        <span className="text-sm text-gray-800">Sold Products</span>
                                    </div>
                                </div>

                                <div className="flex flex-row px-4 mt-4">
                                    <a href="/add-product" className="h-10 w-full p-2 text-white rounded bg-gray-800 hover:bg-gray-900">Sell Product</a>
                                </div>
                                <div className="flex flex-row px-4 mt-4">
                                    <a href="/marketplace" className="h-10 w-full p-2 text-white rounded bg-gray-800 hover:bg-gray-900">Buy Product</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <>
                <div>
                <div>
                    <h2 className="block text-gray-700 text-center font-bold mt-11">Bought Products</h2>
                </div>
                {owned?.length ?
                <div className="flex flex-wrap justify-around content-center">
                    {owned.map((item, index) => {
                    if (item?.cid)
                        return <ItemCard key={index} itemToSell={{cid: item.cid, price: item.price, id: index, balance: item.balance, timeUnlock: item.timeUnlock}} owned={true} sold={false}/>
                    return
                    })}
                </div>: <div className="text-center">0</div>}
                <div>
                    <h2 className="block text-gray-700 text-center font-bold mt-11">Selling Products</h2>
                </div>
                {selling?.length ?
                <div className="flex flex-wrap justify-around content-center mr-10">
                    {selling.map((item, index) => {
                    if (item?.cid)
                        return <ItemCard key={index} itemToSell={{cid: item.cid, price: item.price, id: index}} owned={false} sold={item.sold}/>
                    return
                })}
                </div> : <div className="text-center">0</div>}
                </div>
                </>

            </div>
            <footer className="bg-white">
                <Footer />
            </footer>
        </div>
    );
}

export default Profile;