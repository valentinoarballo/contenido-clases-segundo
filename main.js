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

// helpers

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

async function searchMasters(query) {

  const url = `https://api.discogs.com/database/search?q=${encodeURIComponent(query)}&type=master&per_page=16&sort_order=relevance`

  try {
    const response = await fetch(url, {
      headers: { "Authorization": `Discogs token=${TOKEN}` }
    })
    if (!response.ok) throw new Error("Error en la API")

    const data = await response.json()

    renderAlbums(data)

  } catch (err) {
    console.log("error!!!!:" + err)
  }
}

async function loadProfileFavorites() {

  const favsIds = getFavorites() /// ["4721897", "99462", "2", "525"]

  if (favsIds.length === 0) {
    GALLERY.innerHTML = `<p class="text-center col-span-full font-bold">No has guardado ningun album</p>`
  }

  try {
    const promises = favsIds.map(id =>
      fetch(`https://api.discogs.com/masters/${id}`, {
        headers: { "Authorization": `Discogs token=${TOKEN}` }
      }).then(res => res.json())
    )

    const favoriteAlbums = await Promise.all(promises)

    renderAlbums(favoriteAlbums)

  } catch (err) {
    console.log("error!!!!:" + err)
  }
}

function renderAlbums(albums) {
  GALLERY.innerHTML = ""

  if (!albums || albums.length === 0) {
    GALLERY.innerHTML = `<p class="text-center col-span-full font-bold">No se encontraron albumes</p>`
    return
  }


  const currentFavs = getFavorites()

  albums.results.forEach(album => {

    let artist = "Artista desconocido"
    let albumTitle = album.title || "Album desconocido"

    if (album.title.includes(" - ")) {
      const parts = album.title.split(" - ")
      artist = parts[0]
      albumTitle = parts[1]
    } else if (album.artists && albums.artists[0]) {
      artist = album.artists[0].name
    }

    let coverImage = "https://images.unsplash.com/photo-1603048588665-791ca8aea617?q=80&w=500"

    if (album.cover_image) coverImage = album.cover_image
    else if (album.images && album.images[0]) coverImage = album.images[0].uri

    const isFavorite = currentFavs.includes(String(album.id))
    // const isFavorite = true

    const card = document.createElement("div")

    card.classList = "group bg-slate-900/40 backdrop-blur-md border border-slate-800 hover:border-slate-700 rounded-2xl p-4 hover:shadow-xl hover:shadow-cyan-500/10 flex flex-col justify-between transition-all m-5 cursor-pointer"

    card.innerHTML = `
    <div>
      <div class="relative aspect-square overflow-hidden rounded-xl bg-slate-950">
        
      <img src="${coverImage}" class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />

        <button data-id="${album.id}" class="fav-btn absolute top-3 right-3 p-2.5 rounded-2xl backdrop-blur-lg transition-all duration-300 border focus:outline-none ${isFavorite
        ? "bg-rose-500/20 border-rose-500 text-rose-500 shadow-lg shadow-rose-500/200"
        : "bg-slate-900/60 border-slate-700 text-slate-400 hover:text-white hover:border-slate-500"

      }">

          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="${isFavorite ? "currentColor" : "none"}" stroke="currentColor" stroke-width="2">
            <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
          </svg>
        </button>

      </div>


      <div class="mt-5 space-y-1">
        <p class="text-xs font--semibold text-cyan-400 tracking-wider uppercase font-mono" >
         ${artist}
        </p>
        <p class="font-bold text-lg text-white tracking-tight line-camp-1 group-hover:text-cyan-200 transition-colors">
         ${albumTitle}
        </p>
      </div>

      </div>
    `


    GALLERY.appendChild(card)
  });





}







searchMasters("daft punk")





