/**
 * @file Utility functions for working with dates and times.
 */

/**
 * Formats an ISO date string into a human-readable "Updated X time ago".
 * @param {string} isoString - ISO date string or any parseable date string.
 * @returns {string} A friendly string describing how long ago the date was.
 */
export function timeAgo(isoString) {
  if (!isoString) return '';
  const d = new Date(isoString);
  if (isNaN(d)) return `Updated ${isoString}`;
  const diffMs = Date.now() - d.getTime();
  const sec = Math.floor(diffMs / 1000);
  const min = Math.floor(sec / 60);
  const hr = Math.floor(min / 60);
  const day = Math.floor(hr / 24);
  if (day >= 365) {
    const yrs = Math.floor(day / 365);
    return `Updated ${yrs} year${yrs > 1 ? 's' : ''} ago`;
  }
  if (day >= 30) {
    const months = Math.floor(day / 30);
    return `Updated ${months} month${months > 1 ? 's' : ''} ago`;
  }
  if (day >= 7) {
    const weeks = Math.floor(day / 7);
    return `Updated ${weeks} week${weeks > 1 ? 's' : ''} ago`;
  }
  if (day >= 1) return `Updated ${day} day${day > 1 ? 's' : ''} ago`;
  if (hr >= 1) return `Updated ${hr} hour${hr > 1 ? 's' : ''} ago`;
  if (min >= 1) return `Updated ${min} minute${min > 1 ? 's' : ''} ago`;
  return 'Updated just now';
}
