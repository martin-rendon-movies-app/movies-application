"use strict";

// Creates new movie object. Posts to movies.json-----------------------------------
import {allMovies} from "./index.js";

export default async function addMovie(e, title, rating) {
    e.preventDefault();
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