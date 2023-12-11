"use strict";

import MV_KEY from "./keys.js";
import {movieContainer} from "./index.js"

export default getMoviePoster;

async function getMoviePoster(movieList) {
    const posterLinksArr = [];
    for (const movie of movieList) {
        try {
            const posterLink = await fetch(`http://www.omdbapi.com/?t=${movie.title}&apikey=${MV_KEY}`)
                .then(resp => resp.json())
                .then(data => {
                    console.log("Poster Link: " + data.Poster);
                    posterLinksArr.push(data.Poster);
                })
                .catch(error => console.log("Error: " + error));
        } catch (error) {
            console.error("Error: " + error);
        }
    }
    await renderPosters(posterLinksArr);
}

function renderPosters(posterLinksArr) {
    const movieCards = document.querySelectorAll(".movie-card");
    for (let i = 0; i < movieCards.length; i++) {
        console.log(movieCards[i]);
        const newPoster = document.createElement("img");
        if (posterLinksArr[i] !== undefined) {
            newPoster.src = posterLinksArr[i];
            newPoster.classList.add("movie-poster");
            movieCards[i].insertBefore(newPoster, movieCards[i].firstChild.nextSibling);
        } else {
            newPoster.classList.add("movie-poster-undef");
            movieCards[i].insertBefore(newPoster, movieCards[i].firstChild.nextSibling);
        }
    }
}