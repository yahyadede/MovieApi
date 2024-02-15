// Import the axios library
const axios = require('axios');
const { it } = require('mocha');
const { json } = require('mocha/lib/reporters');
const movies=require('../data/movies.json').movies;
const getMovies = (done) => {
  // get all movies
  done=JSON.stringify(movies)
  return done
}

const getMoviesById = (movieId, done) => {
  // get movie by id
  let movieexstingId=movies.find(movie=>movie.id===movieId)
  if(!movieexstingId){
    return done("the requested id dosn't exist")
  }
  return done(null,JSON.stringify(movieexstingId))
}

const saveMovie = function (newMovie, done) {
  // save the details of a movie read from the request body
  const id= movies.find(item=>item.id===newMovie.id)
  if(id){
    return done("the giving data is already exist")
  }
   movies.push(newMovie)
  return done(null,JSON.stringify(movies))
}

const updateMovie = function (movieId, updateData, done) {
 // update movie details of a specific movie
 const existingId=movies.find(item=>item.id===movieId)
 if(existingId){
  let movieIndex=movies.findIndex((item)=>item.id===movieId)
  if(movieIndex!=-1){
    movies[movieIndex]={...movies[movieIndex],...updateData}

  }
  done(null,JSON.stringify(movies))
 }
 done("Requested product doesn't exist..!");
}

const deleteMovieById = function (movieId, done) {
  // delete a specific movie 
  const existingId=movies.find(item=>item.id===movieId)
  if(existingId){
    const index=movies.indexOf(existingId)
    movies.splice(index,1)
    return done(null,JSON.stringify(movies))
  }
  return done("Requested product doesn't exist..!")
}



module.exports = {
  getMovies,
  getMoviesById,
  saveMovie,
  updateMovie,
  deleteMovieById
}
