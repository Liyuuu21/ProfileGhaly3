/* ============================================================
   DATA PRODUK — edit file ini untuk mengubah katalog.
   - price  : harga dalam Rupiah (angka saja, tanpa titik)
   - image  : path gambar (ganti dengan foto resmi di folder images/)
   - series : "Hot", "Note", "Smart", "GT", "Zero"
   HARGA & SPEK DI BAWAH ADALAH CONTOH — sesuaikan dengan stok toko Anda.
   ============================================================ */
window.PRODUCTS = [
  { id: "hot-60i", name: "Infinix Hot 60i", series: "Hot", price: 1799000, ram: "4/128 GB", battery: "5160 mAh", screen: '6.75" 120Hz', badge: "Terlaris", image: "images/phones/hot-60i.svg" },
  { id: "hot-60-pro", name: "Infinix Hot 60 Pro", series: "Hot", price: 2599000, ram: "8/256 GB", battery: "5160 mAh", screen: '6.78" AMOLED', badge: "", image: "images/phones/hot-60-pro.svg" },
  { id: "smart-10", name: "Infinix Smart 10", series: "Smart", price: 1299000, ram: "4/64 GB", battery: "5000 mAh", screen: '6.67" 90Hz', badge: "Hemat", image: "images/phones/smart-10.svg" },
  { id: "note-50", name: "Infinix Note 50", series: "Note", price: 2999000, ram: "8/256 GB", battery: "5200 mAh", screen: '6.78" AMOLED', badge: "", image: "images/phones/note-50.svg" },
  { id: "note-50-pro-plus", name: "Infinix Note 50 Pro+", series: "Note", price: 4199000, ram: "12/256 GB", battery: "5200 mAh", screen: '6.78" AMOLED 144Hz', badge: "Baru", image: "images/phones/note-50-pro-plus.svg" },
  { id: "gt-30-pro", name: "Infinix GT 30 Pro", series: "GT", price: 4799000, ram: "12/256 GB", battery: "5500 mAh", screen: '6.78" AMOLED 144Hz', badge: "Gaming", image: "images/phones/gt-30-pro.svg" },
  { id: "zero-40", name: "Infinix Zero 40", series: "Zero", price: 4499000, ram: "12/256 GB", battery: "5000 mAh", screen: '6.78" 3D Curved AMOLED', badge: "", image: "images/phones/zero-40.svg" },
  { id: "zero-flip", name: "Infinix Zero Flip", series: "Zero", price: 8999000, ram: "8/512 GB", battery: "4720 mAh", screen: '6.9" Foldable AMOLED', badge: "Premium", image: "images/phones/zero-flip.svg" }
];

/* Nomor WhatsApp toko (format internasional, tanpa + atau 0 di depan) */
window.STORE = {
  name: "Infinix Store",
  whatsapp: "6281234567890",
  email: "halo@infinixstore.example",
  address: "Jl. Contoh No. 1, Jakarta"
};
