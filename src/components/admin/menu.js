import { Button, Icon } from 'react-materialize';

const Menu = ({ setOperation }) => {
  return (
    <div className="admin">
      <Button
        className="red"
        fab={{
          direction: 'bottom',
          hoverEnabled: false
        }}
        floating
        large
        node="button"
        style={{
          top: '23px'
        }}
      >
        <Button
          className="red darken-1 hoverable"
          floating
          icon={<Icon>logout</Icon>}
          node="button"
          onClick={() => setOperation(3)}
          tooltip="Cerrar Sesion"
          tooltipOptions={{
            position: 'left'
          }}
        />
        <Button
          className="red darken-1 hoverable"
          floating
          icon={<Icon>add</Icon>}
          node="button"
          onClick={() => setOperation(1)}
          tooltip="Crear Producto"
          tooltipOptions={{
            position: 'left'
          }}
        />
        <Button
          className="red darken-1 hoverable"
          floating
          icon={<Icon>local_offer</Icon>}
          node="button"
          onClick={() => setOperation(2)}
          tooltip="Crear Oferta"
          tooltipOptions={{
            position: 'left'
          }}
        />
        <Button
          className="red darken-1 hoverable"
          floating
          icon={<Icon>search</Icon>}
          node="button"
          onClick={() => setOperation(0)}
          tooltip="Buscar Producto"
          tooltipOptions={{
            position: 'left'
          }}
        />
      </Button>
    </div>
  );
};

export default Menu;
