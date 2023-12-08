"use strict";

import {allMovies, movieForm} from "./index.js";

export {createMovieList, editMovies, populateMovieInfo};

let movieList = [];

async function createMovieList() {
    const hidden = document.querySelectorAll(".d-none");
    hidden.forEach(elem => {
        elem.style.display = "d-none";
    })
    if (movieList.length === 0) {
        await fetch("http://localhost:3000/movies").then(resp => resp.json())
            .then(movies => {
                movies.forEach(movie => {
                    const movieOption = document.createElement("option");
                    movieOption.innerText = movie.title;
                    movieOption.value = movie.id;
                    document.querySelector("#movie-select").appendChild(movieOption);
                });
                movieList = [...movies];
            })
            .catch(error => console.log("Error", error));
    }
}

// populates inputs with selected movie info----------------------------------------
async function populateMovieInfo() {
    const id = document.querySelector("#movie-select").value;
    for (let i = 0; i < movieList.length; i++) {
        if (id === movieList[i].id.toString()) {
            document.querySelector("#title").value = movieList[i].title;
            document.querySelector("#rating").value = movieList[i].rating;
        }
    }
}

// edits objects on movies.json-----------------------------------------------------
async function editMovies() {
    const id = document.querySelector("#movie-select").value;
    const newMovieObj = {
        title: document.querySelector("#title").value,
        rating: document.querySelector("#rating").value
    };
    try {
        const url = `http://localhost:3000/movies/${id}`;
        const options = {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newMovieObj)
        };
        const resp = await fetch(url, options);
        const newMovie = await resp.json();
        await allMovies();
        return newMovie;
    } catch (error) {
        console.error(error);
    }
}