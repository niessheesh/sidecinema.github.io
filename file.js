const searchInput = document.getElementById("searchInput");
const suggestionContainer = document.getElementById("suggestionContainer");
const allMovies = document.querySelectorAll(".movies img");

// Dapatkan semua nama film unik
let allMovieNames = [];
allMovies.forEach(movie => {
  if (movie.alt && !allMovieNames.includes(movie.alt)) {
    allMovieNames.push(movie.alt);
  }
});

console.log("All movies:", allMovieNames);

// Event ketika user mengetik di search box
searchInput.addEventListener("keyup", function() {
  const searchValue = searchInput.value.toLowerCase().trim();
  
  if (searchValue.length > 0) {
    // Filter film yang sesuai dengan input
    const filteredMovies = allMovieNames.filter(name => 
      name.toLowerCase().includes(searchValue)
    );
    
    console.log("Filtered:", filteredMovies);
    
    // Tampilkan suggestion
    if (filteredMovies.length > 0) {
      suggestionContainer.innerHTML = filteredMovies
        .map(name => `<div class="suggestion-item">${name}</div>`)
        .join("");
      suggestionContainer.style.display = "block";
      
      // Event ketika suggestion diklik
      document.querySelectorAll(".suggestion-item").forEach(item => {
        item.addEventListener("click", function() {
          const selectedMovie = this.textContent;
          searchInput.value = selectedMovie;
          suggestionContainer.style.display = "none";
          
          // Filter tampilan film sesuai pilihan
          filterMovies(selectedMovie.toLowerCase());
        });
      });
    } else {
      suggestionContainer.innerHTML = '<div style="padding: 12px 15px; color: #999;">Tidak ada hasil</div>';
      suggestionContainer.style.display = "block";
    }
  } else {
    suggestionContainer.style.display = "none";
    // Tampilkan semua film jika search kosong
    filterMovies("");
  }
});

// Fungsi untuk filter tampilan film
function filterMovies(searchTerm) {
  allMovies.forEach(movie => {
    const title = movie.alt.toLowerCase();
    if (searchTerm === "" || title.includes(searchTerm)) {
      movie.parentElement.style.display = "inline-block";
    } else {
      movie.parentElement.style.display = "none";
    }
  });
}

// Sembunyikan suggestion saat click di luar
document.addEventListener("click", function(e) {
  if (e.target !== searchInput && !e.target.closest("#suggestionContainer")) {
    suggestionContainer.style.display = "none";
  }
});

// Tampilkan suggestion saat input difocus
searchInput.addEventListener("focus", function() {
  if (searchInput.value.length > 0) {
    suggestionContainer.style.display = "block";
  }
});