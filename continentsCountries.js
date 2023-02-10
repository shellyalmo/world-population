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
      const spinner = document.querySelector(".spinner");
      spinner.style.display = "block";
      const response = await fetch(
        `https://restcountries.com/v2/region/${continentName}`
      );
      const countriesArray = await response.json();
      spinner.style.display = "none";

      return countriesArray;
    } catch (error) {}
  }
}

class Countries {
  constructor() {
    this.countryContainer = document.querySelector(".countries-container");
  }
  renderCountries() {
    this.countryContainer.innerHTML = "";
    this.currentContinent.map((country) => {
      const countryDiv = document.createElement("button");
      countryDiv.innerText = country.name;
      this.countryContainer.appendChild(countryDiv);
    });
  }
  //arrow function to bind this to countries class and not the btn
  displayCountries = async (e) => {
    //class variable
    this.continentName = e.target.innerText;
    const allCountriesInContinent = await continents.getCountriesByContinent(
      this.continentName
    );
    // array of objects of countries in the continent
    this.currentContinent = allCountriesInContinent;

    this.renderCountries();
    this.renderPopulationsGraph();
  };

  renderPopulationsGraph() {
    //new instance of population class
    if (!this.population) {
      //the constructor of Population class creates the graph
      this.population = new Populations();
    }
    this.population.updateGraph(this.currentContinent);
  }
}

const countries = new Countries();
const continents = new Continents();
