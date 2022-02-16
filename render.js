export const renderMovie =
function renderMovie (data) {
  const movies = document.querySelector('.movies');
  movies.innerHTML = '';
  data.films.forEach((film) => {
    const movieName = film.nameRu;
    const poster = film.posterUrl;
    const rating = film.rating;
    const genre = film.genres[0].genre.toUpperCase()

    movies.insertAdjacentHTML(
      'beforeend',
      movieHTML(poster, movieName, rating, genre)
    );
  });
};

export const movieHTML =
   function movieHTML (poster, movieName, rating, genre) {
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
                ${genre !== '' ? ` <div class="movie-category">${genre}</div>` : genre = ''}
                
                ${
                rating !== 'null'
                    ? `<div class="movie-average movie-average--${setRatingStyle(
                        convertRating(rating)
                    )}">${convertRating(rating)}</div>`
                    : ''
                };
            </div>
            `
   }

function convertRating (rating) {
  if (rating.includes('%')) {
    const fixedRating = rating.slice(0, 1);
    return +fixedRating
  } else {
    return rating;
  }
//   switch (rating) {
//     case rating.includes('%'):
//         console.log(rating)
//         return rating.replace('%', '')
//     case +rating > 10:
//       return +rating / 10
//     default:
//       return rating
//   }
}

function setRatingStyle (vote) {
  // if (vote.includes('%')){
  //  const fixedVote = +vote.replace('%','');
  // }
  switch (true) {
    case +vote >= 7:
      return 'green';
    case +vote > 5:
      return 'orange';
    default:
      return 'red';
  }
}
