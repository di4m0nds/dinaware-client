import LinksNavBar from './links';
import SearchNavBar from './search';
import ModalShoppingCart from './modalShoppingCart';
import { Icon, Modal, Button } from 'react-materialize';
import './navbar.css';
import M from 'materialize-css';

const NavBar = ({
  listAllStaticProducts,
  setListProducts,
  setCartProducts,
  cartCount
}) => {
  const trigger = (
    <Button>
      <Icon center large>
        shopping_cart
      </Icon>
      <div className="numberCart">{cartCount.count}</div>
    </Button>
  );

  return (
    <div className="navbarSection row z-depth-2">
      <div className="col s5">
        <LinksNavBar />
      </div>
      <div className="col s6 search">
        <SearchNavBar
          listAllStaticProducts={listAllStaticProducts}
          setListProducts={setListProducts}
        />
      </div>
      <div className="col s1">
        <Modal
          trigger={trigger}
          open={false}
          actions={[
            <Button flat modal="close" node="button" className="white">
              Cerrar
            </Button>
          ]}
        >
          <ModalShoppingCart
            listAllStaticProducts={listAllStaticProducts}
            setCartProducts={setCartProducts}
            cartCount={cartCount}
          />
        </Modal>
      </div>
    </div>
  );
};

export default NavBar;
