class Notepad {
    constructor(name) {
        this.name = name;
        this.text = '';
        Notepad.createListNode(name);
        Notepad.createTabNode(name);
    }

    static createListNode(name) {
        const li = document.createElement('li');
        li.setAttribute('class', 'noteList');
        li.textContent = name;
        Control.list.appendChild(li);
    }

    static createTabNode(name) {
        const li = document.createElement('li');
        const closeBtn = document.createElement('button');
        closeBtn.textContent = 'X';
        li.setAttribute('class', 'noteTab');
        li.textContent = name;
        li.appendChild(closeBtn);
        Control.tab.appendChild(li);
    }
}

class Control {
    static list = document.getElementById('list');
    static tab = document.getElementById('tab');
    static textbox = document.getElementById('textBox');
    static newBtn = document.getElementById('newBtn');
    static deleteBtn = document.getElementById('deleteBtn');
    static renameBtn = document.getElementById('renameBtn');
    static resetBtn = document.getElementById('resetBtn');
    static saveBtn = document.getElementById('saveBtn');
    static curTarget;
    static curTargetNode;
    static priorTarget;
    static priorTargetNode;
    static form = document.getElementById('form');

    static initNote() {
        for (let i = 0; i < localStorage.length; i++) {
            Notepad.createListNode(localStorage.key(i));
            Notepad.createTabNode(localStorage.key(i));
        }
    }

    static createNewFIle() {
        let name = prompt('파일명을 입력해주세요');

        for (let i = 0;i<localStorage.length; i++) {
            if (localStorage.key(i) === name) {
                alert('동일한 파일명이 존재합니다.')
                return;
            }
        }

        let notepad = new Notepad(name);
        localStorage.setItem(name, JSON.stringify(notepad));
    }

    static deleteFile() {
        if (localStorage.length === 0) {
            return;
        }

        localStorage.removeItem(Control.curTarget);
        [...Control.list.children].forEach(li => {
            if (li.textContent === Control.curTarget) {
                li.remove();
            }
        });

        [...Control.tab.children].forEach(li => {
            if (li.textContent.slice(0, -1) === Control.curTarget) {
                li.remove();
            }
        });
        Control.priorTarget=null;
        Control.curTarget=null;
        Control.priorTargetNode=null;
        Control.curTargetNode=null;
        Control.form.style.display='none';
    }


    static resetAll() {
        if (confirm('정말로 초기화 하시겠습니까?')) {
            while (Control.list.hasChildNodes()) {
                list.removeChild(
                    list.firstChild
                );
                while (Control.tab.hasChildNodes()) {
                    tab.removeChild(
                        tab.firstChild
                    );
                    Control.form.style.display = 'none';
                    localStorage.clear();
                }
            }
        }
    }

    static selectTarget(e) {
        if(Control.priorTargetNode){
            Control.priorTargetNode.style.backgroundColor='#FAEEE0';
        }

        if (e.target.className === 'noteTab') {
            Control.curTarget = e.target.textContent.slice(0, -1);
            Control.curTargetNode=e.target;
            let file = JSON.parse(localStorage.getItem(Control.curTarget));
            Control.textbox.value = file.text;

            e.target.style.backgroundColor ='#f9cf93';

        } else if (e.target.className === 'noteList') {
            Control.textbox.value = JSON.parse(localStorage.getItem(e.target.textContent)).text;
            Control.curTarget = e.target.textContent;
            Control.curTargetNode=e.target;

            e.target.style.backgroundColor ='#f9cf93';

        }

        if (Control.curTarget) {
            Control.priorTarget = Control.curTarget;
            Control.priorTargetNode = Control.curTargetNode;
        }

    }

    // prior에 할건지 cur에 할건지 선택(이동이 있을 때 물어보면 prior, 저장버튼은 cur)
    static saveText() {
        let file = JSON.parse(localStorage.getItem(Control.priorTarget));
        file.text = Control.textbox.value;
        localStorage.setItem(file.name, JSON.stringify(file));
    }

    static openFile(e) {
        if (e.target.tagName === 'LI' && Control.curTarget) {
            let file = JSON.parse(localStorage.getItem(Control.curTarget));
            Control.textbox.value = file.text;
            Control.form.style.display = 'flex';

            Control.openTab();
        }
    }

    static openTab() {
        [...tab.children].forEach(tab => {
            if (tab.textContent.slice(0, -1) === Control.curTarget) {
                tab.style.display = 'block';
            }
        });
    }

    static closeTab(e) {
        if (e.target.tagName === 'BUTTON') {
            let tar = e.target.parentNode;
            tar.style.display = 'none';

            Control.form.style.display = 'none';
        }
    }

    static renameFile() {
        if (Control.curTarget) {
            const newName = prompt('이름을 입력해주세요');
            for(let i=0;i<localStorage.length;i++){
                if(localStorage.key(i)===newName){
                    alert('동일한 이름을 가진 파일이 존재합니다.')
                    return;
                }
            }
            const originFile = JSON.parse(localStorage.getItem(Control.curTarget));
            originFile.name = newName;
            localStorage.setItem(newName, JSON.stringify(originFile));
            localStorage.removeItem(Control.curTarget);


            [...Control.list.children].forEach(li=>{
                if(li.textContent===Control.curTarget){
                    li.textContent=newName;
                }
            });
            [...Control.tab.children].forEach(li=>{
                if(li.textContent.slice(0,-1)===Control.curTarget){
                    li.firstChild.textContent=newName;
                }
            });
            Control.curTarget=newName;
            Control.priorTarget=newName;

        }
    }

    static checkChanges(e){
        if(Control.priorTarget&&e.target.tagName==='LI'){
            let originText=JSON.parse(localStorage.getItem(Control.priorTarget));
            console.log(originText);
            if(originText.text!==Control.textbox.value){
                if(confirm('변경사항이 있습니다. 저장하시겠습니까?')){
                    Control.saveText();
                }
            }
        }
    }




}



