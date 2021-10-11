// 기본 노드들
const list = document.getElementById('list');
const form = document.getElementById('form');
const saveBtn = document.getElementById('saveBtn');
const textBox = document.getElementById('textBox');
const renameBtn = document.getElementById('renameBtn');
const resetBtn = document.getElementById('resetBtn');
const tabNode = document.getElementById('tab');


// 전역 변수
let listTarget;
let listCurTarget;
let tabTarget;
let tabCurTarget;
let textValue;
let tabTextValue;
let hasTab = false;

// 전역 함수
function addList(name) {
    const list = document.createElement('li');
    list.textContent = name;
    document.querySelector('#list').appendChild(list);
}

function addTab(name) {
    const tab = document.createElement('li');
    const closeBtn = document.createElement('button');
    tab.textContent = name;
    closeBtn.textContent = 'X';
    tab.setAttribute('class', 'tabFile')
    tab.appendChild(closeBtn);
    document.querySelector('#tab').appendChild(tab);
}

// 보관함
const objStorage = [];

// newBtn 누를 시
const newBtn = document.getElementById('newBtn');

newBtn.addEventListener('click', createNewFile);

function createNewFile() {

    const newName = prompt('이름을 입력해주세요');

    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) === newName) {
            alert('이미 있는 파일명입니다. 이름을 바꿔 다시 시도해주세요');
            return;
        }
    }

    addList(newName);
    localStorage.setItem(newName, '');
}

// deleteBtn 누를 시

const deleteBtn = document.getElementById('deleteBtn');

deleteBtn.addEventListener('click', deleteFile)

function deleteFile() {
    if (list.children.length === 0) {
        return;
    }
    const name = listTarget.textContent;

    for (let i = 0; i < localStorage.length; i++) {
        if (name === localStorage.key(i)) {
            [...document.querySelectorAll('.tabFile')].forEach(file => {
                if (file.textContent.slice(0, -1) === name) {
                    file.remove();
                }
            });

            listTarget.remove();
            localStorage.removeItem(localStorage.key(i));

        }
    }
    listTarget = null;
    listCurTarget = null;
    console.log(list.children);
    if (list.children.length === 0) {
        form.style.display = 'none';
    }
}

// list 누를 시 눌러져있는 리스트 저장 및 색 변화
list.addEventListener('dblclick', listDblHandler);


function listDblHandler(e) {

    if (e.target.tagName === 'LI') {
        onTextBox();
        [...tab.children].forEach(e => {
            e.style.backgroundColor = '#FAEEE0';
        });
        [...list.children].forEach(e => {
            e.style.backgroundColor = '#FAEEE0';
        });
        if (listCurTarget) {
            if (localStorage.getItem(listCurTarget.textContent) !== textBox.value) {
                if (confirm('변경사항이 있습니다. 저장하시겠습니까?')) {
                    saveText();
                }
            }
        }
        listTarget = e.target;
        let tabArr = [...document.getElementById('tab').children];
        createTab();
        function createTab() {

            console.log(tabArr);
            for (let i = 0; i < tabArr.length; i++) {
                if (tabArr[i].textContent.slice(0, -1) === listTarget.textContent) {
                    tabArr[i].style.display='block';
                    hasTab = true;
                }
            }
            if (!hasTab) {
                addTab(listTarget.textContent);
                hasTab=false;
            }
        }


        if (listCurTarget) {
            listCurTarget.style.backgroundColor = '#FAEEE0';
        }
        listTarget.style.backgroundColor = '#F9CF93';


        tabArr.forEach(list => {
            if (list.textContent === listTarget.textContent + 'X') {
                list.style.backgroundColor = '#F9CF93';
            } else {
                list.style.backgroundColor = '#FAEEE0';
            }
        })

        listCurTarget = listTarget;

        textBox.value = localStorage.getItem(listTarget.textContent);
    }
}

function onTextBox() {
    form.style.display = 'flex';
}

// 저장 버튼 누를 시
saveBtn.addEventListener('click', saveText);

function saveText() {
    let text = textBox.value;
    localStorage.setItem(listCurTarget.textContent, text);
}

// Rename
renameBtn.addEventListener('click', renameFile);

function renameFile() {
    if (list.children.length === 0) {
        return;
    }
    let rename;
    if (rename = prompt('변경할 이름을 입력해주세요')) {
        let text = localStorage.getItem(listTarget.textContent);
        for (let i = 0; i < localStorage.length; i++) {
            if (localStorage.key(i) === rename) {
                alert('이미 있는 파일명입니다. 이름을 바꿔 다시 시도해주세요');
                return;
            }
        }
        for (let i = 0; i < localStorage.length; i++) {
            if (listTarget.textContent === localStorage.key(i)) {
                [...document.querySelectorAll('.tabFile')].forEach(file => {
                    if (file.textContent.slice(0, -1) === listCurTarget.textContent) {
                        file.remove();
                    }
                });

                localStorage.removeItem(localStorage.key(i));
            }
        }
        listTarget.textContent = rename;
        addTab(rename);
        localStorage.setItem(rename, text);
    }
}

// reset

resetBtn.addEventListener('click', resetAll);

function resetAll() {
    if (confirm('정말 전부 삭제하시겠습니까?')) {
        localStorage.clear();

        while (list.hasChildNodes()) {
            list.removeChild(list.firstChild);
        }
        while (tab.hasChildNodes()) {
            tab.removeChild(tab.firstChild);
        }

        textBox.value = '';
        listTarget = null;
        listCurTarget = null;
        tabTarget=null;
        tabCurTarget=null;

        form.style.display = 'none';
    }
}

// tab 누를 시

tabNode.addEventListener('click', tabHandler);

function tabHandler(e) {
    [...list.children].forEach(e => {
        e.style.backgroundColor = '#FAEEE0';
    });
    [...tab.children].forEach(e => {
        e.style.backgroundColor = '#FAEEE0';
    });
    if (e.target.class = 'tabFile' && e.target.tagName !== 'BUTTON' && e.target.tagName!=='UL') {

        tabTarget = e.target;
        textBox.value = localStorage.getItem(tabTarget.textContent.slice(0, -1));
        if (tabCurTarget) {
            tabCurTarget.style.backgroundColor = '#F9E4C8';
        }
        tabTarget.style.backgroundColor = '#F9CF93';
        tabCurTarget = tabTarget;

        let listArr = [...list.children];

        listArr.forEach(list => {
            if (list.textContent === tabTarget.textContent.slice(0, -1)) {
                list.style.backgroundColor = '#F9CF93';
            } else {
                list.style.backgroundColor = '#FAEEE0';
            }
        })
    }
    tabTextValue= textBox.value;
    console.log(tabTextValue);
    pushCloseBtn(e);
        function pushCloseBtn(e){
        if(e.target.tagName==="BUTTON"){
            let b =e.target.parentNode;
            b.style.display='none';
            listTarget=null;
            listCurTarget=null;
            tabTarget=null;
            tabCurTarget=null;
            form.style.display='none';
        }
    }

}




//




