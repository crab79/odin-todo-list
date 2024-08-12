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
        let allTodo = [];
    
        // Collect all to-dos from localStorage except the "projects" item
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key === "projects") continue;
    
            const value = JSON.parse(localStorage.getItem(key));
            allTodo.push(value);
        }
        
        const allTodos = document.querySelectorAll('.aTodo');
        
        // Iterate through all to-dos
        allTodos.forEach(todoElement => {
            const titleElement = todoElement.querySelector('.shortInfo h1');
            if (!titleElement) return;
    
            const todoItem = allTodo.find(todo => todo.title === titleElement.textContent);
            
            if (todoItem && isToday(todoItem.dueDate)) {
                // Show the to-do if its due date is today
                todoElement.style.display = 'flex';
            } else {
                // Hide the to-do if its due date is not today
                todoElement.style.display = 'none';
            }
        });
    });

    button_next7Days.addEventListener('click', function () {
        let allTodo = [];
        // Collect all to-dos from localStorage except the "projects" item
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key === "projects") continue;
    
            const value = JSON.parse(localStorage.getItem(key));
            allTodo.push(value);
        }
    
        const allTodos = document.querySelectorAll('.aTodo');
        const today = new Date();
        const next7day = addDays(today, 7);
    
        // Iterate over allTodo and check if dueDate is within the next 7 days
        allTodos.forEach(todoElement => {
            const titleElement = todoElement.querySelector('.shortInfo h1');
            if (!titleElement) return;
    
            const todoItem = allTodo.find(todo => todo.title === titleElement.textContent);
    
            if (todoItem && isWithinInterval(todoItem.dueDate, {start: today, end: next7day}))
            {
                // Show the to-do if it's due within the next 7 days
                todoElement.style.display = 'flex';
            } else {
                // Hide the to-do if it's not due within the next 7 days
                todoElement.style.display = 'none';
            }
        });
    });

    button_important.addEventListener('click', function () {
        let allTodo = [];

        // Collect all to-dos from localStorage except the "projects" item
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key === "projects") continue;
        
            const value = JSON.parse(localStorage.getItem(key));
            allTodo.push(value);
        }
        
        const allTodos = document.querySelectorAll('.aTodo');
        
        // Iterate over the DOM elements and toggle visibility based on priority
        allTodos.forEach(todoElement => {
            const titleElement = todoElement.querySelector('.shortInfo h1');
            if (!titleElement) return;
        
            const todoItem = allTodo.find(todo => todo.title === titleElement.textContent);
        
            if (todoItem && todoItem.priority === "Important") {
                // Show the to-do if its priority is "Important"
                todoElement.style.display = 'flex';
            } else {
                // Hide the to-do if its priority is not "Important"
                todoElement.style.display = 'none';
            }
        });
        
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
    const div_project = document.createElement("div");
    const button_project = document.createElement("button");
    const button_projectMenu = document.createElement("button");
    const img_button_project = document.createElement("img");
    const img_button_projectMenu = document.createElement("img");
    img_button_project.src = projectSrc;
    img_button_projectMenu.src = menuSrc;
    div_project.className = "tabProject";
    button_project.textContent = "All";
    let title = button_project.textContent;

    button_projectMenu.className = 'setting';

    button_projectMenu.append(img_button_projectMenu);
    button_project.prepend(img_button_project);
    div_project.append(button_project);
    div_project.append(button_projectMenu);

    //append
    projects.append(h1_project);
    button_addProject.prepend(img_button_addProject);
    projects.append(button_addProject);
    projects.append(div_project);
    sideBar.append(projects);

    button_addProject.addEventListener('click', function(){
        addProjectDialog();
    })

    button_projectMenu.addEventListener('click', function(){
        editProject(title, div_project);
    })

    div_project.addEventListener('click', function(){
        const allTodos = document.querySelectorAll('.aTodo');
        for (let todoElement of allTodos) {
            todoElement.style.display = 'flex';
        }
    })

}

function addProjectDialog() {
    const dialog = document.getElementById("anProjectDialog");
    const closeButton = dialog.querySelector("button[value='cancel']");
    const confirmBtn = dialog.querySelector("button[value='default']");

    dialog.showModal();

    closeButton.addEventListener("click", () => {
        document.getElementById('project-title').value = '';
        dialog.close();
    });

    confirmBtn.addEventListener("click", (event) => {
        event.preventDefault();
        createProject();
        dialog.close();
    });
}

function createProject() {
    const title = document.getElementById("project-title").value;

    if (title.trim() === "") return; // Prevent creating empty projects

    // Store the project title in localStorage
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    projects.push(title);
    localStorage.setItem('projects', JSON.stringify(projects));

    // Create the project in the HTML
    createProjectInHtml(title);

    // Clear the form
    document.getElementById("anProjectDialog").querySelector("form").reset();
}

function createProjectInHtml(title) {
    const projects = document.getElementById('projects');
    const div_project = document.createElement("div");
    const button_project = document.createElement("button");
    const button_projectMenu = document.createElement("button");
    const img_button_project = document.createElement("img");
    const img_button_projectMenu = document.createElement("img");

    button_projectMenu.className = 'setting';

    img_button_project.src = projectSrc;
    img_button_projectMenu.src = menuSrc;
    div_project.className = "tabProject";
    button_project.textContent = title;

    button_projectMenu.append(img_button_projectMenu);
    button_project.prepend(img_button_project);
    div_project.append(button_project, button_projectMenu);
    projects.append(div_project);

    button_projectMenu.addEventListener('click', function () {
        editProject(title, div_project);
    });

    div_project.addEventListener('click', function(){
        project_directory(title);
    });

}

function showProjects(){
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key === 'projects') {
            let value = localStorage.getItem(key); // Get the value from localStorage
    
            // Clean up the value by removing quotes, square brackets, and spaces
            value = value.replace(/[\[\]"]/g, ''); // Remove [ ] "
            
            const projects = value.split(','); // Split the string into an array
    
            projects.forEach(project => {
                const title = project.trim(); // Trim to remove any extra spaces
                createProjectInHtml(project);
            });
        }
    }
}

function editProject(projectName, project){
    const dialog = document.getElementById("editProjectDialog");
    const closeButton = dialog.querySelector("button[value='cancel']");
    const deleteButton = dialog.querySelector("button[value='delete']");
    const confirmBtn = dialog.querySelector("button[value='default']");
    const input_value = document.getElementById('edit-project-title');
    input_value.value = projectName;

    dialog.showModal();

    deleteButton.addEventListener('click', () => {
        const projectsContainer = document.getElementById('projects');
    
        let ls_projects = localStorage.getItem('projects');
    
        if (ls_projects) {
            ls_projects = JSON.parse(ls_projects);
    
            const projectIndex = ls_projects.findIndex(project => project === projectName);

            if (projectIndex !== -1) {
                // Remove the project from the array
                ls_projects.splice(projectIndex, 1);

                // Save the updated projects array back to localStorage
                localStorage.setItem('projects', JSON.stringify(ls_projects));
            }
        }
    
        projectsContainer.removeChild(project);
    });
    

    closeButton.addEventListener("click", () => {
        document.getElementById('project-title').value = '';
        dialog.close();
    });

    confirmBtn.addEventListener("click", (event) => {
        event.preventDefault();
    
        const newTitle = document.getElementById('edit-project-title').value;
        let ls_projects = localStorage.getItem('projects');
        let allTodo = [];
    
        // Collect all to-dos from localStorage except the "projects" item
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key === "projects") continue;
    
            const value = JSON.parse(localStorage.getItem(key));
            allTodo.push(value);
        }
    
        if (ls_projects) {
            ls_projects = JSON.parse(ls_projects);
            
            // Assuming projectName is defined elsewhere in your code
            const projectIndex = ls_projects.findIndex(ls_project => ls_project === projectName);
    
            if (projectIndex !== -1) {
                // Update the title in the projects array
                ls_projects[projectIndex] = newTitle;
    
                // Save the updated projects array back to localStorage
                localStorage.setItem('projects', JSON.stringify(ls_projects));
    
                // Update the title in the DOM (if it exists)
                if (project) {
                    project.querySelector('button').textContent = newTitle;
                }
    
                // Update all to-dos that are associated with the old project name
                allTodo.forEach(todo => {
                    if (todo.project === projectName) {
                        todo.project = newTitle;
                        // Save the updated to-do back to localStorage
                        localStorage.setItem(todo.title, JSON.stringify(todo));
                    }
                });
            }
        }
    
        dialog.close();
        location.reload();
    });
    
}

function project_directory(title) {
    const allTodos = document.querySelectorAll('.aTodo');
    let allTodo = [];

    // Collect all to-dos from localStorage except the "projects" item
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key === "projects") continue;

        const value = JSON.parse(localStorage.getItem(key));
        allTodo.push(value);
    }

    // Filter and display to-dos based on the project title
    for (let todoElement of allTodos) {
        const titleElement = todoElement.querySelector('.shortInfo h1');
        if (!titleElement) continue;

        const todoItem = allTodo.find(todo => todo.title === titleElement.textContent);
        if (todoItem) {
            if (todoItem.project === title) {
                todoElement.style.display = 'flex';  // Show the to-do if it matches the project
            } else {
                todoElement.style.display = 'none';  // Hide the to-do if it doesn't match the project
            }
        }
    }
}

export { side_bar_area, addProjectDialog, createProject , createProjectInHtml, showProjects};
