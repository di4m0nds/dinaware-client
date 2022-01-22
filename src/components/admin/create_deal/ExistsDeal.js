import React, {useState} from 'react';
import axios from 'axios';

import './deal.css'

const ExistsDeal = ({ deal, userToken }) => {
  const [showProducts, setShowProducts] = useState(false)
  const [allProducts, setAllProducts] = useState([])

  const handleProducts = async() => {
    let products = []
    for (let i = 0; i < deal.products.length; i++) {
      const res = await axios.get(`/api/products/${deal.products[i]}`)
        .catch(err => console.error(err))
      products.push(res.data)
    }
    setAllProducts(products)
    setShowProducts(true)
    setTimeout(() => setShowProducts(false), 10000)
  }

  const handleDeleteDeal = async() => {
    if (window.confirm('¿Esta seguro que quiere eliminar la ofera actual?')) {
      try {
        await fetch('/api/deal', {
          method: 'DELETE',
          body: JSON.stringify({ id: deal.id}),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`
          }
        }).then((response) => {
          alert('Eliminado Correctamente!')
        });
      } catch (err) {
        console.error(err);
      }
    }else{
      console.log('deal not deleted')
    }
  }

  return (
    <div className="deal-container">
      <div className="deal-container_title">
        <h2>Hay una oferta ya disponible!</h2>
      </div>
      <div className="deal-container_content">
        <div className="deal-container_content-title">
          <h5>Nombre de la oferta: <strong>{deal.name}</strong></h5>
          <h5>Porcentaje de la oferta: <strong>{deal.percentage}%</strong></h5>
          <h5>Descripcion de la oferta: <strong>{deal.description}</strong></h5>
          <button className="btn btn-large red btn-delete" onClick={handleDeleteDeal}>Eliminar Oferta Actual</button>
        </div>
        <div className="deal-container_content-title">
          <h5>Productos de la oferta: </h5>
          {!showProducts && (
            <button className="btn btn-medium red" onClick={handleProducts}>Ver Products</button>
          )}
          {showProducts && (
            <strong>{allProducts.map((p) => 
              <h5 className="showProducts scale-up-ver-top" key={p.id}>{p.name}</h5>
            )}</strong>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExistsDeal;
