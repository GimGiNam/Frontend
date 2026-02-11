
// 요소 선택
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// 할 일 추가 함수
function addTask() {
    const task = taskInput.value.trim();
    if (task === "") {
        alert("할 일을 입력해주세요!");
        return;
    }

    // li 요소 생성
    const li = document.createElement('li');
    li.textContent = task;

    // 삭제 버튼 생성
    const delBtn = document.createElement('button');
    delBtn.textContent = "삭제";
    delBtn.onclick = function() {
        taskList.removeChild(li);
    };

    li.appendChild(delBtn);
    taskList.appendChild(li);

    // 입력창 비우기
    taskInput.value = "";
    taskInput.focus();
}

// 버튼 클릭 시 할 일 추가
addBtn.addEventListener('click', addTask);

// 엔터키로도 할 일 추가
taskInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') addTask();
});