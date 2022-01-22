import { useState } from 'react';
import axios from 'axios';
import { Table, Icon } from 'react-materialize';

const ModalShoppingCart = ({
  listAllStaticProducts,
  setCartProducts,
  cartCount
}) => {
  const idsCart = localStorage.getItem('shoppingCart');
  let idsProductsCart = idsCart !== null ? JSON.parse(idsCart) : [];

  let countToTal = 0;
  const products = idsProductsCart.map((el) => {
    //console.log('static all products => ', listAllStaticProducts);
    return listAllStaticProducts.filter((p) => p.id === el.id);
  });

  const [messageLoad, setMessageLoad] = useState(false)
  let productArray = []

  const handleClearCartProduct = () => {
    const deleted = [];
    setCartProducts(deleted);
    window.localStorage.removeItem('shoppingCart');
  };

  const handleBuyProduct = () => {
    const oProd = {
      items: productArray
    }
    setMessageLoad(true)
    setTimeout(() => setMessageLoad(false), 4000)
    axios.post(`/api/buy`, oProd)
      .then(res => {
        const { response } = res.data.res_redirect;
        window.open(response.init_point)
      })
      .catch(e => console.error(e))
  }

  return (
    <div className="modalShoppingCart">
      <h2 className="center-align">Tu Carrito de Compras</h2>

      <h5 className="red-text">
        <Icon left small>
          shopping_cart
        </Icon>
        {cartCount.count > 1 || cartCount.count < 1
          ? ' Productos'
          : ' Producto'}
      </h5>

      <Table>
        <thead>
          <tr className="red-text">
            <th data-fields="id">Nombre</th>
            <th data-fields="id">Precio</th>
            <th data-fields="id">Iva</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, index) => {
            return (
              <tr key={index}>
                {p.map((p) => {
                  countToTal = countToTal + p.price;
                  productArray.push({title: p.name, quantity: 1, unit_price: p.price, picture_url: p.image});
                  return <Tbody key={p.id} {...p} />;
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
      <strong>Precio total: $ {Math.floor(countToTal)}</strong>

      <h6
        className="center-align red-text hanldeClearProductsOfCart"
        onClick={handleClearCartProduct}
      >
        Limpiar Carrito
      </h6>
      {cartCount.count < 1 ? '' : (
        <button className="btn btn-large green" onClick={handleBuyProduct}>Comprar Todo</button>
      )}
      {messageLoad && (
        <p className="messageLoading right">Cargando Compra . . .</p>
      )}
    </div>
  );
};

const Tbody = (props) => {
  const { name, price, iva } = props;
  return (
    <>
      <td>{name}</td>
      <td>${price}</td>
      <td>{iva}%</td>
    </>
  );
};

export default ModalShoppingCart;
