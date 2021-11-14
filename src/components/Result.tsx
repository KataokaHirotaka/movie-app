import { watch } from 'fs';
import React, {useEffect} from 'react';
import './styles/Result.scss';

type ResultProps = {
  searchedMovie: string,
  searchedMovieData: MoviesInfoType,
}

type MoviesInfoType = {
  title: string[];
  poster: string[];
  overview: string[];
}


// TODOul要素ないに検索された映画作品を表示するようにする
const Result = ({searchedMovie, searchedMovieData}: ResultProps) => {
  let h2;
  if (searchedMovie) {
    h2 = <h2>{searchedMovie}に関する映画作品</h2>
  }

  const moviesTitle = searchedMovieData.title;
  const moviesPoster = searchedMovieData.poster;
  const moviesOverview = searchedMovieData.overview;
  
  const addWatchList = (event: any) => {
    const target = event.currentTarget;
    target.textContent = 'Historyに追加しました';
  }

  return (
    <div className="result-content">
      {h2}
      <ul>
        {
          moviesTitle.map((title, i) => {
            const posterId: string = `https://image.tmdb.org/t/p/w154${moviesPoster[i]}`;
            const overview: string = moviesOverview[i];
            return (
              <li className="movie-list result">
                <div className="movie-list-content">
                  <div className="poster-wrapper">
                    <img className="movie-poster result" src={posterId} alt="" />
                  </div>
                  <div className="movie-data-wrapper">
                    <p className="movie-title result">{title}</p>
                    <p className="overview-title">あらすじ</p>
                    <div className="overview-wrapper">
                      <p className="movie-overview result">{overview}</p>
                    </div>
                  </div>
                </div>
                <div className="check-button-wrapper">
                  <button className="check-button" id="watch-list-btn" onClick={(e) => addWatchList(e)}>
                    Historyに追加する
                  </button>
                </div>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default Result;