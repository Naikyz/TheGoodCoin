import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ItemCard from "../components/Card";
import Footer from "../components/Footer"
axios.defaults.headers['x-api-key'] = process.env.REACT_APP_API_KEY;


function MarketPlace() {

    const starton = axios.create({
        baseURL: "https://api.starton.io/v2",
    });

    const [ready, setReady] = useState(false);
    const [data, setData] = useState([{}]);
    
    async function getData() {
        setData(await starton.get(process.env.REACT_APP_BACKEND_URL + "/CID"));
        setReady(true);
    }

    async function reload() {
        setData(await starton.get(process.env.REACT_APP_BACKEND_URL + "/CID"));
        setReady(true);
    }

    useEffect(() => {


        getData();

    }, [ready])


    return (
        <>
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