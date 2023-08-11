import logo from '../images/header-logo.svg';
import { Link } from 'react-router-dom';

function Header({ title, route, onClick, userEmail }) {
  return (
    <header className='header'>
      <img src={logo} alt='Логотип проекта' className='header__logo' />
      <div className='header__auth'>
        <p className='header__login'>{userEmail}</p>
        <Link to={route} className='header__link' onClick={onClick}>
          {title}
        </Link>
      </div>
    </header>
  );
}
export default Header;
