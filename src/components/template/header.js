import Logo from './components/logo';
import NavBar from './components/navbar';

import './header.css';

const Header = (props) => {
  return (
    <div className="headerSection">
      <div className="headerComponent">
        <div className="logoComponent">
          <Logo />
        </div>
        <div className="navBarComponent navBar">
          <NavBar {...props} />
        </div>
      </div>
    </div>
  );
};

export default Header;
