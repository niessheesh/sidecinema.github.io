# SideCinema - Code Best Practices & Style Guide

## 1. HTML Best Practices

### ✅ DO:
```html
<!-- Semantic tags -->
<nav>...</nav>
<header>...</header>
<section>...</section>
<footer>...</footer>

<!-- Proper element nesting -->
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
</ul>

<!-- Always include alt for images -->
<img src="poster.jpg" alt="Film Title">

<!-- Proper form structure -->
<form>
  <label for="searchInput">Search:</label>
  <input type="text" id="searchInput">
</form>
```

### ❌ DON'T:
```html
<!-- Non-semantic divs -->
<div class="navbar">...</div>

<!-- Improper nesting -->
<div>
  <img>
  <img>
</div>

<!-- Missing alt text -->
<img src="poster.jpg">

<!-- Inline styles (use CSS instead) -->
<div style="color: red; font-size: 18px;">...</div>
```

---

## 2. CSS Best Practices

### ✅ DO:
```css
/* Organize with comments */
/* ================= NAVBAR ================= */
.navbar { ... }
.navbar-item { ... }

/* Use meaningful class names */
.search-container { ... }
.suggestion-item { ... }

/* Group related properties */
.movies {
  display: flex;
  gap: 15px;
  overflow-x: auto;
}

/* Use transitions for smooth interactions */
.suggestion-item {
  transition: background-color 0.2s;
}

.suggestion-item:hover {
  background-color: #f5f5f5;
}
```

### ❌ DON'T:
```css
/* Poor naming */
.div1 { ... }
.box { ... }

/* Scattered properties */
.navbar { background: pink; }
.navbar { padding: 15px; }
.navbar { color: white; }

/* !important everywhere */
.search { width: 100% !important; }

/* Inline styles in HTML */
<!-- AVOID: <div style="color: red;">...</div> -->
```

---

## 3. JavaScript Best Practices

### ✅ DO:
```javascript
// 1. Use const for variables that don't change
const searchInput = document.getElementById("searchInput");

// 2. Use meaningful function names
function filterMovies(searchTerm) { ... }
function showSuggestions(searchValue) { ... }

// 3. Add comments for complex logic
// Filter film yang sesuai dengan pencarian
const filteredMovies = allMovieNames.filter(name => 
  name.toLowerCase().includes(searchTerm)
);

// 4. Avoid global variables
const allMovies = document.querySelectorAll(".movies img");
function initializeMovieNames() { ... }

// 5. Use event delegation when possible
document.addEventListener("click", function(e) {
  if (e.target.classList.contains("suggestion-item")) {
    // Handle click
  }
});

// 6. Separate concerns into functions
function filterMovies(term) { ... }
function showSuggestions(value) { ... }
function attachListeners() { ... }
```

### ❌ DON'T:
```javascript
// Unnecessary global variables
window.searchValue = "";
window.movieList = [];

// Unclear function names
function doSearch() { ... }
function updateUI() { ... }

// Mixing responsibilities
function searchAndFilterAndShowSuggestions() { ... }

// Inline complex logic
allMovies.forEach(movie => {
  if (movie.alt.toLowerCase().includes(searchValue.toLowerCase())) {
    movie.parentElement.style.display = "inline-block";
  }
});

// Multiple event listeners for same event
element.addEventListener("click", handler1);
element.addEventListener("click", handler2);
element.addEventListener("click", handler3);
```

---

## 4. Naming Conventions

### CSS Classes
```css
/* Kebab-case untuk CSS classes */
.search-container
.suggestion-box
.suggestion-item
.movie-section
.navbar-menu

/* Prefix untuk state */
.is-active
.is-hidden
.is-disabled
```

### JavaScript Variables
```javascript
// camelCase untuk variables dan functions
const searchInput
const suggestionContainer
function filterMovies()
function showSuggestions()

// ALL_CAPS untuk constants
const MAX_SUGGESTIONS = 10
const ANIMATION_DURATION = 300
```

### HTML IDs
```html
<!-- kebab-case untuk IDs (sama seperti class) -->
<div id="suggestion-container"></div>
<input id="search-input">
```

---

## 5. Comments & Documentation

### ✅ DO:
```javascript
/**
 * Menampilkan suggestion dropdown berdasarkan input pencarian
 * @param {string} searchValue - Nilai input dari user
 * @returns {void}
 */
function showSuggestions(searchValue) {
  const searchTerm = searchValue.toLowerCase().trim();
  
  // Filter film yang sesuai
  const filteredMovies = allMovieNames.filter(name => 
    name.toLowerCase().includes(searchTerm)
  );
  
  // Tampilkan atau sembunyikan suggestion
  if (filteredMovies.length > 0) {
    suggestionContainer.style.display = "block";
  } else {
    suggestionContainer.style.display = "none";
  }
}
```

### ❌ DON'T:
```javascript
// Abaikan self-explanatory code
// Get the movies
const m = document.querySelectorAll("img");
// Loop through
m.forEach(x => {
  // Do something
  x.style.display = "none";
});

// Terlalu banyak comments
const result = filteredMovies.map(name => 
  `<div class="suggestion-item">${name}</div>`  // Create div for each movie
).join("");  // Join all divs into string
```

---

## 6. Performance Tips

### ✅ DO:
```javascript
// Cache DOM queries
const searchInput = document.getElementById("searchInput");
const allMovies = document.querySelectorAll(".movies img");

// Debounce frequently called functions
let debounceTimer;
searchInput.addEventListener("keyup", function() {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    filterMovies(searchInput.value);
  }, 300);
});

// Use event delegation
document.addEventListener("click", (e) => {
  if (e.target.matches(".suggestion-item")) {
    // Handle click
  }
});
```

### ❌ DON'T:
```javascript
// Query DOM repeatedly
searchInput.addEventListener("keyup", function() {
  document.querySelectorAll(".movies img").forEach(/* ... */);
  document.querySelectorAll(".movies img").forEach(/* ... */);
});

// Unnecessary DOM manipulations
movies.forEach(movie => {
  movie.parentElement.innerHTML = movie.parentElement.innerHTML;
});
```

---

## 7. Accessibility Guidelines

### ✅ DO:
```html
<!-- Use semantic HTML -->
<nav>Navigation</nav>
<section>Content</section>

<!-- Always include alt text -->
<img src="poster.jpg" alt="Film Title - Horror Genre">

<!-- Proper form labels -->
<label for="searchInput">Search Movies:</label>
<input id="searchInput" type="text">

<!-- Use aria-labels when needed -->
<div id="suggestionContainer" aria-label="Movie suggestions">
  ...
</div>

<!-- Keyboard navigation -->
<button onclick="handleClick()">Click Me</button>
```

### ❌ DON'T:
```html
<!-- Missing alt text -->
<img src="poster.jpg">

<!-- No labels for inputs -->
<input type="text" placeholder="Search">

<!-- Divs as buttons (no keyboard support) -->
<div onclick="handleClick()">Click Me</div>

<!-- Poor color contrast -->
<p style="color: #ccc; background: #ddd;">Text</p>
```

---

## 8. File Organization

### Proper Structure
```
project/
├── index.html           (Main entry point)
├── style.css           (All styles)
├── script.js           (All JavaScript)
├── config.json         (Configuration)
├── README.md           (Quick start guide)
├── DOCUMENTATION.md    (Full documentation)
├── CHANGELOG.md        (Version history)
└── img/               (Images folder)
    ├── poster1.jpg
    ├── poster2.jpg
    └── ...
```

### What NOT to do
```
❌ Avoid:
- Inline CSS in HTML
- Inline JavaScript in HTML
- Mixed scripts in multiple files
- No clear folder structure
- Hardcoded paths
```

---

## 9. Testing Checklist

Before deployment, test these:

- [ ] Search suggestion works
- [ ] Movie filtering works
- [ ] Click on suggestion updates search
- [ ] Mobile responsiveness
- [ ] All links work correctly
- [ ] Images load properly
- [ ] Contact form validation
- [ ] No console errors (F12 → Console)
- [ ] Performance (Lighthouse score > 90)

---

## 10. Git Commit Messages

### ✅ Good Format:
```
feat: Add search suggestion feature
fix: Fix HTML structure validation errors
docs: Update README with installation guide
style: Refactor CSS comments and organization
refactor: Extract search logic to separate function
```

### ❌ Bad Format:
```
changes
updated
fixed bugs
v1
asdasd
```

---

## Resources

- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS-Tricks](https://css-tricks.com/)
- [JavaScript.info](https://javascript.info/)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/)
- [Google Web Fundamentals](https://developers.google.com/web/fundamentals)

---

## Questions?

Refer to:
- DOCUMENTATION.md untuk penjelasan teknis
- CHANGELOG.md untuk history changes
- config.json untuk project configuration

---

Last Updated: January 11, 2026
