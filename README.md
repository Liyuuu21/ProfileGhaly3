# Infinix Store

Website toko smartphone Infinix berbasis template **MiniStore** (Bootstrap 5 + Swiper), tanpa build step.

## Menjalankan di VS Code
1. Ekstrak ZIP, lalu di VS Code pilih **File > Open Folder…** dan buka folder `infinix-store`.
2. Pasang ekstensi **Live Server** (VS Code akan menawarkannya otomatis).
3. Klik kanan `index.html` > **Open with Live Server** (atau tombol "Go Live" di pojok kanan bawah).

## Yang perlu Anda ubah
- `js/products.js` — daftar produk, harga, spek, nomor WhatsApp, alamat, email toko.
- `images/phones/` — gambar produk saat ini hanyalah **ilustrasi placeholder**. Ganti dengan foto resmi (tetap isi `image:` di `products.js`).
- `index.html` — teks promo dan ulasan pelanggan (contoh, ganti dengan yang asli).

## Fitur
- Kolom pencarian & filter (nama, seri, harga, urutan).
- Keranjang (tersimpan di browser).
- Form pemesanan dengan kolom isian (nama, WhatsApp, email, kota, alamat, produk, jumlah, pembayaran, catatan) yang membuka WhatsApp toko dengan pesan siap kirim.

Catatan: harga & spesifikasi di `products.js` adalah contoh. Situs ini bukan situs resmi Infinix.
