"use strict";

import selectHandler from "./select-handler.js";
import {createMovieList, populateMovieInfo} from "./edit-movies.js";
import {renderMovie, renderMovieInitial} from "./render-movies.js";
import getMoviePoster from "./get-movie-poster.js";

export {allMovies, renderMovie, movieForm, movieContainer, loading, filteredMovies, movieCards};

// constants************************************************************************
const movieContainer = document.querySelector("#movie-container");
const submitBtn = document.querySelector("#submit-btn");
const title = document.querySelector("#title");
const rating = document.querySelector("#rating");
const movieForm = document.querySelector("#movie-form");
const movieSelect = document.querySelector("#movie-select");
const loading = document.querySelector(".loading");
const movieCards = document.querySelectorAll("movie-card");
let filteredMovies = [];

// functions************************************************************************
// fetches movies.json while 'loading'. Sends response to be rendered---------------
async function allMovies(movieList) {
    loading.classList.remove("d-none");
    movieContainer.innerHTML = "";
    if (movieList === undefined) {
        const response = await fetch("http://localhost:3000/movies").then(resp => resp.json()).catch(error => console.log("Error", error));
        filteredMovies = [...response];
        createMovieList(filteredMovies);
        getMoviePoster(response);
    } else {
        createMovieList(movieList);
        renderMovie(movieList);
    }
}

//Determines source of function call, sends to select-handler module----------------
function eventHandler(e) {
    const currentOption = document.querySelector("#filter-select").value;
    const movieSelect = document.querySelector("#movie-select");
    const movieSelectContainer = document.querySelector(".movie-select-container");
    if (e.target.id === "filter-select") {
        title.value = "";
        rating.value = "";
        if (currentOption === "add") {
            title.removeEventListener("input", eventHandler);
            rating.removeEventListener("input", eventHandler);
            movieSelectContainer.style.display = "none";
            submitBtn.style.display = "inline-block";
        } else if (currentOption === "sort") {
            allMovies();
            title.addEventListener("input", eventHandler);
            rating.addEventListener("input", eventHandler);
            document.querySelector("#rating").value = "all";
            movieSelectContainer.style.display = "none";
            submitBtn.style.display = "none";
        } else if (currentOption === "edit") {
            title.removeEventListener("input", eventHandler);
            rating.removeEventListener("input", eventHandler);
            movieSelectContainer.style.display = "inline-block";
            submitBtn.style.display = "inline-block";
        }
    } else {
        selectHandler(e, currentOption);
    }
}

// Initializers*********************************************************************
allMovies();

// event listeners******************************************************************
submitBtn.addEventListener("click", eventHandler);
document.querySelector("#filter-select").addEventListener("change", eventHandler);
title.addEventListener("input", eventHandler);
title.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        eventHandler(e);
        console.log('hello');
    }
});

rating.addEventListener("input", eventHandler);
movieSelect.addEventListener("change", populateMovieInfo);