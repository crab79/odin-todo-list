import tabSrc from "../../img/Go Back.png";
import addSrc from "../../img/Plus.png";
import _7daysSrc from "../../img/Calendar 7.png";
import todaySrc from "../../img/Today.png";
import starSrc from "../../img/Star.png";
import addFolderSrc from "../../img/Add Folder.png"
import projectSrc from "../../img/Folder.png";
import menuSrc from "../../img/Menu.png";
import { right_part } from "./right-part";
import { Todo, allTodo, importantTodo, addTodoDialog, createTodo, createTodoInHtml, getTodoByTitle} from "./todo-function";
import { format, isToday, addDays, isWithinInterval } from "date-fns";

const sideBar = document.getElementById("side-bar");

const side_bar_area = () => {
    yourTodoList_area();
    project_area();
}

const yourTodoList_area = () => {
    //create
    const yourTodoList = document.createElement("div");
    const div_h1AndButton = document.createElement("div");
    const h1_todo_list = document.createElement("h1");
    const button_addTodo = document.createElement("button");
    const button_tabController = document.createElement("button");
    const button_today = document.createElement("button");
    const button_next7Days = document.createElement("button");
    const button_important = document.createElement("button");
    const img_button_tabController = document.createElement("img");
    const img_button_addTodo = document.createElement("img");
    const img_button_today = document.createElement("img");
    const img_button_next7Days = document.createElement("img");
    const img_button_important = document.createElement("img");
    const hr = document.createElement("hr");

    // setting id
    yourTodoList.id = "your-todo-list";
    div_h1AndButton.id = "h1AndButton";
    button_tabController.id = "tab-controller";
    //setting className
    button_addTodo.className = "addingSthButton";
    button_today.className = "tabButton";
    button_next7Days.className = "tabButton";
    button_important.className = "tabButton";

    //setting type
    button_tabController.type = "button";
    button_addTodo.type = "button";
    button_today.type = "button";
    button_next7Days.type = "button";
    button_important.type = "button";

    //setting src
    img_button_tabController.src = tabSrc;
    img_button_addTodo.src = addSrc;
    img_button_today.src = todaySrc;
    img_button_next7Days.src = _7daysSrc;
    img_button_important.src = starSrc;

    //setting textContent
    h1_todo_list.textContent = "Your Todo-list";
    button_addTodo.textContent = "Add To-do";
    button_today.textContent = "Today";
    button_next7Days.textContent = "Next 7 Days";
    button_important.textContent = "Important";

    //append
    button_today.prepend(img_button_today);
    button_next7Days.prepend(img_button_next7Days);
    button_important.prepend(img_button_important);
    button_addTodo.prepend(img_button_addTodo);
    button_tabController.prepend(img_button_tabController);
    div_h1AndButton.append(h1_todo_list);
    div_h1AndButton.append(button_tabController);
    yourTodoList.append(div_h1AndButton);
    yourTodoList.append(button_addTodo);
    yourTodoList.append(button_today);
    yourTodoList.append(button_next7Days);
    yourTodoList.append(button_important);
    sideBar.append(yourTodoList);
    sideBar.append(hr);

    //function
    button_tabController.addEventListener(('click'), function () {
        let content = document.getElementById('content');
        let right_part = document.getElementById('rightPart');
        if (content.contains(sideBar)) {
            content.removeChild(sideBar);
            content.appendChild(button_tabController);
            flipPic(img_button_tabController);
        } else {
            content.removeChild(button_tabController);
            content.removeChild(right_part);
            content.appendChild(sideBar);
            flipPic(img_button_tabController);
            div_h1AndButton.appendChild(button_tabController);
            content.appendChild(right_part);
        }
    });

    button_today.addEventListener('click', function () {
        let right_part = document.getElementById('rightPart');
        const allTodos = document.querySelectorAll('.aTodo');
        for (let i = 0; i < allTodo.length; i++) {
            if (!isToday(allTodo[i].dueDate)) {
                for (let todoElement of allTodos) {
                    const titleElement = todoElement.querySelector('.shortInfo h1');
                    if (titleElement && titleElement.textContent === allTodo[i].title && todoElement.style.display === 'none') {
                        todoElement.style.display = 'flex';
                    }else if (titleElement && titleElement.textContent === allTodo[i].title){
                        todoElement.style.display = 'none';
                    }
                }
            }
        }
    });

    button_next7Days.addEventListener('click', function () {
        let right_part = document.getElementById('rightPart');
        const allTodos = document.querySelectorAll('.aTodo');
        const today = format(new Date(), 'MM/dd/yyyy');
        const next7day = format(addDays(today, 7), 'MM/dd/yyyy');
        for (let i = 0; i < allTodo.length; i++) {
            if (!isWithinInterval(allTodo[i].dueDate, {start: today, end: next7day})) {
                for (let todoElement of allTodos) {
                    const titleElement = todoElement.querySelector('.shortInfo h1');
                    if (titleElement && titleElement.textContent === allTodo[i].title && todoElement.style.display === 'none') {
                        todoElement.style.display = 'flex';
                    }else if (titleElement && titleElement.textContent === allTodo[i].title){
                        todoElement.style.display = 'none';
                    }
                }
            }
        }
    });

    button_important.addEventListener('click', function () {
        let right_part = document.getElementById('rightPart');
        const allTodos = document.querySelectorAll('.aTodo');
        for (let i = 0; i < allTodo.length; i++) {
            if (allTodo[i].priority !== "Important") {
                for (let todoElement of allTodos) {
                    const titleElement = todoElement.querySelector('.shortInfo h1');
                    if (titleElement && titleElement.textContent === allTodo[i].title && todoElement.style.display === 'none') {
                        todoElement.style.display = 'flex';
                    }else if (titleElement && titleElement.textContent === allTodo[i].title){
                        todoElement.style.display = 'none';
                    }
                }
            }
        }
    })
    

    button_addTodo.addEventListener(('click'), addTodoDialog());

    function flipPic(img) {
        img.style.transform = img.style.transform === 'scaleX(-1)' ? 'scaleX(1)' : 'scaleX(-1)';
    }
}

const project_area = () => {
    //create
    const projects = document.createElement("div");
    const h1_project = document.createElement("h1");
    const button_addProject = document.createElement("button");
    const img_button_addProject = document.createElement("img");
    // setting id
    projects.id = "projects";

    //setting className
    button_addProject.className = "addingSthButton";

    //setting type
    button_addProject.type = "button";

    //setting src
    img_button_addProject.src = addFolderSrc;

    //setting textContent
    h1_project.textContent = "Projects";
    button_addProject.textContent = "Add Project";

    //project1 example
    const div_project1 = document.createElement("div");
    const button_project = document.createElement("button");
    const button_projectMenu = document.createElement("button");
    const img_button_project = document.createElement("img");
    const img_button_projectMenu = document.createElement("img");
    img_button_project.src = projectSrc;
    img_button_projectMenu.src = menuSrc;
    div_project1.className = "tabProject";
    button_project.textContent = "Project1";

    button_projectMenu.append(img_button_projectMenu);
    button_project.prepend(img_button_project);
    div_project1.append(button_project);
    div_project1.append(button_projectMenu);

    //append
    projects.append(h1_project);
    button_addProject.prepend(img_button_addProject);
    projects.append(button_addProject);
    projects.append(div_project1);
    sideBar.append(projects);


}

export { side_bar_area };
