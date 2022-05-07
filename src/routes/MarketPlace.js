import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ItemCard from "../components/Card";
import Footer from "../components/Footer"
axios.defaults.headers['x-api-key'] = '8RT7VQVZUUCux2vbf1Ng0utDldWU6QJo';


function MarketPlace() {

    const starton = axios.create({
        baseURL: "https://api.starton.io/v2",
    });

    const [ready, setReady] = useState(false);
    const [data, setData] = useState([{}]);

    useEffect(() => {

        async function getData() {
            setData(await starton.get("https://aleph.sh/vm/6bbcf4ea69725318a41c634b66fb9ef840b10fe1be191abac02f4c62b9a86963/CID/"));
            setReady(true);
        }

        getData();

    }, [ready])


    return (
        <>
        <div>
        {ready ?
        <div className="flex flex-wrap justify-around content-center">
            {data.data.map((item) => (<ItemCard key={item.cid} item={item}/>))}
        </div> : <>Chargement ...</>}
        </div>
            <footer className="bg-white">  
                <Footer />
            </footer>
        </>
    );
}

export default MarketPlace;