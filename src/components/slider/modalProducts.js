import React, { useEffect, useState } from 'react';

import axios from 'axios'
import ModalProduct from '../list_products/components/modalProduct';
import { Modal, Button } from 'react-materialize'

function ModalProducts({ deal }) {
  const { name, description, percentage, hoursForDeal, products } = deal
  let arr = [];
  const infoDeal = {
    booleano: true,
    percentage
  }

  const [productsDeal, setProductsDeal] = useState([])

  const initDealProducts = async () => {
    if (products.length > 0) {
      for (let i = 0; i < products.length; i++) {
        const res = await axios.get(`/api/products/${products[i]}`)
        arr.push(res.data);
      }
    }
    setProductsDeal(arr)
  }

  const trigger = (
    <Button className="btn btn-medium red btnDetails btnbtn" small node="a" >
      Ver detalles
    </Button>
  );

  useEffect(() => {
    initDealProducts()
  }, [])

  return (
    <>
      <div>
        <Modal
          actions={[
            <Button flat modal="close" node="button">Cerrar</Button>
          ]}
          bottomSheet
          fixedFooter={false}
          header={name}
          id="Modal-11"
          open={false}
          options={{
            dismissible: true,
            endingTop: '10%',
            inDuration: 250,
            onCloseEnd: null,
            onCloseStart: null,
            onOpenEnd: null,
            onOpenStart: null,
            opacity: 0.5,
            outDuration: 250,
            preventScrolling: true,
            startingTop: '4%'
          }}
          trigger={<Button className="btn btn-small red" node="button">Ver Productos</Button>}>
          <>
            <div className="productsDeal dealInfo">
              <p><strong>Descripcion: </strong>{description}</p>
              <p><strong>Descuento: </strong>{percentage}%</p>
              <p><strong>Tiempo Habilitado: </strong>{hoursForDeal}hs</p>
            </div>
            <div className="productsDeal">
              {productsDeal.map(e => (
                <div key={e.id} className="btn-deals">
                  <p>{e.name}</p>
                    <Modal
                      trigger={trigger}
                      open={false}
                      actions={[
                        <Button flat modal="close" node="button" className="white left"> <strong>Cerrar</strong> </Button>
                      ]}
                    >
                      <div>
                        <ModalProduct {...e} infoDeal={infoDeal} />
                      </div>
                    </Modal>
                </div>
              ))}
            </div>
          </>
        </Modal>
      </div>
    </>
  );
}

export default ModalProducts;