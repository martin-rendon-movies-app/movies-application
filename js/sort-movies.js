"use strict";

import {allMovies} from "./index.js";

function updateRating(movieList) {
    let filteredMovies = movieList.filter((movie, movieList.length, movieList) => {
            return movie.rating === document.querySelector("#rating").value;
    });
    console.log(filteredMovies);
    allMovies(filteredMovies);
}

// sets functionality of form inputs to filtering by title/rating---------------
export default function sortMovies(e, movieList) {
    if (e.target.id === "rating") {
        updateRating(movieList);
    } else {
        updateTitle(movieList);
    }
}