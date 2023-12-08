"use strict";

import MV_KEY from "./keys.js";
import {allMovies} from "./index";

export default getMovieCover

     function getMovieCover() {
     fetch(`http://img.omdbapi.com/?apikey=${MV_KEY}&`).then(resp => resp.json()).then(data => {
         console.log(data);
    // }).catch(error => console.error(error));
    // // console.log(movieCover);

    const movie = "braveheart";
    try {
        const url = `http://img.omdbapi.com/?t=${movie}&apikey=${MV_KEY}&`;
        const options = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        };
        const resp =  fetch(url, options);
        const movieCover =  resp.json().then(data => {
            return data;
        }).catch(error => console.log("error" + error));
        console.log(movieCover);
    } catch (error) {
        console.error(error);
    }
}