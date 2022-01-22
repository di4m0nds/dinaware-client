import React, { useState } from 'react';
import axios from 'axios';

import { TextInput, Select } from 'react-materialize';

const EditProduct = ({
  id,
  name,
  price,
  iva,
  stock,
  bio,
  category,
  setProductUpdate,
  setOpenFormUpdate,
  userToken
}) => {
  const [messageError, setMessageError] = useState(false);

  const handleUpdateProduct = e => {
    e.preventDefault();
    const newName = e.target[0].value;
    const newBio = e.target[1].value;
    const newPrice = e.target[2].value;
    const newStock = e.target[3].value;
    const newIva = e.target[4].value;
    let newCategory = e.target[5].value;

    switch (newCategory) {
      case 'Auriculares':
        newCategory = 1;
        break;
      case 'Mouse':
        newCategory = 2;
        break;
      case 'Gaming':
        newCategory = 3;
        break;
      case 'Memorias':
        newCategory = 4;
        break;
      case 'Muebles':
        newCategory = 5;
        break;
      default:
        newCategory = 3;
    }

    const productData = {
      newName,
      newBio,
      newPrice,
      newStock,
      newIva,
      newCategory
    };

    setProductUpdate(false);
    setMessageError(false);
    axios
      .put(`/api/products/${id}`, productData, {
        headers: {
          authorization: `Bearer ${userToken}`
        }
      })
      .then(response => {
        if (response.status === 200) {
          setProductUpdate(true);
          setOpenFormUpdate(false);
        }
      })
      .catch(err => setMessageError(true));

    setTimeout(() => {
      setProductUpdate(false);
      setMessageError(false);
    }, 3500);
  };

  const handleCloseForm = () => {
    setOpenFormUpdate(false);
  };

  return (
    <div className="editProduct">
      <h3>Editar Producto</h3>
      <form onSubmit={handleUpdateProduct}>
        <div className="fields">
          <TextInput
            label="Nombre del Producto"
            name="name"
            defaultValue={name}
          />
        </div>
        <div className="fields description-textarea">
          <TextInput
            label="Descripcion del Producto"
            name="bio"
            defaultValue={bio}
          />
        </div>
        <div className="fields">
          <TextInput
            type="number"
            label="Precio del Producto"
            name="price"
            step="any"
            defaultValue={price}
          />
        </div>
        <div className="fields">
          <TextInput
            type="number"
            label="Stock del Producto"
            name="stock"
            defaultValue={stock}
          />
        </div>
        <div className="fields">
          <TextInput
            type="number"
            label="IVA del Producto"
            step="any"
            name="iva"
            defaultValue={iva}
          />
        </div>
        <div className="fields">
          <Select
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
            value={category}
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
        <button type="submit" className="btn btn-large red hoverable">
          Editar Producto
        </button>
      </form>
      <button className="btn btn-small blue right" onClick={handleCloseForm}>
        Cerrar
      </button>
      <div className="messageError">
        {messageError === true ? (
          <p className="right">Ya no existe ese producto</p>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default EditProduct;
