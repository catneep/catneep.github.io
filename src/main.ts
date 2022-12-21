import Project from "./models/Project";
import { getProjects } from "./tools/Fetch";
import { renderNavigationOptions, closeCurrentModal } from "./ui/Render";

async function main(): Promise<void> {
  const closeModals = document.getElementById("closeModal") as HTMLElement;
  closeModals.onclick = () => closeCurrentModal();

  renderNavigationOptions();
  const projectsParent = document.getElementById("projects") as HTMLElement;
  const projectContainer = projectsParent.getElementsByTagName(
    "main"
  )[0] as HTMLElement;

  const projects = await getProjects();
  projects.map((project_data) => {
    console.log(project_data);
    const project = new Project(project_data);

    console.log("created Project:", project);
    if (project.name !== "catneep")
      project.drawSubscribers({
        container: projectContainer,
      });
  });
}

main();
