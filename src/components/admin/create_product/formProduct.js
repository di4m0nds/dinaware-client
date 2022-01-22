import { useState } from 'react';

import { TextInput, Select } from 'react-materialize';

import '../styles.css';

const FormProduct = ({ userToken }) => {
  const [image, setImage] = useState();
  const [data, setData] = useState({
    name: '',
    bio: '',
    price: 0,
    stock: 0,
    iva: 0,
    category: 0
  });
  const [productCreated, setProductCreated] = useState(false);

  const handleImage = e => {
    setImage(e.target.files[0]);
  };

  const handleData = e => {
    const newData = { ...data };
    newData[e.target.name] = e.target.value;
    setData(newData);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!image) return;
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => {
      uploadImage(reader.result);
    };
    reader.onerror = () => {
      console.error('AHHHHHHHH!!');
    };
  };

  const uploadImage = async base64EncodedImage => {
    const formData = JSON.stringify({
      name: data.name,
      bio: data.bio,
      stock: data.stock,
      price: data.price,
      iva: data.iva,
      category: data.category
    });

    try {
      await fetch('/api/products', {
        method: 'POST',
        body: JSON.stringify({ file: base64EncodedImage, fields: formData }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`
        }
      }).then(response => {
        if (response.status === 200) setProductCreated(true);
        else setProductCreated(false);
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container createProduct">
      <h3>Completar Formulario</h3>
      <form action="#" method="post" onSubmit={handleSubmit}>
        <div className="fields">
          <TextInput
            label="Nombre del Producto"
            name="name"
            onChange={handleData}
          />
        </div>
        <div className="fields description-textarea">
          <TextInput
            label="Descripcion del Producto"
            name="bio"
            onChange={handleData}
          />
        </div>
        <div className="fields">
          <TextInput
            type="number"
            label="Precio del Producto"
            name="price"
            step="any"
            onChange={handleData}
          />
        </div>
        <div className="fields">
          <TextInput
            type="number"
            label="Stock del Producto"
            name="stock"
            onChange={handleData}
          />
        </div>
        <div className="fields">
          <TextInput
            step="any"
            type="number"
            label="IVA del Producto"
            name="iva"
            onChange={handleData}
          />
        </div>
        <div className="fields">
          <Select
            onChange={handleData}
            name="category"
            multiple={false}
            options={{
              classes: '',
              dropdownOptions: {
                alignment: 'left',
                autoTrigger: true,
                closeOnClick: true,
                constrainWidth: true,
                coverTrigger: true,
                inDuration: 150,
                onCloseEnd: null,
                onCloseStart: null,
                onOpenEnd: null,
                onOpenStart: null,
                outDuration: 250
              }
            }}
            value=""
          >
            <option disabled value="">
              Elegir Categoria para el Producto
            </option>
            <option value="1">Auriculares</option>
            <option value="2">Mouse</option>
            <option value="3">Gaming</option>
            <option value="4">Memorias</option>
            <option value="5">Teclados</option>
            <option value="6">Muebles</option>
          </Select>
        </div>
        <div className="fields fieldFile">
          <TextInput
            name="image"
            id="TextInput-26"
            label="Insertar Imagen Del Producto"
            type="file"
            onChange={handleImage}
          />
        </div>
        {productCreated && (
          <p className="productCreated green scale-up-ver-center">
            Producto Creado Correctamente!
          </p>
        )}
        <button type="submit" className="btn btn-large red hoverable">
          Crear Producto
        </button>
      </form>
    </div>
  );
};

export default FormProduct;
