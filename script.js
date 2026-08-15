// ==========================================
// D'CRUNCHY - JAVASCRIPT
// ==========================================

// Tahun footer otomatis berubah sesuai tahun sekarang.
document.getElementById("year").textContent = new Date().getFullYear();


// ---------- LOADING SCREEN ----------
// Layar loading hilang otomatis begitu halaman siap.
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (!loader) return;

    setTimeout(() => {
        loader.classList.add("is-hidden");
    }, 900); // beri waktu animasi crackle selesai dulu
});


// ---------- MENU MOBILE (HP) ----------
// Supaya tampilan HP & laptop tetap sinkron:
// menu di HP dibuka lewat tombol hamburger.
const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");

if (menuToggle && mobileNav) {
    const closeMenu = () => {
        menuToggle.classList.remove("is-open");
        mobileNav.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
    };

    const openMenu = () => {
        menuToggle.classList.add("is-open");
        mobileNav.classList.add("is-open");
        menuToggle.setAttribute("aria-expanded", "true");
        document.body.style.overflow = "hidden";
    };

    menuToggle.addEventListener("click", () => {
        const isOpen = mobileNav.classList.contains("is-open");
        isOpen ? closeMenu() : openMenu();
    });

    // Menu otomatis tertutup saat salah satu link diklik.
    mobileNav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeMenu);
    });
}


// ---------- ANIMASI TOMBOL (RIPPLE) ----------
// Efek "crackle" kecil saat tombol ditekan.
document.querySelectorAll(".ripple").forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const rect = btn.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        btn.style.setProperty("--rx", `${x}%`);
        btn.style.setProperty("--ry", `${y}%`);

        btn.classList.remove("is-rippling");
        // reflow supaya animasi bisa diulang
        void btn.offsetWidth;
        btn.classList.add("is-rippling");
    });
});


// ---------- SCROLL REVEAL ----------
// Elemen dengan atribut [data-reveal] akan muncul
// dengan animasi halus saat masuk ke layar.
const revealItems = document.querySelectorAll("[data-reveal]");

if ("IntersectionObserver" in window && revealItems.length) {
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
} else {
    // fallback: kalau browser tidak mendukung, langsung tampilkan semua
    revealItems.forEach((item) => item.classList.add("is-visible"));
}


// Kamu belum membutuhkan checkout, keranjang,
// login, atau database. Jadi JavaScript dibuat
// sederhana supaya mudah kamu pelajari.