import React,{useContext, useEffect} from 'react';
import { MainContentsContext } from '../App';



const NowPlayingMovies = () => {
  const mainContentsValue = useContext(MainContentsContext);
  const nowPlayingMoviesTitleList = mainContentsValue.nowPlaying.title;
  const nowPlayingMoviesPosterList = mainContentsValue.nowPlaying.poster;

  return (
    <>
      {nowPlayingMoviesPosterList.map((poster: string, i: number) => {
        return (
          <li className="movie-list nowPlaying">
            <img src={`https://image.tmdb.org/t/p/w154${poster}`} alt="" className="movie-poster nowPlaying" />
          </li>
        )
      })}
    </>
  )
}

export default NowPlayingMovies;