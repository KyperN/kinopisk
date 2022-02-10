document.addEventListener("DOMContentLoaded", function () {
  const API_KEY = "f8ffff42-afff-46c3-8b01-b264f903d02a";
  const API_URL_POPULAR =
    "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";
  getMovies(API_URL_POPULAR);
  const API_URL_SEARCH =
    "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";
  async function getMovies(url) {
    const resp = await fetch(url, {
      headers: {
        "X-API-KEY": API_KEY,
      },
    });

    const respData = await resp.json();
    console.log(respData);
    renderMovie(respData);
  }

  //Кнопка с рандомными фильмами

  function getRandomItem(arr) {
    // get random index value
    const randomIndex = Math.floor(Math.random() * arr.length);
    // get random item
    const item = arr[randomIndex];
    return item;
  }

  const movieNames = [
    "Человек Паук",
    "Мстители",
    "Гонка",
    "Достучаться до небес",
    "Зеленая миля",
    "Области тьмы",
    "Господин Никто",
  ];
  btn = document.querySelector(".random-movie");

  btn.addEventListener("click", () => {
    const randomUrl = API_URL_SEARCH + getRandomItem(movieNames);
    getMovies(randomUrl);
  });
  //

  function setRatingStyle(vote) {
    switch (true) {
      case vote > 7:
        return "green";
      case vote > 5:
        return "orange";
      default:
        return "red";
    }
  }

  const ratingPercentToNumber = (rating) => {
    const percentChar = "%";

    if (!rating.includes(percentChar)) return rating;

    const ratingRemovedPercent = rating.replace(percentChar, "");
    const roundedRating = Math.round(+ratingRemovedPercent).toString();

    return `${roundedRating[0]}.${roundedRating[1]}`;
  };

  const movieHTML = (poster, movieName, rating, genre) => {
    const parsedRating = ratingPercentToNumber(rating);
    return `<div class="movie">
      <div class="movie__cover-inner">
          <img src="${poster}" class="movie_cover"
          />
          <div class="movie__cover--darkened"></div>
      </div>
      <div class="movie__info">
          ${
            movieName
              ? `<a href="https://rezka.ag/search/?do=search&subaction=search&q=${movieName}" target='_blank' class="movie-title">${movieName}</a>`
              : ""
          } 
          <div class="movie-category">${genre}</div>
          <button class="btn-trailer">watch trailer</button>
          ${
            rating !== "null"
              ? `<div class="movie-average movie-average--${setRatingStyle(
                  parsedRating
                )}">${parsedRating}</div>`
              : ""
          }
      </div>
      `;
  };

  // let trailerbtn = document.getElementsByClassName('btn-trailer');
  function renderMovie(data) {
    function createPlayer(url) {
      player = new YT.Player("frame", {
        height: "390",
        width: "640",
        videoId: url,
        playerVars: {
          playsinline: 1,
        },
      });
    }
    // trailerbtn.addEventListener('click', ()=>{

    // })
    createPlayer("vB-dTOPNgGY");
    const movies = document.querySelector(".movies");
    movies.innerHTML = "";
    data.films.forEach((film) => {
      const movieName = film.nameRu; //name of movie
      const poster = film.posterUrl; //img
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
    console.log(search.value);
    const apiSearchUrl = API_URL_SEARCH + search.value;
    if (search.value) {
      getMovies(apiSearchUrl);
    }
    search.value = "";
  });
  //player
  //   let overlay = (document.querySelector(".overlay").style.display = "none");
});
