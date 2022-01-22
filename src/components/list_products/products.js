import Product from './product';
import Sidebar from './Sidebar';

import './products.css';

const Products = ({
  listProducts,
  setListProductsBySidebar,
  setCartProducts,
  cartProducts
}) => {
  return (
    <div className="listProducts container row">
      <div className="col s2">
        <Sidebar setListProductsBySidebar={setListProductsBySidebar} />
      </div>
      <div className="col s10">
        <div className="row">
          {listProducts !== null ? (
            listProducts.map((item) => (
              <Product
                key={item.id}
                {...item}
                setCartProducts={setCartProducts}
                cartProducts={cartProducts}
              />
            ))
          ) : (
            <p className="listOfProdcutsEmpty">
              No hay productos con ese nombre!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
