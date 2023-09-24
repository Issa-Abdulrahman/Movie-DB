const express = require('express')
const app = express();
const port= 10452
app.get('/',(req,res) => (
    res.json("OK")
));

app.get('/test',(req,res) => (
    res.json({status:200,message:"ok"})
));

const now= new Date();
app.get('/time',(req,res)=>{
    res.json({status:200,message:now.getHours() +":"+now.getSeconds()})
});

app.listen(port, () =>{
    
})


