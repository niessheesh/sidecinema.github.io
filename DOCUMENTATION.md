# SideCinema - Dokumentasi Teknis

## Daftar Isi
1. [Deskripsi Project](#deskripsi-project)
2. [Struktur Folder](#struktur-folder)
3. [Deskripsi File](#deskripsi-file)
4. [Penjelasan Kode](#penjelasan-kode)
5. [Cara Extend](#cara-extend)

---

## Deskripsi Project

**SideCinema** adalah platform streaming film yang menampilkan koleksi film dalam kategori **Horror** dan **Comedy**. Fitur utama yang disediakan:

- ✅ Search bar dengan autocomplete suggestion (seperti Google)
- ✅ Real-time movie filtering berdasarkan input
- ✅ Responsive design untuk semua ukuran layar
- ✅ Carousel/slider untuk film terbaru
- ✅ Detail sinopsis untuk setiap film
- ✅ Kontak form

---

## Struktur Folder

```
SideCinema/
│
├── index.html                    # Halaman utama (Home)
├── style.css                     # Stylesheet utama (~400 baris)
├── script.js                     # JavaScript untuk fitur search (~100 baris)
│
├── horor.html                    # Halaman kategori Horror
├── comedy.html                   # Halaman kategori Comedy
│
├── sinopsis1.html - sinopsis12.html  # Detail page masing-masing film
│
├── img/                          # Folder gambar poster film
│   ├── wallpyo.png
│   ├── kakabos.jpg
│   ├── yowesben.png
│   └── ... (poster film lainnya)
│
├── README.md                     # Dokumentasi singkat
└── DOCUMENTATION.md              # File ini (dokumentasi lengkap)
```

---

## Deskripsi File

### 1. **index.html** (262 baris)
File HTML utama yang berisi:
- Navbar dengan logo dan navigation menu
- Search box dengan suggestion container
- Carousel slider Bootstrap
- 2 movie sections (Comedy & Horror)
- Contact form section

**Key Elements:**
```html
<input type="text" id="searchInput" placeholder="Search...">
<div class="suggestion-box" id="suggestionContainer"></div>
```

### 2. **style.css** (396 baris)
Stylesheet yang dibagi menjadi section:
- **Lines 1-6**: Global reset (`* {}`)
- **Lines 9-105**: Navbar styling (logo, menu, search)
- **Lines 108-192**: Movie sections & carousel
- **Lines 195-396**: Contact form styling

**Key CSS Classes:**
```css
.search-container      /* Container untuk search box */
#suggestionContainer   /* Dropdown suggestion */
.suggestion-item       /* Individual suggestion item */
.movies                /* Container film horizontal scroll */
.movies img            /* Poster film dengan hover effect */
```

### 3. **script.js** (102 baris)
JavaScript utama yang menangani fitur search dengan struktur:

```
1. DEKLARASI VARIABEL (lines 1-12)
   - DOM elements selection
   
2. INISIALISASI (lines 14-22)
   - initializeMovieNames()
   
3. FILTER TAMPILAN FILM (lines 24-33)
   - filterMovies(searchTerm)
   
4. TAMPILKAN SUGGESTION (lines 35-54)
   - showSuggestions(searchValue)
   
5. ATTACH LISTENERS (lines 56-65)
   - attachSuggestionItemListeners()
   
6. EVENT LISTENERS (lines 67-93)
   - keyup event
   - focus event
   - click event (outside)
   
7. INISIALISASI APP (lines 95-102)
   - DOMContentLoaded event
```

---

## Penjelasan Kode

### Cara Kerja Search Feature

#### Step 1: Kumpulkan nama film
```javascript
function initializeMovieNames() {
  allMovies.forEach(movie => {
    if (movie.alt && !allMovieNames.includes(movie.alt)) {
      allMovieNames.push(movie.alt);
    }
  });
}
```
Mengambil semua nama film dari atribut `alt` di elemen `<img>`

#### Step 2: Saat user mengetik (keyup event)
```javascript
searchInput.addEventListener("keyup", function(e) {
  const searchValue = this.value;
  
  filterMovies(searchValue);      // Filter tampilan
  showSuggestions(searchValue);   // Tampilkan dropdown
});
```

#### Step 3: Filter tampilan film
```javascript
function filterMovies(searchTerm) {
  const term = searchTerm.toLowerCase().trim();
  
  allMovies.forEach(movie => {
    const title = movie.alt.toLowerCase();
    const isMatch = term === "" || title.includes(term);
    movie.parentElement.style.display = isMatch ? "inline-block" : "none";
  });
}
```

#### Step 4: Tampilkan suggestion dropdown
```javascript
function showSuggestions(searchValue) {
  const filteredMovies = allMovieNames.filter(name => 
    name.toLowerCase().includes(searchValue.toLowerCase())
  );
  
  if (filteredMovies.length > 0) {
    suggestionContainer.innerHTML = filteredMovies
      .map(name => `<div class="suggestion-item">${name}</div>`)
      .join("");
    
    attachSuggestionItemListeners();
    suggestionContainer.style.display = "block";
  }
}
```

#### Step 5: Click pada suggestion
```javascript
function attachSuggestionItemListeners() {
  document.querySelectorAll(".suggestion-item").forEach(item => {
    item.addEventListener("click", function() {
      const selectedMovie = this.textContent.trim();
      searchInput.value = selectedMovie;
      suggestionContainer.style.display = "none";
      filterMovies(selectedMovie);  // Filter berdasarkan pilihan
    });
  });
}
```

### CSS untuk Suggestion Box

```css
/* Container suggestions */
#suggestionContainer {
  position: absolute;        /* Posisi relative to search-container */
  top: 100%;                 /* Langsung di bawah input */
  z-index: 1000;             /* Di atas element lain */
  display: none;             /* Hidden by default */
}

/* Individual suggestion item */
.suggestion-item {
  padding: 12px 15px;
  cursor: pointer;
  transition: background-color 0.2s;  /* Smooth hover effect */
}

.suggestion-item:hover {
  background-color: #f5f5f5;  /* Light gray on hover */
}
```

---

## Cara Extend

### 1. Menambah Film Baru
1. Tambahkan `<a>` baru di section movie yang sesuai:
```html
<a href="sinopsis_baru.html" target="_blank">
  <img src="poster_baru.jpg" alt="Nama Film Baru">
</a>
```
2. Nama di atribut `alt` otomatis diambil oleh script.js

### 2. Menambah Kategori Baru
1. Buat file baru: `kategori_baru.html`
2. Copy struktur dari `index.html`
3. Ganti nama kategori dan film yang sesuai
4. Update navbar menu di `index.html`

### 3. Customize Styling
- Warna utama: Edit `style.css` line 12 (background-color: pink)
- Ukuran poster: Edit line 161-162 (width/height)
- Suggestion box styling: Edit line 69-85

### 4. Menambah Fitur
Contoh: Filter berdasarkan kategori
```javascript
// Tambah di script.js
function filterByCategory(category) {
  const categoryMovies = document.querySelectorAll(
    `.movie-section:has(h1:contains("${category}")) .movies img`
  );
  // Filter logic...
}
```

---

## Best Practices yang Diterapkan

✅ **Semantic HTML**: Menggunakan tag yang meaningful (`<nav>`, `<section>`, `<form>`)
✅ **Separation of Concerns**: Pisah HTML, CSS, dan JS
✅ **DRY (Don't Repeat Yourself)**: Reuse fungsi dan selector
✅ **Comments**: Setiap section punya comment penjelasan
✅ **Naming Convention**: Class dan ID yang deskriptif
✅ **Accessibility**: Alt text untuk gambar, proper form labels

---

## Troubleshooting

### Suggestion tidak muncul
**Problem**: User mengetik tapi dropdown tidak muncul
**Solution**:
- Cek Console (F12) untuk error
- Pastikan `#suggestionContainer` element ada di HTML
- Cek apakah ada CSS conflict dengan `display: none !important`

### Film tidak ter-filter
**Problem**: Setelah select suggestion, film tetap semua muncul
**Solution**:
- Pastikan semua `<img>` memiliki atribut `alt`
- Cek nama di atribut `alt` match dengan nama di HTML

### Search box hilang di mobile
**Problem**: Search box tidak terlihat di device kecil
**Solution**:
- Edit `.search-container input` width di CSS
- Gunakan media query untuk responsive

---

## Lisensi
MIT License - Bebas digunakan dan dimodifikasi

## Contact
Email: mufhiyatus@gmail.com
Phone: +62 852-8309-2483
