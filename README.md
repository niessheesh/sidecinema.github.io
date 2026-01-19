# SideCinema - Movie Search Platform

Platform streaming film dengan fitur pencarian yang canggih.

## Fitur Utama

- **Search Film**: Pencarian film dengan suggestion dropdown (seperti Google)
- **Filter Movie**: Menampilkan film sesuai dengan pencarian
- **Responsive Design**: Desain yang menyesuaikan dengan berbagai ukuran layar
- **Movie Carousel**: Slider otomatis untuk tampilan film terbaru

## Struktur Project

```
SideCinema/
├── index.html          # Halaman utama
├── style.css           # Stylesheet utama
├── script.js           # JavaScript untuk search feature
├── horor.html          # Halaman kategori horor
├── comedy.html         # Halaman kategori comedy
├── sinopsis*.html      # Halaman detail film
└── img/                # Folder gambar poster film
```

## Fitur Search

### Cara Kerja
1. User mengetik nama film di search box
2. Suggestion dropdown menampilkan film yang sesuai
3. User dapat klik suggestion atau terus mengetik
4. Film di halaman otomatis ter-filter

### File yang Berkaitan
- `script.js` - Logika search utama
- `style.css` - Styling suggestion box (line 55-105)
- `index.html` - HTML structure

## Cara Menggunakan

1. **Clone/Download** project ini
2. **Buka** `index.html` di browser
3. **Ketik** nama film di search box untuk mencari
4. **Klik** suggestion atau tekan Enter untuk filter

## Teknologi yang Digunakan

- HTML5
- CSS3
- JavaScript (Vanilla)
- Bootstrap 5.3.8
- Font Awesome 6.0.0

## Struktur CSS

```
style.css dibagi menjadi:
- RESET (line 1-6)
- NAVBAR (line 9-94)
- SEARCH (line 56-105)
- HERO SECTION (line 108-130)
- MOVIES SECTION (line 133-180)
- FOOTER (line 183-192)
- CONTACT SECTION (line 195-396)
```

## Struktur JavaScript

`script.js` dibagi menjadi:
1. **Deklarasi Variabel Global** - Ambil element DOM
2. **Inisialisasi** - Kumpulkan nama film
3. **Filter Movies** - Tampilin/sembunyikan film
4. **Show Suggestions** - Tampilkan dropdown
5. **Attach Listeners** - Event pada suggestion item
6. **Event Listeners** - Keyup, focus, click
7. **Inisialasi App** - Mulai saat DOM loaded

## Troubleshooting

### Suggestion tidak muncul
- Pastikan id element = `searchInput` dan `suggestionContainer`
- Cek console browser (F12) untuk error
- Pastikan `script.js` ter-load dengan benar

### Film tidak ter-filter
- Pastikan semua film memiliki atribut `alt`
- Cek nama film di atribut `alt`

## Author
Team SideCinema

## License
MIT License
