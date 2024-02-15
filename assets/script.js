const navbarToggle = document.getElementById("navbarToggle")
const navbar = document.getElementById("navbar")

navbarToggle.addEventListener("click", () => {
  navbar.classList.toggle("active")
  navbarToggle.classList.toggle("active")
})

const videos = document.querySelectorAll(".video")
let currentVideo = 0

function playNextVideo() {
  videos[currentVideo].muted = true
  videos[currentVideo].pause()

  currentVideo = (currentVideo + 1) % videos.length
  videos[currentVideo].muted = false
  videos[currentVideo].play()

  videos[currentVideo].addEventListener("ended", playNextVideo)
}

playNextVideo()
