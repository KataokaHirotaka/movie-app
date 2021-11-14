import React,{useContext, useEffect} from "react";
import { MainContentsContext } from "../App";


const PopularMovies = () => {
  const mainContentsValue = useContext(MainContentsContext); // 人気の映画情報
  const popularMoviesTitleList = mainContentsValue.popular.title;
  const popularMoviesPosterList = mainContentsValue.popular.poster;

  return (
    <>
      {popularMoviesPosterList.map((poster: string, i: number) => {
        const posterId = `https://image.tmdb.org/t/p/w154${popularMoviesPosterList[i]}`
        return (
          <li className="movie-list popular slider-list">
            <img className="movie-poster popular" src={`https://image.tmdb.org/t/p/w154${poster}`} />
          </li>
        )
      })}
    </>
  )
}

export default PopularMovies;