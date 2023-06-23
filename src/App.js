import "./styles.css";
import { useState, useEffect } from "react";
import Header from "./Header";
import { Switch, Route, Redirect, Routes } from "react-router-dom";
import { CATEGORIES } from "./constants";
import Home from "./Home";
import { fetchMoviesByCategory } from "./api";
import MovieDetails from "./MovieDetails";
import MovieCardList from "./MovieCardList";
import Login from "./Login";
import axios from "axios";

export default function App() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalpages] = useState(999);
  const [category, setCategory] = useState(CATEGORIES[0].id);
  const [movies, setMovies] = useState([]);
  const [likedMovies, setLikedMovies] = useState([]);
  const [ratedMovies, setRatedMovies] = useState([]);
  const [session_id, setSessionId] = useState(null); // New state for session_id
  const [account_id, setAccountId] = useState(null); // New state for account_id
  const [username, setUsername] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   fetchMoviesByCategory(category, page).then((data) => {
  //     setMovies(data.results);
  //     setTotalpages(data.total_pages);
  //   });
  // }, [category, page]);
  const API_KEY = "269076ac6ec6066bc23740427a8c6531";
  useEffect(() => {
    const fetchFavorites = async () => {
      if (isLoggedIn && account_id && session_id) {
        const url = `https://api.themoviedb.org/3/account/${account_id}/favorite/movies?api_key=${API_KEY}&session_id=${session_id}&language=en-US`;
        //const url = `https://api.themoviedb.org/3/account/${account_id}/favorite/movies`;
        const response = await fetch(url);

        const data = await response.json();
        return data.results;
      }
      return [];
    };
    const fetchRated = async () => {
      if (isLoggedIn && account_id && session_id) {
        const url = `https://api.themoviedb.org/3/account/${account_id}/rated/movies?api_key=${API_KEY}&session_id=${session_id}&language=en-US`;
        //const url = `https://api.themoviedb.org/3/account/${account_id}/favorite/movies`;
        //https://api.themoviedb.org/3/account/{account_id}/rated/movies
        const response = await fetch(url);

        const data = await response.json();
        return data.results;
      }
      return [];
    };

    const fetchData = async () => {
      const moviesData = await fetchMoviesByCategory(category, page);
      const favorites = await fetchFavorites();
      const rated = await fetchRated();
      setLikedMovies(favorites);
      setRatedMovies(rated);

      const updatedMovies = moviesData.results.map((movie) => ({
        ...movie,
        isFavorite: favorites.some((favMovie) => favMovie.id === movie.id)
      }));

      setMovies(updatedMovies);
      setTotalpages(moviesData.total_pages);
    };

    fetchData();
  }, [category, page, session_id, account_id, isLoggedIn]);

  const handleClickPrev = () => {
    if (page !== 1) {
      setPage(page - 1);
    }
  };

  const handleClickNext = () => {
    if (page !== totalPages) {
      setPage(page + 1);
    }
  };

  const handleCategoryChange = (category) => {
    setCategory(category);
  };

  const client = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNjkwNzZhYzZlYzYwNjZiYzIzNzQwNDI3YThjNjUzMSIsInN1YiI6IjY0NzY0ZDU0YjMzOTAzMDBjMWVhYWIxNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FcBflcpWbgtPUzwZvmuoJkgotC0djBkYCmUT6a65yXc",
      Accept: "application/json"
    }
  });
  const handleClickLike = async (movieId) => {
    const targetLikedMovie = likedMovies.find(
      (likedMovie) => likedMovie.id === movieId
    );

    try {
      if (targetLikedMovie) {
        // Unlike the movie on the server
        await client.post(
          `/account/${account_id}/favorite?session_id=${session_id}`,
          {
            media_type: "movie",
            media_id: movieId,
            favorite: false
          }
        );

        // Remove from local state
        const filteredMovies = likedMovies.filter(
          (likedMovie) => likedMovie.id !== movieId
        );
        setLikedMovies(filteredMovies);
      } else {
        // Like the movie on the server
        await client.post(
          `/account/${account_id}/favorite?session_id=${session_id}`,
          {
            media_type: "movie",
            media_id: movieId,
            favorite: true
          }
        );

        // Add to local state
        const targetMovie = movies.find((movie) => movie.id === movieId);
        if (targetMovie) {
          setLikedMovies([...likedMovies, targetMovie]);
        }
      }
    } catch (error) {
      // Handle error (e.g., show error message to user)
      console.error("Error liking/unliking movie:", error);
    }
  };
  const handleSubmitRating = async (movieId, rating) => {
    try {
      // Submit the rating to the server
      await client.post(
        `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${API_KEY}&session_id=${session_id}`,
        {
          value: rating
        }
      );

      // Update the ratedMovies state
      const ratedMovie = ratedMovies.find((movie) => movie.id === movieId);
      if (ratedMovie) {
        // If the movie was already rated, update its rating
        ratedMovie.rating = rating;
        setRatedMovies([...ratedMovies]);
      } else {
        // If it's a new rating, add it to the state
        const movie = movies.find((movie) => movie.id === movieId);
        if (movie) {
          movie.rating = rating;
          setRatedMovies([...ratedMovies, movie]);
        }
      }
    } catch (error) {
      // Handle error (e.g., show error message to user)
      console.error("Error rating movie:", error);
    }
  };

  const handleLogin = (newSessionId, newAccountId, username) => {
    console.log(newSessionId);

    setSessionId(newSessionId);
    setAccountId(newAccountId);
    setUsername(username);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setSessionId(null);
    setAccountId(null);
    setUsername("");
    setIsLoggedIn(false);
    setLikedMovies([]);
  };
  return (
    <div className="App">
      <Header
        username={username}
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              onClickPrev={handleClickPrev}
              onClickNext={handleClickNext}
              currentPage={page}
              totalPages={totalPages}
              category={category}
              setCategory={handleCategoryChange}
              movies={movies}
              onClickLike={handleClickLike}
              likedMovies={likedMovies}
              isLoggedIn={isLoggedIn}
            />
          }
        />
        <Route
          path="/movies/:movieId"
          element={
            <MovieDetails
              ratedMovies={ratedMovies}
              onSubmitRating={handleSubmitRating}
            />
          }
        />
        <Route
          path="/favorite"
          element={
            <MovieCardList
              movies={likedMovies}
              onClickLike={handleClickLike}
              likedMovies={likedMovies}
              isLoggedIn={isLoggedIn}
            />
          }
        ></Route>
        <Route
          path="/rated"
          element={
            <MovieCardList
              movies={ratedMovies}
              onClickLike={handleClickLike}
              likedMovies={likedMovies}
              isLoggedIn={isLoggedIn}
            />
          }
        ></Route>
        <Route
          path="/login"
          element={<Login handleLogin={handleLogin} />}
        ></Route>
      </Routes>
    </div>
  );
}
