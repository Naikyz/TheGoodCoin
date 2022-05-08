import React, {useState, useEffect} from 'react';
import Footer from "../components/Footer";
import { Jazzicon } from '@ukstv/jazzicon-react';
import styled from '@emotion/styled';
import axios from 'axios';
import ItemCard from "../components/Card";
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
axios.defaults.headers['x-api-key'] = process.env.REACT_APP_API_KEY;


function Profile() {
    const starton = axios.create({
        baseURL: "https://api.starton.io/v2",
    });
    const [ready, setReady] = useState(false);
    const [owned, setOwned] = useState([]);
    const [selling, setSelling] = useState([]);

    let account = localStorage.getItem('account');

    async function getOwned(account) {
        console.log("uhfdufudfhdhfdu")
        setOwned(await starton.get(process.env.REACT_APP_BACKEND_URL + "/sales/owner/" + account));
        setReady(true);
        console.log(owned)
    }

    async function getSelling(account) {
        console.log("uhfdufudfhdhfdu")
        setSelling(await starton.get(process.env.REACT_APP_BACKEND_URL + "/sales/seller/" + account));
        setReady(true);
        console.log(selling)
    }
    
    useEffect(() => {
        getOwned(account);
        getSelling(account);
    }, [ready])

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
                                {/* <ModifiedJazzicon address={account} /> */}
                                <h1 className="text-xl mt-2">Your wallet adress is {account}</h1>
                                <div className="flex justify-around mt-3 px-4">
                                    <div className="flex flex-col">
                                        <span className="font-bold text-2xl">{(owned?.data?.length)? owned.data.length : 0}</span>
                                        <span className="text-sm text-gray-800">Under Delivery</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-2xl">0</span>
                                        <span className="text-sm text-gray-800">Received</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-2xl">{(selling?.data?.length)? selling.data.length : 0}</span>
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
                {owned?.data?.length ?
                <div className="flex flex-wrap justify-around content-center">
                    {owned.data.map((item) => (<ItemCard key={item.CID} item={item} owned={true} sold={false}/>))}
                </div>: <div className="text-center">0</div>}
                <div>
                    <h2 className="block text-gray-700 text-center font-bold mt-11">Sold Products</h2>
                </div>
                {selling?.data?.length ?
                <div className="flex flex-wrap justify-around content-center mr-10">
                    {selling.data.map((item) => (<ItemCard key={item.CID} item={item} owned={false} sold={true}/>))}
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