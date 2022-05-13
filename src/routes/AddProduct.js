import React from 'react';
import axios from 'axios';
import { useRef, useState, useEffect } from "react";
import Notification from "../components/Notification";
import { abi } from "../abi.js";
import Web3 from 'web3'
const FormData = require("form-data");


// axios.defaults.headers['x-api-key'] = process.env.REACT_APP_API_KEY;

const ethEnabled = async () => {
    if (window.ethereum) {
      await window.ethereum.request({method: 'eth_requestAccounts'});
        window.web3 = new Web3(Web3.givenProvider)
      return true;
    }
    return false;
}

function AddProduct() {
    const starton = axios.create({
        baseURL: "https://api.starton.io/v2",
    });
    const [name, setName] = useState('my name');
    const [description, setDescription] = useState('description');
    const [price, setPrice] = useState(0);
    const [picture, setPicture] = useState({});
    const [notif, setNotif] = useState(false);
    const form = useRef(null);
    const [contract, setContract] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    async function initContract() {
        if (await ethEnabled() === false) console.log("NOT ENABLED"); else console.log("bob");
        console.log(process.env.REACT_APP_CONTRACT_ADD)
        setContract(new window.web3.eth.Contract(abi, process.env.REACT_APP_CONTRACT_ADD));
    }

    async function uploadJsonOnIpfs() {
        let json = {
            "name" : name,
            "description" : description,
            "image" : `${(await uploadImageOnIpfs()).pinStatus.pin.cid}`,
        }

        const ipfsJson = await starton.post("https://api.starton.io/v2/pinning/content/json", {
            name: name + " nft",
            content: json,
            isSync: true
        }, {
            maxBodyLength: "Infinity",
            headers: {"x-api-key": process.env.REACT_APP_API_KEY},
        });
        return ipfsJson.data;
    }

    useEffect(() => {
        initContract()
    }, [])

    const uploadPicture = (e) => {
        setPicture({
            picturePreview: URL.createObjectURL(e.target.files[0]),
            pictureAsFile: e.target.files[0],
        });
    };

    async function uploadImageOnIpfs(e) {
        let data = new FormData();
        data.append("file", picture.pictureAsFile, name.value);
        data.append("isSync", "true");

        const ipfsImg = await starton.post("https://api.starton.io/v2/pinning/content/file", data, {
            maxBodyLength: "Infinity",
            headers: {"Content-Type": `multipart/form-data; boundary=${data._boundary}`, "x-api-key": process.env.REACT_APP_API_KEY},
        });
        return ipfsImg.data;
    }

    async function createItem() {
        let cid = (await uploadJsonOnIpfs()).pinStatus.pin.cid
        console.log(price)
        console.log(parseInt(price))
        contract.methods.createItem(price, cid).send({from: window.ethereum.selectedAddress})
        .on("receipt", function(res){
            console.log(res)
            setNotif(true);
            setIsLoading(false)
        }).catch((err) => {setIsLoading(false)});
    }

    async function handleOnClick(e) {
        setIsLoading(true)
        e.preventDefault();
        await createItem(e)
        form.current.reset();
    }
    
    return (
        <>
        {
        <div className= {(!notif ? "invisible" : "") + " flex justify-end pt-5 pr-5"}>
        <Notification />
        </div>
        }
        <div className="flex justify-center items-center bg-center mt-10">
            <form ref={form} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h1 className="block text-gray-700 text-center font-bold mb-2" >Enter informations about your product</h1>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Name*: </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Name of your product" onChange={(event) => setName(event.target.value)} />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-800 text-sm font-bold mb-2">Description*: </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Description of your product" onChange={(event) => setDescription(event.target.value)} />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-800 text-sm font-bold mb-2">Price ($BNB)*: </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="number" placeholder="0" onChange={(event) => setPrice(window.web3.utils.toWei((event.target.value).toString()))} />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-800 text-sm font-bold mb-2">Image of your product*: </label>
                    <input className="pt-6 pb-8 mb-4 border rounded p-10" type="file" name="image" onChange={uploadPicture} />
                </div>
                <div className="mb-4">
                
                {!isLoading && <button onClick={handleOnClick} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" type="submit"  name="upload">
                    Upload
                </button> }
                {isLoading && <button disabled className="inline-flex bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Uploading ...
                </button> }
                </div>
                <div className="mb-4">
                <   p className="block text-gray-700 text-center font-bold mb-2" >* = Needed section</p>
                </div>
            </form>
        </div>
        </>
        
    );
}

export default AddProduct;