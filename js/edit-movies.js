"use strict";

import {allMovies, movieForm} from "./index.js";

export {createMovieList, editMovies};

// edits objects on movies.json-----------------------------------------------------
const movieList = [];
async function createMovieList() {

    const movieSelect = document.createElement
    ("select");
    movieSelect.id = "movie-select";
    await fetch("http://localhost:3000/movies").then(resp => resp.json())
        .then(movies => {
            movies.forEach(movie => {
                const movieOption = document.createElement("option");
                movieOption.innerText = movie.title;
                movieSelect.appendChild(movieOption);
                const movieObj = {title:movie.title, rating: movie.rating}
                movieList.push(movieObj)
            });
        })
        .catch(error => console.log("Error", error));
    movieForm.appendChild(movieSelect);
    movieSelect.addEventListener("change", populateMovieInfo);
}

async function populateMovieInfo() {
    const selectedMovie =  document.querySelector("#movie-select").value
    const movieListTitle = movieList.map(movie => {return movie.title})

    for(let i = 0; i < movieListTitle.length; i++)
        if(i === movieListTitle.indexOf(selectedMovie)){
            document.querySelector("#title").value = movieList[i].title
            document.querySelector("#rating").value = movieList[i].rating
        }
}

async function editMovies(e) {
    console.log("Edit movies func");
    e.preventDefault();
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