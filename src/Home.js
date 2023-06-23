// import Pagination from "./Pagination";
// import CategorySelect from "./CategorySelect";
// import React from "react";
// import styled from "styled-components";
// import MovieCardList from "./MovieCardList";

// export default function Home(props) {
//   const ControlsContainer = styled.div`
//     position: relative;
//     display: flex;
//     justify-content: center;
//   `;

//   const CategorySelectContainer = styled.div`
//     position: absolute;
//     right: 0;
//   `;

//   return (
//     <div>
//       <ControlsContainer>
//         <Pagination
//           onClickPrev={props.onClickPrev}
//           onClickNext={props.onClickNext}
//           currentPage={props.currentPage}
//           totalPages={props.totalPages}
//         />
//         <CategorySelectContainer>
//           <CategorySelect
//             category={props.category}
//             setCategory={props.setCategory}
//           />
//         </CategorySelectContainer>
//       </ControlsContainer>
//       <MovieCardList
//         movies={props.movies}
//         onClickLike={props.onClickLike}
//         likedMovies={props.likedMovies}
//         isLoggedIn={props.isLoggedIn}
//       />
//     </div>
//   );
// }
import React, { useReducer, useEffect } from "react";
import Pagination from "./Pagination";
import CategorySelect from "./CategorySelect";
import styled from "styled-components";
import MovieCardList from "./MovieCardList";
import { fetchMoviesByCategory } from "./api";

const ControlsContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
`;

const CategorySelectContainer = styled.div`
  position: absolute;
  right: 0;
`;

function movieReducer(state, action) {
  switch (action.type) {
    case "SET_PAGE":
      return {
        ...state,
        [action.category]: {
          ...state[action.category],
          [action.page]: action.data
        }
      };
    default:
      throw new Error();
  }
}

export default function Home(props) {
  const [state, dispatch] = useReducer(movieReducer, {});

  useEffect(() => {
    if (!state[props.category] || !state[props.category][props.currentPage]) {
      fetchMoviesByCategory(props.category, props.currentPage).then((data) => {
        dispatch({
          type: "SET_PAGE",
          category: props.category,
          page: props.currentPage,
          data
        });
      });
    }
  }, [props.category, props.currentPage]);

  const movies =
    state[props.category] && state[props.category][props.currentPage]
      ? state[props.category][props.currentPage]
      : [];
  // console.log(movies.results);
  return (
    <div>
      <ControlsContainer>
        <Pagination
          onClickPrev={props.onClickPrev}
          onClickNext={props.onClickNext}
          currentPage={props.currentPage}
          totalPages={props.totalPages}
        />
        <CategorySelectContainer>
          <CategorySelect
            category={props.category}
            setCategory={props.setCategory}
          />
        </CategorySelectContainer>
      </ControlsContainer>
      {Array.isArray(movies.results) && movies.results.length > 0 ? (
        <MovieCardList
          movies={movies.results}
          onClickLike={props.onClickLike}
          likedMovies={props.likedMovies}
          isLoggedIn={props.isLoggedIn}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
}
