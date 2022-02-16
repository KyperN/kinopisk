export const API_KEY = "f8ffff42-afff-46c3-8b01-b264f903d02a";
export const API_URL_POPULAR =
"https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";
export const API_URL_SEARCH =
"https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";
export const API_URL_RANDOM = 
"https://kinopoiskapiunofficial.tech/api/v2.2/films?countries=1&genres=2&order=RATING&type=ALL&ratingFrom=0&ratingTo=10&yearFrom=1000&yearTo=3000&page=1";


export const getMovies = async function (url) {
    const resp = await fetch(url, {
      headers: {
        'X-API-KEY': API_KEY
      }
    })
    const respData = await resp.json();
    return respData
  }
