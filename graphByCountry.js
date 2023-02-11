// get country from search url
let urlString = window.location.search;
let countryName = urlString.slice(9, urlString.length);

// fetch cities population
async function getCitiesPerCountry(countryName) {
  const response = await fetch(
    "https://countriesnow.space/api/v0.1/countries/population/cities/filter",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        limit: 1000,
        order: "desc",
        orderBy: "name",
        country: countryName,
      }),
    }
  );
  const data = await response.json();

  return data.data;
}
async function graph() {
  const cities = await getCitiesPerCountry(countryName);

  //graph using population class
  const population = new Populations();
  population.updateCitiesGraph(cities);
}

graph();
//links to continent butons to go back to index html
