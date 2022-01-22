import BtnAddToCart from './btnAddToCart';
import CardContentProduct from './cardContentProduct';
import ModalProduct from './modalProduct';

import { Card, CardTitle, Modal, Button } from 'react-materialize';

const CardProduct = (product) => {
  const { image } = product;

  const trigger = (
    <Button className="btnDetails hoverable" small node="a">
      Ver detalles
    </Button>
  );

  return (
    <>
      <Card
        className="hoverable cardProduct left-align"
        header={<CardTitle image={image}></CardTitle>}
      >
        <CardContentProduct {...product} />
        <BtnAddToCart
          id={product.id}
          setCartProducts={product.setCartProducts}
        />

        <Modal
          trigger={trigger}
          open={false}
          actions={[
            <Button flat modal="close" node="button" className="white">
              <strong>Cerrar</strong>
            </Button>
          ]}
        >
          <div className="row">
            <ModalProduct {...product} />
          </div>
        </Modal>
      </Card>
    </>
  );
};

export default CardProduct;
