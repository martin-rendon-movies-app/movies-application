"use strict";

import selectHandler from "./select-handler.js";
import {createMovieList, populateMovieInfo} from "./edit-movies.js";

export {allMovies, renderMovie, movieForm};

// constants************************************************************************
const movieContainer = document.querySelector("#movie-container");
const submitBtn = document.querySelector("#submit-btn");
const title = document.querySelector("#title");
const rating = document.querySelector("#rating");
const movieForm = document.querySelector("#movie-form");
const movieSelect = document.querySelector("#movie-select")

// functions************************************************************************
// fetches movies.json while 'loading'. Sends response to be rendered---------------
async function allMovies(movieList) {
    if (movieList === undefined) {
        movieContainer.innerHTML = `<h2>Loading...</h2>`;
        const response = await fetch("http://localhost:3000/movies").then(resp => resp.json()).catch(error => console.log("Error", error));
        movieContainer.innerHTML = ``;
        renderMovie(response);
    } else {
        movieContainer.innerHTML = `<h2>Loading...</h2>`;
        movieContainer.innerHTML = ``;
        renderMovie(movieList);
    }
}

// renders movies onto DOM----------------------------------------------------------
function renderMovie(movies) {
    movies.forEach(movie => {
        const movieCardSpacer = document.createElement("div")
        const movieCard = document.createElement("div")
        const movieTitle = document.createElement("h3")
        const movieRating = document.createElement("div")
        const movieSummary = document.createElement("p")
        movieTitle.innerHTML = movie.title;
        movieRating.innerHTML = movie.rating.toString();
        movieSummary.innerHTML = movie.movieSummary;
        movieCard.classList.add("movie-card");
        movieCardSpacer.classList.add("movie-card-spacer");
        movieCard.appendChild(movieTitle);
        movieCard.appendChild(movieRating);
        movieCard.appendChild(movieSummary);
        movieCardSpacer.appendChild(movieCard);
        movieContainer.appendChild(movieCardSpacer);
    })
}

function eventHandler(e) {
    const currentOption = document.querySelector("#selector-movie").value;
    const movieSelect = document.querySelector("#movie-select");
    if (e.target.id === "selector-movie") {
        if (currentOption === "add") {
            title.removeEventListener("input", eventHandler);
            rating.removeEventListener("input", eventHandler);
            submitBtn.style.display = "inline-block";
            movieSelect.style.visibility = "hidden";
        } else if (currentOption === "sort") {
            title.addEventListener("input", eventHandler);
            rating.addEventListener("input", eventHandler);
            submitBtn.style.display = "none";
            movieSelect.style.visibility = "hidden";
        } else if (currentOption === "edit") {
            title.removeEventListener("input", eventHandler);
            rating.removeEventListener("input", eventHandler);
            submitBtn.style.display = "inline-block";
            movieSelect.style.visibility = "visible";
            createMovieList();
        }
    } else if (e.target.id === "title" || e.target.id === "rating") {
        selectHandler(e, currentOption);
    } else { // e.target === submit button
        selectHandler(e, currentOption);
    }
}

// Initializers*********************************************************************
allMovies();

// event listeners******************************************************************
submitBtn.addEventListener("click", eventHandler);
document.querySelector("#selector-movie").addEventListener("change", eventHandler);
title.addEventListener("input", eventHandler);
rating.addEventListener("input", eventHandler);
movieSelect.addEventListener("change", populateMovieInfo);
