"use strict";

import {allMovies, movieForm} from "./index.js";

export {createMovieList, editMovies};

// edits objects on movies.json-----------------------------------------------------
async function createMovieList() {
    const movieSelect = document.createElement("select");
    await fetch("http://localhost:3000/movies").then(resp => resp.json())
        .then(movies => {
            movies.forEach(movie => {
                const movieOption = document.createElement("option");
                movieOption.innerText = movie.title;
                movieSelect.appendChild(movieOption);
            });
        })
        .catch(error => console.log("Error", error));
    movieForm.appendChild(movieSelect);
    movieSelect.addEventListener("change", populateMovieInfo);
}

async function populateMovieInfo() {
    console.log("hello");
}

async function editMovies(e) {
    console.log("Edit movies func");
    e.preventDefault();
    await createMovieList();
    const newMovieObj = {
        title: title,
        rating: rating
    };
    try {
        const url = `http://localhost:3000/movies`;
        const options = {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newMovieObj)
        };
        const resp = await fetch(url, options);
        const newMovie = await resp.json().then(data => {
            return data;
        }).catch(error => console.log("error" + error));
        await allMovies();
        return newMovie;
    } catch (error) {
        console.error(error);
    }
}