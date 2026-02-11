

const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const todoTemplate = document.getElementById('todo-template');

const handleFormSubmit = (event) => {
    event.preventDefault();
    // todoInput의 값 추출
    const inputValue = todoInput.value.trim();
    // 값 없으면 빨리 return 하기
    if (inputValue === '') return;

    // 템플릿으로 .todo-item 구조를 복사하고 정확하게 .todo-item 요소 선택하기
    const todoItem = todoTemplate.content.cloneNode(true).querySelector('.todo-item');
    // .item-title에 inputValue를 추가
    todoItem.querySelector('.item-title').textContent = inputValue;
    // title이 추가된 todoItem을 todoList에 추가
    todoList.appendChild(todoItem);

    // input 초기화
    todoInput.value = '';
};

todoForm.addEventListener('submit', handleFormSubmit);