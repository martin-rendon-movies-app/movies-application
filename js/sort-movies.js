"use strict";

import {allMovies} from "./index.js";

function updateRating(movieList) {
    if (document.querySelector("#rating").value !== "all") {
        const filteredMovies = movieList.filter((movie) => {
            return movie.rating.toString() === document.querySelector("#rating").value;
        });
        allMovies(filteredMovies);
    } else {
        allMovies();
    }
}

function updateTitle(movieList) {
    if (document.querySelector("#rating").value !== "all") {
        let filteredMoviesByRating = movieList.filter((movie) => {
            return movie.rating.toString() === document.querySelector("#rating").value;
        });
        const filteredMovies = filteredMoviesByRating.filter((movie) => {
            return movie.title.toLowerCase().includes(document.querySelector("#title").value.toLowerCase().trim());
        });
            allMovies(filteredMovies);
    } else {
        const filteredMovies = movieList.filter((movie) => {
            return movie.title.toLowerCase().includes(document.querySelector("#title").value.toLowerCase().trim());
        });
        allMovies(filteredMovies);
    }
}

// sets functionality of form inputs to filtering by title/rating-------------------
export default function sortMovies(e, movieList) {
    document.querySelector("#movie-container").innerHTML = "";
    if (e.target.id === "rating") {
        updateRating(movieList);
    } else {
        updateTitle(movieList);
    }
}