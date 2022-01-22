import { Button, Icon } from 'react-materialize';
import Tilt from 'react-tilt';

const BtnAddToCart = ({ id, setCartProducts }) => {
  const handleCartProducts = () => {
    const idsCartLocalStorage = window.localStorage.getItem('shoppingCart');
    const ids = JSON.parse(idsCartLocalStorage);
    if (ids === null) {
      setCartProducts([{ id }]);
      window.localStorage.setItem('shoppingCart', JSON.stringify([{ id }]));
    } else {
      setCartProducts([...ids, { id }]);
      window.localStorage.setItem(
        'shoppingCart',
        JSON.stringify([...ids, { id }])
      );
    }
  };

  return (
    <Tilt className="Tilt" options={{ max: 30 }}>
      <Button
        className="Tilt-inner btnAddCart"
        onClick={handleCartProducts}
        small
        node="a"
      >
        <Icon left>shopping_cart</Icon>
        + Carrito +
      </Button>
    </Tilt>
  );
};

export default BtnAddToCart;
