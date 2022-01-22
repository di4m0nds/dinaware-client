import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Icon, Chip } from 'react-materialize';
import Tilt from 'react-tilt';

const ModalProduct = product => {
  const { id, image, name, iva, bio, stock, category, infoDeal } = product;
  let { price } = product;

  const [messageLoad, setMessageLoad] = useState(false);

  const handleBuyProduct = () => {
    price = parseFloat(price);
    let newPrice;
    if (infoDeal) {
      newPrice = price / 100;
      newPrice = newPrice * infoDeal.percentage;
      newPrice = price - newPrice;
    } else {
      newPrice = price;
    }
    const oProd = {
      items: [
        {
          title: name,
          quantity: 1,
          unit_price: newPrice,
          picture_url: image
        }
      ]
    };
    setMessageLoad(true);
    setTimeout(() => setMessageLoad(false), 4000);
    axios
      .post(`/api/buy/${id}`, oProd)
      .then(res => {
        const { response } = res.data.res_redirect;
        window.open(response.init_point);
      })
      .catch(e => console.error(e));
  };

  return (
    <>
      <div className="col s5 img-details">
        {!infoDeal && (
          <Tilt className="Tilt" options={{ max: 10 }}>
            <img
              src={image}
              className="Tilt-inner img-product hoverable"
              alt="img"
            />
          </Tilt>
        )}
      </div>
      <div className="col s7">
        <h4 className=" container">
          <strong className="nameProductDetails">{name}</strong>
        </h4>
        <p className="container bio-details">{bio}</p>
        <div className="container">
          <p>
            {infoDeal ? (
              <>
                <strong className="priceProductCard throughText">
                  ${price}
                </strong>{' '}
                <PriceWithPercentage
                  price={price}
                  percentage={infoDeal.percentage}
                />
              </>
            ) : (
              <strong className="priceProductCard">${price}</strong>
            )}
            <strong className="iva"> ( con IVA de: {iva}% )</strong>
          </p>
          <p>
            Stock:
            {stock ? (
              <strong className="green-text text-stock"> {stock}</strong>
            ) : (
              <strong className="red-text text-stock"> {stock}</strong>
            )}
          </p>
        </div>
        <div className="container">
          Categoria del producto:
          <br />
          <br />
          <Chip
            close={false}
            closeIcon={<Icon className="close">close</Icon>}
            options={null}
          >
            {category == 1 ? 'Auriculares' : ''}
            {category == 2 ? 'Mouse' : ''}
            {category == 3 ? 'Gaming' : ''}
            {category == 4 ? 'Memorias' : ''}
            {category == 5 ? 'Muebles' : ''}
          </Chip>
        </div>
        <br />
        <Button
          className="btnBuy hoverable green right"
          large
          node="a"
          onClick={handleBuyProduct}
        >
          Comprar ya!
        </Button>
        {messageLoad && (
          <p className="messageLoading right">Cargando Compra . . .</p>
        )}
      </div>
    </>
  );
};

export default ModalProduct;

const PriceWithPercentage = ({ price, percentage }) => {
  let newPrice = price / 100;
  newPrice = newPrice * percentage;
  newPrice = price - newPrice;
  return (
    <>
      <strong>${Math.floor(newPrice)}</strong>
    </>
  );
};

