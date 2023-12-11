"use strict";

// Sends input information based on selector status---------------------------------
import addMovie from "./add-movie.js";
import sortMovies from "./sort-movies.js";
import {editMovies} from "./edit-movies.js";
import {allMovies, loading, filteredMovies} from "./index.js";

export default selectHandler;

let movieList = [];
async function selectHandler(e, currentOption) {
    let title = document.querySelector("#title").value;
    let rating = document.querySelector("#rating").value;
    if (currentOption === "add") {
        allMovies(filteredMovies);
        addMovie(e, title, rating);
        document.querySelector("#rating").value = "";
        document.querySelector("#title").value = "";
    } else if (currentOption === "sort") {
        sortMovies(e, filteredMovies);
    } else if (currentOption === "edit") {
        editMovies();
        document.querySelector("#rating").value = "";
        document.querySelector("#title").value = "";
    }
}