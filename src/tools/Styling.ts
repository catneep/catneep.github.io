import { fetchJson } from "./Fetch";

interface ILanguage {
  color: string;
  url: string;
}

async function GetGithubColors(): Promise<Record<string, ILanguage>> {
  const json = (await fetchJson(
    // Thnx to ozh on github
    "https://raw.githubusercontent.com/ozh/github-colors/master/colors.json"
  )) as Record<string, ILanguage>;
  return json;
}

export async function getLanguageColor(language: string = ""): Promise<string> {
  const colors = await GetGithubColors();
  if (language in colors) {
    return colors[language].color;
  }

  // Else generate random color
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export {};
