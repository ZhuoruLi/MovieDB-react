import React from "react";
import styled from "styled-components";
import MovieCard from "./MovieCard";

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 3rem;
`;

export default function MovieCardList(props) {
  return (
    <ListContainer>
      {props.movies.map((movie) => {
        const liked = props.likedMovies.find(
          (likeMovie) => likeMovie.id === movie.id
        );

        return (
          <MovieCard
            key={movie.id}
            movie={movie}
            onClickLike={props.onClickLike}
            liked={liked}
            isLoggedIn={props.isLoggedIn}
          />
        );
      })}
    </ListContainer>
  );
}
