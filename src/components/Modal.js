import { useState, useEffect } from "react";
import React from "react";
import axios from 'axios';
import { abi } from "../abi.js";
import Web3 from 'web3'


const ethEnabled = async () => {
    if (window.ethereum) {
      await window.ethereum.request({method: 'eth_requestAccounts'});
        window.web3 = new Web3(Web3.givenProvider)
      return true;
    }
    return false;
}

export default function Modal({ item, showModal, setShowModal, reload}) {

    const [bought, setBought] = useState(false);
    const [contract, setContract] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    async function initContract() {
        if (await ethEnabled() === false) console.log("NOT ENABLED"); else console.log("bob");
        setContract(new window.web3.eth.Contract(abi, process.env.REACT_APP_CONTRACT_ADD));
    }

    async function buyItem() {
        await contract.methods.buyItem(item.id).send({from: window.ethereum.selectedAddress, value: item.price})
        .then(function(res){
            console.log(res)
        }).catch((err) => {
        });
    }

    useEffect(() => {
        if (!contract)
            initContract();
    }, [])

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
                                <div className="max-w-sm rounded overflow-hidden shadow-lg mt-12">
                                    <img className=" px-10 w-full" src={"https://ipfs.io/ipfs/" + item.CID} alt="Sunset in the mountains"/>
                                    <div className="px-6 py-4">
                                        <div className="font-bold text-xl mb-2">{item.name}</div>
                                        <p className="text-gray-700 text-base">
                                        {item.description}
                                        </p>
                                    </div>
                                </div>
                                <div class="mb-3 pt-0">
                                    <input type="text" placeholder="Address to delivery..." class="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full" />
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => {setShowModal(false)}}
                                    >
                                        Close
                                    </button>
                                    {!isLoading && <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={async () => {
                                            setIsLoading(true)
                                            await buyItem();
                                            setIsLoading(false)
                                            reload()
                                            setShowModal(false)
                                        }}
                                    >
                                        Buy
                                    </button>}
                                    {isLoading && <button disabled className="inline-flex bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Loading ...
                                    </button> }
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