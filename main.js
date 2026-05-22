const TOKEN = "IWnJNbonvtEuNsgNyGfUTLBTfDpoJXPUSAAKjMeW"
const GALLERY = document.getElementById("gallery")
const SEARCH_INPUT = document.getElementById("search-input")
const SEARCH_BTN = document.getElementById("search-btn")


const NAV_SEARCH_BTN = document.getElementById("nav-search-btn")
const NAV_PROFILE_BTN = document.getElementById("nav-profile-btn")
const SEARCH_SECTION = document.getElementById("search-section")
const PROFILE_SECTION = document.getElementById("profile-section")
const PROFILE_COUNT = document.getElementById("profile-count")


// -------- sistema de localstorage ------------

function getFavorites() {
  const favs = localStorage.getItem('vinyls_favs')
  return favs ? JSON.parse(favs) : [];
}

function toggleFavorite(albumId) {
  let favs = getFavorites()
  const idStr = String(albumId)

  if (favs.includes(idStr)) {
    favs = favs.filter(id => id !== idStr)
  } else {
    favs.push(idStr)
  }

  localStorage.setItem('vinyls_favs', JSON.stringify(favs))

}


toggleFavorite("782614")