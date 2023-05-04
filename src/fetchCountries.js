const API_URL = 'https://restcountries.com/v3.1/name';
import { Notify } from 'notiflix';

export const fetchCountries = name => {
  return fetch(
    `${API_URL}/${name}?fields=name,capital,population,flags,languages`
  )
    .then(res => {
      if (!res.ok) {
        throw new Error(res.status);
      }
      return res.json();
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      Notify.failure('Oops, there is no country with that name');
      throw error;
    });
};
