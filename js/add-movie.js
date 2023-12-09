"use strict";

// Creates new movie object. Posts to movies.json-----------------------------------
import {allMovies, loading, movieContainer} from "./index.js";
import {createMovieList} from "./edit-movies.js";

export default async function addMovie(e, title, rating) {
    e.preventDefault();
    console.log("add movies func");
    const newMovieObj = {
        title: title,
        rating: parseFloat(rating)
    };
    try {
        const url = `http://localhost:3000/movies`;
        const options = {
            method: "POST",
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