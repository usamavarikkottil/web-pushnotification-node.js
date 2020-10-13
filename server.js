const express = require('express');
const webpush = require('web-push');
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname ,"client")));

// ./node_modules/.bin/web-push generate-vapid-keys
const publicVapidKey = "BEDOEHpK6F367nT-y7cpk0u0UE2bC_rLR48wuzQzIbdVw4NEBfasdQg_P3LDzbutk75u3wiUpYUJj7mC0xzhRvE";
const privateVapidKey =  "47uWX3PNCTJ-0YI5RxsJi1cA2qcDbCtZAAa5QiY5rIo";

webpush.setVapidDetails("mailto:varikkottilusama@gmail.com", publicVapidKey, privateVapidKey);

//Subscribe route

app.post("/subscribe", (req, res) => {
    //Get push subscription object

    const subscription = req.body;

    //Send 201 - resource created 
    res.status(201).json({});

    //Create payload
    const payload = JSON.stringify({title: "push testing usama"});

    // Pass Object into send Notification
    webpush.sendNotification(subscription, payload)
    .catch(err => console.log(err));
})

app.listen(5000, () => console.log("server started on 5000"));