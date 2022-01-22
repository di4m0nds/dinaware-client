import { useState } from 'react';
import { Table } from 'react-materialize';

import TableBody from './tableBody';

const ProductsTable = (props) => {
  const { listStaticAllProducts, user } = props;

  const [productDeleted, setProductDeleted] = useState(false);
  const [productUpdate, setProductUpdate] = useState(false);

  return (
    <div className="productsTable container">
      <h1>Bienvenido {user.name}</h1>
      <h5 className="left">Tabla de Productos</h5>
      <a className="right btn btn-small black" href="/Admin">
        Refrescar Pagina
      </a>
      <Table>
        <thead>
          <tr className="red-text">
            <th data-fields="id">Nombre</th>
            <th data-fields="id">Descripcion</th>
            <th data-fields="id">Precio</th>
            <th data-fields="id">Stock</th>
            <th data-fields="id">Iva</th>
            <th data-fields="id">Categoria</th>
            <th data-fields="id">ELIMINAR</th>
            <th data-fields="id">EDITAR</th>
          </tr>
        </thead>
        <tbody>
          {listStaticAllProducts.map((p, index) => {
            return (
              <tr key={index}>
                <TableBody
                  {...p}
                  userToken={user.token}
                  setProductDeleted={setProductDeleted}
                  setProductUpdate={setProductUpdate}
                />
              </tr>
            );
          })}
        </tbody>
      </Table>
      {productDeleted && (
        <p className="messageProductDeleted scale-up-ver-center green">
          Producto Eliminado Correctamente
        </p>
      )}
      {productUpdate && (
        <p className="messageProductDeleted scale-up-ver-center green">
          Producto Editado Correctamente
        </p>
      )}
    </div>
  );
};

export default ProductsTable;
