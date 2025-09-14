/**
 * @file Entry point for the podcast app.
 * Imports data, utilities and services and wires up filters to render the grid.
 */

import { podcasts, genres } from './data.js';
import { timeAgo } from './dataUtils.js';
import { genreMap, populateGenres } from './genreServices.js';
import { renderCards } from './createGrid.js';

const podcastGrid = document.getElementById('podcastGrid');
const genreFilter = document.getElementById('genreFilter');
const sortFilter = document.getElementById('sortFilter');

/**
 * Populate the genre dropdown using genres or podcast tags.
 */
populateGenres(genres, podcasts, genreFilter);

/**
 * Listen for changes on the dropdowns and re-render the grid.
 */
genreFilter.addEventListener('change', () =>
  renderCards(podcastGrid, podcasts, genreFilter.value, sortFilter.value, genreMap, timeAgo)
);
sortFilter.addEventListener('change', () =>
  renderCards(podcastGrid, podcasts, genreFilter.value, sortFilter.value, genreMap, timeAgo)
);

/**
 * Initial render of the podcast grid.
 */
renderCards(podcastGrid, podcasts, 'all', 'recent', genreMap, timeAgo);
