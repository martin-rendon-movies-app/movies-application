"use strict";

import MV_KEY from "./keys.js";
import {movieContainer, filteredMovies, renderMovie} from "./index.js"

export default getMoviePoster;

async function getMoviePoster(movieList) {
    const posterLinksArr = [];
    for (const movie of movieList) {
        try {
            const posterLink = await fetch(`http://www.omdbapi.com/?t=${movie.title}&apikey=${MV_KEY}`)
                .then(resp => resp.json())
                .then(data => {
                    posterLinksArr.push(data.Poster);
                })
                .catch(error => console.log("Error: " + error));
        } catch (error) {
            console.error("Error: " + error);
        }
    }
    await storePosters(posterLinksArr);
}

async function storePosters(posterLinksArr) {
    let i = 0;
    for (const movie of filteredMovies) {
        try {
            const url = `http://localhost:3000/movies/${movie.id}`;
            const posterURL = {poster: posterLinksArr[i]};
            const options = {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(posterURL)
            };
            fetch(url, options).then(resp => resp.json()).catch(error => console.error("Error: " + error));
        } catch (error) {
            console.error("Error: " + error);
        }
        i++;
    }
    fetch(`http://localhost:3000/movies/`)
        .then(resp => resp.json())
        .then(data => {
            renderMovie(data);
        })
        .catch(error => console.error("Error: " + error));
}