//SELECTORS
const todoInput = document.querySelector('.todo_input');
const todoButton = document.querySelector('.todo_button');
const todoList = document.querySelector('.todo_list');
//const filterOption = document.querySelector('.filter_todo');



//EVENT LISTENERS
document.addEventListener('DOMContentLoaded', todoUi);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteTodo);
//filterOption.addEventListener('click', filterTodo);


//FUNCTIONS
function addTodo(e){
    e.preventDefault();

    //create div
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo_div');

    //create todo list input
    const newTodoInput = document.createElement('input')
    newTodoInput.type = 'text'
    newTodoInput.value = todoInput.value
    newTodoInput.classList.add('todo_items')
    newTodoInput.setAttribute('readonly', 'readonly')
    todoDiv.appendChild(newTodoInput);
    
    saveLocalTodos(todoInput.value);



    //create mark button
    const completedButton = document.createElement('button')
    completedButton.innerHTML = '<i class="fa-solid fa-check"></i>'
    completedButton.classList.add('complete_btn')
    todoDiv.appendChild(completedButton);

    //create edit button
    const editButton = document.createElement('button')
    editButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>'
    editButton.classList.add('edit_btn')
    todoDiv.appendChild(editButton);
    
    //create mark button
    const deleteButton = document.createElement('button')
    deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>'
    deleteButton.classList.add('delete_btn')
    todoDiv.appendChild(deleteButton);

    //append todoDiv to the todoList
    todoList.append(todoDiv);

    //clear the input value after entering the input
    todoInput.value = '';

    //Edit todo list
    editButton.addEventListener('click', () =>{
        const edit = document.querySelector('.fa-pen-to-square');
        if(editButton.innerHTML == edit.outerHTML){
            newTodoInput.removeAttribute('readonly')
            newTodoInput.focus()
            editButton.innerHTML = '<i class="fa-solid fa-floppy-disk"></i>'
        }else{
            newTodoInput.setAttribute('readonly', 'readonly')
            editButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>'
        }
    });

    //Delete function
    // deleteButton.addEventListener('click', function (){
    //     todoDiv.remove();
    // });
}

//Delete todo Function
function deleteTodo(e){
    //this listens to any clickable button withing the todo_input div
    const item = e.target;
    let classListItem = item.classList[0];
    let todo = item.parentElement;

    //delete todo
    if(classListItem == 'delete_btn'){
        todo.classList.add('fall_animation')
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', () => {
            todo.remove();
        })
    }

    if(classListItem == 'complete_btn'){
        todo.classList.toggle('completed');
        //console.log(todo)
    }
}

// function filterTodo(e){
//     let todos = todoList.childNodes;

//     todos.forEach(function(todo) {
//         switch(e.target.value){
//             case 'all':
//                 todo.style.display = 'flex'
//             break;
//         case 'completed':
//             if(todo.classList.contains('completed')){
//                 todo.style.display = 'flex'
//             }else{
//                 todo.style.display = 'none'
//             }
//         break;
//         case 'uncompleted':
//             if(!todo.classList.contains('completed')){
//                 todo.style.display = 'flex'
//             }else{
//                 todo.style.display = 'none'
//             }
//         break;
    
//     }

//     });
// }

function saveLocalTodos(todo){
    //checking if there already exist a product
    let todos;
    //console.log(localStorage.getItem('todos'));
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos))
}

function todoUi(){
    //checking if there already exist a product
    let todos;
    //console.log(localStorage.getItem('todos'));
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    todos.forEach(todo => {
    //create div
        const todoDiv = document.createElement('div')
        todoDiv.classList.add('todo_div');

        //create todo list input
        const newTodoInput = document.createElement('input')
        newTodoInput.type = 'text'
        newTodoInput.value = todo
        newTodoInput.classList.add('todo_items')
        newTodoInput.setAttribute('readonly', 'readonly')
        todoDiv.appendChild(newTodoInput);

        //create mark button
        const completedButton = document.createElement('button')
        completedButton.innerHTML = '<i class="fa-solid fa-check"></i>'
        completedButton.classList.add('complete_btn')
        todoDiv.appendChild(completedButton);

        //create edit button
        const editButton = document.createElement('button')
        editButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>'
        editButton.classList.add('edit_btn')
        todoDiv.appendChild(editButton);

        //create mark button
        const deleteButton = document.createElement('button')
        deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>'
        deleteButton.classList.add('delete_btn')
        todoDiv.appendChild(deleteButton);


        //append todoDiv to the todoList
        todoList.append(todoDiv);

    });

    localStorage.setItem('todos', JSON.stringify(todos))
}

function removeLocalTodos(todo){
    //checking if there already exist a product
    let todos;
    //console.log(localStorage.getItem('todos'));
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    const todoIndex = todo.children[0].value
    todos.splice(todos.indexOf(todoIndex), 1);

    localStorage.setItem('todos', JSON.stringify(todos))
    console.log(todos.splice(todos.indexOf(todoIndex), 1))
}
