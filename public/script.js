import { API_KEY } from "../env.js";

const tmdbKey = API_KEY;
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const tmdbKeyParam = `api_key=${tmdbKey}`;
const playBtn = document.getElementById('playBtn');

const getGenres = async () => {
  const genreRequestEndpoint = "/genre/movie/list";
  const requestParams = `?${tmdbKeyParam}`;
  const urlToFetch = tmdbBaseUrl+genreRequestEndpoint+requestParams;
  try{
    const response = await fetch(urlToFetch);
    if(response.ok){
      const jsonResponse = await response.json();
      const genres = jsonResponse.genres;
      return genres;
    }
  } catch(error){
    console.log(error)
  }
};

const getMovies = async () => {
  const discoverMovieEndpoint = "/discover/movie";
  const selectedGenre = getSelectedGenre();
  const requestParams = `?${tmdbKeyParam}&with_genres=${selectedGenre}`;
  const urlToFetch = tmdbBaseUrl+discoverMovieEndpoint+requestParams;
  try{
    const response = await fetch(urlToFetch);
    if(response.ok){
      const jsonResponse = await response.json();
      const movies = jsonResponse.results;
      return movies;
    }
  } catch(error){
    console.log(error)
  }

};

const getMovieInfo = async movie => {
  const movieId = movie.id;
  const movieEndpoint = `/movie/${movieId}`;
  const requestParams = `?${tmdbKeyParam}`;
  const urlToFetch = tmdbBaseUrl+movieEndpoint+requestParams;
  try{
    const response = await fetch(urlToFetch);
    if(response.ok){
      const movieInfo = await response.json();
      return movieInfo;
    }
  } catch(error){
    console.log(error)
  }
};

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = () => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  };

};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;