import axios from 'axios';

export const fetchProducts = async (listByCategory, dolar) => {
  console.error('dolar here ', dolar);
  if (
    listByCategory === undefined ||
    listByCategory === null ||
    listByCategory === '0' ||
    listByCategory === 0
  ) {
    try {
      return await axios
        .get('/api/products')
        .then(res => {
          const { data } = res;
          data.forEach(p => {
            p.price = p.price * dolar;
            p.price = p.price.toFixed(2);
          });
          return data;
        })
        .catch(err => console.error(err));
    } catch (e) {
      return [];
    }
  } else {
    try {
      return await axios
        .post(`/api/products/${listByCategory}`)
        .then(res => {
          const { data } = res;
          data.forEach(p => {
            p.price = p.price * dolar;
            p.price = p.price.toFixed(2);
          });
          return data;
        })
        .catch(err => console.error(err));
    } catch (e) {
      return [];
    }
  }
};
