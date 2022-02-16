
import { API_KEY, API_URL_POPULAR, API_URL_RANDOM, getMovies, API_URL_SEARCH } from './api.js';
import { renderMovie, movieHTML } from './render.js';

document.addEventListener('DOMContentLoaded', function () {
  getMovies(API_URL_POPULAR).then(renderMovie);
  let randomName;
  async function getRandomMovie (url) {
    const resp = await fetch(url, {
      headers: {
        'X-API-KEY': API_KEY
      }
    });
    const respData = await resp.json();
    const randomIndex = Math.floor(Math.random() * respData.items.length);

    randomName = respData.items[randomIndex].nameRu;
  }
  getRandomMovie(API_URL_RANDOM);

  const randomGo = document.querySelector('.btn-random');
  randomGo.addEventListener('click', () => {
    getRandomMovie(API_URL_RANDOM);
    getMovies(API_URL_SEARCH + randomName).then(renderMovie);
  });

  const form = document.querySelector('form');
  const search = document.querySelector('.header-search');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const apiSearchUrl = API_URL_SEARCH + search.value;
    if (search.value) {
      getMovies(apiSearchUrl);
    }
    search.value = '';
  });

  const genreBtn = document.querySelectorAll('.genre-btn');

  function getRenderAnotherMovie (text) {
    return function renderAnotherMovie (data) {
      const movies = document.querySelector('.movies');
      movies.innerHTML = '';
      data.films.forEach((film) => {
        if (film.genres[0].genre === text.toLowerCase()) {
          const movieName = film.nameRu;
          const poster = film.posterUrl;
          const rating = film.rating;
          const genre = film.genres[0].genre;
          movies.insertAdjacentHTML(
            'beforeend',
            movieHTML(poster, movieName, rating, genre)
          );
        }
      });
    };
  }

  genreBtn.forEach(btn => {
    btn.addEventListener('click', (e) => {
      getMovies(API_URL_POPULAR).then(getRenderAnotherMovie(e.target.textContent));
    });
  });
});
