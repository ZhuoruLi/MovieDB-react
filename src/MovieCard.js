import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { heart, heartOutline, star } from "ionicons/icons";
import { IonIcon } from "@ionic/react";

const MovieCardContainer = styled.div`
  text-align: center;
  box-shadow: 0 1px 5px 1px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  .movie-card-img img {
    width: 100%;
  }

  .movie-card-title {
    font-size: 1.2rem;
    margin: 1rem 0;
    cursor: pointer;
  }
  .movie-card-title:hover {
    color: #90cea1;
  }

  .movie-card-rating {
    display: flex;
    justify-content: space-between;
    padding: 0 1rem;
    align-items: center;
  }


  .movie-card-rating .rating {
    display: flex;
    align-items: center;
  }
  .movie-card-rating {
    //... rest of your styles

    .icon {
      font-size: 1.8rem;

      &.like-icon {
        cursor: pointer;
        /* color: ${(props) => (props.liked ? "red" : "black")}; */
        &.liked {
          color: red; /* Color the icon red when movie is liked */
        }
      }

      &.rating-icon {
        color: #f5c518;
        margin-right: 0.5rem;
        cursor: default;
      }
    }
  }
`;

export default function MovieCard({ isLoggedIn, movie, onClickLike, liked }) {
  const handleLikeClick = () => {
    // console.log("Heart icon clicked");
    if (isLoggedIn) {
      onClickLike(movie.id);
    }
  };

  return (
    <MovieCardContainer>
      <div className="movie-card-img">
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt=""
        />
      </div>
      <h4 className="movie-card-title">
        <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
      </h4>
      <div className="movie-card-rating">
        <div className="rating">
          <IonIcon className="icon rating-icon" icon={star} />
          <span>
            {movie.vote_average + (movie.rating ? "/" + movie.rating : "")}
          </span>
        </div>
        <div onClick={handleLikeClick}>
          <IonIcon
            className={`icon like-icon ${liked ? "liked" : ""}`}
            icon={liked ? heart : heartOutline}
            size="large"
          />
        </div>
      </div>
    </MovieCardContainer>
  );
}
