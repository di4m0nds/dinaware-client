import React, { useState } from 'react';

import { Table, Checkbox } from 'react-materialize';

function CreateDeal({ listStaticAllProducts, userToken }) {
  const [arrayDeal, setArrayDeal] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [percentage, setPercentage] = useState(0);
  const [hoursForDeal, setHourForDeal] = useState(0);
  const [messageCreateDeal, setMessageCreateDeal] = useState({
    type: '',
    message: ''
  });

  const handleDealProducts = (e) => {
    const { value, checked } = e.target;
    let array = arrayDeal;
    setMessageCreateDeal({
      type: '',
      message: ''
    });
    if (checked) array.push(value);
    else array.shift(value);

    setArrayDeal(array);
  };

  const handleClickCreateDeal = async (e) => {
    if (arrayDeal.length === 0) {
      setMessageCreateDeal({
        type: 'error',
        message: 'Aun no selecciono ningun producto'
      });
    } else {
      try {
        await fetch('/api/deal', {
          method: 'POST',
          body: JSON.stringify({
            name,
            description,
            percentage,
            hoursForDeal,
            arrayDeal
          }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`
          }
        }).then((response) => {
          setMessageCreateDeal({
            type: 'success',
            message: 'Oferta creada correctamente'
          });
        });
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="create_deal container">
      <h1>Crear Oferta</h1>

      <br />
      <br />

      <div className="container">
        <div className="container">
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Nombre de la Oferta"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            id="description"
            type="text"
            name="description"
            placeholder="Descripcion de la Oferta"
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            id="percentage"
            type="number"
            name="percentage"
            placeholder="Procentaje de la Oferta. Ejemplo 10%"
            onChange={(e) => setPercentage(e.target.value)}
          />
          <input
            id="hoursForDeal"
            type="number"
            name="hoursForDeal"
            placeholder="Horas habilitada la Oferta"
            onChange={(e) => setHourForDeal(e.target.value)}
          />
          <br />
          <br />
          <button
            className="btn btn-small red left"
            onClick={handleClickCreateDeal}
          >
            Crear Oferta
          </button>
        </div>
      </div>

      <br />
      <br />
      {messageCreateDeal.type === 'error' ? (
        <p className="unauthorized scale-up-ver-center">
          {messageCreateDeal.message}
        </p>
      ) : (
        ''
      )}
      {messageCreateDeal.type === 'success' ? (
        <p className="productCreated green scale-up-ver-center">
          {messageCreateDeal.message}
        </p>
      ) : (
        ''
      )}
      <br />
      <br />

      <p className="left">
        Productos Seleccionados: <strong>{arrayDeal.length}</strong>
      </p>
      <Table>
        <thead>
          <tr className="red-text">
            <th data-fields="id">Marcar para Ofertar</th>
            <th data-fields="id">Nombre</th>
            <th data-fields="id">Precio</th>
          </tr>
        </thead>
        <tbody>
          {listStaticAllProducts.map((p, index) => {
            return (
              <tr key={index}>
                <th>
                  <Checkbox
                    filledIn
                    label="Incluir"
                    value={p.id}
                    onChange={handleDealProducts}
                  />
                </th>
                <th>{p.name}</th>
                <th>{p.price}</th>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default CreateDeal;
