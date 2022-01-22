import { useState, useEffect } from 'react';
import { topography } from 'hero-patterns';
import axios from 'axios';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './pages/home';
import Admin from './pages/admin';

//CSS Materialize
import '../node_modules/materialize-css/dist/css/materialize.css';
//CSS Mine
import './App.css';

//Helpers
import { fetchProducts } from './helpers/fetching';

function App() {
  /* Products */
  const [listAllStaticProducts, setListAllStaticProducts] = useState([]);
  const [dolar, setDolar] = useState(0);

  useEffect(() => {
    let el = document.querySelector('body');
    el.style.backgroundImage = topography('#F6E8E9', 1);
  }, []);

  useEffect(() => {
    fetchProducts(0, dolar).then(products => {
      setListAllStaticProducts(products);
    });
  }, [dolar]);

  useEffect(() => {
    async function fetchData() {
      try {
        await axios
          .get('https://apiarg.herokuapp.com/api/dolaroficial')
          .then(res => {
            let dolarhoy = res.data.venta;
            setDolar(dolarhoy);
          });
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [dolar]);

  return (
    <Router>
      <div className="App">
        <Switch>
          {/* Home */}
          <Route
            exact
            path="/"
            component={() => (
              <Home
                listAllStaticProducts={listAllStaticProducts}
                dolar={dolar}
              />
            )}
          />
          {/* Nosotros */}
          <Route exact path="/Nosotros" component={Home} />
          {/* Contacto */}
          <Route exact path="/Contacto" component={Home} />
          {/* Admin */}
          <Route
            exact
            path="/Admin"
            component={() => (
              <Admin listAllStaticProducts={listAllStaticProducts} />
            )}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
