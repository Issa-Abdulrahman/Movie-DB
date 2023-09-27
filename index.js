const express = require('express')
const app = express();
const port= 10452
app.get('/',(req,res) => (
    res.json("OK")
));

app.get('/test',(req,res) => (
    res.status(200).json({status:200,message:"ok"})
));

const now= new Date();
app.get('/time',(req,res)=>{
    res.status(200).json({status:200,message:now.getHours() +":"+now.getSeconds()})
});

app.get('/hello/:id?',(req,res) => {
    const id = req.params.id;
    res.status(200).json({status:200, message:`hello, ${id}`})
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
    res.status(200).json({status:200,data:moviesByDate});

});

app.get('/movies/read/by-rate',(req,res) => {
    const moviesByDate = [...movies].sort((a, b) => b.rating-a.rating);
    res.status(200).json({status:200,data:moviesByDate});

});

app.get('/movies/read/by-title',(req,res) => {
    const moviesByDate = [...movies].sort((a, b) => a.title.localeCompare(b.title));
    res.status(200).json({status:200,data:moviesByDate});

});

app.get('/movies/read/id/:id', (req,res) => {
     let movieId=req.params.id;
     
    if((movieId)>0 && (movieId)<movies.length){
        res.status(200).json({status:200,data:movies[req.params.id]})
    }else{
        res.status(404).json({status:404, error: true,message:`${req.params.id} does not exist`})
    }
    

});

app.get('/movies/add',(req,res) => {
    const title = req.query.title;
    const year = parseInt(req.query.year);
    const rating= req.query.rate;
    

    if(!(title) || isNaN(year) || !year.toString().length==4 || !(rating)){
        res.status(403).json({status:403, error: true,message:`You cannot create a movie without providing a title and a year.`})
    }
    else {
        const newRate=rating || "4";
        const newMovie={title:title,year:year,rating:newRate};
        movies.push(newMovie);
        res.status(200).json({status:200,data:movies})

    }
})
app.get('/movies/delete:id',(req,res) => {
    const movieId=req.params.id;
    const index= movies.findIndex( movie =>  movie.id===movieId);
    if(index!==-1){
        movies.splice(index,1);
        res.status(200).json({status:200, data:movies});
    }
    else{
        res.status(404).json({status:404, error:true, message:`the movie ${movieId} does not exist`});
    }
})

app.listen(port, () =>{
    
})


