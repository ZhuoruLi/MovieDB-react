const API_KEY = "269076ac6ec6066bc23740427a8c6531";

export const fetchMoviesByCategory = (category, page) => {
  const url = `https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}&page=${page}`;
  return fetch(url).then((resp) => resp.json());
};

export const fetchMovieDetail = (movieId) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`;
  return fetch(url).then((resp) => resp.json());
};

// const options = {
//   method: "POST",
//   headers: {
//     accept: "application/json",
//     "Content-Type": "application/json;charset=utf-8",
//     Authorization:
//       "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNjkwNzZhYzZlYzYwNjZiYzIzNzQwNDI3YThjNjUzMSIsInN1YiI6IjY0NzY0ZDU0YjMzOTAzMDBjMWVhYWIxNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FcBflcpWbgtPUzwZvmuoJkgotC0djBkYCmUT6a65yXc"
//   }
// };

// fetch("https://api.themoviedb.org/3/movie/385687/rating", options)
//   .then((response) => response.json())
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err));
