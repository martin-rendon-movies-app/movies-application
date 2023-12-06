"use strict";

(()=>{
    const movieCon = document.querySelector("#movie-container")
    async function allMovies(){
     const response = await  fetch("http://localhost:3000/movies").then(resp => resp.json()).then(data => {return data});
     renderMovie(response);
   }
    console.log(allMovies());

    function renderMovie(Movies){
        Movies.forEach(movie => {
            const movieCard = document.createElement("div")
            const movieTitle = document.createElement("h3")
            const movieRating = document.createElement("div")
            const movieSummary = document.createElement("p")
            movieTitle.innerHTML = movie.title;
            movieRating.innerHTML = movie.rating.toString();
            movieSummary.innerHTML = movie.movieSummary;
            movieCard.appendChild(movieTitle);
            movieCard.appendChild(movieRating);
            movieCard.appendChild(movieSummary);
            movieCon.appendChild(movieCard);

            console.log(movie);


        })
    }
})();