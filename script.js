const hamburger = document.querySelector(".hamburger");
const navbar = document.querySelector(".navbar");

hamburger.addEventListener("click", () => {
  navbar.classList.toggle("active");
  hamburger.classList.toggle("active"); // tambahkan animasi hamburger menu
});

// Add an event listener to the window resize event
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    navbar.classList.remove("active");
  }
});

const animeData = [
  {
    image: "https://images8.alphacoders.com/118/thumb-1920-1180819.jpg",
    tag: "Adventure",
    title: "Kimetsu no Yaiba",
    description: "lorem ipsum...",
    link: "#",
    videoId: "wyiZWYMilgk",
  },
  {
    image:
      "https://static.bandainamcoent.eu/high/sword-art-online/sao-alicization-lycoris/00-page-setup/saoal_newKA_header_mobile.jpg ",
    tag: "Isekai",
    title: "Sword Art Online",
    description: "Stuck in the game...",
    link: "#",
    videoId: "Jyp4u9qLD2g",
  },
  {
    image:
      "https://m.media-amazon.com/images/S/pv-target-images/ac9e8470b0f1e66cd8dabb3f5950ee2924d7956a3c3706fe4a4db8297840b7c9.jpg",
    tag: "Supranatural",
    title: "FATE/STAY Night Heaven's Feel III",
    description: "lorem ipsum.........",
    link: "#",
    videoId: "u-QsmHjvNek",
  },
];

let currentAnimeIndex = 0;
let player;

function createYouTubePlayer(videoId) {
  player = new YT.Player("anime-video", {
    videoId: videoId,
    width: 1200,
    height: 600,
    playerVars: {
      autoplay: 0,
      controls: 0,
      showinfo: 0,
      modestbranding: 1,
    },
  });
}

function updateAnimeDetails() {
  const currentAnime = animeData[currentAnimeIndex];
  document.getElementById("anime-image").src = currentAnime.image;
  document.getElementById("anime-tag").textContent = currentAnime.tag;
  document.getElementById("anime-title").textContent = currentAnime.title;
  document.getElementById("anime-description").textContent =
    currentAnime.description;
  document.getElementById("anime-link").href = currentAnime.link;

  if (player) {
    player.stopVideo();
    player.destroy();
  }

  const videoContainer = document.getElementById("anime-video");
  videoContainer.innerHTML = "";

  createYouTubePlayer(currentAnime.videoId);
}

document.getElementById("next-anime").addEventListener("click", () => {
  currentAnimeIndex = (currentAnimeIndex + 1) % animeData.length;
  updateAnimeDetails();
});

document.getElementById("prev-anime").addEventListener("click", () => {
  currentAnimeIndex =
    (currentAnimeIndex - 1 + animeData.length) % animeData.length;
  updateAnimeDetails();
});

document
  .getElementById("anime-video-container")
  .addEventListener("mouseover", () => {
    player.playVideo();
  });

document
  .getElementById("anime-video-container")
  .addEventListener("mouseout", () => {
    player.pauseVideo();
  });

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

    // Add class 'highlight' to the cards matching the filter
    document.querySelectorAll(".card").forEach((card) => {
      if (card.getAttribute("data-filter") === filter) {
        card.classList.add("highlight");
      } else {
        card.classList.remove("highlight");
      }
    });
  });
});
