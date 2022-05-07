import React from 'react';
import Footer from "../components/Footer"


function Profile() {

    let account = localStorage.getItem('account');
    console.log(account);
    
    return (
        <div>
            <h1 className="">Welcome ! You wallet address: {account}</h1>

            <a href="/add-product" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Sell New Product</a>
            <footer className="bg-white">  
                <Footer />
            </footer>
        </div>
    );
}

export default Profile;