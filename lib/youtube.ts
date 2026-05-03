/** YouTube watch IDs are always 11 characters ([A-Za-z0-9_-]). */
const WATCH_ID = /^[a-zA-Z0-9_-]{11}$/;

export function isValidYoutubeWatchId(id: string | undefined): boolean {
  return !!id && WATCH_ID.test(id.trim());
}

export function youtubeWatchUrl(videoId: string): string {
  const id = videoId.trim();
  if (!isValidYoutubeWatchId(id)) {
    return youtubeSearchUrl("exercise form tutorial");
  }
  return `https://www.youtube.com/watch?v=${id}`;
}

export function youtubeSearchUrl(query: string): string {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
}

export function youtubeSearchForExercise(name: string): string {
  return youtubeSearchUrl(`${name} proper form tutorial`);
}
