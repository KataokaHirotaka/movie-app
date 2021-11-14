import {Navigation} from './index';
import './styles/Header.scss'

type TitlePropsType = {
  title: string
  setMovie: React.Dispatch<React.SetStateAction<string>>
}

const Header = ({title, setMovie}: TitlePropsType) => {
  return (
    <header>
      <div className="title-wrapper">
        <h1 onClick={() => setMovie('')}>{title}</h1>
      </div>
      <Navigation />
    </header>
  )
}

export default Header;