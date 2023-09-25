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

const movies=[{title:'Jaws',year:1975 ,rating:8},
{title:'Avatar',year:2009 ,rating:7.8},
{title:'Brazil',year:1985 ,rating:8},
{title:'الإرهاب والكباب‎',year:1975 ,rating:6.2}]


app.get('/movies/create', (req, res) => {
    res.send('Movie created successfully');
  });
  
app.get('/movies/read', (req, res) => {
    res.send({ status: 200, data: movies});
  });
  
app.get('/movies/update', (req, res) => {
    res.send('Movie updated successfully');
  });
  
app.get('/movies/delete', (req, res) => {
    res.send('Movie deleted successfully');
  });

app.get('/movies/read/by-date',(req,res) => {
    const moviesByDate = [...movies].sort((a, b) => a.date-b.date);
    res.json({status:200,data:moviesByDate});

});

app.get('/movies/read/by-rate',(req,res) => {
    const moviesByDate = [...movies].sort((a, b) => b.rating-a.rating);
    res.json({status:200,data:moviesByDate});

});

app.get('/movies/read/by-title',(req,res) => {
    const moviesByDate = [...movies].sort((a, b) => a.title.localeCompare(b.title));
    res.json({status:200,data:moviesByDate});

});

app.listen(port, () =>{
    
})


