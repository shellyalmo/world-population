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
  /**
   *
   * @param {Array<{name: string, population:number}>} countries
   */
  updateGraph(countries) {
    this.transformCountries(countries);
    if (!this.chart) {
      this.createGraph();
    } else {
      this.chart.destroy();
      this.createGraph();
    }
  }

  createGraph() {
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
