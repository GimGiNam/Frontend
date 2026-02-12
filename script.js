

// 요소 선택
const toDoListSection = document.getElementById('toDoList-section');
const taskList = document.getElementById('taskList');
const menuList = Object.freeze({
  NONE: "NONE",
  ADD: "ADD",
  Check: "Check",
  Complete: "Complete",
  Remove: "Remove",
});

let addBtn;
let currentMenuList = menuList.NONE;
let taskInput = document.getElementById('taskInput');
let arrToDoList = []; // 빈 배열 선언
let dictToDoList = {};

// 메뉴버튼 추가기능 만들기
function menuAdd() {

    if (currentMenuList == menuAdd) {
        return;
    }
    
    currentMenuList = menuList.ADD;
    toDoListSection.replaceChildren();
    taskList.replaceChildren();
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('id', 'taskInput');
    input.setAttribute('placeholder', '할 일을 입력하세요');

    const addBtn = document.createElement('button');
    addBtn.setAttribute('id', 'addBtn');
    addBtn.textContent = "추가";
    addBtn.onclick = function() {
        console.log("click");
        addTask();
    };

     // 버튼 클릭 시 할 일 추가
    addBtn.addEventListener('click', addTask);
    taskInput = document.getElementById('taskInput');
    if (taskInput != null) {
        // 엔터키로도 할 일 추가
        taskInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') addTask();
        });
    }
    
    toDoListSection.appendChild(input);
    toDoListSection.appendChild(addBtn);
}

// 메뉴버튼 조회기능 만들기
function menuCheck() {

     if (currentMenuList == menuList.Check) {
        return;
    }
    
    console.log("menuCheck!");
    currentMenuList = menuList.Check;
        toDoListSection.replaceChildren();
        taskList.replaceChildren();

    CheckTask();
}

// 메뉴버튼 완료기능 만들기
function menuComplete() {

    if (currentMenuList == menuList.Complete) {
        return;
    }

    console.log("menuComplete!");
    currentMenuList = menuList.Complete;
    toDoListSection.replaceChildren();
    taskList.replaceChildren();

    CheckTask();
}

// 메뉴버튼 삭제기능 만들기
function menuRemove() {

    if (currentMenuList == menuList.Remove) {
        return;
    }

    console.log("menuRemove!");
    currentMenuList = menuList.Remove;
    toDoListSection.replaceChildren();
    taskList.replaceChildren();

    CheckTask();
}

// 할 일 추가 함수
function addTask() {

    taskInput = document.getElementById('taskInput');
    if (taskInput == null) {
        return;
    }

    const task = taskInput.value.trim();
    if (task === "") {
        return;
    }

    // li 요소 생성
    const li = document.createElement('li');
    li.textContent = task;

    // 삭제 버튼 생성
    const delBtn = document.createElement('button');
    delBtn.textContent = "삭제";
    delBtn.setAttribute("id", "taskAddBtn");
    delBtn.onclick = function() {

        console.log("onclick");
        arrToDoList.pop(task);
        if ("task" in dictToDoList) {
            dictToDoList.Remove(task);
            li.removeChild(li);
            taskList.removeChild(li);
        }
    };

    let checkToDoList;
    for (let i = 0; i < arrToDoList.length; i++) {
        if (arrToDoList[i] === task) {
            checkToDoList = true;
            break;
        }
    }

     // 입력창 비우기
    taskInput.value = "";
    taskInput.focus();

    if (!checkToDoList) {

        console.log("!checkToDoList");
        arrToDoList.push(task);
        dictToDoList[task] = false;

        li.appendChild(delBtn);
        taskList.appendChild(li);
    }
}

// 할 일 조회 함수
function CheckTask() {

    console.log("CheckTask");
    console.log(arrToDoList);
    for (let i = 0; i < arrToDoList.length; i++) {
        // li 요소 생성
        const li = document.createElement('li');
        li.textContent = arrToDoList[i];

        let strToDoList = arrToDoList[i];
        console.log(strToDoList);

         // 미완료 버튼 생성
        const btn = document.createElement('button');

        if (currentMenuList == menuList.ADD) {

        } else if (currentMenuList == menuList.Check) {

            if (dictToDoList[strToDoList]) {

                btn.textContent = "완료";
                btn.setAttribute('id', 'CompleteBtn')
            } else {

                btn.textContent = "미완료";
                btn.setAttribute('id', 'unCompleteBtn')
            }
        } else if (currentMenuList == menuList.Complete) {

            if (dictToDoList[strToDoList]) {

                btn.textContent = "완료";
                btn.setAttribute('id', 'CompleteBtn')
            } else {

                btn.textContent = "미완료";
                btn.setAttribute('id', 'unCompleteBtn')
                btn.onclick = function() {

                    console.log("click");
                    btn.removeAttribute('id')
                    btn.textContent = "완료";
                    btn.setAttribute('id', 'CompleteBtn')
                    dictToDoList[strToDoList] = true;
                };
            }
          
        } else if (currentMenuList == menuList.Remove) {

            btn.textContent = "삭제";
            btn.setAttribute("id", "taskAddBtn");

            btn.onclick = function() {

                console.log("click");
                const deleteValue = arrToDoList.includes(strToDoList)       // 배열에 값이 있는지 확인
                if (deleteValue) {
                    arrToDoList.pop(strToDoList);
                }

                const deleteKey = strToDoList in dictToDoList               // 사전에 키가 있는지 확인
                if (deleteKey) {
                    delete dictToDoList.strToDoList;
                    console.log(strToDoList); 
                }
               
                taskList.removeChild(li);
            };
        }

        li.appendChild(btn);
        taskList.appendChild(li);
    }
}