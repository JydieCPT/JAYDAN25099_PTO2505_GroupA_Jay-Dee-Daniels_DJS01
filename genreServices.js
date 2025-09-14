// genreServices.js
export const genreMap = new Map();

export function populateGenres(genres, podcasts, genreFilter) {
  if (Array.isArray(genres)) {
    genres.forEach(g => genreMap.set(g.id, g.title));
    // ensure unique, and use titles from genres array in data.js
    genres.forEach(g => {
      const opt = document.createElement('option');
      opt.value = String(g.id);
      opt.textContent = g.title;
      genreFilter.appendChild(opt);
    });
  } else {
    // fall back: gather tag names from podcasts (if genres not provided)
    const seen = new Set();
    podcasts.forEach(p => {
      if (Array.isArray(p.tags)) p.tags.forEach(t => seen.add(t));
    });
    [...seen].forEach(t => {
      const opt = document.createElement('option');
      opt.value = t;
      opt.textContent = t;
      genreFilter.appendChild(opt);
    });
  }
}
