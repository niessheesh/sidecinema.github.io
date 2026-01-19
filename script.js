/**
 * SideCinema - Search Suggestion Feature
 * Author: Team SideCinema
 * Description: Fitur pencarian film dengan suggestion dropdown seperti Google
 */

// ============================================
// TUNGGU SAMPAI DOM SIAP
// ============================================
document.addEventListener("DOMContentLoaded", function() {
  console.log("🎬 SideCinema Script Loaded");
  
  // Ambil element dari DOM
  const searchInput = document.getElementById("searchInput");
  const suggestionContainer = document.getElementById("suggestionContainer");
  const allMovies = document.querySelectorAll(".movies img");

  // Validasi element ada
  if (!searchInput) {
    console.error("❌ searchInput element tidak ditemukan!");
    return;
  }
  
  if (!suggestionContainer) {
    console.error("❌ suggestionContainer element tidak ditemukan!");
    return;
  }

  console.log("✓ searchInput:", searchInput);
  console.log("✓ suggestionContainer:", suggestionContainer);
  console.log("✓ Jumlah film:", allMovies.length);

  // ============================================
  // KUMPULKAN SEMUA NAMA FILM
  // ============================================
  let allMovieNames = [];
  allMovies.forEach(movie => {
    if (movie.alt && !allMovieNames.includes(movie.alt)) {
      allMovieNames.push(movie.alt);
    }
  });
  
  console.log("✓ Film names collected:", allMovieNames);

  // ============================================
  // FILTER TAMPILAN FILM
  // ============================================
  function filterMovies(searchTerm) {
    const term = searchTerm.toLowerCase().trim();
    console.log("Filtering with term:", term);
    
    let visibleCount = 0;
    allMovies.forEach(movie => {
      const title = movie.alt.toLowerCase();
      const isMatch = term === "" || title.includes(term);
      movie.parentElement.style.display = isMatch ? "inline-block" : "none";
      if (isMatch) visibleCount++;
    });
    
    console.log("Visible movies:", visibleCount);
  }

  // ============================================
  // TAMPILKAN SUGGESTION DROPDOWN
  // ============================================
  function showSuggestions(searchValue) {
    const searchTerm = searchValue.toLowerCase().trim();
    
    if (searchTerm.length === 0) {
      suggestionContainer.style.display = "none";
      return;
    }
    
    // Filter film yang sesuai dengan pencarian
    const filteredMovies = allMovieNames.filter(name => 
      name.toLowerCase().includes(searchTerm)
    );
    
    console.log("Suggestion results:", filteredMovies);
    
    // Buat HTML suggestion
    if (filteredMovies.length > 0) {
      suggestionContainer.innerHTML = filteredMovies
        .map(name => `<div class="suggestion-item">${name}</div>`)
        .join("");
      
      // Tambahkan event listener pada setiap suggestion item
      document.querySelectorAll(".suggestion-item").forEach(item => {
        item.addEventListener("click", function() {
          const selectedMovie = this.textContent.trim();
          console.log("Selected movie:", selectedMovie);
          searchInput.value = selectedMovie;
          suggestionContainer.style.display = "none";
          filterMovies(selectedMovie);
        });
      });
    } else {
      suggestionContainer.innerHTML = '<div style="padding: 12px 15px; color: #999; text-align: center;">Tidak ada hasil</div>';
    }
    
    suggestionContainer.style.display = "block";
  }

  // ============================================
  // EVENT LISTENERS
  // ============================================

  // Event saat user mengetik di search box
  searchInput.addEventListener("keyup", function(e) {
    const searchValue = this.value;
    console.log("User typed:", searchValue);
    
    // Filter tampilan film
    filterMovies(searchValue);
    
    // Tampilkan suggestion
    showSuggestions(searchValue);
  });

  // Event saat input di-focus
  searchInput.addEventListener("focus", function() {
    if (this.value.length > 0) {
      showSuggestions(this.value);
    }
  });

  // Event saat click di luar search box - sembunyikan suggestion
  document.addEventListener("click", function(e) {
    if (e.target !== searchInput && !e.target.closest("#suggestionContainer")) {
      suggestionContainer.style.display = "none";
    }
  });

  console.log("✓ All event listeners attached successfully");
});
