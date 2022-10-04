import { Link } from 'react-router-dom';

function Header() {
  return (
    <div>
        <Link to="/">Home</Link>
        <Link to="thisPageGoesNowhere">erreur</Link>
    </div>
  );
}

export default Header;
