import { Icon } from 'react-materialize';
const LinksNavBar = () => {
  return (
    <div className="links">
      <ul className="links-ul">
        <li className="links-li">
          <a href="/">Inicio</a>
        </li>
        <li className="links-li">
          <a href="/Nosotros">Nosotros</a>
        </li>
        <li className="links-li">
          <a href="/Contacto">Contacto</a>
        </li>
        <li className="links-li">
          <a href="/Admin">
            <Icon small>admin_panel_settings</Icon>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default LinksNavBar;
