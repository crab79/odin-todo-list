import { format } from "date-fns";
import infoSrc from "../../img/Info.png";
import editSrc from "../../img/Edit.png";
import deleteSrc from "../../img/Close.png";
import checkSrc from "../../img/Tick Box.png";
import { right_part } from "./right-part";

const allTodo = [];
const importantTodo = [];


class Todo {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = format(dueDate, "MM/dd/yyyy");
        this.priority = priority;
        this.checked = false;
        allTodo.push(this);
    }
}

function addTodoDialog() {
    const dialog = document.getElementById("anTodoDialog");
    const button_addTodo = document.querySelector(".addingSthButton");
    const closeButton = dialog.querySelector("button[value='cancel']");
    const confirmBtn = document.getElementById("confirmBtn");

    button_addTodo.addEventListener('click', function () {
        dialog.showModal();
    });

    closeButton.addEventListener("click", () => {
        document.getElementById('todo-title').value = '';
        document.getElementById('todo-due-date').value = '';
        document.getElementById('todo-priority-level').value = '';
        document.getElementById('todo-Context').value = '';
        dialog.close();
    });

    confirmBtn.addEventListener("click", (event) => {
        event.preventDefault();
        createTodo();
        dialog.close();
    });
}

function createTodo() {
    const title = document.getElementById("todo-title").value;
    const dueDate = document.getElementById("todo-due-date").value;
    const priority = document.getElementById("todo-priority-level").value;
    const description = document.getElementById("todo-Context").value;

    // Create a new Todo object, store it in localStorage
    const newTodo = new Todo(title, description, new Date(dueDate), priority);
    localStorage.setItem(newTodo.title, JSON.stringify(newTodo));

    //create a new Todo object, show it in the right part
    createTodoInHtml(newTodo);

    // Clear the form
    document.getElementById("anTodoDialog").querySelector("form").reset();
}

function createTodoInHtml(newTodo) {
    const content = document.getElementById("content");
    const rightPart = document.getElementById("rightPart");
    const div_todo = document.createElement("div");
    const div_colorSign = document.createElement("div");
    const div_h1AndH3 = document.createElement("div");
    const div_todoSetting = document.createElement("div");
    const h1_title = document.createElement("h1");
    const h3_dueDate = document.createElement("h3");
    const p_details = document.createElement("p");
    const p_edit = document.createElement("p");
    const p_delete = document.createElement("p");
    const div_details = document.createElement("div");
    const div_edit = document.createElement("div");
    const div_delete = document.createElement("div");
    const div_checkbox = document.createElement("div");
    const img_details = document.createElement("img");
    const img_edit = document.createElement("img");
    const img_delete = document.createElement("img");
    const img_check = document.createElement("img");

    //setting src
    img_details.src = infoSrc;
    img_edit.src = editSrc;
    img_delete.src = deleteSrc;
    img_check.src = checkSrc;

    //setting class
    div_todo.className = "aTodo";
    div_colorSign.className = "colorSign";
    div_h1AndH3.className = "shortInfo";
    div_todoSetting.className = "todoSetting";
    div_checkbox.className = "checkbox"
    div_delete.className = "setting";
    div_details.className = "setting";
    div_edit.className = "setting";

    //setting textcontent
    h1_title.textContent = newTodo.title;
    h3_dueDate.textContent = newTodo.dueDate;
    p_details.textContent = "Details";
    p_edit.textContent = "Edit";
    p_delete.textContent = "Delete";
    if (newTodo.checked) {
        div_checkbox.classList.add('checked');
    }
    //setting colorSign's color
    decideColorSign(newTodo, div_colorSign);

    //append
    div_checkbox.append(img_check);
    div_delete.append(img_delete, p_delete);
    div_details.append(img_details, p_details);
    //div_edit.append(img_edit, p_edit);
    div_todoSetting.append(div_details, div_edit, div_delete);
    div_h1AndH3.append(h1_title, h3_dueDate);
    div_todo.append(div_colorSign);
    div_todo.append(div_h1AndH3);
    div_todo.append(div_todoSetting);
    div_todo.append(div_checkbox);
    rightPart.append(div_todo);
    content.append(rightPart);

    div_delete.addEventListener('click', function () {
        deleteAnTodo(h1_title.textContent);
        rightPart.removeChild(div_todo);
    });
    div_details.addEventListener('click', function () {
        EditDialog(h1_title.textContent);
    });
    div_checkbox.addEventListener('click', function () {
        const todo = getTodoByTitle(newTodo.title);
        if (todo.checked == false) {
            this.classList.toggle('checked');
            todo.checked = true;
        } else {
            this.classList.toggle('checked');
            todo.checked = false;
        }
        // Update localStorage
        localStorage.setItem(todo.title, JSON.stringify(todo));
    });
}

function decideColorSign(newTodo, div_colorSign) {
    if (newTodo.priority == "Important") {
        div_colorSign.style.backgroundColor = '#cf3333';
    } else if (newTodo.priority == "Normal") {
        div_colorSign.style.backgroundColor = '#cfa833';
    } else if (newTodo.priority == "Trivia") {
        div_colorSign.style.backgroundColor = '#6ccf33';
    }

}

function turnAllTodoInHtml(allTodo) {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = JSON.parse(localStorage.getItem(key));
        allTodo[i] = value;
        createTodoInHtml(value);
    }
    return allTodo;
}

function deleteAnTodo(h1_title) {
    localStorage.removeItem(h1_title);
}

function EditDialog(todoTitle) {
    const todo = getTodoByTitle(todoTitle);
    if (todo) {
        document.getElementById('todo-title').value = todo.title;
        document.getElementById('todo-due-date').value = format(new Date(todo.dueDate), "yyyy-MM-dd");
        const prioritySelect = document.getElementById('todo-priority-level');
        for (let i = 0; i < prioritySelect.options.length; i++) {
            if (prioritySelect.options[i].value === todo.priority) {
                prioritySelect.selectedIndex = i;
                break;
            }
        }
        document.getElementById('todo-Context').value = todo.description;

        // Open the dialog
        document.getElementById('anTodoDialog').showModal();

        // Remove any existing event listener
        const confirmBtn = document.getElementById('confirmBtn');
        const newConfirmBtn = confirmBtn.cloneNode(true);
        confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);

        // Add new event listener
        newConfirmBtn.addEventListener('click', function () {
            updateTodo(todoTitle);
            document.getElementById('anTodoDialog').close();
        });
    } else {
        console.log('Todo not found');
    }
}

function updateTodo(oldTitle) {
    const todo = getTodoByTitle(oldTitle);
    const title = document.getElementById('todo-title').value;
    const dueDate = document.getElementById('todo-due-date').value;
    const priority = document.getElementById('todo-priority-level').value;
    const description = document.getElementById('todo-Context').value;
    const checked = todo.checked;

    // Update localStorage
    localStorage.removeItem(oldTitle);
    const updatedTodo = new Todo(title, description, new Date(dueDate), priority);
    updatedTodo.checked = checked; // Preserve the checked status
    localStorage.setItem(title, JSON.stringify(updatedTodo));

    // Update HTML
    updateTodoInHtml(oldTitle, updatedTodo);

    // Clear the form
    document.getElementById("anTodoDialog").querySelector("form").reset();
}

function updateTodoInHtml(oldTitle, updatedTodo) {
    const allTodos = document.querySelectorAll('.aTodo');

    for (let todoElement of allTodos) {
        const titleElement = todoElement.querySelector('.shortInfo h1');
        if (titleElement && titleElement.textContent === oldTitle) {
            // Update title
            titleElement.textContent = updatedTodo.title;

            // Update due date
            const dueDateElement = todoElement.querySelector('.shortInfo h3');
            if (dueDateElement) {
                dueDateElement.textContent = updatedTodo.dueDate;
            }

            // Update color sign
            const colorSign = todoElement.querySelector('.colorSign');
            if (colorSign) {
                decideColorSign(updatedTodo, colorSign);
            }

            console.log('Todo updated in HTML');
            return; // Exit the function once we've updated the correct todo
        }
    }

    console.log('Todo element not found in HTML');
}

function getTodoByTitle(title) {
    const todoData = localStorage.getItem(title);
    if (todoData) {
        const data = JSON.parse(todoData);
        const todo = new Todo(data.title, data.description, new Date(data.dueDate), data.priority);
        todo.checked = data.checked;
        return todo;
    }
    return null;
}

export { Todo, allTodo, importantTodo, addTodoDialog, createTodo, createTodoInHtml, decideColorSign, turnAllTodoInHtml, deleteAnTodo, EditDialog };