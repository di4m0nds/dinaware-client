import CardProduct from './components/cardProduct';

const Product = (props) => {
  return (
    <div className="col s4 s12 m12 l6 xl4">
      <CardProduct {...props} />
    </div>
  );
};

export default Product;
