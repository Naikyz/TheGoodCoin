import React from 'react';
import axios from 'axios';
import { useState } from "react";
const FormData = require("form-data");

axios.defaults.headers['x-api-key'] = '8RT7VQVZUUCux2vbf1Ng0utDldWU6QJo';

function AddProduct() {
    const starton = axios.create({
        baseURL: "https://api.starton.io/v2",
    });
    const [name, setName] = useState('my name');
    const [description, setDescription] = useState('description');
    const [price, setPrice] = useState(0);
    const [picture, setPicture] = useState({});

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

    async function uploadJsonOnIpfs(e) {
        e.preventDefault()
        let fileCid = await uploadImageOnIpfs(e)
        let json = {
            "name" : name.value,
            "description" : description.value,
            "price" : price.value,
            "file" : `ipfs://ipfs/${fileCid.pinStatus.pin.cid}`,
        }

        const ipfsJson = await starton.post("https://api.starton.io/v2/pinning/content/json", 
        {
            name: name.value,
            content: json,
            isSync: true
        });
        return ipfsJson.data;
    }

    async function uplaodInDb(e) {
        e.preventDefault()
        const ipfsImg = await uploadJsonOnIpfs(e);
        const resp = await starton.post("https://aleph.sh/vm/5e0e06e9817d362c4d2eda531c62aaa99caef2c30eeca9b04cd57ba3ee3599d1/CID/", {
            "CID" : ipfsImg.pinStatus.pin.cid
        });
    }

    return (
        <div>
            <form onSubmit={uplaodInDb}>
                <input type="text" label="Name" onChange={(event) => setName({value: event.target.value})} />
                <input type="text" label="Description" onChange={(event) => setDescription({value: event.target.value})} />
                <input type="number" label="Price" onChange={(event) => setPrice({value: event.target.value})} />
                <input type="file" name="image" onChange={uploadPicture} />
                <br />
                <br />
                <button type="submit" name="upload">
                    Upload
                </button>
            </form>
        </div>
    );
}

export default AddProduct;