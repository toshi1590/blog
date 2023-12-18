import { useState } from 'react';
import HeaderModule from '../css/Header.module.css';
import { Link, NavLink } from 'react-router-dom';
import parse from 'html-react-parser';

const Header = () => {
  const [active, setActive] = useState(false);

  return (
    <header>
      <nav>
        <div className={HeaderModule.tab}>
          <NavLink className={HeaderModule.navlink} to="/" style={({ isActive }) => ({ 
            color: isActive ? 'blue' : 'black' })}>
            Home
          </NavLink>        
        </div>
        <div className={HeaderModule.tab}>
          <NavLink className={HeaderModule.navlink} to="/lessons" style={({ isActive }) => ({ 
            color: isActive ? 'blue' : 'black' })}>
            Lessons
          </NavLink>        
          <div className={HeaderModule.dropdown}>
            <div>
              <NavLink className={HeaderModule.navlink} to="/lessons/personal" style={({ isActive }) => ({ 
                color: isActive ? 'blue' : 'black' })}>
                Personal lesson
              </NavLink>        
            </div>
            <div>
              <NavLink className={HeaderModule.navlink} to="/lessons/group" style={({ isActive }) => ({ 
                color: isActive ? 'blue' : 'black' })}>
                Group lesson
              </NavLink>    
            </div>
          </div>
        </div>
        <div className={HeaderModule.tab}>
          <NavLink className={HeaderModule.navlink} to="/articles" style={({ isActive }) => ({ 
            color: isActive ? 'blue' : 'black' })}>
            Blog
          </NavLink>
        </div>
        <div className={HeaderModule.tab}>
          <NavLink className={HeaderModule.navlink} to="/contact" style={({ isActive }) => ({ 
            color: isActive ? 'blue' : 'black' })}>
            Contact
          </NavLink>
        </div>
        <div className={HeaderModule.tab}>
          <NavLink className={HeaderModule.navlink} to="/admin" style={({ isActive }) => ({ 
            color: isActive ? 'blue' : 'black' })}>
            Admin
          </NavLink>
        </div>
      </nav>
      <div className={HeaderModule.hamburger_menu}>
        <div className={HeaderModule.hamburger_btn} onClick={() => {setActive(!active)}}>
          {active == false ? parse('&#9776;') : parse('&#10005;')} 
        </div>
        <div className={active == false ? `${HeaderModule.hamburger_items} ${HeaderModule.hidden}` : HeaderModule.hamburger_items}>
          <div className={HeaderModule.hamburger_item}>
            <Link to="/" onClick={() => {setActive(!active)}}>home</Link>
          </div>
          <div className={HeaderModule.hamburger_item}>
            <Link to="/lessons" onClick={() => {setActive(!active)}}>lessons</Link>
          </div>
          <div className={HeaderModule.hamburger_item}>
            <Link to="/articles" onClick={() => {setActive(!active)}}>blog</Link>
          </div>
          <div className={HeaderModule.hamburger_item}>
            <Link to="/contact" onClick={() => {setActive(!active)}}>contact</Link>
          </div>
          <div className={HeaderModule.hamburger_item}>
            <Link to="/admin" onClick={() => {setActive(!active)}}>admin</Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;