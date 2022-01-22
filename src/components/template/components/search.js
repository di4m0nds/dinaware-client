import { useState } from 'react';
import { Icon, Autocomplete } from 'react-materialize';

const SearchNavBar = ({ listAllStaticProducts, setListProducts }) => {
  const [autocomplete, setAutoComplete] = useState({});

  let listNames = {};

  const handleSearchProducts = (e) => {
    e.preventDefault();
  };

  const handleInputText = (e) => {
    if (
      e.target.value === '' ||
      e.target.value === undefined ||
      e.target.value === null
    ) {
      setListProducts(listAllStaticProducts);
    } else {
      let result = listAllStaticProducts.filter(
        (product) =>
          product.name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1
      );
      if (result.length === 0) {
        setListProducts(null);
      } else {
        setListProducts(result);
        result.map((product) => {
          listNames[product.name] = null;
        });
        setAutoComplete(listNames);
      }
    }
  };

  return (
    <>
      <form
        method="GET"
        className="form-search"
        onSubmit={handleSearchProducts}
      >
        <Autocomplete
          placeholder="Buscar producto . . ."
          className="inputSearch"
          onChange={handleInputText}
          options={{
            data: autocomplete,
            limit: 5,
            onAutocomplete: (value) => {
              let result = listAllStaticProducts.filter(
                (product) =>
                  product.name.toLowerCase().indexOf(value.toLowerCase()) > -1
              );
              setListProducts(result);
            }
          }}
        />
        <button type="submit">
          <Icon right className="iconSearch">
            search
          </Icon>
        </button>
      </form>
    </>
  );
};

export default SearchNavBar;
