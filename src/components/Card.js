import { useState, useEffect } from "react";
import React from "react";
import axios from 'axios';
import Web3 from 'web3'
import { abi } from "../abi.js";
import Modal from "./Modal.js";
import Notification from "../components/Notification";
// require('dotenv').config()
// import express from 'express'
// axios.defaults.headers['x-api-key'] = process.env.REACT_APP_API_KEY;

const ethEnabled = async () => {
    if (window.ethereum) {
      await window.ethereum.request({method: 'eth_requestAccounts'});
        window.web3 = new Web3(Web3.givenProvider)
      return true;
    }
    return false;
}

export default function ItemCard({itemToSell, reload, owned, sold}) {

    const [bought, setBought] = useState(false);
    const [item, setItem] = useState(null);
    const [contract, setContract] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [notif, setNotif] = useState(false);

    const starton = axios.create({
        baseURL: "https://api.starton.io/v2",
    });

    async function initContract() {
        if (await ethEnabled() === false) console.log("NOT ENABLED"); else console.log("bob");
        setContract(new window.web3.eth.Contract(abi, process.env.REACT_APP_CONTRACT_ADD));
    }

    async function getMetadata() {
        console.log(itemToSell)
        const ipfsJson = await starton.get("https://ipfs.io/ipfs/" + itemToSell.cid, {headers: {}})
        console.log(ipfsJson)
        setItem({name: ipfsJson.data.name, description: ipfsJson.data.description, CID: ipfsJson.data.image, price: itemToSell.price, id: itemToSell.id, balance: itemToSell.balance, timeUnlock: itemToSell.timeUnlock})
        console.log(item)
    }

    async function buyItem() {
        setShowModal(true);
    }

    async function getUnlockedMoney() {
        await contract.methods.getUnlockedMoney(item.id).send({from: window.ethereum.selectedAddress})
        .then(function(res){
            console.log(res)
            setNotif(true);
        }).catch((err) => {
        });
    }

    useEffect(() => {
        if (!contract)
            initContract();
        getMetadata()
    }, [])

    return (
        <>
        {
        <div className= {(!notif ? "invisible" : "") + " absolute flex justify-end pt-5 pr-5"}>
        <Notification />
        </div>
        }
        { item && 
            <div className="max-w-sm rounded overflow-hidden shadow-lg mt-12">
                <img className="w-full" src={"https://ipfs.io/ipfs/" + item.CID} alt="Sunset in the mountains"/>
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{item.name}</div>
                    <p className="text-gray-700 text-base">
                    {item.description}
                    </p>
                </div>
                <div className="px-6 pt-4 pb-2">
                    { owned === false && sold !== true && <button onClick={buyItem} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{item.price} $MATIC</button>}
                    { owned === true && <><div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Bought</div>
                    <button onClick={getUnlockedMoney} className={"inline-block "+ ((item.balance == 0 || item.timeUnlock > new Date().getTime() / 1000)? "bg-red-100" : "bg-green-100") + " rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"}> Haverst {item.balance}</button></>}
                    { sold === true && <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Sold</div>}
                </div>
            </div>
        }
        {item && showModal && <Modal item={item} showModal={showModal} setShowModal={setShowModal} reload={reload}/>}
        </>
    );


    
    // return ( 🐶🐶🐶🐶
    //     <div style={{width:"350px"}}>
    //     <Card className="bg-black">
    //         <CardImage
    //             src={"https://ipfs.io/ipfs/" + item.CID}
    //             alt="Card Image"
    //             width="300px"
    //         />

    //         <CardBody>
    //             <H6 color="gray">{item.name}</H6>
    //             <Paragraph color="gray">
    //                 {item.description}
    //             </Paragraph>
    //         </CardBody>

    //         <CardFooter>
    //             <Button color="lightBlue" size="lg" ripple="light">
    //                 BUY
    //             </Button>
    //         </CardFooter>
    //     </Card>
    //     </div>
    // );
}