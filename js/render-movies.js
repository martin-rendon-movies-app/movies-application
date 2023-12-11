"use strict";

import {allMovies, loading, movieContainer} from './index.js'

export {renderMovieInitial, renderMovie};

// renders movies onto DOM----------------------------------------------------------
function renderMovieInitial(movies) {
    movies.forEach(movie => {
        const movieCardSpacer = document.createElement("div")
        const movieCard = document.createElement("div")
        const moviePoster = document.createElement("div")
        const movieTitle = document.createElement("h3")
        const movieRating = document.createElement("div")
        const deleteBtn = document.createElement("button")
        movieTitle.innerHTML = movie.title;
        movieRating.innerHTML = addStars(movie.rating);
        deleteBtn.innerText = "X";
        movieCard.classList.add("movie-card");
        movieCard.classList.add("movie-card-anime");
        movieCardSpacer.classList.add("movie-card-spacer");
        moviePoster.classList.add("movie-poster");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.style.display = "none";
        movieCard.appendChild(movieTitle);
        movieCard.appendChild(moviePoster);
        movieCard.appendChild(movieRating);
        movieCard.appendChild(deleteBtn);
        movieCard.addEventListener("mouseenter", showDelete);
        movieCard.addEventListener("mouseleave", hideDelete);
        movieCardSpacer.appendChild(movieCard);
        movieContainer.appendChild(movieCardSpacer);
        deleteBtn.addEventListener("click", async function () {
            try {
                const url = `http://localhost:3000/movies/${movie.id}`; // to keep movie.id, we chose not to use callback fn.
                const options = {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                const resp = await fetch(url, options)
                    .catch(error => console.log("error" + error));
                await allMovies();
            } catch (error) {
                console.error(error);
            }
        })
    })
}

function renderMovie(movies) {
    movies.forEach(movie => {
        const movieCardSpacer = document.createElement("div")
        const movieCard = document.createElement("div")
        const moviePoster = document.createElement("div")
        const movieTitle = document.createElement("h3")
        const movieRating = document.createElement("div")
        const deleteBtn = document.createElement("button")
        movieTitle.innerHTML = movie.title;
        movieRating.innerHTML = addStars(movie.rating);
        deleteBtn.innerText = "X";
        movieCard.classList.add("movie-card");
        movieCardSpacer.classList.add("movie-card-spacer");
        moviePoster.classList.add("movie-poster");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.style.display = "none";
        movieCard.appendChild(movieTitle);
        movieCard.appendChild(moviePoster);
        movieCard.appendChild(movieRating);
        movieCard.appendChild(deleteBtn);
        movieCard.addEventListener("mouseenter", showDelete);
        movieCard.addEventListener("mouseleave", hideDelete);
        movieCardSpacer.appendChild(movieCard);
        movieContainer.appendChild(movieCardSpacer);
        deleteBtn.addEventListener("click", async function () {
            try {
                const url = `http://localhost:3000/movies/${movie.id}`; // to keep movie.id, we chose not to use callback fn.
                const options = {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                const resp = await fetch(url, options)
                    .catch(error => console.log("error" + error));
                await allMovies();
            } catch (error) {
                console.error(error);
            }
        });
    });
    loading.classList.add("d-none");
}

function addStars(rating) {
    let stars = "";
    for (let i = 0; i < rating; i++) {
        stars += `<i class="fa-solid fa-star" style="color: #000000;"></i>`;
    }
    return stars;
}

function showDelete() {
    this.lastElementChild.style.display = "block"
}

function hideDelete() {
    this.lastElementChild.style.display = "none"
}