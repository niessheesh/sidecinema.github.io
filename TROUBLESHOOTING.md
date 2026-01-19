# Panduan Perbaikan - Search Feature SideCinema

## Masalah: Halaman tidak berubah saat pencarian

### Penyebab Kemungkinan:
1. Script belum ter-load dengan benar
2. Element HTML tidak ditemukan
3. Ada conflict dengan script lama
4. Browser cache

---

## SOLUSI LANGKAH DEMI LANGKAH

### STEP 1: Periksa Browser Console
1. **Buka index.html di browser**
2. **Tekan F12** (atau Ctrl+Shift+I)
3. **Klik tab "Console"**
4. **Lihat apakah ada pesan:**
   - ✓ "🎬 SideCinema Script Loaded"
   - ✓ "✓ searchInput: HTMLInputElement"
   - ✓ "✓ suggestionContainer: HTMLDivElement"

---

### STEP 2: Jika Ada Error
Jika ada error merah, screenshot dan kirim ke tim development.

Contoh error yang mungkin:
```
Uncaught TypeError: Cannot read property 'addEventListener' of null
```
Ini berarti element tidak ditemukan.

---

### STEP 3: Hard Refresh Browser
1. **Tekan Ctrl+Shift+Delete** (atau Cmd+Shift+Delete untuk Mac)
2. **Pilih "Cached images and files"**
3. **Klik "Clear data"**
4. **Buka kembali index.html**

---

### STEP 4: Test Manual di Console
Jika masih tidak bekerja, test manual:

1. **Buka Developer Tools (F12)**
2. **Pergi ke Console tab**
3. **Copy-paste code berikut:**

```javascript
// Test 1: Cek element ada
console.log("searchInput:", document.getElementById("searchInput"));
console.log("suggestionContainer:", document.getElementById("suggestionContainer"));

// Test 2: Cek jumlah film
console.log("Jumlah film:", document.querySelectorAll(".movies img").length);

// Test 3: Test pencarian manual
document.getElementById("searchInput").value = "jumanji";
document.getElementById("searchInput").dispatchEvent(new Event("keyup"));
```

4. **Lihat apakah film ter-filter**

---

### STEP 5: Periksa File HTML

Buka `index.html` dan cari:

```html
<!-- Harus ada -->
<input type="text" id="searchInput" placeholder="Search...">
<div class="suggestion-box" id="suggestionContainer"></div>

<!-- Di bagian akhir body -->
<script src="script.js"></script>
```

Jika tidak ada, tambahkan!

---

### STEP 6: Periksa File CSS

Buka `style.css` dan pastikan ada styling untuk suggestion:

```css
#suggestionContainer {
  position: absolute;
  background: white;
  ...
}

.suggestion-item {
  padding: 12px 15px;
  ...
}
```

---

### STEP 7: Test Dengan Browser Lain

Coba buka di:
- Google Chrome
- Firefox
- Microsoft Edge

Pastikan bekerja di minimal satu browser.

---

## Checklist Sebelum Deploy

- [ ] script.js di-load di akhir `<body>`
- [ ] Element input punya `id="searchInput"`
- [ ] Element container punya `id="suggestionContainer"`
- [ ] Semua film punya atribut `alt`
- [ ] style.css di-load di `<head>`
- [ ] Tidak ada error di browser console (F12)
- [ ] Pencarian berfungsi untuk minimal 3 film
- [ ] Suggestion dropdown muncul saat mengetik
- [ ] Klik suggestion menampilkan film yang dipilih

---

## Kontak Support

Jika masalah tetap tidak teratasi:
1. Kirim screenshot console error
2. Kirim nama browser dan versi
3. Kirim link halaman yang bermasalah

---

**Last Updated:** 11 January 2026
**Versi Script:** 1.0.0
