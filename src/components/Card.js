import { useState } from "react";
import React from "react";
import axios from 'axios';
import Modal from "./Modal";
axios.defaults.headers['x-api-key'] = '8RT7VQVZUUCux2vbf1Ng0utDldWU6QJo';


export default function ItemCard({ item, reload, owned, sold }) {

    const [bought, setBought] = useState(false);
    const [modal, setModal] = useState(false);

    function handleOnClick(e) {
        e.preventDefault();
        setModal(true);
    }

    return (
        <>
            <div className="max-w-sm rounded overflow-hidden shadow-lg mt-12">
                <img className="w-full" src={"https://ipfs.io/ipfs/" + item.CID} alt="Sunset in the mountains" />
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{item.name}</div>
                    <p className="text-gray-700 text-base">
                        {item.description}
                    </p>
                </div>
                <div className="px-6 pt-4 pb-2">
                    {owned === false && sold !== true && <button onClick={handleOnClick} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 ">{item.price} $MATIC</button>}
                    {owned === true && <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Buyed</div>}
                    {sold === true && <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Sold</div>}
                </div>
            </div>
            {modal && <Modal item={item}/>}
        </>
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