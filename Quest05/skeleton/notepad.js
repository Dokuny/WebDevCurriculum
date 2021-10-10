class Notepad {
    /* TODO: 그 외에 또 어떤 클래스와 메소드가 정의되어야 할까요? */
    constructor() {
        this.name = prompt('폴더이름을 입력하세요');
        this.listNode = this.createListNode();
        this.tabNode = this.createTabNode();
    }

    createListNode() {
        const listNode = document.createElement('li');
        listNode.textContent = this.name;

        document.querySelector('#list').appendChild(listNode);
        return listNode;
    }

    createTabNode() {
        const tabNode = document.createElement('li');
        tabNode.textContent = this.name;

        const btn = document.createElement('button');
        btn.textContent='X';
        tabNode.appendChild(btn);
        document.querySelector('#tab').appendChild(tabNode);
        return tabNode;
    }
    deleteNotepad(){

    }
};



let textArea = document.getElementById('textBox');

let curTextBox;
const tab = document.getElementById('tab');
const list = document.getElementById('list');


// 파일 탭에서 클릭이나 리스트에서 더블클릭 시
tab.addEventListener('click',isRevised);
list.addEventListener('dblclick',isRevised);
tab.addEventListener('click', textOpenHandler);
list.addEventListener('dblclick', textOpenHandler);


let tabTarget;
let curTarget;


function textOpenHandler(e) {
    if (e.target.tagName == 'UL') {
        return;
    }

    const form = document.querySelector('#form');
    form.style.display = 'flex';
    tabTarget = e.target;
    textArea.value = localStorage.getItem(tabTarget.textContent);
}

// 새파일 생성
const newBtn = document.querySelector('#newBtn');

newBtn.addEventListener('click', newFile);


function newFile() {
    const note = new Notepad();
    localStorage.setItem(note.name,'');
}

// 저장

const saveBtn = document.querySelector('#saveBtn');

saveBtn.addEventListener('click',saveFile);

function saveFile(){
    localStorage.setItem(tabTarget.textContent,textArea.value);
}

// 다른 파일 open시 값의 변경이 있었다면 경고창


function isRevised(){
    if(tabTarget===undefined){
        return;
    } else if(localStorage.getItem(tabTarget.textContent)!== textArea.value){
        if(confirm('저장하시겠습니까?')){
            saveFile();
        } else {
            return;
        }
    }
}

// 탭 오픈한거 불들어오게
tab.addEventListener('click',active);
list.addEventListener('dblclick',active);

function active(e){
    let tli = [...document.querySelectorAll('#tab > li')];
    let lli = [...document.querySelectorAll('#list > li')];

   if(curTarget){
       curTarget.classList.remove('active');

       if(curTarget.parentNode.id==='tab'){
           lli.forEach(li=>{
               if(li.textContent===curTarget.textContent){
                   li.classList.remove('active');
               }
           })
       }else{
           tli.forEach(li=>{
               if(li.textContent===curTarget.textContent){
                   li.classList.remove('active');
               }
           })
       }
   }
    tabTarget.classList.add('active');


    if(tabTarget.parentNode.id==='tab'){
        for(let i=0;i<tli.length;i++){
            if(tli[i].classList.contains('active')){
                lli[i].classList.add('active');
            }
        }
    }else if(tabTarget.parentNode.id==='list'){
        for(let i=0;i<lli.length;i++){
            if(lli[i].classList.contains('active')){
                tli[i].classList.add('active');
            }
        }
    }

   curTarget=tabTarget;
}

// 탭닫기
// tab.addEventListener('click',closeTab);
//
// function closeTab(e){
//     if(e.target.tagName==='BUTTON'){
//         tabTarget.style.display='none';
//         form.style.display='none';
//     }
// }