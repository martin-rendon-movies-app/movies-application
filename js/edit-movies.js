"use strict";

import {allMovies, movieForm} from "./index.js";

export {createMovieList, editMovies};

let movieList = [];

async function createMovieList() {
    const movieSelect = document.createElement
    ("select");
    movieSelect.id = "movie-select";
    await fetch("http://localhost:3000/movies").then(resp => resp.json())
        .then(movies => {
            movies.forEach(movie => {
                const movieOption = document.createElement("option");
                movieOption.innerText = movie.title;
                movieOption.value = movie.id;
                movieSelect.appendChild(movieOption);
            });
            movieList = [...movies];
        })
        .catch(error => console.log("Error", error));
    movieForm.appendChild(movieSelect);
    movieSelect.addEventListener("change", populateMovieInfo);
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
    console.log("Edit movies func");
    // e.preventDefault();
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