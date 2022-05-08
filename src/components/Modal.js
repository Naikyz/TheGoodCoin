import { useState } from "react";
import React from "react";
import axios from 'axios';
axios.defaults.headers['x-api-key'] = '8RT7VQVZUUCux2vbf1Ng0utDldWU6QJo';

export default function Modal({ item }) {

    const [showModal, setShowModal] = React.useState(true);
    const [bought, setBought] = useState(false);

    const starton = axios.create({
        baseURL: "https://api.starton.io/v2",
    });

    async function uploadJsonOnIpfs() {
        let json = {
            "name": item.name,
            "description": item.description,
            "image": `ipfs://ipfs/${item.CID}`,
        }

        const ipfsJson = await starton.post("https://api.starton.io/v2/pinning/content/json",
            {
                name: item.name + " nft",
                content: json,
                isSync: true
            });
        return ipfsJson.data;
    }

    async function mintNft() {
        if (bought)
            return
        setBought(true)
        let metadata = await uploadJsonOnIpfs();
        let account = localStorage.getItem('account');
        const nft = await starton.post(`/smart-contract/polygon-mumbai/0xa85861b90aB64efdC965a7C03C8721Be18981b0b/call`,
            {
                functionName: "safeMint",
                signerWallet: "0xED623B5c49dC8aB72751c2300f8c499e53629dD8",
                speed: "low",
                params: [account, metadata.pinStatus.pin.cid],
            });
        removeInDb()
        return nft.data;
    }

    async function removeInDb() {
        let account = localStorage.getItem('account');
        // await starton.delete("https://aleph.sh/vm/d21949b4839ac48766cfa68c7b73eb88f31362bddf8857a096108c2ec4bc55b7/CID", {data: {
        //     "CID" : item.CID,
        // }});

        await starton.post("https://aleph.sh/vm/d21949b4839ac48766cfa68c7b73eb88f31362bddf8857a096108c2ec4bc55b7/CID/sales", {
            "CID" : item.CID,
            "owner": account,
        });
        reload();
    }

    return (
        <>
            {/* <button
        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Open regular modal
      </button> */}
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <img className="w-full" src={"https://ipfs.io/ipfs/" + item.CID} alt="Sunset in the mountains" />
                                    <h3 className="text-3xl font-semibold">
                                        {item.name}
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <p className="my-4 text-slate-500 text-lg leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                                <div class="mb-3 pt-0">
                                    <input type="text" placeholder="Address to delivery..." class="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full" />
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => {
                                            mintNft();
                                            setShowModal(false)
                                        }}
                                    >
                                        Buy
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}