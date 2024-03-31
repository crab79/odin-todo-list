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

export {Project};