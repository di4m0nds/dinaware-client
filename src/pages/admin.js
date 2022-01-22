import axios from 'axios';
import { useState, useEffect } from 'react';
import loginServices from '../helpers/login';

import {
  Menu,
  CreateProduct,
  ProductsTable,
  CreateDeal,
  ExistsDeal
} from '../components';

const Admin = (props) => {
  const { listAllStaticProducts } = props;
  const [operation, setOperation] = useState(0);
  const [unauthorized, setUnauthorized] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const [deal, setDeal] = useState(null);

  useEffect(() => {
    async function fetchData() {
      await axios
        .get('/api/deal')
        .then((res) => setDeal(res.data[0]))
        .catch((err) => {
          console.error(err);
          setDeal(null);
        });
    }
    fetchData();
  }, []);

  useEffect(() => {
    const userSessionLocalStorage = window.localStorage.getItem('loggedUser');
    if (userSessionLocalStorage) {
      const userExists = JSON.parse(userSessionLocalStorage);
      setUser(userExists);
    }
  }, []);

  const renderHandleOperation = () => {
    switch (operation) {
      case 1:
        return <CreateProduct userToken={user.token} />;
      case 2:
        if (deal === null || deal === undefined) {
          return (
            <CreateDeal
              listStaticAllProducts={listAllStaticProducts}
              userToken={user.token}
            />
          );
        } else {
          return <ExistsDeal deal={deal} userToken={user.token} />;
        }
      case 3:
        window.localStorage.removeItem('loggedUser');
        setUser(null);
        break;
      default:
        return (
          <ProductsTable
            listStaticAllProducts={listAllStaticProducts}
            user={user}
          />
        );
    }
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    setUnauthorized(false);

    loginServices
      .login({
        username,
        password
      })
      .then((result) => {
        window.localStorage.setItem('loggedUser', JSON.stringify(result));
        if (result === null || result === undefined) {
          setUnauthorized(true);
          setUser(null);
        } else {
          setUnauthorized(false);
          setUser(result);
        }
      })
      .catch((err) => {
        setUnauthorized(true);
      });

    setUsername('');
    setPassword('');
  };

  return (
    <div className="admin">
      {user === null && (
        <div className="container container">
          <br />
          <br />
          <br />
          <br />
          <h1>Administración del Sitio</h1>
          <br />
          <br />
          <form
            method="POST"
            onSubmit={handleSubmitLogin}
            className="container"
          >
            <input
              type="text"
              value={username}
              name="username"
              placeholder="Nombre de Usuario"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <br />
            {unauthorized && (
              <p className="unauthorized scale-up-ver-center">
                No tiene autorizacion para ingresar al sitio
              </p>
            )}
            <button className="btn btn-large red" type="submit">
              Ingresar
            </button>
            <br />
            <br />
            <br />
            <a className="backHomeLink" href="/">
              Volver a inicio
            </a>
          </form>
        </div>
      )}
      {/* Interface */}
      {user !== null ? renderHandleOperation() : ''}
      {/* OptionsMenu */}
      {user !== null ? <Menu setOperation={setOperation} /> : ''}
    </div>
  );
};

export default Admin;
