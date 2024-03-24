import "./style.scss";
import { format } from "date-fns";

class Todo {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = format(new Date(dueDate), "yyyy-MM-dd");
        this.priority = priority;
        this.checked = false;
    }

    delete() {
        this.title = null;
        this.description = null;
        this.dueDate = null;
        this.priority = null;
    }

    read() {
        if (this.title !== null && this.description !== null && this.dueDate !== null && this.priority !== null) {
            console.log(`Title: ${this.title}\nDescription: ${this.description}\nDue Date: ${this.dueDate}\nPriority: ${this.priority}\nChecked: ${this.checked}`);
        }
    }

    markAsChecked() {
        this.checked = true;
    }

    setting(title = this.title, description = this.description, dueDate = this.dueDate, priority = this.priority) {
        this.title = title;
        this.description = description;
        this.dueDate = format(new Date(dueDate), "yyyy-MM-dd");
        this.priority = priority;
    }
}


class Project {
    constructor(title) {
        this.title = title;
        this.content = [];
    }

    addTodo(todo) {
        this.content.push(todo);
    }

    deleteTodo(todo) {
        let todoIndex = this.content.indexOf(todo);
        if (todoIndex !== -1) {
            this.content.splice(todoIndex, 1);
        }
    }

    delete() {
        this.title = null;
        this.content = [];
    }

    read() {
        if (this.title !== null) {
            console.log(`Project: ${this.title}`);
            this.content.forEach(todo => {
                todo.read();
            });
        } else {
            console.log("This project is null");
        }
    }
}
