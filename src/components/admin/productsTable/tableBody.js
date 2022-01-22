import { useState } from 'react';
import axios from 'axios';

import EditProduct from '../edit_produc/editProduct';

import { Collapsible, CollapsibleItem, Icon } from 'react-materialize';

const TableBody = (props) => {
  const {
    id,
    name,
    price,
    iva,
    stock,
    bio,
    category,
    image_id,
    setProductDeleted,
    setProductUpdate,
    userToken
  } = props;
  const [openFormUpdate, setOpenFormUpdate] = useState(false);
  const productData = { id, name, price, iva, stock, bio, category };

  const handleDeleteProduct = (e) => {
    setProductDeleted(false);
    if (window.confirm('Esta seguro quiere eliminar el producto?')) {
      axios
        .delete(`/api/products/${id}/${image_id}`, {
          headers: {
            authorization: `Bearer ${userToken}`
          }
        })
        .then((response) => {
          setProductDeleted(true);
        })
        .catch((err) => console.error(err));
    }
    setTimeout(() => setProductDeleted(false), 3500);
  };

  const openFormUpdateProduct = (e) => {
    setOpenFormUpdate(true);
  };

  return (
    <>
      <td>{name}</td>
      <td className="collapsibleDesc">
        <Collapsible accordion>
          <CollapsibleItem
            expanded={false}
            header="Descripción"
            icon={<Icon>description</Icon>}
            node="div"
          >
            {bio}
          </CollapsibleItem>
        </Collapsible>
      </td>
      <td>${price}</td>
      <td>{stock}</td>
      <td>{iva}%</td>
      <td>
        {category == 1 ? 'Auriculares' : ''}
        {category == 2 ? 'Mouse' : ''}
        {category == 3 ? 'Gaming' : ''}
        {category == 4 ? 'Memorias' : ''}
        {category == 5 ? 'Muebles' : ''}
      </td>
      <td>
        <button
          className="btn-floating btn-large red hoverable"
          onClick={handleDeleteProduct}
        >
          <Icon>delete</Icon>
        </button>
      </td>
      <td>
        <button
          className="btn-floating btn-large red hoverable"
          onClick={openFormUpdateProduct}
        >
          <Icon>edit</Icon>
        </button>
        <button className="btn-floating btn-large red hoverable">
          <Icon>crop_original</Icon>
        </button>
      </td>
      {openFormUpdate && (
        <EditProduct
          userToken={userToken}
          setProductUpdate={setProductUpdate}
          setOpenFormUpdate={setOpenFormUpdate}
          {...productData}
        />
      )}
    </>
  );
};

export default TableBody;
