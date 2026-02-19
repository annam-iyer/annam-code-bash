// 1. Importing a version of 'lodash' vulnerable to Prototype Pollution
const _ = require('lodash'); 

// 2. Importing 'axios' version with Server-Side Request Forgery (SSRF)
const axios = require('axios');

// 3. Importing 'moment' vulnerable to Regular Expression Denial of Service (ReDoS)
const moment = require('moment');

const userProfile = {};
const maliciousInput = "__proto__.admin";

function handleData(input) {
    // SCA Finding: lodash < 4.17.21 (CVE-2020-8203)
    _.set(userProfile, input, true); 
    
    // SCA Finding: moment < 2.29.4 (CVE-2022-31129)
    const date = moment("2024-01-01", "YYYY-MM-DD").format();

    // SCA Finding: axios < 1.6.0 (CVE-2023-45853)
    axios.get('https://api.example.com/data');

    console.log(`Profile updated at ${date}. Admin status: ${userProfile.admin}`);
}

handleData(maliciousInput);
