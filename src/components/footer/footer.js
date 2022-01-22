import React from 'react';

import { Footer } from 'react-materialize';
import './footer.css';

function footer() {
  return (
    <div className="footer">
      <Footer
        className="example"
        copyrights="DINAWARE © 2021 Copyright"
        links={
          <ul>
            <li>
              <a className="grey-text text-lighten-3" href="/">
                Inicio
              </a>
            </li>
            <li>
              <a className="grey-text text-lighten-3" href="/Nosotros">
                Nosotros
              </a>
            </li>
            <li>
              <a className="grey-text text-lighten-3" href="/Contacto">
                Contacto
              </a>
            </li>
          </ul>
        }
      >
        <h5 className="white-text">Dinaware</h5>
        <p className="grey-text text-lighten-4">Productos y Servicios</p>
      </Footer>
    </div>
  );
}

export default footer;
