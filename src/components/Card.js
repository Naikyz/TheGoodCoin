import React from "react";
import axios from 'axios';
axios.defaults.headers['x-api-key'] = '8RT7VQVZUUCux2vbf1Ng0utDldWU6QJo';


export default function ItemCard({item}) {

    const starton = axios.create({
        baseURL: "https://api.starton.io/v2",
    });

    async function uploadJsonOnIpfs() {
        let json = {
            "name" : item.name,
            "description" : item.description,
            "image" : `ipfs://ipfs/${item.CID}`,
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
        const resp = await starton.delete("https://aleph.sh/vm/e3e1ccaa0d569d3a9890c3a501be4407449b76cd2ec8d170d1d80c7c7b2e198d/CID/", {data: {
            "CID" : item.CID,
        }});
    }

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg mt-12">
            <img className="w-full" src={"https://ipfs.io/ipfs/" + item.CID} alt="Sunset in the mountains"/>
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{item.name}</div>
                <p className="text-gray-700 text-base">
                {item.description}
                </p>
            </div>
            <div className="px-6 pt-4 pb-2">
                <button onClick={mintNft} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{item.price} $</button>
            </div>
        </div>
    );


    
    // return (
    //     <div style={{width:"350px"}}>
    //     <Card className="bg-black">
    //         <CardImage
    //             src={"https://ipfs.io/ipfs/" + item.CID}
    //             alt="Card Image"
    //             width="300px"
    //         />

    //         <CardBody>
    //             <H6 color="gray">{item.name}</H6>
    //             <Paragraph color="gray">
    //                 {item.description}
    //             </Paragraph>
    //         </CardBody>

    //         <CardFooter>
    //             <Button color="lightBlue" size="lg" ripple="light">
    //                 BUY
    //             </Button>
    //         </CardFooter>
    //     </Card>
    //     </div>
    // );
}