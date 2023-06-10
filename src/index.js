import "./styles.css";

const dataAlue = document.getElementById("present-data");

document
  .getElementById("submit-data")
  .addEventListener("click", function (submitted) {
    submitted.preventDefault();
    const showName = document.getElementById("input-show").value;
    let origOsoite = "https://api.tvmaze.com/search/shows?q=";
    let uusiOsoite = origOsoite + showName;
    haeData(uusiOsoite);
  });

function presentData(dataJSON) {
  for (let x in dataJSON) {
    const nimi = dataJSON[x].show.name;
    const kuvaus = dataJSON[x].show.summary;
    let kuva = null;

    if (dataJSON[x].show.image == null) {
      kuva = null;
    } else {
      kuva = dataJSON[x].show.image.medium;
    }

    const newDiv = document.createElement("div");

    newDiv.innerHTML =
      '<div class="show-data">' +
      '<img src="' +
      kuva +
      '">' +
      '<div class="show-info">' +
      "<h1>" +
      nimi +
      "</h1>" +
      kuvaus +
      "</div>" +
      "</div>";

    dataAlue.appendChild(newDiv);
  }
}

async function haeData(osoite) {
  const url = osoite;
  const dataPromise = await fetch(url);
  const dataJSON = await dataPromise.json();
  presentData(dataJSON);
}
