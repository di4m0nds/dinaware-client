import axios from 'axios';

export const fetchDeal = async () => {
  try {
    await axios
      .get('/api/deal')
      .then((res) => res.data[0])
      .catch((err) => console.error(err));
  } catch (e) {
    return null;
  }
};
