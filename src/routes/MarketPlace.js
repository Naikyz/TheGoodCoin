import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ItemCard from "../components/Card";
axios.defaults.headers['x-api-key'] = '8RT7VQVZUUCux2vbf1Ng0utDldWU6QJo';


function MarketPlace() {

    const starton = axios.create({
        baseURL: "https://api.starton.io/v2",
    });

    const [ready, setReady] = useState(false);
    const [data, setData] = useState([{}]);

    useEffect(() => {

        async function getData() {
            setData(await starton.get("https://aleph.sh/vm/e3e1ccaa0d569d3a9890c3a501be4407449b76cd2ec8d170d1d80c7c7b2e198d/CID/"));
            setReady(true);
        }

        getData();

    }, [ready])


    return (
        <>
        {ready ?
        <div className="flex flex-wrap justify-around content-center">
            {data.data.map((item) => (<ItemCard key={item.CID} item={item}/>))}
        </div> : <>Chargement ...</>}</>
    );
}

export default MarketPlace;