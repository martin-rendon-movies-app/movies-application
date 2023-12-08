"use strict";

import {allMovies} from "./index.js";

function updateRating(movieList) {
    const filteredMovies = movieList.filter((movie) => {
        return movie.rating.toString() === document.querySelector("#rating").value;
    });
    allMovies(filteredMovies);
}

function sortByTitle(movieList){
    const filteredMovies = movieList.filter((movie) => {
        return movie.title.contains(document.querySelector("#title").value)
    });
    allMovies(filteredMovies);
}

// sets functionality of form inputs to filtering by title/rating---------------
export default function sortMovies(e, movieList) {
    if (e.target.id === "rating") {
        updateRating(movieList);
    } else {
        sortByTitle(movieList);
    }
}