const CardContentProduct = (product) => {
  const { name, price, iva, stock } = product;

  return (
    <>
      <h5 className="nameProduct">{name}</h5>
      <div className="row">
        <div className="col s6 left">
          <p className="priceProductCard">
            <strong>${price}</strong>
          </p>
        </div>
        <div className="col s6 right-align iva">
          <strong>(IVA: {iva}%)</strong>
        </div>
      </div>
      <p>
        Stock:
        {stock ? (
          <strong className="green-text text-stock"> {stock}</strong>
        ) : (
          <strong className="red-text text-stock"> {stock}</strong>
        )}
      </p>
    </>
  );
};

export default CardContentProduct;
