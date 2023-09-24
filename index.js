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

app.get('/hello/:id?',(req,res) => {
    const id = req.params.id;
    res.json({status:200, message:`hello, ${id}`})
}); 

app.get(['/search','/search/:data'],(req,res) => {
    let searchItem=req.params.data || req.query.s;
    if(searchItem){
        res.status(200).json({status:200, message:"ok",data:searchItem})
    }else{
        res.status(500).json({status:500,error:true, message:"you have to provide a search"})
    }
});

app.listen(port, () =>{
    
})


