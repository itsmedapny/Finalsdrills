var link = window.location.href;
var newLink = new URL(link)
const movieId = newLink.searchParams.get("movieId");

const API_KEY = '1bfdbff05c2698dc917dd28c08d41096';
const detailMovie = "https://api.themoviedb.org/3/movie" +
movieId + 
"?api_key=" + 
API_KEY +
"language=en-US";
const relatedUrl = 
"https://api.themoviedb.org/3/movie" +
movieId +
"/similar?api_key=" +
API_KEY +
"language=en-US"; 
const imgBaseURL = "https://image.tmdb.org/t/p/w500";
let data;

async function getMovieDetails(movieId) {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`);
    const responseData = await response.json();
    return responseData;
}

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('movieId');

    try {
        const movieDetails = await getMovieDetails(movieId);

        document.getElementById('moviePoster').src = IMAGE_PATH + movieDetails.poster_path;
        document.getElementById('movieTitle').innerText = movieDetails.title;
        document.getElementById('movieRating').innerText = `${movieDetails.vote_average} / 10`;
        document.getElementById('movieReleaseDate').innerText = movieDetails.release_date;
        document.getElementById('movieOverview').innerText = movieDetails.overview;

        const similarMovies = await getSimilarMovies(movieId);
        const similarMoviesContainer = document.getElementById('similarMovies');
        similarMoviesContainer.innerHTML = similarMovies.map(movie => createMovieCard(movie)).join('');
    } catch (error) {
        console.error('Error fetching movie details:', error);
    }
});