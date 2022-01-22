//Functionalities
import { useEffect, useState } from 'react';

//Components
import { Header, Products, SliderComponent, Footer } from '../components';

import { fetchProducts } from '../helpers/fetching';

function Home({ listAllStaticProducts, dolar }) {
  /* List of Products */
  const [listProducts, setListProducts] = useState(listAllStaticProducts);
  const [listProductsBySidebar, setListProductsBySidebar] = useState('0');
  /* Shopping Cart */
  const [cartProducts, setCartProducts] = useState([]);
  const [cartCount, setCartCount] = useState([]);

  useEffect(() => {
    const idsCart = window.localStorage.getItem('shoppingCart');
    if (idsCart === null) {
      setCartCount({ count: 0 });
    } else {
      const idsProductsCart = idsCart !== null ? JSON.parse(idsCart) : [];
      setCartCount({ count: idsProductsCart.length });
    }
  }, [cartProducts]);

  useEffect(() => {
    Promise.all([
      fetchProducts(listProductsBySidebar, dolar).then(products => {
        setListProducts(products);
      })
    ]);
  }, [listProductsBySidebar]);

  return (
    <div className="Home">
      <Header
        listAllStaticProducts={listAllStaticProducts}
        setListProducts={setListProducts}
        setCartProducts={setCartProducts}
        cartCount={cartCount}
      />
      <strong>/ / Dolar hoy: ${dolar} / /</strong>
      <SliderComponent />
      <Products
        listProducts={listProducts}
        setListProductsBySidebar={setListProductsBySidebar}
        setCartProducts={setCartProducts}
        cartProducts={cartProducts}
      />
      <Footer />
    </div>
  );
}

export default Home;
