class Continents {
  constructor() {
    document
      .querySelectorAll(".continent")
      .forEach((btn) =>
        btn.addEventListener("click", countries.displayCountries)
      );
  }
  async getCountriesByContinent(continentName) {
    try {
      const response = await fetch(
        `https://restcountries.com/v2/region/${continentName}`
      );
      const countriesArray = await response.json();
      return countriesArray;
    } catch (error) {}
  }
}

class Countries {
  constructor() {
    this.countryContainer = document.querySelector(".countries-container");
  }
  renderCountries(countriesArray) {
    this.countryContainer.innerHTML = "";
    countriesArray.map((country) => {
      const countryDiv = document.createElement("button");
      countryDiv.innerText = country.name;
      this.countryContainer.appendChild(countryDiv);
    });
  }
  //arrow function to bind this to countries class and not the btn
  displayCountries = async (e) => {
    const continentName = e.target.innerText;
    const allCountriesInContinent = await continents.getCountriesByContinent(
      continentName
    );
    this[continentName] = allCountriesInContinent;
    this.renderCountries(allCountriesInContinent);
  };
}

const countries = new Countries();
const continents = new Continents();
