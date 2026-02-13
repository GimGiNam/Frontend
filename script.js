

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
        console.log("task = " + task);
        const index = arrToDoList.indexOf(task);
        if (index > -1) {
            arrToDoList.splice(index, 1);
        }

        const deleteKey = task in dictToDoList;
        if (deleteKey) {
            delete dictToDoList.task;
        }

        if (index > -1 && deleteKey) {
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
    } else {
        alert("현재 저장된 ToDoList 입니다.");
    }
}

// 할 일 조회 함수
function CheckTask() {

    console.log("CheckTask");
    console.log(arrToDoList);
    let strToDoList;
    for (let i = 0; i < arrToDoList.length; i++) {
        // li 요소 생성
        const li = document.createElement('li');
        li.textContent = arrToDoList[i];

        strToDoList = null;
        strToDoList = arrToDoList[i];
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


            const label1 = document.createElement('label');
            label1.textContent = "미완료 "

            const radio1 = document.createElement('input');
            radio1.type = 'radio';
            radio1.name = strToDoList; // 같은 이름으로 그룹화
            radio1.value = 'unCompleteBtn';
            radio1.id = 'toDoListRadio';

            const label2 = document.createElement('label');
            label2.textContent = "완료 "

            const radio2 = document.createElement('input');
            radio2.type = 'radio';
            radio2.name = strToDoList; // 같은 이름으로 그룹화
            radio2.value = 'CompleteBtn';
            radio2.id = 'toDoListRadio';

            label1.appendChild(radio1);
            label2.appendChild(radio2);

            li.appendChild(label1);
            li.appendChild(label2);

            if (dictToDoList[strToDoList]) {

                radio2.checked = true;
            } else {

                radio1.checked = true;
            }

            // li.appendChild(btn);
            // taskList.appendChild(li);
          
        } else if (currentMenuList == menuList.Remove) {

            btn.textContent = "삭제";
            btn.setAttribute("id", "taskAddBtn");
            const searchName = arrToDoList[i];

            btn.onclick = function() {

                console.log("click");
                console.log("searchName = " + searchName);
                const index = arrToDoList.indexOf(searchName);
                if (index > -1) {
                    arrToDoList.splice(index, 1);
                }

                const deleteKey = searchName in dictToDoList
                if (deleteKey) {
                    delete dictToDoList.searchName;
                }
               
                taskList.removeChild(li);
            };
        }

        li.appendChild(btn);
        taskList.appendChild(li);

        if (currentMenuList == menuList.Complete) {

            for (let i = 0; i < arrToDoList.length; i++) {

                const searchName = 'input[name=' + arrToDoList[i] + ']' ;
                const radioButtons = document.querySelectorAll(searchName);
                radioButtons.forEach(button => {
                console.log(radioButtons.forEach);
                const arrName = arrToDoList[i];
                
                button.addEventListener('change', (event) => {
                    // 현재 클릭(선택)된 요소의 value 출력
                    console.log(event.target.value);  

                    if (event.target.value === "unCompleteBtn") {
                    
                            if (arrName in dictToDoList) {

                                dictToDoList[arrName] = false;
                            }
                        } else {

                            if (arrName in dictToDoList) {

                                dictToDoList[arrName] = true;
                            }
                        }
                    });
                });
            }
        }
    }
}