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

    this.city = cities.map((city) => {
      //returns array of objects
      return {
        label: city.city,
        //connect each year to its correlated population to avoid displaying population for year without data
        data: this.year.map((y) => {
          let population = city.populationCounts.find((count) => {
            return Number(count.year) === y;
          });
          return population ? Number(population.value) : null;
        }),
      };
    });
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

    // add background image to canvas
    const image = new Image();
    image.src = "./assets/world-map.jpg";
    const plugin = {
      id: "customCanvasBackgroundImage",
      beforeDraw: (chart) => {
        if (image.complete) {
          const ctx = chart.ctx;
          const { top, left, width, height } = chart.chartArea;
          ctx.drawImage(image, 0, 0, left + width, top + height);
        } else {
          image.onload = () => chart.draw();
        }
      },
    };

    this.chart = new Chart(ctx, {
      type: "bar",
      plugins: [plugin],
      data: {
        labels: this.names,
        datasets: [
          {
            label: "population",
            data: this.populations,
            backgroundColor: "#FFB1C1",
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
