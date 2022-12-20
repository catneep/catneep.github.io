import IApiData from "../models/IApiData";

export async function fetchText(url: string): Promise<string> {
  let text = "";
  await fetch(url)
    .then((response) => response.text())
    .then((responseJson) => {
      text = responseJson;
    })
    .catch((error) => {
      console.log("Error retrieving project data.", error);
    });

  return text;
}

export async function fetchJson(url: string): Promise<object> {
  let json = {};
  await fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      json = responseJson;
    })
    .catch((error) => {
      console.log("Error retrieving project data.", error);
    });

  return json;
}

export async function getProjects(): Promise<Array<IApiData>> {
  return (await fetchJson(
    "https://api.github.com/users/catneep/repos"
  )) as Array<IApiData>;
}

export {};
