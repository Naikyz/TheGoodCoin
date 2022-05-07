import React from "react";



export default function ItemCard({item}) {

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <img className="w-full" src={"https://ipfs.io/ipfs/" + item.cid} alt="Sunset in the mountains"/>
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{item.name}</div>
                <p className="text-gray-700 text-base">
                {item.description}
                </p>
            </div>
            <div className="px-6 pt-4 pb-2">
                <button className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">BUY</button>
            </div>
        </div>
    );


    
    // return (
    //     <div style={{width:"350px"}}>
    //     <Card className="bg-black">
    //         <CardImage
    //             src={"https://ipfs.io/ipfs/" + item.cid}
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