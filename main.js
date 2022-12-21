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
            if (project.name !== "catneep")
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
let COLORS = null;
function GetGithubColors() {
    return __awaiter(this, void 0, void 0, function* () {
        if (COLORS !== null)
            return COLORS;
        const json = (yield (0, Fetch_1.fetchJson)("https://raw.githubusercontent.com/ozh/github-colors/master/colors.json"));
        COLORS = json;
        return COLORS;
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
            if (url !== null && url !== "")
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixNQUFNLElBQUksVUFBVTtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsdUJBQXVCOzs7Ozs7Ozs7OztBQ3JFVjtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RDtBQUNBLGtCQUFlOzs7Ozs7O1VDSGY7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7OztVRXRCQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3BvcnRmb2xpby0zLy4vc3JjL21haW4udHMiLCJ3ZWJwYWNrOi8vcG9ydGZvbGlvLTMvLi9zcmMvbW9kZWxzL01vZGFscy50cyIsIndlYnBhY2s6Ly9wb3J0Zm9saW8tMy8uL3NyYy9tb2RlbHMvUHJvamVjdC50cyIsIndlYnBhY2s6Ly9wb3J0Zm9saW8tMy8uL3NyYy90b29scy9GZXRjaC50cyIsIndlYnBhY2s6Ly9wb3J0Zm9saW8tMy8uL3NyYy90b29scy9TdHlsaW5nLnRzIiwid2VicGFjazovL3BvcnRmb2xpby0zLy4vc3JjL3VpL1Byb2plY3RDYXJkLnRzIiwid2VicGFjazovL3BvcnRmb2xpby0zLy4vc3JjL3VpL1JlbmRlci50cyIsIndlYnBhY2s6Ly9wb3J0Zm9saW8tMy8uL3NyYy91aS9TcGlubmVyLnRzIiwid2VicGFjazovL3BvcnRmb2xpby0zL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3BvcnRmb2xpby0zL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vcG9ydGZvbGlvLTMvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3BvcnRmb2xpby0zL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgUHJvamVjdF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL21vZGVscy9Qcm9qZWN0XCIpKTtcbmNvbnN0IEZldGNoXzEgPSByZXF1aXJlKFwiLi90b29scy9GZXRjaFwiKTtcbmNvbnN0IFJlbmRlcl8xID0gcmVxdWlyZShcIi4vdWkvUmVuZGVyXCIpO1xuZnVuY3Rpb24gbWFpbigpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zdCBjbG9zZU1vZGFscyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2xvc2VNb2RhbFwiKTtcbiAgICAgICAgY2xvc2VNb2RhbHMub25jbGljayA9ICgpID0+ICgwLCBSZW5kZXJfMS5jbG9zZUN1cnJlbnRNb2RhbCkoKTtcbiAgICAgICAgKDAsIFJlbmRlcl8xLnJlbmRlck5hdmlnYXRpb25PcHRpb25zKSgpO1xuICAgICAgICBjb25zdCBwcm9qZWN0c1BhcmVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdHNcIik7XG4gICAgICAgIGNvbnN0IHByb2plY3RDb250YWluZXIgPSBwcm9qZWN0c1BhcmVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcIm1haW5cIilbMF07XG4gICAgICAgIGNvbnN0IHByb2plY3RzID0geWllbGQgKDAsIEZldGNoXzEuZ2V0UHJvamVjdHMpKCk7XG4gICAgICAgIHByb2plY3RzLm1hcCgocHJvamVjdF9kYXRhKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhwcm9qZWN0X2RhdGEpO1xuICAgICAgICAgICAgY29uc3QgcHJvamVjdCA9IG5ldyBQcm9qZWN0XzEuZGVmYXVsdChwcm9qZWN0X2RhdGEpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJjcmVhdGVkIFByb2plY3Q6XCIsIHByb2plY3QpO1xuICAgICAgICAgICAgaWYgKHByb2plY3QubmFtZSAhPT0gXCJjYXRuZWVwXCIpXG4gICAgICAgICAgICAgICAgcHJvamVjdC5kcmF3U3Vic2NyaWJlcnMoe1xuICAgICAgICAgICAgICAgICAgICBjb250YWluZXI6IHByb2plY3RDb250YWluZXIsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxubWFpbigpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jbGFzcyBNb2RhbCB7XG4gICAgY29uc3RydWN0b3IoY29udGFpbmVyKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuICAgICAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcbiAgICB9XG4gICAgdG9nZ2xlKCkge1xuICAgICAgICB0aGlzLnZpc2libGUgPSB0aGlzLmNvbnRhaW5lci5jbGFzc0xpc3QudG9nZ2xlKFwidmlzaWJsZVwiKTtcbiAgICAgICAgcmV0dXJuIHRoaXMudmlzaWJsZTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBNb2RhbDtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBGZXRjaF8xID0gcmVxdWlyZShcIi4uL3Rvb2xzL0ZldGNoXCIpO1xuY29uc3QgUHJvamVjdENhcmRfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi4vdWkvUHJvamVjdENhcmRcIikpO1xuY2xhc3MgUHJvamVjdCB7XG4gICAgbm90aWZ5U3Vic2NyaWJlcnMoKSB7XG4gICAgICAgIHRoaXMuc3Vic2NyaWJlcnMubWFwKChzKSA9PiBzLnVwZGF0ZSgpKTtcbiAgICB9XG4gICAgY29uc3RydWN0b3IoZGF0YSkge1xuICAgICAgICB0aGlzLm5hbWUgPSBkYXRhLm5hbWU7XG4gICAgICAgIHRoaXMudXJsID0gZGF0YS5odG1sX3VybDtcbiAgICAgICAgdGhpcy5ob21lcGFnZSA9IGRhdGEuaG9tZXBhZ2U7XG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkYXRhLmRlc2NyaXB0aW9uO1xuICAgICAgICB0aGlzLmxhbmd1YWdlcyA9IHt9O1xuICAgICAgICB0aGlzLnN1YnNjcmliZXJzID0gW107XG4gICAgICAgIHRoaXMuc3Vic2NyaWJlcnMucHVzaChuZXcgUHJvamVjdENhcmRfMS5kZWZhdWx0KHRoaXMpKTtcbiAgICAgICAgdGhpcy51cGRhdGVMYW5ndWFnZXMoZGF0YS5sYW5ndWFnZXNfdXJsKTtcbiAgICB9XG4gICAgdXBkYXRlTGFuZ3VhZ2VzKHVybCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgdGhpcy5sYW5ndWFnZXMgPSB5aWVsZCAoMCwgRmV0Y2hfMS5mZXRjaEpzb24pKHVybCk7XG4gICAgICAgICAgICB0aGlzLm5vdGlmeVN1YnNjcmliZXJzKCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZldGNoZWQgbGFuZ2F1Z2UgZGF0YVwiLCB0aGlzLmxhbmd1YWdlcyk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBhZGRTdWJzY3JpYmVyKHMpIHtcbiAgICAgICAgdGhpcy5zdWJzY3JpYmVycy5wdXNoKHMpO1xuICAgICAgICBzLnVwZGF0ZSgpO1xuICAgIH1cbiAgICBkcmF3U3Vic2NyaWJlcnMoeyBjb250YWluZXIgfSkge1xuICAgICAgICBjb25zdCBlbGVtZW50cyA9IHRoaXMuc3Vic2NyaWJlcnM7XG4gICAgICAgIGVsZW1lbnRzLm1hcCgoZSkgPT4gZS5kcmF3SHRtbChjb250YWluZXIpKTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBQcm9qZWN0O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZ2V0UHJvamVjdHMgPSBleHBvcnRzLmZldGNoSnNvbiA9IGV4cG9ydHMuZmV0Y2hUZXh0ID0gdm9pZCAwO1xuZnVuY3Rpb24gZmV0Y2hUZXh0KHVybCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGxldCB0ZXh0ID0gXCJcIjtcbiAgICAgICAgeWllbGQgZmV0Y2godXJsKVxuICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS50ZXh0KCkpXG4gICAgICAgICAgICAudGhlbigocmVzcG9uc2VKc29uKSA9PiB7XG4gICAgICAgICAgICB0ZXh0ID0gcmVzcG9uc2VKc29uO1xuICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciByZXRyaWV2aW5nIHByb2plY3QgZGF0YS5cIiwgZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRleHQ7XG4gICAgfSk7XG59XG5leHBvcnRzLmZldGNoVGV4dCA9IGZldGNoVGV4dDtcbmZ1bmN0aW9uIGZldGNoSnNvbih1cmwpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBsZXQganNvbiA9IHt9O1xuICAgICAgICB5aWVsZCBmZXRjaCh1cmwpXG4gICAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgICAgICAgIC50aGVuKChyZXNwb25zZUpzb24pID0+IHtcbiAgICAgICAgICAgIGpzb24gPSByZXNwb25zZUpzb247XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIHJldHJpZXZpbmcgcHJvamVjdCBkYXRhLlwiLCBlcnJvcik7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4ganNvbjtcbiAgICB9KTtcbn1cbmV4cG9ydHMuZmV0Y2hKc29uID0gZmV0Y2hKc29uO1xuZnVuY3Rpb24gZ2V0UHJvamVjdHMoKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgcmV0dXJuICh5aWVsZCBmZXRjaEpzb24oXCJodHRwczovL2FwaS5naXRodWIuY29tL3VzZXJzL2NhdG5lZXAvcmVwb3NcIikpO1xuICAgIH0pO1xufVxuZXhwb3J0cy5nZXRQcm9qZWN0cyA9IGdldFByb2plY3RzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZ2V0TGFuZ3VhZ2VDb2xvciA9IHZvaWQgMDtcbmNvbnN0IEZldGNoXzEgPSByZXF1aXJlKFwiLi9GZXRjaFwiKTtcbmxldCBDT0xPUlMgPSBudWxsO1xuZnVuY3Rpb24gR2V0R2l0aHViQ29sb3JzKCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGlmIChDT0xPUlMgIT09IG51bGwpXG4gICAgICAgICAgICByZXR1cm4gQ09MT1JTO1xuICAgICAgICBjb25zdCBqc29uID0gKHlpZWxkICgwLCBGZXRjaF8xLmZldGNoSnNvbikoXCJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vb3poL2dpdGh1Yi1jb2xvcnMvbWFzdGVyL2NvbG9ycy5qc29uXCIpKTtcbiAgICAgICAgQ09MT1JTID0ganNvbjtcbiAgICAgICAgcmV0dXJuIENPTE9SUztcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGdldExhbmd1YWdlQ29sb3IobGFuZ3VhZ2UgPSBcIlwiKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc3QgY29sb3JzID0geWllbGQgR2V0R2l0aHViQ29sb3JzKCk7XG4gICAgICAgIGlmIChsYW5ndWFnZSBpbiBjb2xvcnMpIHtcbiAgICAgICAgICAgIHJldHVybiBjb2xvcnNbbGFuZ3VhZ2VdLmNvbG9yO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGxldHRlcnMgPSBcIjAxMjM0NTY3ODlBQkNERUZcIjtcbiAgICAgICAgbGV0IGNvbG9yID0gXCIjXCI7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNjsgaSsrKSB7XG4gICAgICAgICAgICBjb2xvciArPSBsZXR0ZXJzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDE2KV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbG9yO1xuICAgIH0pO1xufVxuZXhwb3J0cy5nZXRMYW5ndWFnZUNvbG9yID0gZ2V0TGFuZ3VhZ2VDb2xvcjtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgU3R5bGluZ18xID0gcmVxdWlyZShcIi4uL3Rvb2xzL1N0eWxpbmdcIik7XG5jb25zdCBTcGlubmVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vU3Bpbm5lclwiKSk7XG5jbGFzcyBQcm9qZWN0Q2FyZCB7XG4gICAgY29uc3RydWN0b3IocHJvamVjdCkge1xuICAgICAgICB0aGlzLnByb2plY3QgPSBwcm9qZWN0O1xuICAgICAgICB0aGlzLmh0bWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICB0aGlzLmh0bWwuaWQgPSBwcm9qZWN0Lm5hbWU7XG4gICAgICAgIHRoaXMuaHRtbC5jbGFzc0xpc3QuYWRkKFwicHJvamVjdC1jYXJkXCIpO1xuICAgICAgICB0aGlzLmJ1aWxkTWFya3VwKCk7XG4gICAgfVxuICAgIGdldFRlY2hQZXJjZW50YWdlcyh0ZWNoKSB7XG4gICAgICAgIGNvbnN0IHN1bVRlY2hWYWx1ZXMgPSAob2JqKSA9PiBPYmplY3QudmFsdWVzKG9iaikucmVkdWNlKChhLCBiKSA9PiBhICsgYiwgMCk7XG4gICAgICAgIGNvbnN0IHBlcmNlbnRhZ2VzID0gW107XG4gICAgICAgIGNvbnN0IHRvdGFsID0gc3VtVGVjaFZhbHVlcyh0ZWNoKTtcbiAgICAgICAgT2JqZWN0LmtleXModGVjaCkubWFwKChrZXksIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBsYW5nYXVnZV9saW5lcyA9IE9iamVjdC52YWx1ZXModGVjaClbaW5kZXhdO1xuICAgICAgICAgICAgY29uc3QgcGVyY2VudCA9ICgobGFuZ2F1Z2VfbGluZXMgKiAxMDApIC8gdG90YWwpLnRvRml4ZWQoMik7XG4gICAgICAgICAgICBwZXJjZW50YWdlcy5wdXNoKHsgbmFtZToga2V5LCBwZXJjZW50OiBwZXJjZW50IH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHBlcmNlbnRhZ2VzO1xuICAgIH1cbiAgICBidWlsZExpc3RFbGVtZW50KHVsLCBwZXJjZW50YWdlcykge1xuICAgICAgICBwZXJjZW50YWdlcy5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICAgICAgICAgICAgbGkuc3R5bGUud2lkdGggPSBgJHtpdGVtLnBlcmNlbnR9JWA7XG4gICAgICAgICAgICBsaS50ZXh0Q29udGVudCA9IGAke2l0ZW0ubmFtZX06ICR7aXRlbS5wZXJjZW50fSVgO1xuICAgICAgICAgICAgKDAsIFN0eWxpbmdfMS5nZXRMYW5ndWFnZUNvbG9yKShpdGVtLm5hbWUpLnRoZW4oKHJlc3BvbnNlKSA9PiAobGkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gcmVzcG9uc2UpKTtcbiAgICAgICAgICAgIHVsLmFwcGVuZENoaWxkKGxpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJQcm9qZWN0IGNhcmQgdXBkYXRlZFwiKTtcbiAgICAgICAgY29uc3QgZG9jX2h0bWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmh0bWwuaWQpO1xuICAgICAgICBjb25zdCB0ZWNoX2NvbnRhaW5lciA9IGRvY19odG1sLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiZm9vdGVyXCIpWzBdO1xuICAgICAgICB0ZWNoX2NvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICBjb25zdCB1bCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKTtcbiAgICAgICAgY29uc3QgcGVyY2VudGFnZXMgPSB0aGlzLmdldFRlY2hQZXJjZW50YWdlcyh0aGlzLnByb2plY3QubGFuZ3VhZ2VzKTtcbiAgICAgICAgdGhpcy5idWlsZExpc3RFbGVtZW50KHVsLCBwZXJjZW50YWdlcyk7XG4gICAgICAgIHRlY2hfY29udGFpbmVyLmFwcGVuZENoaWxkKHVsKTtcbiAgICB9XG4gICAgYnVpbGRNYXJrdXAoKSB7XG4gICAgICAgIGNvbnN0IHN0cnVjdHVyZSA9IFtcbiAgICAgICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoZWFkZXJcIiksXG4gICAgICAgICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKSxcbiAgICAgICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb290ZXJcIiksXG4gICAgICAgIF07XG4gICAgICAgIHN0cnVjdHVyZS5tYXAoKGVsZW1lbnQpID0+IHRoaXMuaHRtbC5hcHBlbmRDaGlsZChlbGVtZW50KSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBhZGRUaXRsZSh0aXRsZSkge1xuICAgICAgICBjb25zdCBoZWFkZXIgPSB0aGlzLmh0bWwuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkZXJcIilbMF07XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gdGl0bGU7XG4gICAgICAgIGhlYWRlci5hcHBlbmRDaGlsZChjb250YWluZXIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgYWRkRGVzY3JpcHRpb24oZGVzY3JpcHRpb24pIHtcbiAgICAgICAgY29uc3QgYm9keSA9IHRoaXMuaHRtbC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNlY3Rpb25cIilbMF07XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gZGVzY3JpcHRpb247XG4gICAgICAgIGJvZHkuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGFkZEV4dGVybmFsTGlua3MocmVwbywgaG9tZXBhZ2UpIHtcbiAgICAgICAgY29uc3QgaGVhZGVyID0gdGhpcy5odG1sLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZGVyXCIpWzBdO1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICAgICAgW2hvbWVwYWdlLCByZXBvXS5tYXAoKHVybCwgaSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICAgICAgICAgICAgaWNvbi5ocmVmID0gdXJsO1xuICAgICAgICAgICAgaWNvbi50YXJnZXQgPSBcIl9ibGFua1wiO1xuICAgICAgICAgICAgaSAlIDIgPT09IDAgPyAoaWNvbi5pbm5lckhUTUwgPSBcIvCfjJBcIikgOiAoaWNvbi5pbm5lckhUTUwgPSBcIvCfkrtcIik7XG4gICAgICAgICAgICBpZiAodXJsICE9PSBudWxsICYmIHVybCAhPT0gXCJcIilcbiAgICAgICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoaWNvbik7XG4gICAgICAgIH0pO1xuICAgICAgICBoZWFkZXIuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGFkZFRlY2hTdGFjayhzdGFjayA9IHt9KSB7XG4gICAgICAgIGNvbnN0IGZvb3RlciA9IHRoaXMuaHRtbC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImZvb3RlclwiKVswXTtcbiAgICAgICAgZm9vdGVyLmlubmVySFRNTCA9IFNwaW5uZXJfMS5kZWZhdWx0O1xuICAgICAgICB0aGlzLmh0bWwuYXBwZW5kQ2hpbGQoZm9vdGVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGZpbGxEYXRhKCkge1xuICAgICAgICB0aGlzLmFkZFRpdGxlKHRoaXMucHJvamVjdC5uYW1lKVxuICAgICAgICAgICAgLmFkZEV4dGVybmFsTGlua3ModGhpcy5wcm9qZWN0LnVybCwgdGhpcy5wcm9qZWN0LmhvbWVwYWdlKVxuICAgICAgICAgICAgLmFkZERlc2NyaXB0aW9uKHRoaXMucHJvamVjdC5kZXNjcmlwdGlvbilcbiAgICAgICAgICAgIC5hZGRUZWNoU3RhY2soKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGRyYXdIdG1sKGNvbnRhaW5lcikge1xuICAgICAgICB0aGlzLmZpbGxEYXRhKCk7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmh0bWwpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBQcm9qZWN0Q2FyZDtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5hZGRNb2RhbENvbnRlbnQgPSBleHBvcnRzLnJlbmRlck5hdmlnYXRpb25PcHRpb25zID0gZXhwb3J0cy5jbG9zZUN1cnJlbnRNb2RhbCA9IHZvaWQgMDtcbmNvbnN0IE1vZGFsc18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuLi9tb2RlbHMvTW9kYWxzXCIpKTtcbmZ1bmN0aW9uIGdldE1vZGFsKGlkKSB7XG4gICAgcmV0dXJuIG5ldyBNb2RhbHNfMS5kZWZhdWx0KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKSk7XG59XG5jb25zdCBNT0RBTFMgPSB7XG4gICAgJ3Byb2plY3RzJzogZ2V0TW9kYWwoJ3Byb2plY3RzJyksXG4gICAgJ2Fib3V0JzogZ2V0TW9kYWwoJ2Fib3V0JyksXG4gICAgJ2NvbnRhY3QnOiBnZXRNb2RhbCgnY29udGFjdCcpLFxufTtcbmNvbnN0IG5hdkl0ZW1zID0gW1xuICAgIHtcbiAgICAgICAgdGV4dDogJ1Byb2plY3RzJyxcbiAgICAgICAgbW9kYWw6IE1PREFMU1sncHJvamVjdHMnXSxcbiAgICAgICAgYWN0aW9uOiAoKSA9PiB7XG4gICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICBNT0RBTFNbJ3Byb2plY3RzJ10udG9nZ2xlKCk7XG4gICAgICAgICAgICAoX2EgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWwnKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNsYXNzTGlzdC50b2dnbGUoJ3Zpc2libGUnKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICB0ZXh0OiAnQWJvdXQnLFxuICAgICAgICBtb2RhbDogTU9EQUxTWydhYm91dCddLFxuICAgICAgICBhY3Rpb246ICgpID0+IHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIE1PREFMU1snYWJvdXQnXS50b2dnbGUoKTtcbiAgICAgICAgICAgIChfYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbCcpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY2xhc3NMaXN0LnRvZ2dsZSgndmlzaWJsZScpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIHRleHQ6ICdDb250YWN0JyxcbiAgICAgICAgbW9kYWw6IE1PREFMU1snY29udGFjdCddLFxuICAgICAgICBhY3Rpb246ICgpID0+IHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIE1PREFMU1snY29udGFjdCddLnRvZ2dsZSgpO1xuICAgICAgICAgICAgKF9hID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsJykpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jbGFzc0xpc3QudG9nZ2xlKCd2aXNpYmxlJyk7XG4gICAgICAgIH1cbiAgICB9LFxuXTtcbmZ1bmN0aW9uIGNsb3NlQ3VycmVudE1vZGFsKCkge1xuICAgIG5hdkl0ZW1zLm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgaWYgKGl0ZW0ubW9kYWwudmlzaWJsZSlcbiAgICAgICAgICAgIGl0ZW0uYWN0aW9uKCk7XG4gICAgfSk7XG59XG5leHBvcnRzLmNsb3NlQ3VycmVudE1vZGFsID0gY2xvc2VDdXJyZW50TW9kYWw7XG5mdW5jdGlvbiByZW5kZXJOYXZpZ2F0aW9uT3B0aW9ucygpIHtcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmF2aWdhdGlvbicpO1xuICAgIG5hdkl0ZW1zLm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coYCR7aW5kZXh9OiAke2l0ZW0udGV4dH1gKTtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICAgIGVsZW1lbnQudGV4dENvbnRlbnQgPSBpdGVtLnRleHQ7XG4gICAgICAgIGVsZW1lbnQub25jbGljayA9IGl0ZW0uYWN0aW9uO1xuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gICAgfSk7XG59XG5leHBvcnRzLnJlbmRlck5hdmlnYXRpb25PcHRpb25zID0gcmVuZGVyTmF2aWdhdGlvbk9wdGlvbnM7XG5mdW5jdGlvbiBhZGRNb2RhbENvbnRlbnQoaWQsIGNvbnRlbnQpIHtcbiAgICBjb25zdCBtb2RhbCA9IGdldE1vZGFsKGlkKTtcbiAgICBjb250ZW50Lm1hcCgoZWxlbWVudCwgaW5kZXgpID0+IHtcbiAgICAgICAgbW9kYWwuY29udGFpbmVyLmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICAgIH0pO1xuICAgIHJldHVybiBtb2RhbDtcbn1cbmV4cG9ydHMuYWRkTW9kYWxDb250ZW50ID0gYWRkTW9kYWxDb250ZW50O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBTUElOTkVSID0gXCI8ZGl2IGNsYXNzPSdzcGlubmVyJz48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PC9kaXY+XCI7XG5leHBvcnRzLmRlZmF1bHQgPSBTUElOTkVSO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL21haW4udHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=