/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const Project_1 = __importDefault(__webpack_require__(/*! ./models/Project */ "./src/models/Project.ts"));
const Fetch_1 = __webpack_require__(/*! ./tools/Fetch */ "./src/tools/Fetch.ts");
const Render_1 = __webpack_require__(/*! ./ui/Render */ "./src/ui/Render.ts");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const closeModals = document.getElementById("closeModal");
        closeModals.onclick = () => (0, Render_1.closeCurrentModal)();
        (0, Render_1.renderNavigationOptions)();
        const projectsParent = document.getElementById("projects");
        const projectContainer = projectsParent.getElementsByTagName("main")[0];
        const projects = yield (0, Fetch_1.getProjects)();
        projects.map((project_data) => {
            console.log(project_data);
            const project = new Project_1.default(project_data);
            console.log("created Project:", project);
            project.drawSubscribers({
                container: projectContainer,
            });
        });
    });
}
main();


/***/ }),

/***/ "./src/models/Modals.ts":
/*!******************************!*\
  !*** ./src/models/Modals.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class Modal {
    constructor(container) {
        this.container = container;
        this.visible = false;
    }
    toggle() {
        this.visible = this.container.classList.toggle("visible");
        return this.visible;
    }
}
exports["default"] = Modal;


/***/ }),

/***/ "./src/models/Project.ts":
/*!*******************************!*\
  !*** ./src/models/Project.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const Fetch_1 = __webpack_require__(/*! ../tools/Fetch */ "./src/tools/Fetch.ts");
const ProjectCard_1 = __importDefault(__webpack_require__(/*! ../ui/ProjectCard */ "./src/ui/ProjectCard.ts"));
class Project {
    notifySubscribers() {
        this.subscribers.map((s) => s.update());
    }
    constructor(data) {
        this.name = data.name;
        this.url = data.html_url;
        this.homepage = data.homepage;
        this.description = data.description;
        this.languages = {};
        this.subscribers = [];
        this.subscribers.push(new ProjectCard_1.default(this));
        this.updateLanguages(data.languages_url);
    }
    updateLanguages(url) {
        return __awaiter(this, void 0, void 0, function* () {
            this.languages = yield (0, Fetch_1.fetchJson)(url);
            this.notifySubscribers();
            console.log("Fetched langauge data", this.languages);
        });
    }
    addSubscriber(s) {
        this.subscribers.push(s);
        s.update();
    }
    drawSubscribers({ container }) {
        const elements = this.subscribers;
        elements.map((e) => e.drawHtml(container));
    }
}
exports["default"] = Project;


/***/ }),

/***/ "./src/tools/Fetch.ts":
/*!****************************!*\
  !*** ./src/tools/Fetch.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getProjects = exports.fetchJson = exports.fetchText = void 0;
function fetchText(url) {
    return __awaiter(this, void 0, void 0, function* () {
        let text = "";
        yield fetch(url)
            .then((response) => response.text())
            .then((responseJson) => {
            text = responseJson;
        })
            .catch((error) => {
            console.log("Error retrieving project data.", error);
        });
        return text;
    });
}
exports.fetchText = fetchText;
function fetchJson(url) {
    return __awaiter(this, void 0, void 0, function* () {
        let json = {};
        yield fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
            json = responseJson;
        })
            .catch((error) => {
            console.log("Error retrieving project data.", error);
        });
        return json;
    });
}
exports.fetchJson = fetchJson;
function getProjects() {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield fetchJson("https://api.github.com/users/catneep/repos"));
    });
}
exports.getProjects = getProjects;


/***/ }),

/***/ "./src/tools/Styling.ts":
/*!******************************!*\
  !*** ./src/tools/Styling.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getLanguageColor = void 0;
const Fetch_1 = __webpack_require__(/*! ./Fetch */ "./src/tools/Fetch.ts");
function GetGithubColors() {
    return __awaiter(this, void 0, void 0, function* () {
        const json = (yield (0, Fetch_1.fetchJson)("https://raw.githubusercontent.com/ozh/github-colors/master/colors.json"));
        return json;
    });
}
function getLanguageColor(language = "") {
    return __awaiter(this, void 0, void 0, function* () {
        const colors = yield GetGithubColors();
        if (language in colors) {
            return colors[language].color;
        }
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    });
}
exports.getLanguageColor = getLanguageColor;


/***/ }),

/***/ "./src/ui/ProjectCard.ts":
/*!*******************************!*\
  !*** ./src/ui/ProjectCard.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const Styling_1 = __webpack_require__(/*! ../tools/Styling */ "./src/tools/Styling.ts");
const Spinner_1 = __importDefault(__webpack_require__(/*! ./Spinner */ "./src/ui/Spinner.ts"));
class ProjectCard {
    constructor(project) {
        this.project = project;
        this.html = document.createElement("div");
        this.html.id = project.name;
        this.html.classList.add("project-card");
        this.buildMarkup();
    }
    getTechPercentages(tech) {
        const sumTechValues = (obj) => Object.values(obj).reduce((a, b) => a + b, 0);
        const percentages = [];
        const total = sumTechValues(tech);
        Object.keys(tech).map((key, index) => {
            const langauge_lines = Object.values(tech)[index];
            const percent = ((langauge_lines * 100) / total).toFixed(2);
            percentages.push({ name: key, percent: percent });
        });
        return percentages;
    }
    buildListElement(ul, percentages) {
        percentages.map((item) => {
            const li = document.createElement("li");
            li.style.width = `${item.percent}%`;
            li.textContent = `${item.name}: ${item.percent}%`;
            (0, Styling_1.getLanguageColor)(item.name).then((response) => (li.style.backgroundColor = response));
            ul.appendChild(li);
        });
    }
    update() {
        console.log("Project card updated");
        const doc_html = document.getElementById(this.html.id);
        const tech_container = doc_html.getElementsByTagName("footer")[0];
        tech_container.innerHTML = "";
        const ul = document.createElement("ul");
        const percentages = this.getTechPercentages(this.project.languages);
        this.buildListElement(ul, percentages);
        tech_container.appendChild(ul);
    }
    buildMarkup() {
        const structure = [
            document.createElement("header"),
            document.createElement("section"),
            document.createElement("footer"),
        ];
        structure.map((element) => this.html.appendChild(element));
        return this;
    }
    addTitle(title) {
        const header = this.html.getElementsByTagName("header")[0];
        const container = document.createElement("span");
        container.innerHTML = title;
        header.appendChild(container);
        return this;
    }
    addDescription(description) {
        const body = this.html.getElementsByTagName("section")[0];
        const container = document.createElement("p");
        container.innerHTML = description;
        body.appendChild(container);
        return this;
    }
    addExternalLinks(repo, homepage) {
        const header = this.html.getElementsByTagName("header")[0];
        const container = document.createElement("span");
        [homepage, repo].map((url, i) => {
            const icon = document.createElement("a");
            icon.href = url;
            icon.target = "_blank";
            i % 2 === 0 ? (icon.innerHTML = "🌐") : (icon.innerHTML = "💻");
            if (url !== "")
                container.appendChild(icon);
        });
        header.appendChild(container);
        return this;
    }
    addTechStack(stack = {}) {
        const footer = this.html.getElementsByTagName("footer")[0];
        footer.innerHTML = Spinner_1.default;
        this.html.appendChild(footer);
        return this;
    }
    fillData() {
        this.addTitle(this.project.name)
            .addExternalLinks(this.project.url, this.project.homepage)
            .addDescription(this.project.description)
            .addTechStack();
        return this;
    }
    drawHtml(container) {
        this.fillData();
        container.appendChild(this.html);
        return this;
    }
}
exports["default"] = ProjectCard;


/***/ }),

/***/ "./src/ui/Render.ts":
/*!**************************!*\
  !*** ./src/ui/Render.ts ***!
  \**************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.addModalContent = exports.renderNavigationOptions = exports.closeCurrentModal = void 0;
const Modals_1 = __importDefault(__webpack_require__(/*! ../models/Modals */ "./src/models/Modals.ts"));
function getModal(id) {
    return new Modals_1.default(document.getElementById(id));
}
const MODALS = {
    'projects': getModal('projects'),
    'about': getModal('about'),
    'contact': getModal('contact'),
};
const navItems = [
    {
        text: 'Projects',
        modal: MODALS['projects'],
        action: () => {
            var _a;
            MODALS['projects'].toggle();
            (_a = document.getElementById('modal')) === null || _a === void 0 ? void 0 : _a.classList.toggle('visible');
        }
    },
    {
        text: 'About',
        modal: MODALS['about'],
        action: () => {
            var _a;
            MODALS['about'].toggle();
            (_a = document.getElementById('modal')) === null || _a === void 0 ? void 0 : _a.classList.toggle('visible');
        }
    },
    {
        text: 'Contact',
        modal: MODALS['contact'],
        action: () => {
            var _a;
            MODALS['contact'].toggle();
            (_a = document.getElementById('modal')) === null || _a === void 0 ? void 0 : _a.classList.toggle('visible');
        }
    },
];
function closeCurrentModal() {
    navItems.map((item, index) => {
        if (item.modal.visible)
            item.action();
    });
}
exports.closeCurrentModal = closeCurrentModal;
function renderNavigationOptions() {
    const container = document.getElementById('navigation');
    navItems.map((item, index) => {
        console.log(`${index}: ${item.text}`);
        const element = document.createElement('li');
        element.textContent = item.text;
        element.onclick = item.action;
        container.appendChild(element);
    });
}
exports.renderNavigationOptions = renderNavigationOptions;
function addModalContent(id, content) {
    const modal = getModal(id);
    content.map((element, index) => {
        modal.container.appendChild(element);
    });
    return modal;
}
exports.addModalContent = addModalContent;


/***/ }),

/***/ "./src/ui/Spinner.ts":
/*!***************************!*\
  !*** ./src/ui/Spinner.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const SPINNER = "<div class='spinner'><div></div><div></div></div>";
exports["default"] = SPINNER;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLE1BQU0sSUFBSSxVQUFVO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSx1QkFBdUI7Ozs7Ozs7Ozs7O0FDckVWO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdEO0FBQ0Esa0JBQWU7Ozs7Ozs7VUNIZjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7O1VFdEJBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcG9ydGZvbGlvLTMvLi9zcmMvbWFpbi50cyIsIndlYnBhY2s6Ly9wb3J0Zm9saW8tMy8uL3NyYy9tb2RlbHMvTW9kYWxzLnRzIiwid2VicGFjazovL3BvcnRmb2xpby0zLy4vc3JjL21vZGVscy9Qcm9qZWN0LnRzIiwid2VicGFjazovL3BvcnRmb2xpby0zLy4vc3JjL3Rvb2xzL0ZldGNoLnRzIiwid2VicGFjazovL3BvcnRmb2xpby0zLy4vc3JjL3Rvb2xzL1N0eWxpbmcudHMiLCJ3ZWJwYWNrOi8vcG9ydGZvbGlvLTMvLi9zcmMvdWkvUHJvamVjdENhcmQudHMiLCJ3ZWJwYWNrOi8vcG9ydGZvbGlvLTMvLi9zcmMvdWkvUmVuZGVyLnRzIiwid2VicGFjazovL3BvcnRmb2xpby0zLy4vc3JjL3VpL1NwaW5uZXIudHMiLCJ3ZWJwYWNrOi8vcG9ydGZvbGlvLTMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcG9ydGZvbGlvLTMvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9wb3J0Zm9saW8tMy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vcG9ydGZvbGlvLTMvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBQcm9qZWN0XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vbW9kZWxzL1Byb2plY3RcIikpO1xuY29uc3QgRmV0Y2hfMSA9IHJlcXVpcmUoXCIuL3Rvb2xzL0ZldGNoXCIpO1xuY29uc3QgUmVuZGVyXzEgPSByZXF1aXJlKFwiLi91aS9SZW5kZXJcIik7XG5mdW5jdGlvbiBtYWluKCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnN0IGNsb3NlTW9kYWxzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjbG9zZU1vZGFsXCIpO1xuICAgICAgICBjbG9zZU1vZGFscy5vbmNsaWNrID0gKCkgPT4gKDAsIFJlbmRlcl8xLmNsb3NlQ3VycmVudE1vZGFsKSgpO1xuICAgICAgICAoMCwgUmVuZGVyXzEucmVuZGVyTmF2aWdhdGlvbk9wdGlvbnMpKCk7XG4gICAgICAgIGNvbnN0IHByb2plY3RzUGFyZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0c1wiKTtcbiAgICAgICAgY29uc3QgcHJvamVjdENvbnRhaW5lciA9IHByb2plY3RzUGFyZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwibWFpblwiKVswXTtcbiAgICAgICAgY29uc3QgcHJvamVjdHMgPSB5aWVsZCAoMCwgRmV0Y2hfMS5nZXRQcm9qZWN0cykoKTtcbiAgICAgICAgcHJvamVjdHMubWFwKChwcm9qZWN0X2RhdGEpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHByb2plY3RfZGF0YSk7XG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0ID0gbmV3IFByb2plY3RfMS5kZWZhdWx0KHByb2plY3RfZGF0YSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImNyZWF0ZWQgUHJvamVjdDpcIiwgcHJvamVjdCk7XG4gICAgICAgICAgICBwcm9qZWN0LmRyYXdTdWJzY3JpYmVycyh7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyOiBwcm9qZWN0Q29udGFpbmVyLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxubWFpbigpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jbGFzcyBNb2RhbCB7XG4gICAgY29uc3RydWN0b3IoY29udGFpbmVyKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuICAgICAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcbiAgICB9XG4gICAgdG9nZ2xlKCkge1xuICAgICAgICB0aGlzLnZpc2libGUgPSB0aGlzLmNvbnRhaW5lci5jbGFzc0xpc3QudG9nZ2xlKFwidmlzaWJsZVwiKTtcbiAgICAgICAgcmV0dXJuIHRoaXMudmlzaWJsZTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBNb2RhbDtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBGZXRjaF8xID0gcmVxdWlyZShcIi4uL3Rvb2xzL0ZldGNoXCIpO1xuY29uc3QgUHJvamVjdENhcmRfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi4vdWkvUHJvamVjdENhcmRcIikpO1xuY2xhc3MgUHJvamVjdCB7XG4gICAgbm90aWZ5U3Vic2NyaWJlcnMoKSB7XG4gICAgICAgIHRoaXMuc3Vic2NyaWJlcnMubWFwKChzKSA9PiBzLnVwZGF0ZSgpKTtcbiAgICB9XG4gICAgY29uc3RydWN0b3IoZGF0YSkge1xuICAgICAgICB0aGlzLm5hbWUgPSBkYXRhLm5hbWU7XG4gICAgICAgIHRoaXMudXJsID0gZGF0YS5odG1sX3VybDtcbiAgICAgICAgdGhpcy5ob21lcGFnZSA9IGRhdGEuaG9tZXBhZ2U7XG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkYXRhLmRlc2NyaXB0aW9uO1xuICAgICAgICB0aGlzLmxhbmd1YWdlcyA9IHt9O1xuICAgICAgICB0aGlzLnN1YnNjcmliZXJzID0gW107XG4gICAgICAgIHRoaXMuc3Vic2NyaWJlcnMucHVzaChuZXcgUHJvamVjdENhcmRfMS5kZWZhdWx0KHRoaXMpKTtcbiAgICAgICAgdGhpcy51cGRhdGVMYW5ndWFnZXMoZGF0YS5sYW5ndWFnZXNfdXJsKTtcbiAgICB9XG4gICAgdXBkYXRlTGFuZ3VhZ2VzKHVybCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgdGhpcy5sYW5ndWFnZXMgPSB5aWVsZCAoMCwgRmV0Y2hfMS5mZXRjaEpzb24pKHVybCk7XG4gICAgICAgICAgICB0aGlzLm5vdGlmeVN1YnNjcmliZXJzKCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZldGNoZWQgbGFuZ2F1Z2UgZGF0YVwiLCB0aGlzLmxhbmd1YWdlcyk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBhZGRTdWJzY3JpYmVyKHMpIHtcbiAgICAgICAgdGhpcy5zdWJzY3JpYmVycy5wdXNoKHMpO1xuICAgICAgICBzLnVwZGF0ZSgpO1xuICAgIH1cbiAgICBkcmF3U3Vic2NyaWJlcnMoeyBjb250YWluZXIgfSkge1xuICAgICAgICBjb25zdCBlbGVtZW50cyA9IHRoaXMuc3Vic2NyaWJlcnM7XG4gICAgICAgIGVsZW1lbnRzLm1hcCgoZSkgPT4gZS5kcmF3SHRtbChjb250YWluZXIpKTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBQcm9qZWN0O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZ2V0UHJvamVjdHMgPSBleHBvcnRzLmZldGNoSnNvbiA9IGV4cG9ydHMuZmV0Y2hUZXh0ID0gdm9pZCAwO1xuZnVuY3Rpb24gZmV0Y2hUZXh0KHVybCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGxldCB0ZXh0ID0gXCJcIjtcbiAgICAgICAgeWllbGQgZmV0Y2godXJsKVxuICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS50ZXh0KCkpXG4gICAgICAgICAgICAudGhlbigocmVzcG9uc2VKc29uKSA9PiB7XG4gICAgICAgICAgICB0ZXh0ID0gcmVzcG9uc2VKc29uO1xuICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciByZXRyaWV2aW5nIHByb2plY3QgZGF0YS5cIiwgZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRleHQ7XG4gICAgfSk7XG59XG5leHBvcnRzLmZldGNoVGV4dCA9IGZldGNoVGV4dDtcbmZ1bmN0aW9uIGZldGNoSnNvbih1cmwpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBsZXQganNvbiA9IHt9O1xuICAgICAgICB5aWVsZCBmZXRjaCh1cmwpXG4gICAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgICAgICAgIC50aGVuKChyZXNwb25zZUpzb24pID0+IHtcbiAgICAgICAgICAgIGpzb24gPSByZXNwb25zZUpzb247XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIHJldHJpZXZpbmcgcHJvamVjdCBkYXRhLlwiLCBlcnJvcik7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4ganNvbjtcbiAgICB9KTtcbn1cbmV4cG9ydHMuZmV0Y2hKc29uID0gZmV0Y2hKc29uO1xuZnVuY3Rpb24gZ2V0UHJvamVjdHMoKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgcmV0dXJuICh5aWVsZCBmZXRjaEpzb24oXCJodHRwczovL2FwaS5naXRodWIuY29tL3VzZXJzL2NhdG5lZXAvcmVwb3NcIikpO1xuICAgIH0pO1xufVxuZXhwb3J0cy5nZXRQcm9qZWN0cyA9IGdldFByb2plY3RzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZ2V0TGFuZ3VhZ2VDb2xvciA9IHZvaWQgMDtcbmNvbnN0IEZldGNoXzEgPSByZXF1aXJlKFwiLi9GZXRjaFwiKTtcbmZ1bmN0aW9uIEdldEdpdGh1YkNvbG9ycygpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zdCBqc29uID0gKHlpZWxkICgwLCBGZXRjaF8xLmZldGNoSnNvbikoXCJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vb3poL2dpdGh1Yi1jb2xvcnMvbWFzdGVyL2NvbG9ycy5qc29uXCIpKTtcbiAgICAgICAgcmV0dXJuIGpzb247XG4gICAgfSk7XG59XG5mdW5jdGlvbiBnZXRMYW5ndWFnZUNvbG9yKGxhbmd1YWdlID0gXCJcIikge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnN0IGNvbG9ycyA9IHlpZWxkIEdldEdpdGh1YkNvbG9ycygpO1xuICAgICAgICBpZiAobGFuZ3VhZ2UgaW4gY29sb3JzKSB7XG4gICAgICAgICAgICByZXR1cm4gY29sb3JzW2xhbmd1YWdlXS5jb2xvcjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBsZXR0ZXJzID0gXCIwMTIzNDU2Nzg5QUJDREVGXCI7XG4gICAgICAgIGxldCBjb2xvciA9IFwiI1wiO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDY7IGkrKykge1xuICAgICAgICAgICAgY29sb3IgKz0gbGV0dGVyc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxNildO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb2xvcjtcbiAgICB9KTtcbn1cbmV4cG9ydHMuZ2V0TGFuZ3VhZ2VDb2xvciA9IGdldExhbmd1YWdlQ29sb3I7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IFN0eWxpbmdfMSA9IHJlcXVpcmUoXCIuLi90b29scy9TdHlsaW5nXCIpO1xuY29uc3QgU3Bpbm5lcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL1NwaW5uZXJcIikpO1xuY2xhc3MgUHJvamVjdENhcmQge1xuICAgIGNvbnN0cnVjdG9yKHByb2plY3QpIHtcbiAgICAgICAgdGhpcy5wcm9qZWN0ID0gcHJvamVjdDtcbiAgICAgICAgdGhpcy5odG1sID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgdGhpcy5odG1sLmlkID0gcHJvamVjdC5uYW1lO1xuICAgICAgICB0aGlzLmh0bWwuY2xhc3NMaXN0LmFkZChcInByb2plY3QtY2FyZFwiKTtcbiAgICAgICAgdGhpcy5idWlsZE1hcmt1cCgpO1xuICAgIH1cbiAgICBnZXRUZWNoUGVyY2VudGFnZXModGVjaCkge1xuICAgICAgICBjb25zdCBzdW1UZWNoVmFsdWVzID0gKG9iaikgPT4gT2JqZWN0LnZhbHVlcyhvYmopLnJlZHVjZSgoYSwgYikgPT4gYSArIGIsIDApO1xuICAgICAgICBjb25zdCBwZXJjZW50YWdlcyA9IFtdO1xuICAgICAgICBjb25zdCB0b3RhbCA9IHN1bVRlY2hWYWx1ZXModGVjaCk7XG4gICAgICAgIE9iamVjdC5rZXlzKHRlY2gpLm1hcCgoa2V5LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbGFuZ2F1Z2VfbGluZXMgPSBPYmplY3QudmFsdWVzKHRlY2gpW2luZGV4XTtcbiAgICAgICAgICAgIGNvbnN0IHBlcmNlbnQgPSAoKGxhbmdhdWdlX2xpbmVzICogMTAwKSAvIHRvdGFsKS50b0ZpeGVkKDIpO1xuICAgICAgICAgICAgcGVyY2VudGFnZXMucHVzaCh7IG5hbWU6IGtleSwgcGVyY2VudDogcGVyY2VudCB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBwZXJjZW50YWdlcztcbiAgICB9XG4gICAgYnVpbGRMaXN0RWxlbWVudCh1bCwgcGVyY2VudGFnZXMpIHtcbiAgICAgICAgcGVyY2VudGFnZXMubWFwKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgICAgICAgICAgIGxpLnN0eWxlLndpZHRoID0gYCR7aXRlbS5wZXJjZW50fSVgO1xuICAgICAgICAgICAgbGkudGV4dENvbnRlbnQgPSBgJHtpdGVtLm5hbWV9OiAke2l0ZW0ucGVyY2VudH0lYDtcbiAgICAgICAgICAgICgwLCBTdHlsaW5nXzEuZ2V0TGFuZ3VhZ2VDb2xvcikoaXRlbS5uYW1lKS50aGVuKChyZXNwb25zZSkgPT4gKGxpLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHJlc3BvbnNlKSk7XG4gICAgICAgICAgICB1bC5hcHBlbmRDaGlsZChsaSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiUHJvamVjdCBjYXJkIHVwZGF0ZWRcIik7XG4gICAgICAgIGNvbnN0IGRvY19odG1sID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5odG1sLmlkKTtcbiAgICAgICAgY29uc3QgdGVjaF9jb250YWluZXIgPSBkb2NfaHRtbC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImZvb3RlclwiKVswXTtcbiAgICAgICAgdGVjaF9jb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgY29uc3QgdWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIik7XG4gICAgICAgIGNvbnN0IHBlcmNlbnRhZ2VzID0gdGhpcy5nZXRUZWNoUGVyY2VudGFnZXModGhpcy5wcm9qZWN0Lmxhbmd1YWdlcyk7XG4gICAgICAgIHRoaXMuYnVpbGRMaXN0RWxlbWVudCh1bCwgcGVyY2VudGFnZXMpO1xuICAgICAgICB0ZWNoX2NvbnRhaW5lci5hcHBlbmRDaGlsZCh1bCk7XG4gICAgfVxuICAgIGJ1aWxkTWFya3VwKCkge1xuICAgICAgICBjb25zdCBzdHJ1Y3R1cmUgPSBbXG4gICAgICAgICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaGVhZGVyXCIpLFxuICAgICAgICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIiksXG4gICAgICAgICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9vdGVyXCIpLFxuICAgICAgICBdO1xuICAgICAgICBzdHJ1Y3R1cmUubWFwKChlbGVtZW50KSA9PiB0aGlzLmh0bWwuYXBwZW5kQ2hpbGQoZWxlbWVudCkpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgYWRkVGl0bGUodGl0bGUpIHtcbiAgICAgICAgY29uc3QgaGVhZGVyID0gdGhpcy5odG1sLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZGVyXCIpWzBdO1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9IHRpdGxlO1xuICAgICAgICBoZWFkZXIuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGFkZERlc2NyaXB0aW9uKGRlc2NyaXB0aW9uKSB7XG4gICAgICAgIGNvbnN0IGJvZHkgPSB0aGlzLmh0bWwuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzZWN0aW9uXCIpWzBdO1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9IGRlc2NyaXB0aW9uO1xuICAgICAgICBib2R5LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBhZGRFeHRlcm5hbExpbmtzKHJlcG8sIGhvbWVwYWdlKSB7XG4gICAgICAgIGNvbnN0IGhlYWRlciA9IHRoaXMuaHRtbC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRlclwiKVswXTtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICAgIFtob21lcGFnZSwgcmVwb10ubWFwKCh1cmwsIGkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgICAgICAgICAgIGljb24uaHJlZiA9IHVybDtcbiAgICAgICAgICAgIGljb24udGFyZ2V0ID0gXCJfYmxhbmtcIjtcbiAgICAgICAgICAgIGkgJSAyID09PSAwID8gKGljb24uaW5uZXJIVE1MID0gXCLwn4yQXCIpIDogKGljb24uaW5uZXJIVE1MID0gXCLwn5K7XCIpO1xuICAgICAgICAgICAgaWYgKHVybCAhPT0gXCJcIilcbiAgICAgICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoaWNvbik7XG4gICAgICAgIH0pO1xuICAgICAgICBoZWFkZXIuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGFkZFRlY2hTdGFjayhzdGFjayA9IHt9KSB7XG4gICAgICAgIGNvbnN0IGZvb3RlciA9IHRoaXMuaHRtbC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImZvb3RlclwiKVswXTtcbiAgICAgICAgZm9vdGVyLmlubmVySFRNTCA9IFNwaW5uZXJfMS5kZWZhdWx0O1xuICAgICAgICB0aGlzLmh0bWwuYXBwZW5kQ2hpbGQoZm9vdGVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGZpbGxEYXRhKCkge1xuICAgICAgICB0aGlzLmFkZFRpdGxlKHRoaXMucHJvamVjdC5uYW1lKVxuICAgICAgICAgICAgLmFkZEV4dGVybmFsTGlua3ModGhpcy5wcm9qZWN0LnVybCwgdGhpcy5wcm9qZWN0LmhvbWVwYWdlKVxuICAgICAgICAgICAgLmFkZERlc2NyaXB0aW9uKHRoaXMucHJvamVjdC5kZXNjcmlwdGlvbilcbiAgICAgICAgICAgIC5hZGRUZWNoU3RhY2soKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGRyYXdIdG1sKGNvbnRhaW5lcikge1xuICAgICAgICB0aGlzLmZpbGxEYXRhKCk7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmh0bWwpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBQcm9qZWN0Q2FyZDtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5hZGRNb2RhbENvbnRlbnQgPSBleHBvcnRzLnJlbmRlck5hdmlnYXRpb25PcHRpb25zID0gZXhwb3J0cy5jbG9zZUN1cnJlbnRNb2RhbCA9IHZvaWQgMDtcbmNvbnN0IE1vZGFsc18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuLi9tb2RlbHMvTW9kYWxzXCIpKTtcbmZ1bmN0aW9uIGdldE1vZGFsKGlkKSB7XG4gICAgcmV0dXJuIG5ldyBNb2RhbHNfMS5kZWZhdWx0KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKSk7XG59XG5jb25zdCBNT0RBTFMgPSB7XG4gICAgJ3Byb2plY3RzJzogZ2V0TW9kYWwoJ3Byb2plY3RzJyksXG4gICAgJ2Fib3V0JzogZ2V0TW9kYWwoJ2Fib3V0JyksXG4gICAgJ2NvbnRhY3QnOiBnZXRNb2RhbCgnY29udGFjdCcpLFxufTtcbmNvbnN0IG5hdkl0ZW1zID0gW1xuICAgIHtcbiAgICAgICAgdGV4dDogJ1Byb2plY3RzJyxcbiAgICAgICAgbW9kYWw6IE1PREFMU1sncHJvamVjdHMnXSxcbiAgICAgICAgYWN0aW9uOiAoKSA9PiB7XG4gICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICBNT0RBTFNbJ3Byb2plY3RzJ10udG9nZ2xlKCk7XG4gICAgICAgICAgICAoX2EgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWwnKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNsYXNzTGlzdC50b2dnbGUoJ3Zpc2libGUnKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICB0ZXh0OiAnQWJvdXQnLFxuICAgICAgICBtb2RhbDogTU9EQUxTWydhYm91dCddLFxuICAgICAgICBhY3Rpb246ICgpID0+IHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIE1PREFMU1snYWJvdXQnXS50b2dnbGUoKTtcbiAgICAgICAgICAgIChfYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbCcpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY2xhc3NMaXN0LnRvZ2dsZSgndmlzaWJsZScpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIHRleHQ6ICdDb250YWN0JyxcbiAgICAgICAgbW9kYWw6IE1PREFMU1snY29udGFjdCddLFxuICAgICAgICBhY3Rpb246ICgpID0+IHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIE1PREFMU1snY29udGFjdCddLnRvZ2dsZSgpO1xuICAgICAgICAgICAgKF9hID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsJykpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jbGFzc0xpc3QudG9nZ2xlKCd2aXNpYmxlJyk7XG4gICAgICAgIH1cbiAgICB9LFxuXTtcbmZ1bmN0aW9uIGNsb3NlQ3VycmVudE1vZGFsKCkge1xuICAgIG5hdkl0ZW1zLm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgaWYgKGl0ZW0ubW9kYWwudmlzaWJsZSlcbiAgICAgICAgICAgIGl0ZW0uYWN0aW9uKCk7XG4gICAgfSk7XG59XG5leHBvcnRzLmNsb3NlQ3VycmVudE1vZGFsID0gY2xvc2VDdXJyZW50TW9kYWw7XG5mdW5jdGlvbiByZW5kZXJOYXZpZ2F0aW9uT3B0aW9ucygpIHtcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmF2aWdhdGlvbicpO1xuICAgIG5hdkl0ZW1zLm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coYCR7aW5kZXh9OiAke2l0ZW0udGV4dH1gKTtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICAgIGVsZW1lbnQudGV4dENvbnRlbnQgPSBpdGVtLnRleHQ7XG4gICAgICAgIGVsZW1lbnQub25jbGljayA9IGl0ZW0uYWN0aW9uO1xuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gICAgfSk7XG59XG5leHBvcnRzLnJlbmRlck5hdmlnYXRpb25PcHRpb25zID0gcmVuZGVyTmF2aWdhdGlvbk9wdGlvbnM7XG5mdW5jdGlvbiBhZGRNb2RhbENvbnRlbnQoaWQsIGNvbnRlbnQpIHtcbiAgICBjb25zdCBtb2RhbCA9IGdldE1vZGFsKGlkKTtcbiAgICBjb250ZW50Lm1hcCgoZWxlbWVudCwgaW5kZXgpID0+IHtcbiAgICAgICAgbW9kYWwuY29udGFpbmVyLmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICAgIH0pO1xuICAgIHJldHVybiBtb2RhbDtcbn1cbmV4cG9ydHMuYWRkTW9kYWxDb250ZW50ID0gYWRkTW9kYWxDb250ZW50O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBTUElOTkVSID0gXCI8ZGl2IGNsYXNzPSdzcGlubmVyJz48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PC9kaXY+XCI7XG5leHBvcnRzLmRlZmF1bHQgPSBTUElOTkVSO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL21haW4udHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=