import Modal from "../models/Modals";

interface IMenuItem {
  text: string;
  modal: Modal;
  action(): void;
}

function getModal(id: string): Modal {
  return new Modal(
    document.getElementById(id) as HTMLElement
  );
}

const MODALS: Record<string, Modal> = {
  'projects': getModal('projects'),
  'about': getModal('about'),
  'contact': getModal('contact'),
}

const navItems: Array<IMenuItem> = [
  {
    text: 'Projects',
    modal: MODALS['projects'],
    action: () => {
      MODALS['projects'].toggle();
      document.getElementById('modal')?.classList.toggle('visible');
    }
  },
  {
    text: 'About',
    modal: MODALS['about'],
    action: () => {
      MODALS['about'].toggle();
      document.getElementById('modal')?.classList.toggle('visible');
    }
  },
  {
    text: 'Contact',
    modal: MODALS['contact'],
    action: () => {
      MODALS['contact'].toggle();
      document.getElementById('modal')?.classList.toggle('visible');
    }
  },
  
];

export function closeCurrentModal(): void {
  navItems.map(
    (item, index) => {
      if (item.modal.visible)
        item.action();
    }
  );
}

export function renderNavigationOptions(): void {
  const container = document.getElementById('navigation') as HTMLElement;

  navItems.map(
    (item, index) => {
      console.log(`${index}: ${item.text}`,);
      const element = document.createElement('li');
      element.textContent = item.text;
      element.onclick = item.action;
      container.appendChild(element);
    }
  );
}

export function addModalContent(id: string, content: Array<HTMLElement>): Modal {
  const modal = getModal(id);

  content.map(
    (element, index) => {
      modal.container.appendChild(element)
    }
  );

  return modal;
}

export {};