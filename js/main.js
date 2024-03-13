import { gsap } from 'gsap';

class TodoList {
    constructor() {
        this.todos = [];
        this.todoList = document.getElementById('todoList');
        this.todoInput = document.getElementById('todoInput');
        this.addBtn = document.getElementById('addBtn');
        this.addBtn.addEventListener('click', this.addTodo.bind(this));
    }

    addTodo() {
        const todoText = this.todoInput.value.trim();
        if (todoText) {
            const todo = new TodoItem(todoText);
            this.todos.push(todo);
            this.renderTodoItem(todo);
            this.todoInput.value = '';
        }
    }

    renderTodoItem(todo) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML = `
            <div class="todo-info">
                <label class="checkbox-label">
                    <input type="checkbox" class="checkbox">
                    <span>${todo.text}</span>
                </label>
                <button class="done-btn">Done</button>
            </div>
            
            <div class="tag-container">Priority Level: </div>
        `;
        const doneBtn = li.querySelector('.done-btn');
        doneBtn.addEventListener('click', () => {
            this.doneTodoItem(todo);
            gsap.to(doneBtn, { x: -100, opacity: 0, duration: 0.5, ease: "power2.out", onComplete: () => li.remove() });
        });
        const tagContainer = li.querySelector('.tag-container');
        this.renderTagButtons(tagContainer);
        

        this.todoList.appendChild(li);
        gsap.from(li, { x: -100, opacity: 0, duration: 0.5, ease: "power2.out" });


        const checkbox = li.querySelector('.checkbox');
        checkbox.addEventListener('click', () => {
            gsap.to(checkbox, { rotation: "+=360", duration: 0.5 });
        });
    }

    doneTodoItem(todo) {
        const index = this.todos.indexOf(todo);
        if (index !== -1) {
            this.todos.splice(index, 1);
        }
    }

    renderTagButtons(tagContainer) {
        const priorityTags = ['Low', 'Medium', 'High'];
        priorityTags.forEach(tag => {
            const button = document.createElement('button');
            button.textContent = tag;
            button.classList.add('tag-button');
            button.addEventListener('click', () => {
                this.setPriority(tag);
                this.tagButtons(tagContainer, tag);
                gsap.to(button, { backgroundColor: this.getTagColor(tag), color: "#fff", duration: 0.3 });
            });
            tagContainer.appendChild(button);
        });
    }

    setPriority(priority) {
        this.selectedPriority = priority;
    }

    tagButtons(tagContainer, selectedTag) {
        const buttons = tagContainer.querySelectorAll('.tag-button');
        buttons.forEach(button => {
            if (button.textContent === selectedTag) {
                button.style.backgroundColor = this.getTagColor(selectedTag);
                button.style.color = '#fff';
            } else {
                button.style.backgroundColor = '#fff';
                button.style.color = '#000';
            }
        });
    }

    getTagColor(priority) {
        switch (priority) {
            case 'Low':
                return 'green';
            case 'Medium':
                return 'orange';
            case 'High':
                return 'red';
            default:
                return '#007bff'; // Default color
        }
    }
}

class TodoItem {
    constructor(text) {
        this.text = text;
    }
}

const todoList = new TodoList();
