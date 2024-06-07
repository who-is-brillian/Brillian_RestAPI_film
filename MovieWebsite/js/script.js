document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "54b22bcc"; // Ganti dengan kunci API Anda

  // Event listener untuk form pencarian
  document
    .getElementById("search-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const searchInput = document.getElementById("search-input").value;
      if (searchInput) {
        fetchMovies(searchInput, apiKey);
      }
    });

  // Fetch default movies on page load
  fetchMovies("Batman", apiKey); // Contoh pencarian awal untuk menampilkan beberapa film
});

// Fungsi untuk mengambil data film dari API dan menampilkan dalam card
function fetchMovies(title, apiKey) {
  const apiUrl = `http://www.omdbapi.com/?s=${encodeURIComponent(
    title
  )}&apikey=${apiKey}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const movieCardsContainer = document.getElementById("movie-cards");
      movieCardsContainer.innerHTML = ""; // Bersihkan hasil sebelumnya
      if (data.Response === "False") {
        movieCardsContainer.innerHTML = `<p class="text-danger">Movies not found!</p>`;
      } else {
        data.Search.forEach((movie) => {
          displayMovieCard(movie);
        });
      }
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });
}

// Fungsi untuk menampilkan card film
function displayMovieCard(movie) {
  const movieCard = `
        <div class="col-md-4 mb-4">
            <div class="card">
                <img src="${movie.Poster}" class="card-img-top" alt="${movie.Title} poster">
                <div class="card-body">
                    <h5 class="card-title">${movie.Title}</h5>
                    <p class="card-text"><strong>Year:</strong> ${movie.Year}</p>
                    <p class="card-text"><strong>Type:</strong> ${movie.Type}</p>
                </div>
            </div>
        </div>
    `;
  document.getElementById("movie-cards").innerHTML += movieCard;
}
