import React, {useContext} from 'react';
import './styles/Navigation.scss'
import { NavListContext } from '../contextData';


const Navigation = () => {
  const navList = useContext(NavListContext);


  return (
    <div className="nav-wrapper">
      <nav className="nav">
        {
          navList.map((list: string, i: number) => {
            if (list === 'Movie') {
              return (
                <li className="nav-list" style={{backgroundColor: 'white', color: 'black'}}>{list}</li>
              )
            } else {
              return (
                <li className="nav-list">{list}</li>
              )
            }
          })
        }
      </nav>
    </div>
  )
}

export default Navigation;