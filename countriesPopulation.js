class Populations {
  /**
   *
   * @param {Array<{name: string, population:number}>} countries
   */
  transformCountries(countries) {
    //creates a new array, doesn't update the parent continent array
    this.names = countries.map((country) => {
      //returns array of strings
      return country.name;
    });
    this.populations = countries.map((country) => {
      //returns array of strings
      return country.population;
    });
  }
  transformCities(cities) {
    //creates a new array, doesn't update the parent array
    this.city = cities.map((city) => {
      //returns array of objects
      return {
        label: city.city,
        //fix
        data: city.populationCounts
          .sort((a, b) => {
            return Number(a.year) - Number(b.year);
          })
          .map((populationCount) => Number(populationCount.value)),
      };
    });
    //get unique years
    this.year = new Set(
      cities
        .map((city) => {
          return city.populationCounts.map((populationCount) =>
            Number(populationCount.year)
          );
        })
        .flat()
    );
    this.year = Array.from(this.year).sort();
  }
  /**
   *
   * @param {Array<{name: string, population:number}>} countries
   */
  updateGraph(countries) {
    this.transformCountries(countries);
    if (!this.chart) {
      this.createGraphContinent();
    } else {
      this.chart.data.labels = this.names;
      this.chart.data.datasets[0].data = this.populations;
      this.chart.update();
    }
  }
  updateCitiesGraph(cities) {
    this.transformCities(cities);

    this.createGraphCities();
  }

  createGraphCities() {
    const ctx = document.getElementById("myChart");

    this.chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: this.year,
        datasets: this.city,
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
  createGraphContinent() {
    const ctx = document.getElementById("myChart");

    this.chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: this.names,
        datasets: [
          {
            label: "population",
            data: this.populations,
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
