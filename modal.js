/**
 * Podcast and genre data imported from a separate module.
 * @module data
 */
import { podcasts, genres } from './data.js';

/**
 * DOM element references for the podcast details modal.
 * 
 * This section caches all key elements of the modal:
 * - `modal`: The modal container itself.
 * - `modalClose`: The close button inside the modal.
 * - `modalBackdrop`: The modal’s backdrop overlay.
 * - `modalTitle`: Title text for the podcast.
 * - `modalImage`: Large image/artwork of the podcast.
 * - `modalDescription`: Description text of the podcast.
 * - `modalGenres`: List of podcast genres.
 * - `modalUpdated`: Last updated date of the podcast.
 * - `modalSeasons`: Number of available podcast seasons.
 */
const modal = document.getElementById('podcastModal');
const modalClose = modal.querySelector('.modal-close');
const modalBackdrop = modal.querySelector('.modal-backdrop');

const modalTitle = document.getElementById('modalTitle');
const modalImage = document.getElementById('modalImage');
const modalDescription = document.getElementById('modalDescription');
const modalGenres = document.getElementById('modalGenres');
const modalUpdated = document.getElementById('modalUpdated');
const modalSeasons = document.getElementById('modalSeasons');

/**
 * Creates a map of genre IDs to genre titles and defines the function to open
 * the podcast modal with the selected podcast’s details.
 *
 * - `genreMap`: Maps each `genre.id` to its `genre.title` for quick lookup.
 * - `openModal(podcast)`: Populates the modal with the podcast’s title, image,
 *   alt text and description, then makes the modal visible.
 *
 * @param {Object} podcast - The podcast object to display.
 * @param {string} podcast.title - Title of the podcast.
 * @param {string} podcast.image - URL of the podcast cover image.
 * @param {string} podcast.description - Description of the podcast.
 */
const genreMap = new Map();
genres?.forEach(g => genreMap.set(g.id, g.title));

function openModal(podcast) {
  modalTitle.textContent = podcast.title ?? 'Untitled';
  modalImage.src = podcast.image ?? '';
  modalImage.alt = podcast.title ?? 'Podcast cover';
  modalDescription.textContent = podcast.description ?? '';

/**
 * Populates the modal's genres/tags section.
 *
 * This section clears any previous genre elements and then:
 * - If `podcast.genres` is an array of genre IDs, it looks up each title in
 *   `genreMap` and creates a `<span class="tag">` element for each.
 * - Otherwise, if `podcast.tags` is an array of strings, it creates a tag span
 *   for each name directly.
 *
 * @param {Object} podcast - The podcast currently being displayed.
 * @param {Array<number>} [podcast.genres] - IDs of genres to look up in `genreMap`.
 * @param {Array<string>} [podcast.tags] - Names of tags if no genre IDs are present.
 */
  modalGenres.innerHTML = '';
  if (Array.isArray(podcast.genres)) {
    podcast.genres.forEach(id => {
      const span = document.createElement('span');
      span.className = 'tag';
      span.textContent = genreMap.get(id) || 'Genre';
      modalGenres.appendChild(span);
    });
  } else if (Array.isArray(podcast.tags)) {
    podcast.tags.forEach(name => {
      const span = document.createElement('span');
      span.className = 'tag';
      span.textContent = name;
      modalGenres.appendChild(span);
    });
  }

/**
 * Displays the last-updated date in the modal.
 *
 * This section:
 * - Parses `podcast.updated` into a `Date` object if it exists.
 * - Formats it as a locale date string.
 * - Updates the `modalUpdated` element with “Last updated: …” text
 *   or leaves it blank if no date is provided.
 *
 * @param {Object} podcast - The podcast currently being displayed.
 * @param {string|number|Date} [podcast.updated] - Date or timestamp of the last update.
 */
  const d = podcast.updated ? new Date(podcast.updated) : null;
  modalUpdated.textContent = d ? `Last updated: ${d.toLocaleDateString()}` : '';

/**
 * Populates the modal's seasons section.
 *
 * This section clears any previous season elements and, if
 * `podcast.seasonDetails` is an array, creates a `.season-item`
 * for each season with:
 * - a left container holding the season title and subtitle
 * - a right container showing the number of episodes.
 *
 * @param {Object} podcast - The podcast currently being displayed.
 * @param {Array<Object>} [podcast.seasonDetails] - Details of each season.
 * @param {string} podcast.seasonDetails[].title - Title of the season.
 * @param {string} [podcast.seasonDetails[].subtitle] - Optional subtitle.
 * @param {number} podcast.seasonDetails[].episodes - Number of episodes in the season.
 */
  modalSeasons.innerHTML = '';
  if (Array.isArray(podcast.seasonDetails)) {
    podcast.seasonDetails.forEach(s => {
      const div = document.createElement('div');
      div.className = 'season-item';

      const left = document.createElement('div');
      left.innerHTML = `
        <div class="season-item-title">${s.title}</div>
        <div class="season-item-sub">${s.subtitle ?? ''}</div>
      `;

      const right = document.createElement('div');
      right.className = 'season-item-episodes';
      right.textContent = `${s.episodes} episodes`;

      div.appendChild(left);
      div.appendChild(right);
      modalSeasons.appendChild(div);
    });
  }

  /**
 * Controls the visibility of the podcast modal by toggling its `aria-hidden` attribute.
 *
 * - `openModal()` sets `aria-hidden` to `"false"` to make the modal visible
 *   (this line goes at the end of the openModal function after populating its content).
 * - `closeModal()` sets `aria-hidden` to `"true"` to hide the modal.
 *
 * These attributes improve accessibility for screen readers.
 */
  modal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  modal.setAttribute('aria-hidden', 'true');
}

/**
 * Wires up event listeners to close the modal.
 *
 * - Clicking the modal close button (`modalClose`) closes the modal.
 * - Clicking the backdrop overlay (`modalBackdrop`) closes the modal.
 * - Pressing the `Escape` key on the keyboard also closes the modal.
 *
 * These listeners all call `closeModal()` to hide the modal.
 */
modalClose.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', closeModal);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

/**
 * Handles click events on the podcast grid to open the selected podcast in the modal.
 *
 * This listener:
 * - Detects clicks on any `.card` element inside `podcastGrid`.
 * - Finds the index of the clicked card within `podcastGrid.children`.
 * - Retrieves the corresponding podcast object from the `podcasts` array.
 * - Calls `openModal(p)` to display the podcast details in the modal.
 */
const podcastGrid = document.getElementById('podcastGrid');
podcastGrid.addEventListener('click', e => {
  const card = e.target.closest('.card');
  if (!card) return;
  const index = Array.from(podcastGrid.children).indexOf(card);
  const p = podcasts[index];
  if (p) openModal(p);
});
