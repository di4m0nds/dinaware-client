import logoImg from '../../../assets/images/logo_dinaware.bmp';

import './logo.css';

const Logo = () => {
  return (
    <div className="logoSection">
      {/* IMGLogo And LogoName */}
      <div className="right-align">
        <img src={logoImg} alt="DINAWARE" />
      </div>
      <h4 className="left-align logoTitle">
        <a href="/">DINAWARE</a> <br />
        <a href="/" className="subtitle">
          PRODUCTOS & SERVICIOS
        </a>
      </h4>
    </div>
  );
};

export default Logo;
