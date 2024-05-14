export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: Array<string>;
  url: string;
  created: string;
}

const buildUrl = (...paths: string[]) =>
  new URL(`https://rickandmortyapi.com/api/${paths.join("/")}`);

const sendRequest = async <T>(url: string, init?: RequestInit) => {
  const res = await fetch(url, init);
  if (!res.ok) {
    throw new Error(await res.text());
  }
  const jsonData = await res.json();
  console.log(jsonData.results);
  return jsonData.results as T;
};

export const getAllCharacters = (init?: RequestInit) => {
  return sendRequest<Character[]>(buildUrl("character").href, init);
};

export const getFilteredCharacters = (status?: string, init?: RequestInit) => {
  const url = status
    ? buildUrl("character", `?status=${status}`).href
    : buildUrl("character").href;

  return sendRequest<Character[]>(url, init);
};
