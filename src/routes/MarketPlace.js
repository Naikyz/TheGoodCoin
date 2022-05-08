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
    
    async function getData() {
        setData(await starton.get("https://aleph.sh/vm/26b8cf21f040ff57c4e96054cf8fd2dc1ce249af10d1e17ca53068c9274045af/CID"));
        setReady(true);
    }

    async function reload() {
        setData(await starton.get("https://aleph.sh/vm/26b8cf21f040ff57c4e96054cf8fd2dc1ce249af10d1e17ca53068c9274045af/CID"));
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
            {data.data.map((item) => (<ItemCard key={item.CID} item={item} reload={reload}/>))}
        </div> : <>Chargement ...</>}
        </div>
            <footer className="bg-white">  
                <Footer />
            </footer>
        </>
    );
}

export default MarketPlace;