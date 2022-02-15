import {API_KEY} from './api.js';

document.addEventListener("DOMContentLoaded", function () {
  
  const API_URL_POPULAR =
    "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";
    getMovies(API_URL_POPULAR).then(renderMovie);
  const API_URL_SEARCH =
    "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";
  const API_URL_RANDOM = 
  "https://kinopoiskapiunofficial.tech/api/v2.2/films?countries=1&genres=2&order=RATING&type=ALL&ratingFrom=0&ratingTo=10&yearFrom=1000&yearTo=3000&page=1"
  async function getMovies(url) {
    const resp = await fetch(url, {
      headers: {
        "X-API-KEY": API_KEY,
      },
    });
    const respData = await resp.json();
    return respData;
  }

  let randomName;
  async function getRandomMovie(url) {
    const resp = await fetch(url, {
      headers: {
        "X-API-KEY": API_KEY,
      },
    });
    const respData = await resp.json();
    const randomIndex = Math.floor(Math.random() * respData.items.length);

    randomName = respData.items[randomIndex].nameRu; 
  }
getRandomMovie(API_URL_RANDOM);
  const randomGo = document.querySelector('.btn-random');
  randomGo.addEventListener('click',()=>{
    getRandomMovie(API_URL_RANDOM);
    getMovies(API_URL_SEARCH + randomName).then(renderMovie);
  })
  //Кнопка с рандомными фильмами

  function getRandomItem(arr) {

    const randomIndex = Math.floor(Math.random() * arr.length);
    const item = arr[randomIndex];
    return item;
  }

  // const movieNames = [
  //   "Человек Паук",
  //   "Мстители",
  //   "Гонка",
  //   "Достучаться до небес",
  //   "Зеленая миля",
  //   "Области тьмы",
  //   "Господин Никто",
  // ];
  // btn = document.querySelector(".random-movie");

  // btn.addEventListener("click", () => {
  //   const randomUrl = API_URL_SEARCH + getRandomItem(movieNames);
  //   // getMovies(API_URL_RANDOM);
  //   getMovies(randomUrl);
  // });

  function setRatingStyle(vote) {
    let fixedVote = vote.replace('%', '');
    switch (true) {
      case fixedVote >= 7:
        return "green";
      case fixedVote > 5:
        return "orange";
      default:
        return "red";
    }
  }

  
  const movieHTML = (poster, movieName, rating, genre) => {
    return `<div class="movie">
      <div class="movie__cover-inner">
          <img src="${poster}" class="movie_cover"
          />
          <div class="movie__cover--darkened"></div>
      </div>
      <div class="movie__info">
          ${
               `<a href="https://rezka.ag/search/?do=search&subaction=search&q=${movieName}" target='_blank' class="movie-title">${movieName}</a>`
          }
          ${genre !=='' ? ` <div class="movie-category">${genre}</div>` : genre = ''}
         
          ${
            rating !== "null"
              ? `<div class="movie-average movie-average--${setRatingStyle(
                  rating
                )}">${Math.round(rating)}</div>`
              : ""
          }
      </div>
      `;
  };

  function renderMovie(data) {
    const movies = document.querySelector(".movies");
    movies.innerHTML = "";
    data.films.forEach((film) => {
      const movieName = film.nameRu; 
      const poster = film.posterUrl; 
      const rating = film.rating;
      const genre = film.genres[0].genre.toUpperCase();

      movies.insertAdjacentHTML(
        "beforeend",
        movieHTML(poster, movieName, rating, genre)
      );
    });
  }

  

  const form = document.querySelector("form");
  const search = document.querySelector(".header-search");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const apiSearchUrl = API_URL_SEARCH + search.value;
    if (search.value) {
      getMovies(apiSearchUrl);
    }
    search.value = "";
  });
  const comedyBtn = document.querySelector('.comedy');
  const thrillerBtn = document.querySelector('.thriller');
  const dramaBtn = document.querySelector('.drama');
  
function getRenderAnotherMovie(chosenGenre) {

  function renderAnotherMovie(data) {
      const movies = document.querySelector(".movies");
      movies.innerHTML = "";
      data.films.forEach((film) => {
          if (film.genres[0].genre === chosenGenre.toLowerCase()) {
              const movieName = film.nameRu;
              const poster = film.posterUrl;
              const rating = film.rating;
              const genre = film.genres[0].genre;
              movies.insertAdjacentHTML(
                  "beforeend",
                  movieHTML(poster, movieName, rating, genre)
              );
          }
      });
  }
  return renderAnotherMovie;
}

comedyBtn.addEventListener('click', () =>{
  getMovies(API_URL_POPULAR).then(getRenderAnotherMovie(comedyBtn.textContent));
  })
dramaBtn.addEventListener('click', () =>{
  getMovies(API_URL_POPULAR).then(getRenderAnotherMovie(dramaBtn.textContent));
    })
thrillerBtn.addEventListener('click', () =>{
  getMovies(API_URL_POPULAR).then(getRenderAnotherMovie(thrillerBtn.textContent));
  })
});
