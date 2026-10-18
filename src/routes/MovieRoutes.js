// 1) import express
// const express = require('express'); // we can also import by
import express from 'express'; // By this way also we can do importing express by changing type to module in package.json and earlier it was set to commonjs.

const router = express.Router();

router.get("/hello" , (req,res) => {
    res.json({message : "Welcome to movie api"})
})

router.get("/navinharitha", (req,res) => {
    res.json({us:"beyond the end"})
})

router.get("/",(req,res) => {
    res.send("Hello, I'm learning node js :)")
})

export default router;