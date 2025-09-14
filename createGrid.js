/**
 * @file Rendering logic for podcast cards grid.
 */

/**
 * Renders podcast cards into the grid element.
 *
 * @param {HTMLElement} podcastGrid - Container where cards will be appended.
 * @param {Array<Object>} podcasts - Array of podcast objects.
 * @param {string} [filter='all'] - Selected genre id or tag.
 * @param {string} [sortBy='recent'] - Sorting key: 'recent' or 'title'.
 * @param {Map<number,string>} genreMap - Map of genre id → genre title.
 * @param {Function} timeAgo - Function to format updated timestamps.
 */
export function renderCards(
  podcastGrid,
  podcasts,
  filter = 'all',
  sortBy = 'recent',
  genreMap,
  timeAgo
) {
  podcastGrid.innerHTML = '';

  // copy and filter
  let list = Array.isArray(podcasts) ? [...podcasts] : [];

  // Filter
  if (filter !== 'all') {
    const numeric = Number(filter);
    if (!Number.isNaN(numeric) && numeric !== 0 && Array.isArray(list)) {
      list = list.filter(p => Array.isArray(p.genres) && p.genres.includes(numeric));
    } else {
      list = list.filter(p => Array.isArray(p.tags) && p.tags.includes(filter));
    }
  }

  // Sorting
  if (sortBy === 'title') {
    list.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
  } else {
    list.sort((a, b) => {
      const ta = a.updated ? new Date(a.updated).getTime() : 0;
      const tb = b.updated ? new Date(b.updated).getTime() : 0;
      return tb - ta;
    });
  }

  // Create card elements
  list.forEach(p => {
    const card = document.createElement('article');
    card.className = 'card';

    // cover container
    const cover = document.createElement('div');
    cover.className = 'cover';

    // image (lazy)
    const img = document.createElement('img');
    img.loading = 'lazy';
    img.alt = (p.title ? `${p.title} cover` : 'Podcast cover');
    if (p.image) img.src = p.image;
    img.onerror = () => {
      img.style.display = 'none';
      cover.classList.add('no-image');
      cover.textContent = 'Podcast Cover';
    };
    cover.appendChild(img);

    // Title
    const title = document.createElement('h3');
    title.className = 'card-title';
    title.textContent = p.title || 'Untitled';

    // meta (seasons)
    const meta = document.createElement('div');
    meta.className = 'meta';
    meta.innerHTML = `
      <svg class="icon-cal" viewBox="0 0 24 24" width="14" height="14" aria-hidden>
        <path fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"
          d="M7 11v6M17 11v6M3 7h18M5 4v3M19 4v3" />
      </svg>
      <span class="seasons-text">${p.seasons ?? 0} season${(p.seasons ?? 0) !== 1 ? 's' : ''}</span>
    `;

    // tags
    const tagsWrap = document.createElement('div');
    tagsWrap.className = 'tags';
    const genreIds = Array.isArray(p.genres) ? p.genres : [];
    if (genreIds.length > 0) {
      genreIds.slice(0, 4).forEach(gid => {
        const t = document.createElement('span');
        t.className = 'tag';
        t.textContent = genreMap.get(gid) || 'Genre';
        tagsWrap.appendChild(t);
      });
    } else if (Array.isArray(p.tags)) {
      p.tags.slice(0, 4).forEach(n => {
        const t = document.createElement('span');
        t.className = 'tag';
        t.textContent = n;
        tagsWrap.appendChild(t);
      });
    }

    // updated text
    const updated = document.createElement('p');
    updated.className = 'updated';
    updated.textContent = timeAgo(p.updated);

    // append to card
    card.appendChild(cover);
    card.appendChild(title);
    card.appendChild(meta);
    card.appendChild(tagsWrap);
    card.appendChild(updated);

    podcastGrid.appendChild(card);
  });

  // If no results, show friendly message
  if (podcastGrid.children.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'empty';
    empty.textContent = 'No podcasts found.';
    podcastGrid.appendChild(empty);
  }
}
