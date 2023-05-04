import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import { Notify } from 'notiflix';

const DEBOUNCE_DELAY = 300;

const serchEl = document.getElementById('search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

serchEl.addEventListener(
  'input',
  _.debounce(async e => {
    const countryName = e.target.value.trim();

    if (countryName === '') {
      countryInfo.innerHTML = '';
      countryListEl.innerHTML = '';
      return;
    }

    const countries = await fetchCountries(countryName);

    if (countries.length > 10) {
      Notify.info('Too many matches found. Please enter a more specific name.');
    } else {
      countryListEl.innerHTML = countries
        .map(
          country =>
            `<li class="list">  <img class="img" src="${country.flags.png}" /> ${country.name.common}</li>`
        )
        .join('');
    }
    if (countries.length === 1) {
      countryInfo.innerHTML = `<p class="capital">Capital: ${
        countries[0].capital
      }</p>
        <p class="population">Population: ${countries[0].population}</p>
        <p class="languages">Languages: ${Object.values(
          countries[0].languages
        ).join(', ')}</p>`;
    } else {
      countryInfo.innerHTML = '';
    }

    console.log(countries);
  }, DEBOUNCE_DELAY)
);
