// Import necessary modules and resources
import "./style.scss";
import { format, addDays, add } from "date-fns";
import { Todo, allTodo, turnAllTodoInHtml} from "./js/todo-function";
import { Project } from "./js/project";
import { sortingNext7Days, sortingToday } from "./js/sorting";
import { side_bar_area, addProjectDialog, createProject, createProjectInHtml ,showProjects} from "./js/side-bar-area";
import { header } from "./js/header";
import { right_part } from "./js/right-part";

header();
side_bar_area();
right_part();

showProjects();
turnAllTodoInHtml(allTodo);

