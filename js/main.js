// Used to convert date in a cool format
import {formatDistance} from 'date-fns'
import {fr} from 'date-fns/esm/locale'

// Global vars
let currentPage = 1;
let totalPage;
let DOM_MoviesList = document.querySelector('.movies__list');
let DOM_PrevButton = document.querySelector('.movies__prev');
let DOM_NextButton = document.querySelector('.movies__next')
let DOM_PageNumber = document.querySelector('.movies__page')

// API call
function requestMovies(callback) {
  fetch("https://api.themoviedb.org/3/movie/popular?api_key=3408c970aac0191155692ae984674cf4&language=fr-FR&region=FR&page=" + currentPage).then(
    resp => resp.json() // return a promise
  ).then(resp => {
    totalPage = resp.total_pages;
    return updateList(resp.results);
  }).catch(err => {
    console.error(err);
  })
}

// Call updateList function
requestMovies();

// update list of movies
function updateList(results) {
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
    DOM_MoviesList.innerHTML += movie_item(item.original_title, item.poster_path, item.release_date, item.popularity, item.vote_average, item.vote_count);
  })
}

// generate movie item dom
function movie_item(title, poster_path, release_date, popularity, vote_average, vote_count) {
  return "" +
    "<li class=\"movies__item\">" +
    " <a class=\"movies__link\" href=\"https://www.themoviedb.org/search?language=fr&query=" + title + "\" target='_blank'>" +
    " <div class=\"movies__infos\">" +
    "   <div class=\"movies__release_date\">Sortie il y a " + formatDistance(new Date(release_date), new Date(), {locale: fr}) + "</div>" +
    "    <div class=\"movies__popularity\">Popularité de <b>" + popularity + "</b></div>" +
    "   <div class=\"movies__votes\">" +
    "      <div class=\"movies__vote_average\">Moyenne de <b>" + vote_average + "</b></div>" +
    "      <div class=\"movies__vote_count\">avec <b>" + vote_count + "</b> votes</div>" +
    "   </div>" +
    " </div>"
    + "<figure class='movies__figure'>" +
    "    <img src=\"http://image.tmdb.org/t/p/w500" + poster_path + "\"" +
    "         alt=\"Elephant at sunset\"" +
    "         class='movies__img'>" +
    "    <figcaption class='movies__caption'>" + title + "</figcaption>" +
    " </figure>"
    +"</a>"
    +"</li>";
}

// Navigation
function prevPage() {
  if (currentPage > 1) {
    // Update list
    currentPage -= 1;
    requestMovies();

    // min page verification
    if (currentPage === 1) {
      DOM_PrevButton.disabled = true;
    }

    // Re-enable next button
    if (currentPage === totalPage - 1) {
      DOM_NextButton.disabled = false;
    }

    // Update page number
    DOM_PageNumber.innerHTML = currentPage;
  }
}

function nextPage() {
  // Re-enable prev button
  if (currentPage === 1) {
    DOM_PrevButton.disabled = false;
  }

  // Update list
  currentPage += 1;
  requestMovies();

  // max page verification
  if (currentPage === totalPage) {
    DOM_NextButton.disabled = true;
  }

  // Update page number
  DOM_PageNumber.innerHTML = currentPage;
}

DOM_PrevButton.addEventListener("click", prevPage);
DOM_NextButton.addEventListener("click", nextPage);
