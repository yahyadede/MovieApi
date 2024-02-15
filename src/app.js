// Import the required dependencies
const http = require("http");
const moviesService = require("./moviesService");
const getRequestData = require("./utils");

// Define the port at which the application will run
const PORT = 5000;

// Define the server
const server = http.createServer(async (req, res) => {
  // Get all movies
  if(req.url==='/Movies/movie' && req.method==='GET'){
    res.writeHead(200,{
      'content-type':'application.json'
    })
    const moviesdata=moviesService.getMovies();
    res.end(moviesdata)
  }

  // Get a movie with specified id
  else if(req.url.startsWith('/Movies/movie/') && req.method==='GET'){
    const id = parseInt(req.url.split("/").pop(),10);
    moviesService.getMoviesById(id,(error,result)=>{
      if(error){
        res.writeHead(404,{
          'Content-type':'application.json'
        })
        res.end(JSON.stringify({error:error}))
      }
      else{
        res.writeHead(200,{
          'Content-type':'application.json'
        })
        res.end(result);
      }
    })
    
  }  
  // Save movie details
  else if(req.url==='/Movies/movie' && req.method==='POST'){
    let body= await getRequestData(req)
    moviesService.saveMovie(JSON.parse(body),(error,result)=>{
      if(error){
        res.writeHead(404,{
          'Content-type':'application.json'
        })
        res.end(JSON.stringify({error:error}))
      }
      else{
        res.writeHead(201,{
          'Content-type':'application.json'
        })
        res.end(result)
      }
    })
  }
  // Update a specific movie
   else if (req.url.startsWith('/Movies/movie/') && req.method==='POST'){
    const id=parseInt(req.url.split('/').pop(),10)
    let body= await getRequestData(req)
    moviesService.updateMovie(id,JSON.parse(body),(error,result)=>{
      if(error){
        res.writeHead(404,{
          'Content-type':'application.json'
        })
        res.end(JSON.stringify({error:error}))
      }
      else{
        res.writeHead(201,{
          'Content-type':'application.json'
        })
        res.end(result)
      }
    })
}
  // Delete a specific movie
  else if(req.url.startsWith('/Movies/movie/') && req.method==='DELETE'){
    const id =parseInt(req.url.split('/').pop(),10)
    moviesService.deleteMovieById(id,(error,result)=>{
      if(error){
        res.writeHead(404,{
          'Content-type':'application.json'
        })
        res.end(JSON.stringify({error:error}))
      }
      else{
        res.writeHead(200,{
          'Content-type':'application.json'
        })
        res.end(result)
      }
    })
    
  }
  // If no route present capture in the else part
  else {
    res.writeHead(404,{
      'Content-Type':'application/json'
    });
    res.end(JSON.stringify({error:'Not Found'}));
  }
});
// listen to the server on the specified port
server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
server.on("error", (error) => {
  if (error.code === "EADRINUSE") {
    console.log("Port already in use");
  }
});
