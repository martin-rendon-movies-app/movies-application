"use strict";

import {allMovies, movieForm, loading, movieContainer, filteredMovies} from "./index.js";

export {createMovieList, editMovies, populateMovieInfo};

// Creates movie options to choose in order to edit---------------------------------
async function createMovieList(movieList) {
    document.querySelector("#movie-select").innerHTML = "";
    if (document.querySelector("#movie-select").childNodes.length === 0) {
        movieList.forEach(movie => {
            const movieOption = document.createElement("option");
            movieOption.innerText = movie.title;
            movieOption.value = movie.id;
            document.querySelector("#movie-select").appendChild(movieOption);
        });
    }
}

// populates inputs with selected movie info----------------------------------------
async function populateMovieInfo() {
    const id = document.querySelector("#movie-select").value;
    for (let i = 0; i < filteredMovies.length; i++) {
        if (id === filteredMovies[i].id.toString()) {
            document.querySelector("#title").value = filteredMovies[i].title;
            document.querySelector("#rating").value = filteredMovies[i].rating;
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