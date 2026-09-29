const websites = [
  {name:"ChatGPT", category:"AI", icon:"🤖", description:"AI assistant for writing, learning, brainstorming and coding.", url:"https://chatgpt.com/", featured:true},
  {name:"Google Gemini", category:"AI", icon:"✨", description:"Google's AI assistant for questions, ideas and productivity.", url:"https://gemini.google.com/", featured:true},
  {name:"Perplexity", category:"AI", icon:"🔎", description:"AI-powered search and research with cited answers.", url:"https://www.perplexity.ai/", featured:true},
  {name:"GitHub", category:"Coding", icon:"🐙", description:"Build, store and collaborate on software projects.", url:"https://github.com/", featured:true},
  {name:"LeetCode", category:"Coding", icon:"🧩", description:"Practice coding problems and prepare for technical interviews.", url:"https://leetcode.com/", featured:true},
  {name:"W3Schools", category:"Coding", icon:"💻", description:"Beginner-friendly web development tutorials and references.", url:"https://www.w3schools.com/"},
  {name:"Google Scholar", category:"Study", icon:"🎓", description:"Find academic papers, articles and scholarly research.", url:"https://scholar.google.com/", featured:true},
  {name:"Khan Academy", category:"Study", icon:"📚", description:"Free lessons and practice across many academic subjects.", url:"https://www.khanacademy.org/"},
  {name:"Coursera", category:"Study", icon:"📖", description:"Online courses and professional learning programs.", url:"https://www.coursera.org/"},
  {name:"Canva", category:"Design", icon:"🎨", description:"Create presentations, posters, social posts and graphics.", url:"https://www.canva.com/", featured:true},
  {name:"Figma", category:"Design", icon:"🖌️", description:"Collaborative interface and product design tool.", url:"https://www.figma.com/"},
  {name:"Remove.bg", category:"Design", icon:"✂️", description:"Quickly remove image backgrounds online.", url:"https://www.remove.bg/"},
  {name:"LinkedIn", category:"Career", icon:"💼", description:"Build your professional profile and discover opportunities.", url:"https://www.linkedin.com/", featured:true},
  {name:"Internshala", category:"Career", icon:"🚀", description:"Discover internships and entry-level opportunities.", url:"https://internshala.com/"},
  {name:"Naukri", category:"Career", icon:"🧑‍💻", description:"Search jobs and build your career profile.", url:"https://www.naukri.com/"},
  {name:"Google Drive", category:"Productivity", icon:"☁️", description:"Store, organize and share files online.", url:"https://drive.google.com/"},
  {name:"Notion", category:"Productivity", icon:"📝", description:"Notes, tasks, documents and project organization in one place.", url:"https://www.notion.so/"},
  {name:"Trello", category:"Productivity", icon:"📋", description:"Organize projects and tasks using visual boards.", url:"https://trello.com/"},
  {name:"iLovePDF", category:"PDF & Tools", icon:"📄", description:"Merge, split, compress and convert PDF files.", url:"https://www.ilovepdf.com/"},
  {name:"TinyWow", category:"PDF & Tools", icon:"🛠️", description:"A collection of free online file and document tools.", url:"https://tinywow.com/"},
  {name:"QR Code Generator", category:"PDF & Tools", icon:"▦", description:"Create QR codes for links and other information.", url:"https://www.qr-code-generator.com/"},
  {name:"Unsplash", category:"Images", icon:"📷", description:"Free high-quality photos for projects and inspiration.", url:"https://unsplash.com/"},
  {name:"Pexels", category:"Images", icon:"🖼️", description:"Free stock photos and videos for creative projects.", url:"https://www.pexels.com/"},
  {name:"Photopea", category:"Design", icon:"🪄", description:"Powerful browser-based image editor.", url:"https://www.photopea.com/"},
  {name:"Calculator.net", category:"Utilities", icon:"🧮", description:"Online calculators for math, finance and everyday tasks.", url:"https://www.calculator.net/"},
  {name:"Google Translate", category:"Utilities", icon:"🌍", description:"Translate text, websites and conversations between languages.", url:"https://translate.google.com/"},
  {name:"Speedtest", category:"Utilities", icon:"⚡", description:"Check your internet connection speed and performance.", url:"https://www.speedtest.net/"}
];

const categories = [
  {name:"All", icon:"✨", desc:"Everything in one place"},
  {name:"AI", icon:"🤖", desc:"AI assistants & research"},
  {name:"Coding", icon:"💻", desc:"Learn & build software"},
  {name:"Study", icon:"📚", desc:"Learn something new"},
  {name:"Design", icon:"🎨", desc:"Create & edit"},
  {name:"Career", icon:"💼", desc:"Jobs & opportunities"},
  {name:"Productivity", icon:"⚡", desc:"Get things done"},
  {name:"PDF & Tools", icon:"📄", desc:"Files & useful tools"},
  {name:"Images", icon:"📷", desc:"Photos & graphics"},
  {name:"Utilities", icon:"🧮", desc:"Everyday online tools"}
];

let selectedCategory = "All";
let favorites = JSON.parse(localStorage.getItem("usefulWebFavorites") || "[]");

const siteGrid = document.getElementById("siteGrid");
const categoryGrid = document.getElementById("categoryGrid");
const searchInput = document.getElementById("searchInput");
const resultText = document.getElementById("resultText");
const emptyState = document.getElementById("emptyState");
const favoriteCount = document.getElementById("favoriteCount");
const sortSelect = document.getElementById("sortSelect");
const toast = document.getElementById("toast");

function renderCategories() {
  categoryGrid.innerHTML = categories.map(c => `
    <button class="category-card ${c.name === selectedCategory ? "active" : ""}" data-category="${c.name}">
      <div class="category-icon">${c.icon}</div>
      <h3>${c.name}</h3>
      <p>${c.desc}</p>
    </button>
  `).join("");

  categoryGrid.querySelectorAll(".category-card").forEach(btn => {
    btn.addEventListener("click", () => {
      selectedCategory = btn.dataset.category;
      renderCategories();
      renderSites();
      document.getElementById("websites").scrollIntoView({behavior:"smooth", block:"start"});
    });
  });
}

function matchesSearch(site, query) {
  if (!query) return true;
  const haystack = `${site.name} ${site.category} ${site.description}`.toLowerCase();
  return haystack.includes(query.toLowerCase());
}

function getFilteredSites() {
  const query = searchInput.value.trim();
  let list = websites.filter(site =>
    (selectedCategory === "All" || site.category === selectedCategory) &&
    matchesSearch(site, query)
  );

  if (sortSelect.value === "az") {
    list.sort((a,b) => a.name.localeCompare(b.name));
  } else if (sortSelect.value === "favorites") {
    list.sort((a,b) => Number(favorites.includes(b.name)) - Number(favorites.includes(a.name)));
  } else {
    list.sort((a,b) => Number(b.featured) - Number(a.featured));
  }
  return list;
}

function renderSites() {
  const list = getFilteredSites();
  resultText.textContent = `${list.length} website${list.length === 1 ? "" : "s"} found`;
  siteGrid.innerHTML = list.map(site => `
    <article class="site-card">
      <div class="site-top">
        <div class="site-icon">${site.icon}</div>
        <button class="heart ${favorites.includes(site.name) ? "active" : ""}" data-favorite="${escapeHtml(site.name)}"
          title="${favorites.includes(site.name) ? "Remove from favorites" : "Add to favorites"}">
          ${favorites.includes(site.name) ? "♥" : "♡"}
        </button>
      </div>
      <h3>${escapeHtml(site.name)}</h3>
      <p>${escapeHtml(site.description)}</p>
      <div class="site-footer">
        <span class="tag">${escapeHtml(site.category)}</span>
        <a class="visit" href="${site.url}" target="_blank" rel="noopener noreferrer">Visit ↗</a>
      </div>
    </article>
  `).join("");

  siteGrid.querySelectorAll("[data-favorite]").forEach(btn => {
    btn.addEventListener("click", () => toggleFavorite(btn.dataset.favorite));
  });

  if (!list.length) emptyState.classList.remove("hidden");
  else emptyState.classList.add("hidden");
}

function toggleFavorite(name) {
  if (favorites.includes(name)) {
    favorites = favorites.filter(x => x !== name);
    showToast(`${name} removed from favorites`);
  } else {
    favorites.push(name);
    showToast(`${name} added to favorites ♥`);
  }
  localStorage.setItem("usefulWebFavorites", JSON.stringify(favorites));
  updateFavoriteCount();
  renderSites();
}

function updateFavoriteCount() {
  favoriteCount.textContent = favorites.length;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, char => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;"
  }[char]));
}

function showRandom() {
  const list = getFilteredSites();
  if (!list.length) {
    showToast("No websites match your current filters.");
    return;
  }
  const site = list[Math.floor(Math.random() * list.length)];
  document.getElementById("modalIcon").textContent = site.icon;
  document.getElementById("modalCategory").textContent = site.category;
  document.getElementById("modalTitle").textContent = site.name;
  document.getElementById("modalDescription").textContent = site.description;
  document.getElementById("modalLink").href = site.url;
  document.getElementById("modal").classList.remove("hidden");
}

searchInput.addEventListener("input", renderSites);
sortSelect.addEventListener("change", renderSites);

document.getElementById("clearSearch").addEventListener("click", () => {
  searchInput.value = "";
  renderSites();
  searchInput.focus();
});

document.getElementById("randomBtn").addEventListener("click", showRandom);

document.getElementById("viewAllBtn").addEventListener("click", () => {
  selectedCategory = "All";
  searchInput.value = "";
  sortSelect.value = "featured";
  renderCategories();
  renderSites();
  document.getElementById("websites").scrollIntoView({behavior:"smooth"});
});

document.getElementById("resetBtn").addEventListener("click", () => {
  selectedCategory = "All";
  searchInput.value = "";
  sortSelect.value = "featured";
  renderCategories();
  renderSites();
});

document.getElementById("favoritesBtn").addEventListener("click", () => {
  if (!favorites.length) {
    showToast("You haven't saved any favorites yet.");
    return;
  }
  selectedCategory = "All";
  searchInput.value = "";
  sortSelect.value = "favorites";
  renderCategories();
  renderSites();
  document.getElementById("websites").scrollIntoView({behavior:"smooth"});
});

document.getElementById("themeBtn").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const dark = document.body.classList.contains("dark");
  localStorage.setItem("usefulWebDark", dark ? "1" : "0");
  document.getElementById("themeBtn").textContent = dark ? "☀️" : "🌙";
});

document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("modal").classList.add("hidden");
});
document.getElementById("modal").addEventListener("click", e => {
  if (e.target.id === "modal") document.getElementById("modal").classList.add("hidden");
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape") document.getElementById("modal").classList.add("hidden");
});

const savedDark = localStorage.getItem("usefulWebDark") === "1";
if (savedDark) {
  document.body.classList.add("dark");
  document.getElementById("themeBtn").textContent = "☀️";
}

document.getElementById("siteStat").textContent = websites.length;
document.getElementById("categoryStat").textContent = categories.length - 1;
updateFavoriteCount();
renderCategories();
renderSites();
