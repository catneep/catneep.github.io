import IProject from "../models/IProject";
import ISubscriber from "../models/ISubscriber";
import { getLanguageColor } from "../tools/Styling";
import SPINNER from "./Spinner";

export default class ProjectCard implements ISubscriber {
  public html: HTMLElement;
  public project: IProject;

  constructor(project: IProject) {
    this.project = project;

    this.html = document.createElement("div");
    this.html.id = project.name;
    this.html.classList.add("project-card");
    this.buildMarkup();
  }

  private getTechPercentages(
    tech: object
  ): Array<{ name: string; percent: string }> {
    const sumTechValues = (obj: object): number =>
      Object.values(obj).reduce((a, b) => a + b, 0);

    const percentages: Array<{
      name: string;
      percent: string;
    }> = [];

    const total = sumTechValues(tech);
    Object.keys(tech).map((key, index) => {
      const langauge_lines = Object.values(tech)[index] as number;
      const percent = ((langauge_lines * 100) / total).toFixed(2);
      percentages.push({ name: key, percent: percent });
    });
    return percentages;
  }

  private buildListElement(
    ul: HTMLUListElement,
    percentages: Array<{ name: string; percent: string }>
  ): void {
    percentages.map((item) => {
      const li = document.createElement("li");
      li.style.width = `${item.percent}%`;
      li.textContent = `${item.name}: ${item.percent}%`;
      getLanguageColor(item.name).then(
        (response) => (li.style.backgroundColor = response)
      );
      ul.appendChild(li);
    });
  }

  /**
   * Update displayed tech stack information
   */
  update(): void {
    // Updates tech stack info
    console.log("Project card updated");

    const doc_html = document.getElementById(this.html.id) as HTMLElement;
    const tech_container = doc_html.getElementsByTagName(
      "footer"
    )[0] as HTMLElement;

    tech_container.innerHTML = "";
    const ul = document.createElement("ul");
    const percentages = this.getTechPercentages(this.project.languages);
    this.buildListElement(ul, percentages);
    tech_container.appendChild(ul);
  }

  public buildMarkup(): ProjectCard {
    const structure = [
      document.createElement("header"),
      document.createElement("section"),
      document.createElement("footer"),
    ];

    structure.map((element) => this.html.appendChild(element));

    return this;
  }

  public addTitle(title: string): ProjectCard {
    const header = this.html.getElementsByTagName("header")[0];
    const container = document.createElement("span");
    container.innerHTML = title;
    header.appendChild(container);

    return this;
  }

  public addDescription(description: string): ProjectCard {
    const body = this.html.getElementsByTagName("section")[0];
    const container = document.createElement("p");
    container.innerHTML = description;
    body.appendChild(container);

    return this;
  }

  public addExternalLinks(repo: string, homepage: string): ProjectCard {
    const header = this.html.getElementsByTagName("header")[0];
    const container = document.createElement("span");

    [homepage, repo].map((url, i) => {
      const icon = document.createElement("a");
      icon.href = url;
      icon.target = "_blank";
      i % 2 === 0 ? (icon.innerHTML = "🌐") : (icon.innerHTML = "💻");

      if (url !== null && url !== "")
        container.appendChild(icon);
    });

    header.appendChild(container);

    return this;
  }

  public addTechStack(stack: object = {}): ProjectCard {
    const footer = this.html.getElementsByTagName("footer")[0];
    // Add spinner by default
    footer.innerHTML = SPINNER;
    this.html.appendChild(footer);

    return this;
  }

  public fillData(): ProjectCard {
    this.addTitle(this.project.name)
      .addExternalLinks(this.project.url, this.project.homepage)
      .addDescription(this.project.description)
      .addTechStack();

    return this;
  }

  public drawHtml(container: HTMLElement): ProjectCard {
    this.fillData();
    container.appendChild(this.html);
    return this;
  }
}
