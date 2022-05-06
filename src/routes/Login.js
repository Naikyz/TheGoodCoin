import React from 'react';


function Login() {
    const axios = require("axios");
    return (
        <div>
            <h1>Login</h1>
            <button onClick={() => {
                const http = axios.create({
                    baseURL: "https://api.starton.io/v2",
                    headers: {
                        "x-api-key": 'VN1V84XJ2undibI57qrvFpKSnMlNFDta',
                    },
                })
                http.get('/smart-contract-template').then(response => {
                console.log(response.data)
                })
            }
}>CALL API</button>
        </div>
    );
}

export default Login;