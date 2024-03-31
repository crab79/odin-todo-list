import { format } from "date-fns";

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

    markAsImportant(){
        importantTodo.push(this);
    }

    setting(title = this.title, description = this.description, dueDate = this.dueDate, priority = this.priority) {
        this.title = title;
        this.description = description;
        this.dueDate = format(new Date(dueDate), "yyyy-MM-dd");
        this.priority = priority;
    }
}


export {Todo, allTodo, importantTodo};