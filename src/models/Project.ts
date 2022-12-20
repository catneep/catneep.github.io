import { fetchJson } from "../tools/Fetch";
import IApiData from "./IApiData";
import IProject from "./IProject";
import IProvider from "./IProvider";
import ISubscriber from "./ISubscriber";
import ProjectCard from "../ui/ProjectCard";

export default class Project implements IProject, IProvider {
  name: string;
  url: string;
  homepage: string;
  description: string;
  languages: object;
  subscribers: ISubscriber[];

  notifySubscribers(): void {
    this.subscribers.map((s) => s.update());
  }

  constructor(data: IApiData) {
    this.name = data.name;
    this.url = data.html_url;
    this.homepage = data.homepage;
    this.description = data.description;
    this.languages = {};

    this.subscribers = [];
    this.subscribers.push(new ProjectCard(this));

    this.updateLanguages(data.languages_url);
  }

  async updateLanguages(url: string) {
    this.languages = await fetchJson(url);
    this.notifySubscribers();
    console.log("Fetched langauge data", this.languages);
  }

  public addSubscriber(s: ISubscriber) {
    this.subscribers.push(s);
    s.update();
  }

  public drawSubscribers({ container }: { container: HTMLElement }): void {
    const elements = this.subscribers as Array<ProjectCard>;
    elements.map((e) => e.drawHtml(container));
  }
}
