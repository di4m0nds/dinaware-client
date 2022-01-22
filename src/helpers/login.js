import axios from 'axios';

const login = async (credentials) => {
  if (credentials.username === '' || credentials.password === '') {
    return null;
  }

  try {
    const { data } = await axios.post('/api/login', credentials);
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export default { login };

//try {
//const data = await fetch('/api/login', {
//method: 'POST',
//body: JSON.stringify({ credentials }),
//headers: { 'Content-Type': 'application/json' }
//});
//return data;
//} catch (err) {
//console.error(err);
//}
