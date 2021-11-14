// TODO映画をクリックしたら映画の情報が出てくるようにしたい,ゲームエイトのような感じ
// TODO検索ボタンを押したら下に映画リストが表示される
import { useEffect } from 'react';
import './styles/Form.scss'

type FormPropsType = {
  movie: string;
  setMovie: React.Dispatch<React.SetStateAction<string>>;
  getSearchedMovie: (e: React.FormEvent<HTMLFormElement>) => void;
  MoviesData: any;
}

const Form = ({movie, setMovie, getSearchedMovie, MoviesData}: FormPropsType) => {
  return (
    <div className="search-form">
      <form onSubmit={(e) => {
        getSearchedMovie(e);
        if (movie !== '') {
          const movieData = new MoviesData(movie);
          movieData.getSearchedMovie();
        }
      }}>
        <input
          className="input-area movie"
          type="text"
          placeholder="映画名を入力"
          onChange={e => setMovie(e.target.value)}
          value={movie}
        />
        <button className="search-btn" type="submit">検索</button>
      </form>
    </div>
  )
}

export default Form;