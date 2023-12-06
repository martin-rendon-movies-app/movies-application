"use strict";

(() => {
    const movieCon = document.querySelector("#movie-container");
    const submitBtn = document.querySelector("#submit-btn");

    async function allMovies() {
        movieCon.innerHTML = `<h2>Loading...</h2>`;
        const response = await fetch("http://localhost:3000/movies").then(resp => resp.json());
        movieCon.innerHTML = ``;
        renderMovie(response);
    }

    function renderMovie(movies) {
        movies.forEach(movie => {
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
        })
    }

    async function addMovie(e) {
        e.preventDefault();
        const titleVal = document.querySelector("#title").value;
        const ratingVal = document.querySelector("#rating").value;
        const newMovieObj = {
            title: titleVal,
            rating: ratingVal
        };
        try {
            const url = `http://localhost:3000/movies`;
            const options = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newMovieObj)
            };
            const resp = await fetch(url, options);
            const newMovie = await resp.json().then(data => {
                return data
            }).catch(error => console.log("error" + error));
            console.log(newMovie);
            await allMovies();
            return newMovie;
        } catch (error) {
            console.error(error);
        }
    }

    allMovies();

    submitBtn.addEventListener("click", addMovie);
})();