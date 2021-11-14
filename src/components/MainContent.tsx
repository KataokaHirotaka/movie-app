import React, {useEffect} from 'react';
import './styles/MainContent.scss'
import {PopularMovies, NowPlayingMovies, UpComingMovies} from './../components/index'


const MainContent = () => {
  // 人気の映画を表示中
  return (
    <div className="movie_content">
      <div className="movie_content-wrapper popular">
        <p className="movie_content-title">今人気の映画</p>
        <div className="slider">
          <ul className="movie_list-wrapper popular slides" >
            <span></span>
            <PopularMovies />
          </ul>
        </div>
      </div>
      <div className="movie_content-wrapper nowPlaying">
        <p className="movie_content-title">上映中の映画</p>
        <div className="slider">
          <ul className="movie_list-wrapper nowPlaying slides">
            <span></span>
            <NowPlayingMovies />
          </ul>
        </div>
      </div>
      <div className="movie_content-wrapper upComing">
        <p className="movie_content-title">公開予定の映画</p>
        <div className="slider">
          <ul className="movie_list-wrapper upComing slides">
            <span></span>
            <UpComingMovies />
          </ul>
        </div>
      </div>
    </div>
  )
}

export default MainContent;