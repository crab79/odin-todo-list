// Import necessary modules and resources
import "./style.scss";
import logoSrc from "../img/check-mark.png";
import { format, addDays } from "date-fns";
import {Todo, allTodo, importantTodo} from "./js/todo-function";
import {Project} from "./js/project";
import { sortingNext7Days, sortingToday } from "./js/sorting";


// Create header element
const header = document.querySelector("header");

// Create theme container
const div_theme = document.createElement("div");
div_theme.id = "div_theme";


// Create label for the switch
const label = document.createElement("label");
label.classList.add("switch");

// Create input element for the switch
const input = document.createElement("input");
input.setAttribute("type", "checkbox");

// Create span element for the slider
const span = document.createElement("span");
span.classList.add("slider");

// Append input and span elements to the label
label.appendChild(input);
label.appendChild(span);

// Append elements to the theme
div_theme.appendChild(label);

// Create logo container
const div_logo = document.createElement("div");
div_logo.id = "div_logo";

// Create logo image element
const logo = document.createElement("img");
logo.src = logoSrc;

// Create title element
const title = document.createElement("h1");
title.textContent = "Todoooo";
title.id = "title";

// Append logo and title elements to the logo container
div_logo.append(logo);
div_logo.append(title);

// Append the logo container to the header
header.append(div_logo);
header.append(div_theme);
