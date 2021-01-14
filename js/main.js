// Global vars
let currentPage = 1;
let totalPage;
let DOM_MoviesList = document.querySelector('.movies__list');
let DOM_PrevButton = document.querySelector('.movies__prev');
let DOM_NextButton = document.querySelector('.movies__next')
let DOM_PageNumber = document.querySelector('.movies__page')

// API call
function requestMovies(callback) {
  var xobj = new XMLHttpRequest();
  // true parameter denotes asynchronous
  xobj.open('GET', "https://api.themoviedb.org/3/movie/popular?api_key=3408c970aac0191155692ae984674cf4&language=fr-FR&page=" + currentPage, true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      // This marks that the response has been successfully retrieved from the server
      // Utilize callback
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

// Call updateList function
requestMovies(updateList);

// update list of movies
function updateList(resp) {
  let results = JSON.parse(resp).results;
  DOM_MoviesList.innerHTML = "";

  // Item format :
  // adult: false
  // backdrop_path: "/cw8A0SprTxr7uSfcH7lwSRRhezJ.jpg"
  // genre_ids: (3) [12, 14, 28]
  // id: 634244
  // original_language: "en"
  // original_title: "Heavenquest: A Pilgrim's Progress"
  // overview: ""
  // popularity: 544.008
  // poster_path: "/cLDPLia17AwMqSaRHccyAlInkch.jpg"
  // release_date: "2020-07-13"
  // title: "Heavenquest: A Pilgrim's Progress"
  // video: false
  // vote_average: 5.4
  // vote_count: 39
  results.forEach(item => {
    DOM_MoviesList.innerHTML += movie_item(item.original_title, item.poster_path);
  })
}

// generate movie item dom
function movie_item(title, poster_path) {
  return "" +
    "<li class=\"movies__item\">"
    + "<figure class='movies__figure'>\n" +
    "    <img src=\"http://image.tmdb.org/t/p/w500" + poster_path + "\"" +
    "         alt=\"Elephant at sunset\"" +
    "         class='movies__img'>\n" +
    "    <figcaption class='movies__caption'>" + title + "</figcaption>\n" +
    "</figure>\n"
    + "</li>";
}

// Navigation
function prevPage() {
  if(currentPage > 1) {
    currentPage -= 1;
    requestMovies(updateList);

    if(currentPage === 1) {
      DOM_PrevButton.disabled = true;
    }

    DOM_PageNumber.innerHTML = currentPage;
  }
}

function nextPage() {
  if(currentPage === 1) {
    DOM_PrevButton.disabled = false;
  }

  currentPage += 1;
  requestMovies(updateList);
  DOM_PageNumber.innerHTML = currentPage;
}

DOM_PrevButton.addEventListener("click", prevPage);
DOM_NextButton.addEventListener("click", nextPage);
