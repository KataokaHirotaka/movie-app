import './App.scss';
import {Header, Form, Result, MainContent, Footer} from './components/index';
import React, {useState, useEffect, createContext} from 'react';
import axios from 'axios';
import { navList, NavListContext } from './contextData';
const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const title: string = 'MovieHistory'; // アプリのタイトル

// フラグ
localStorage.setItem('status', 'login');
let loginStatus = localStorage.getItem('status');
console.log(loginStatus);

// ----------データベース--------
const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'sample_db'
});
// ----------データベース--------


type connectionType = {
  error: any,
  results: any,
  fields: any
}
connection.query('SELECT * FROM database', ({error, results, fields}: connectionType) => {
  if (error) throw error;
  console.log(results[0]);
  
});




export const MainContentsContext = createContext<any>([]);
function App() {
  type MoviesInfoType = {
    title: string[];
    poster: string[];
    overview: string[];
  }

  const [movie, setMovie] = useState<string>(''); //検索フォームで検索された映画名
  const [searchedMovie, setSearchedMovie] = useState<string>(''); //Result.tsxで使用
  const getSearchedMovie = (e:React.FormEvent<HTMLFormElement>) => {// Form.tsxで使用
    e.preventDefault();
    setMovie('');
    setSearchedMovie(movie);
    return;
  };
  const [popularMovies, setPopularMovies] = useState<MoviesInfoType>({
    title: [],
    poster: [],
    overview: []
  });
  const [nowPlayingMovies, setNowPlayingMovies] = useState<MoviesInfoType>({
    title: [],
    poster: [],
    overview: []
  });

  const [upComingMovies, setUpComingMovies] = useState<MoviesInfoType>({
    title: [],
    poster: [],
    overview: []
  });

  const [searchedMovieData, setSearchedMovieData] = useState<MoviesInfoType>({
    title: [],
    poster: [],
    overview: []
  });

  // APIで取得した映画データ関連
  class MoviesData {
  API_KEY: string;
  language: string;
  getPopularMoviesURL: string;
  getNowPlayingURL: string;
  getUpcomingMovieURL: string;
  getLatestMovieURL: string;
  MoviesTitle: string;
  MoviesPoster: string;
  MoviesOverview: string;
  MoviesBackdrop: string;
  MoviesTitleList: string[];
  MoviesPosterList: string[];
  MoviesOverviewList: string[];
  MoviesBackdropList: string[];


  constructor(movie: string) {
    this.API_KEY = '0965bb0b2ed4a6b448e51c23934b8931';
    this.language = 'ja-JP'
    this.getPopularMoviesURL = `https://api.themoviedb.org/3/movie/popular?api_key=${this.API_KEY}&language=${this.language}`
    this.getNowPlayingURL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${this.API_KEY}&language=${this.language}`
    this.getUpcomingMovieURL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${this.API_KEY}&language=${this.language}`
    this.getLatestMovieURL = `https://api.themoviedb.org/3/movie/latest?api_key=${this.API_KEY}&language=${this.language}`
    this.MoviesTitle = '';
    this.MoviesPoster = '';
    this.MoviesOverview = '';
    this.MoviesBackdrop = '';
    this.MoviesTitleList = [];
    this.MoviesPosterList = [];
    this.MoviesOverviewList = [];
    this.MoviesBackdropList = [];
  }

    // 検索された映画の情報を取得
  getSearchedMovie() {
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${this.API_KEY}&language=${this.language}&query=${movie}&page=1`)
    .then(response => {
      const moviesDataLength = response.data.results.length;
      if (moviesDataLength === 0) {
        return '検索された映画の情報はございません';
      } else {
        this.createDataList(response);
        setSearchedMovieData({
          title: this.MoviesTitleList,
          poster: this.MoviesPosterList,
          overview: this.MoviesOverviewList
        });
      }
      return;
    })
    .catch(err => {
      alert(err);
      return;
    })
  }

  createDataList(res: any) {
    const dataLength = res.data.results.length;
    for (let i = 0; i < dataLength; i++) {
      this.MoviesTitle = res.data.results[i].title;
      this.MoviesPoster = res.data.results[i].poster_path;
      this.MoviesOverview = res.data.results[i].overview;
      // this.MoviesBackdrop = res.data.results[i].

      this.MoviesTitleList.push(this.MoviesTitle);
      this.MoviesPosterList.push(this.MoviesPoster);
      this.MoviesOverviewList.push(this.MoviesOverview);
    }
  }
}

  class PopularMoviesData extends MoviesData {
    // 人気のある映画を取得
    getMoviesData() {
      axios.get(this.getPopularMoviesURL)
      .then(response => {
        this.createDataList(response);
        setPopularMovies({
          title: this.MoviesTitleList,
          poster: this.MoviesPosterList,
          overview: this.MoviesOverviewList
        });
        return;
      })
      .catch(err => {
        alert(err);
        return;
      })
    }
  }

  class NowPlayingMoviesData extends MoviesData {
    // 上映中の映画を取得
    getMoviesData() {
      axios.get(this.getNowPlayingURL)
      .then(response => {
        this.createDataList(response);
        setNowPlayingMovies({
          title: this.MoviesTitleList,
          poster: this.MoviesPosterList,
          overview: this.MoviesOverviewList
        })
        return;
      })
      .catch(err => {
        alert(err);
        return;
      })
    }
  }

  class UpComingMoviesData extends MoviesData {
    // 今後公開予定の映画
    getMoviesData() {
      axios.get(this.getUpcomingMovieURL)
      .then(response => {
        this.createDataList(response);
        setUpComingMovies({
          title: this.MoviesTitleList,
          poster: this.MoviesPosterList,
          overview: this.MoviesOverviewList
        });
        return;
      })
      .catch(err => {
        alert(err);
        return;
      })
    }
  }

  class LatestMoviesData extends MoviesData {
    // 最新情報
    getMoviesData() {
      axios.get(this.getLatestMovieURL)
      .then(response => {
        let data = response.data.results;
        console.log(data);
        return;
      })
      .catch(err => {
        alert(err);
        return;
      })
    }
  }

  const popularMoviesData = new PopularMoviesData('');
  const nowPlayingMoviesData = new NowPlayingMoviesData('');
  const upComingMoviesData = new UpComingMoviesData('');
  useEffect(() => {
    popularMoviesData.getMoviesData();
    nowPlayingMoviesData.getMoviesData();
    upComingMoviesData.getMoviesData();
  }, []);

  const mainContentsValue = {
    popular: popularMovies,
    nowPlaying: nowPlayingMovies,
    upComing: upComingMovies,
  }

  return (
    <div className="App">
      <NavListContext.Provider value={navList}>
        <Header title={title} setMovie={setMovie}/>
      </NavListContext.Provider>
      <Form movie={movie} setMovie={setMovie} getSearchedMovie={getSearchedMovie} MoviesData={MoviesData} />
      <Result searchedMovie={searchedMovie} searchedMovieData={searchedMovieData}/>
      <MainContentsContext.Provider value={mainContentsValue}>
        <MainContent />
      </MainContentsContext.Provider>
      <Footer />
    </div>
  );
}

export default App;