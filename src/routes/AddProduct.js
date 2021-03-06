import React from 'react';
import axios from 'axios';
import { useState, useRef } from "react";
import Notification from "../components/Notification";
const FormData = require("form-data");

axios.defaults.headers['x-api-key'] = process.env.REACT_APP_API_KEY;

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
            headers: {"Content-Type": `multipart/form-data; boundary=${data._boundary}`},
        });
        return ipfsImg.data;
    }

    async function uplaodInDb(e) {
        e.preventDefault();
        let account = localStorage.getItem('account');
        let fileCid = await uploadImageOnIpfs(e)
        const resp = await starton.post(process.env.REACT_APP_BACKEND_URL + "/CID", {
            "name" : name.value,
            "description" : description.value,
            "price" : price.value,
            "CID" : fileCid.pinStatus.pin.cid,
            "seller" : account
        });
    }

    function handleOnClick(e) {
        e.preventDefault();
        uplaodInDb(e)
        form.current.reset();
        setNotif(true);
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
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Name of your product" onChange={(event) => setName({value: event.target.value})} />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-800 text-sm font-bold mb-2">Description*: </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Description of your product" onChange={(event) => setDescription({value: event.target.value})} />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-800 text-sm font-bold mb-2">Price ($MATIC)*: </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="number" placeholder="0" onChange={(event) => setPrice({value: event.target.value})} />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-800 text-sm font-bold mb-2">Image of your product*: </label>
                    <input className="pt-6 pb-8 mb-4 border rounded p-10" type="file" name="image" onChange={uploadPicture} />
                </div>
                <div className="mb-4">
                <button onClick={handleOnClick} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" type="submit"  name="upload">
                        Upload
                    </button> 
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