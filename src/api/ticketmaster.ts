const API_KEY = 'imHqodFQdKhc6hQu0lDrzHlY2bkfGkqA';
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2';

export async function searchEvents(keyword: string, city: string) {
  const res = await fetch(
    `${BASE_URL}/events.json?keyword=${keyword}&city=${city}&apikey=${API_KEY}`,
  );
  const js = await res.json();
  return js._embedded?.events || [];
}

export async function getEventById(id: string) {
  const res = await fetch(`${BASE_URL}/events/${id}.json?apikey=${API_KEY}`);
  return res.json();
}
