import FormProduct from './formProduct';

const CreateProduct = (props) => {
  return (
    <div className="createProduct">
      <br />
      <br />
      <br />
      <FormProduct {...props} />
    </div>
  );
};

export default CreateProduct;
