const hamburger = document.querySelector(".hamburger");
const navbar = document.querySelector(".navbar");

hamburger.addEventListener("click", () => {
  navbar.classList.toggle("active");
});

// Add an event listener to the window resize event
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    navbar.classList.remove("active");
  }
});

let slideIndex = 0;
let currentVideo = null;

function changeSlide(n) {
  showSlides((slideIndex += n));
}

function showSlides(n) {
  let slides = document.getElementsByClassName("carousel-item");
  if (n >= slides.length) {
    slideIndex = 0;
  }
  if (n < 0) {
    slideIndex = slides.length - 1;
  }

  // Sembunyikan semua slide
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";

    // Jika ada video yang sedang diputar, pause dan sembunyikan
    let video = slides[i].querySelector(".carousel-video");
    if (video) {
      video.pause();
      video.style.display = "none"; // Sembunyikan video
      video.classList.remove("active"); // Hapus kelas active
    }
  }

  // Tampilkan slide saat ini
  slides[slideIndex].style.display = "block";

  // Ambil video dari slide yang sedang ditampilkan dan putar
  currentVideo = slides[slideIndex].querySelector(".carousel-video");
  if (currentVideo) {
    currentVideo.style.display = "block"; // Tampilkan video
    currentVideo.play(); // Putar video
    currentVideo.classList.add("active"); // Tambahkan kelas active
  }
}

function showVideo(index) {
  let image = document.getElementById(`media-${index}`);
  let video = document.getElementById(`video-${index}`);

  // Sembunyikan gambar
  image.style.display = "none";
  // Tampilkan dan putar video
  video.style.display = "block";
  video.play();
  video.classList.add("active"); // Tambahkan kelas active

  // Optional: Stop the video when it ends
  video.onended = function () {
    image.style.display = "block"; // Tampilkan gambar lagi
    video.style.display = "none"; // Sembunyikan video
    video.classList.remove("active"); // Hapus kelas active
  };
}

function hideVideo(index) {
  let image = document.getElementById(`media-${index}`);
  let video = document.getElementById(`video-${index}`);

  video.pause(); // Pause video
  video.style.display = "none"; // Sembunyikan video
  image.style.display = "block"; // Tampilkan gambar kembali
  video.classList.remove("active"); // Hapus kelas active
}

// Tambahkan event listeners ke item carousel
let carouselItems = document.getElementsByClassName("carousel-item");
for (let i = 0; i < carouselItems.length; i++) {
  carouselItems[i].addEventListener("mouseover", function () {
    let index = this.querySelector(".carousel-image").id.split("-")[1];
    showVideo(index);
  });

  carouselItems[i].addEventListener("mouseout", function () {
    let index = this.querySelector(".carousel-image").id.split("-")[1];
    hideVideo(index);
  });
}

// Inisialisasi carousel
showSlides(slideIndex);

// Tambahkan event onended pada elemen video untuk mengatur videoPlayed menjadi false
let videos = document.getElementsByClassName("carousel-video");
for (let i = 0; i < videos.length; i++) {
  videos[i].onended = function () {
    videoPlayed = false;
  };
}

document.querySelectorAll(".time-filters a").forEach((filterLink) => {
  filterLink.addEventListener("click", function (e) {
    e.preventDefault();

    // Remove active class from all filter links
    document
      .querySelectorAll(".time-filters a")
      .forEach((link) => link.classList.remove("active"));

    // Add active class to the clicked filter
    this.classList.add("active");

    // Get the filter value
    const filter = this.getAttribute("data-filter");

    // Reorder the cards based on the filter
    const cards = document.querySelectorAll(".card");
    const filteredCards = Array.prototype.filter.call(cards, (card) => {
      return card.getAttribute("data-filter") === filter;
    });

    // Move the filtered cards to the left
    const topViewsSection = document.querySelector(".top-views-section");
    const movieSection = document.querySelector(".movie-section");

    // Hapus kartu-kartu yang tidak difilter
    topViewsSection.innerHTML = "";
    filteredCards.forEach((card) => {
      topViewsSection.appendChild(card);
    });

    // Tambahkan kartu-kartu yang tidak difilter ke dalamnya
    const remainingCards = Array.prototype.filter.call(cards, (card) => {
      return !filteredCards.includes(card);
    });
    remainingCards.forEach((card) => {
      topViewsSection.appendChild(card);
    });

    // Pastikan elemen .movie-section tetap ada
    topViewsSection.appendChild(movieSection);
  });
});
