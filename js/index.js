"use strict";

import selectHandler from "./select-handler.js";
import {createMovieList, populateMovieInfo} from "./edit-movies.js";
import {renderMovieInitial, renderMovie} from "./render-movies.js";

export {allMovies, movieForm, movieContainer};

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
        renderMovieInitial(response);
    } else {
        movieContainer.innerHTML = `<h2>Loading...</h2>`;
        movieContainer.innerHTML = ``;
        renderMovie(movieList);
    }
}

//Determines source of function call, sends to select-handler module----------------
function eventHandler(e) {
    const currentOption = document.querySelector("#filter-select").value;
    const movieSelect = document.querySelector("#movie-select");
    const displayToggle = document.querySelector(".d-none");
    if (e.target.id === "filter-select") {
        if (currentOption === "add") {
            title.removeEventListener("input", eventHandler);
            rating.removeEventListener("input", eventHandler);
            submitBtn.style.display = "inline-block";
            displayToggle.style.display = "none";
        } else if (currentOption === "sort") {
            title.addEventListener("input", eventHandler);
            rating.addEventListener("input", eventHandler);
            submitBtn.style.display = "none";
            displayToggle.style.display = "none";
        } else if (currentOption === "edit") {
            title.removeEventListener("input", eventHandler);
            rating.removeEventListener("input", eventHandler);
            submitBtn.style.display = "inline-block";
            displayToggle.style.display = "inline-block";
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
setTimeout(() => {
    const animation = document.querySelectorAll(".movie-card-anime")
    animation.forEach(item => item.classList.remove(".movie-card-anime"))
}, 1000)

// event listeners******************************************************************
submitBtn.addEventListener("click", eventHandler);
document.querySelector("#filter-select").addEventListener("change", eventHandler);
title.addEventListener("input", eventHandler);
title.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault(); // Use this to prevent the default action
        eventHandler(e);
        console.log('hello');
    }
});

rating.addEventListener("input", eventHandler);
movieSelect.addEventListener("change", populateMovieInfo);

