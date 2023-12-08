"use strict";

import selectHandler from "./select-handler.js";
import {createMovieList, populateMovieInfo} from "./edit-movies.js";
// import getMovieCover from "./get-movie-cover.js";
import MV_KEY from "./keys.js";


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
        const deleteBtn = document.createElement("button")
        movieTitle.innerHTML = movie.title;
        movieRating.innerHTML = addStars(movie.rating);
        deleteBtn.innerText = "X";
        movieCard.classList.add("movie-card");
        movieCardSpacer.classList.add("movie-card-spacer");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.style.display = "none";
        movieCard.appendChild(movieTitle);
        movieCard.appendChild(movieRating);
        movieCard.appendChild(deleteBtn);
        movieCard.addEventListener("mouseenter", showDelete);
        movieCard.addEventListener("mouseleave", hideDelete);
        movieCardSpacer.appendChild(movieCard);
        movieContainer.appendChild(movieCardSpacer);
        deleteBtn.addEventListener("click", async function () {
            try {
                const url = `http://localhost:3000/movies/${movie.id}`; // to keep movie.id, we chose not to use callback fn.
                const options = {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                const resp = await fetch(url, options)
                    .catch(error => console.log("error" + error));
                await allMovies();
            } catch (error) {
                console.error(error);
            }
        })
    })
}

function addStars(rating) {
    let stars = "";
    for (let i = 0; i < rating; i++) {
        stars += `<i class="fa-solid fa-star" style="color: #000000;"></i>`;
    }
    return stars;
}

function showDelete() {
    this.lastElementChild.style.display = "block"
}

function hideDelete() {
    this.lastElementChild.style.display = "none"
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
// getMovieCover();

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

