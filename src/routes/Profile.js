import React, {useState, useEffect} from 'react';
import Footer from "../components/Footer";
import { Jazzicon } from '@ukstv/jazzicon-react';
import styled from '@emotion/styled';
import axios from 'axios';
import ItemCard from "../components/Card";
axios.defaults.headers['x-api-key'] = '8RT7VQVZUUCux2vbf1Ng0utDldWU6QJo';


function Profile() {
    const starton = axios.create({
        baseURL: "https://api.starton.io/v2",
    });
    const [data, setData] = useState([{}]);

    
    useEffect(() => {
        let account = localStorage.getItem('account');
        setData(starton.get("https://aleph.sh/vm/d21949b4839ac48766cfa68c7b73eb88f31362bddf8857a096108c2ec4bc55b7/sales/owner/" + account));
    }, [starton])

    let account = localStorage.getItem('account');
    console.log(account);
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
                        <div className="bg-white p-3 rounded text-center py-5">
                            <div className="text-center">
                                <ModifiedJazzicon address={account} />
                                <h1 className="text-xl mt-2">Your wallet adress is {account}</h1>
                                <div className="flex justify-around mt-3 px-4">
                                    <div className="flex flex-col">
                                        <span className="font-bold text-2xl">19</span>
                                        <span className="text-sm text-gray-800">Under Delivery</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-2xl">3</span>
                                        <span className="text-sm text-gray-800">Received</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-2xl">1</span>
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
                {data.length ?
                <div className="flex flex-wrap justify-around content-center">
                    {data.data.map((item) => (<ItemCard key={item.CID} item={item}/>))}
                </div> : <>Chargement ...</>}
                </div>
                    <footer className="bg-white">  
                        <Footer />
                    </footer>
                </>

            </div>
            <footer className="bg-white">
                <Footer />
            </footer>
        </div>
    );
}

export default Profile;