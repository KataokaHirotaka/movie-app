import React, {useContext} from 'react';
import { MainContentsContext } from '../App';

const UpComingMovies = () => {
  const mainContentsValue = useContext(MainContentsContext);
  const upComingPosterList = mainContentsValue.upComing.poster;
  return (
    <>
      {upComingPosterList.map((poster: string, i: number) => {
        return (
          <li className="movie-list upComing">
            <img src={`https://image.tmdb.org/t/p/w154${poster}`} alt="" className="movie-poster upComing" />
          </li>
        )
      })}
    </>
  )
}

export default UpComingMovies;