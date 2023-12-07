"use strict";

// Sends input information based on selector status---------------------------------
import addMovie from "./add-movie.js";
import sortMovies from "./sort-movies.js";
import editMovies from "./edit-movies.js";

export default function selectHandler(e, currentOption) {
    let title = document.querySelector("#title").value;
    let rating = document.querySelector("#rating").value;
    if (currentOption === "add") {
        addMovie(e, title, rating);
        document.querySelector("#rating").value = "";
        document.querySelector("#title").value = "";
    } else if (currentOption === "sort") {
        sortMovies();
    } else if (currentOption === "edit") {
        editMovies();
        document.querySelector("#rating").value = "";
        document.querySelector("#title").value = "";
    }
}