/* Logika toko: katalog, filter, keranjang, form pemesanan -> WhatsApp */
(function () {
  "use strict";
  var PRODUCTS = window.PRODUCTS, STORE = window.STORE;
  var $ = function (s) { return document.querySelector(s); };
  var rupiah = function (n) { return "Rp" + Number(n).toLocaleString("id-ID"); };
  var byId = function (id) { return PRODUCTS.filter(function (p) { return p.id === id; })[0]; };
  var esc = function (s) { var d = document.createElement("div"); d.textContent = s; return d.innerHTML; };

  /* ---------- Keranjang (disimpan di localStorage) ---------- */
  var cart = [];
  try { cart = JSON.parse(localStorage.getItem("infinix-cart") || "[]").filter(function (l) { return byId(l.id); }); } catch (e) { cart = []; }
  function saveCart() { try { localStorage.setItem("infinix-cart", JSON.stringify(cart)); } catch (e) {} }
  function addToCart(id, qty) {
    qty = qty || 1;
    var line = cart.filter(function (l) { return l.id === id; })[0];
    if (line) line.qty += qty; else cart.push({ id: id, qty: qty });
    saveCart(); renderCart();
  }
  function cartTotal() { return cart.reduce(function (t, l) { return t + byId(l.id).price * l.qty; }, 0); }

  function renderCart() {
    var count = cart.reduce(function (t, l) { return t + l.qty; }, 0);
    $("#cart-count").textContent = count;
    $("#cart-total").textContent = rupiah(cartTotal());
    $("#summary-total").textContent = rupiah(cartTotal());
    $("#cart-items").innerHTML = cart.length ? cart.map(function (l) {
      var p = byId(l.id);
      return '<div class="cart-line"><img src="' + p.image + '" alt=""><div class="meta"><strong>' + esc(p.name) + '</strong><br>' + rupiah(p.price) +
        '</div><div><button class="qty-btn" data-act="dec" data-id="' + p.id + '" aria-label="Kurangi">−</button> ' + l.qty +
        ' <button class="qty-btn" data-act="inc" data-id="' + p.id + '" aria-label="Tambah">+</button></div></div>';
    }).join("") : '<p class="text-muted">Keranjang masih kosong.</p>';
    $("#summary-list").innerHTML = cart.length ? cart.map(function (l) {
      var p = byId(l.id);
      return "<li><span>" + esc(p.name) + " × " + l.qty + "</span><span>" + rupiah(p.price * l.qty) + "</span></li>";
    }).join("") : '<li><span>Belum ada produk</span><span>—</span></li>';
  }
  $("#cart-items").addEventListener("click", function (e) {
    var b = e.target.closest("button[data-act]"); if (!b) return;
    var line = cart.filter(function (l) { return l.id === b.dataset.id; })[0];
    line.qty += b.dataset.act === "inc" ? 1 : -1;
    cart = cart.filter(function (l) { return l.qty > 0; });
    saveCart(); renderCart();
  });

  /* ---------- Katalog + filter ---------- */
  var series = PRODUCTS.map(function (p) { return p.series; }).filter(function (s, i, a) { return a.indexOf(s) === i; });
  $("#f-series").insertAdjacentHTML("beforeend", series.map(function (s) { return '<option value="' + s + '">' + s + " Series</option>"; }).join(""));
  $("#o-product").innerHTML = PRODUCTS.map(function (p) { return '<option value="' + p.id + '">' + esc(p.name) + " — " + rupiah(p.price) + "</option>"; }).join("");

  function renderProducts() {
    var q = $("#f-search").value.trim().toLowerCase(), s = $("#f-series").value, max = Number($("#f-price").value) || Infinity, sort = $("#f-sort").value;
    var list = PRODUCTS.filter(function (p) { return (!q || p.name.toLowerCase().indexOf(q) > -1) && (!s || p.series === s) && p.price <= max; });
    if (sort === "low") list.sort(function (a, b) { return a.price - b.price; });
    if (sort === "high") list.sort(function (a, b) { return b.price - a.price; });
    if (sort === "name") list.sort(function (a, b) { return a.name.localeCompare(b.name); });
    $("#result-count").textContent = list.length + " produk ditemukan";
    $("#empty-state").style.display = list.length ? "none" : "block";
    $("#product-grid").innerHTML = list.map(function (p) {
      return '<div class="col-6 col-md-4"><div class="product-card position-relative">' +
        (p.badge ? '<span class="badge-infinix">' + esc(p.badge) + "</span>" : "") +
        '<div class="image-holder position-relative"><img src="' + p.image + '" alt="' + esc(p.name) + '" class="img-fluid">' +
        '<div class="cart-concern position-absolute"><div class="cart-button d-flex w-100"><a href="#" class="btn btn-medium btn-black w-100 text-center" data-add="' + p.id + '">Tambah ke Keranjang</a></div></div></div>' +
        '<div class="card-detail pt-3"><h3 class="card-title text-uppercase mb-1"><a href="#order" data-pick="' + p.id + '">' + esc(p.name) + "</a></h3>" +
        '<span class="item-price text-primary">' + rupiah(p.price) + "</span>" +
        '<p class="spec-line">' + esc(p.ram) + " · " + esc(p.battery) + "<br>" + esc(p.screen) + "</p></div></div></div>";
    }).join("");
  }
  ["#f-search", "#f-series", "#f-price", "#f-sort"].forEach(function (id) { $(id).addEventListener("input", renderProducts); });
  $("#f-reset").addEventListener("click", function () { setTimeout(renderProducts, 0); });
  document.addEventListener("click", function (e) {
    var add = e.target.closest("[data-add]");
    if (add) { e.preventDefault(); addToCart(add.dataset.add); new bootstrap.Offcanvas($("#cartPanel")).show(); return; }
    var pick = e.target.closest("[data-pick]");
    if (pick) { $("#o-product").value = pick.dataset.pick; }
    var ser = e.target.closest("[data-series]");
    if (ser) { $("#f-series").value = ser.dataset.series; renderProducts(); }
  });

  /* ---------- Form pemesanan ---------- */
  var msg = $("#order-msg");
  function say(text, ok) { msg.className = "small " + (ok ? "text-success" : "text-danger"); msg.textContent = text; }
  $("#add-to-order").addEventListener("click", function () {
    var qty = parseInt($("#o-qty").value, 10);
    if (!(qty >= 1)) return say("Jumlah minimal 1.", false);
    addToCart($("#o-product").value, qty);
    say("Produk ditambahkan ke keranjang.", true);
  });
  $("#order-form").addEventListener("submit", function (e) {
    e.preventDefault();
    var f = e.target;
    if (!f.checkValidity()) { f.reportValidity(); return say("Lengkapi kolom yang wajib diisi (*).", false); }
    var items = cart.length ? cart.slice() : [{ id: $("#o-product").value, qty: parseInt($("#o-qty").value, 10) || 1 }];
    var total = items.reduce(function (t, l) { return t + byId(l.id).price * l.qty; }, 0);
    var lines = [
      "Halo " + STORE.name + ", saya ingin memesan:",
      ""
    ].concat(items.map(function (l) { return "• " + byId(l.id).name + " × " + l.qty + " = " + rupiah(byId(l.id).price * l.qty); }), [
      "Total: " + rupiah(total), "",
      "Nama: " + $("#o-name").value.trim(),
      "WhatsApp: " + $("#o-phone").value.trim(),
      $("#o-email").value.trim() ? "Email: " + $("#o-email").value.trim() : null,
      "Kota: " + $("#o-city").value.trim(),
      "Alamat: " + $("#o-address").value.trim(),
      "Pembayaran: " + $("#o-pay").value,
      $("#o-note").value.trim() ? "Catatan: " + $("#o-note").value.trim() : null
    ]).filter(function (l) { return l !== null; });
    window.open("https://wa.me/" + STORE.whatsapp + "?text=" + encodeURIComponent(lines.join("\n")), "_blank", "noopener");
    say("Pesanan dibuka di WhatsApp. Kirim pesannya untuk menyelesaikan.", true);
  });

  /* ---------- Langganan email (demo, belum terhubung ke server) ---------- */
  $("#subscribe-form").addEventListener("submit", function (e) {
    e.preventDefault();
    $("#sub-msg").textContent = "Terima kasih! (Demo: sambungkan ke layanan email Anda di js/store.js)";
    e.target.reset();
  });

  /* ---------- Footer ---------- */
  $("#f-address").textContent = STORE.address;
  $("#f-email").textContent = STORE.email; $("#f-email").href = "mailto:" + STORE.email;
  $("#f-wa").textContent = "+" + STORE.whatsapp; $("#f-wa").href = "https://wa.me/" + STORE.whatsapp;

  renderProducts(); renderCart();
})();
