const express = require('express');
const { Base_URL, Content_Base_URL } = require('../../connection');
const app = express.Router();
const axios = require('axios');
const CircularJSON = require('circular-json');
const { jsonAxios } = require('../utils/json-fetch');
app.post("/create", async(req, res)=>{
    try{
        const URL = Content_Base_URL+"/content"+"/create";
        const response = await jsonAxios({
            url: URL,
            method: "post",
            data: req.body,
          });
        return res.send(response);
    }catch(err){
        console.log(err.message, "error")
        res.status(400).send("Sorry")
    }
})

function circularSafeStringify(obj) {
    const cache = new Set();
    return JSON.stringify(obj, (key, value) => {
        if (typeof value === 'object' && value !== null) {
            if (cache.has(value)) {
                // Circular reference found, discard key
                return '[Circular Reference]';
            }
            // Store value in set
            cache.add(value);
        }
        return value;
    });
}

module.exports = app;