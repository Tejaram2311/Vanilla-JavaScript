const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

const cities = [];

fetch(endpoint)
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    cities.push(...data);
  });

const search = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

search.addEventListener("keyup", debounce(displayMatches, 300));

function displayMatches(e) {
  const query = e.target.value;

  if (query.length == 0) {
    suggestions.innerHTML = "<li>Filter for city or state</li>";
    return;
  }

  const matches = findMatches(query);
  const regex = new RegExp(query, "gi");

  const htmlList = matches.map(function (place) {
    const highlightedText = `<span class="highlight">${query}</span>`;

    const cityName = place.city.replace(regex, highlightedText);
    const stateName = place.state.replace(regex, highlightedText);

    return `<li>${cityName}, ${stateName}</li>`;
  });

  suggestions.innerHTML = htmlList.join("");
}

function findMatches(query) {
  const regex = new RegExp(query, "gi");

  return cities.filter(function (place) {
    return place.city.match(regex) || place.state.match(regex);
  });
}

function debounce(func, timeout) {
  let timer;

  return function (args) {
    if (timer) clearTimeout(timer);

    timer = setTimeout(function () {
      func(args);
    }, timeout);
  };
}
