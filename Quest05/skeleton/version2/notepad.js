class Notepad {
    constructor(name) {
        this.name = name;
        this.text = '';
        this.isTab = false;
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
        closeBtn.value = 'X';
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
    static curTarget;
    static priorTarget;

    static initNote() {
        for (let i = 0; i < localStorage.length; i++) {
            Notepad.createListNode(localStorage.key(i));
            Notepad.createTabNode(localStorage.key(i));
        }
    }

    static createNewFIle() {
        let name = prompt('파일명을 입력해주세요');
        let notepad = new Notepad(name);
        localStorage.setItem(name, JSON.stringify(notepad));
    }

    static deleteFile(e) {
        if(localStorage.length===0){
            return;
        }

        localStorage.removeItem(name);
        [...Control.list.children].forEach(li => {
            if (li.textContent === name) {
                li.remove();
            }
        });

        [...Control.tab.children].forEach(li => {
            if (li.textContent.slice(0,-1) === name) {
                li.remove();
            }
        });
    }

    static renameFile() {

    }

    static resetAll() {

    }

    static selectTarget(e){

        if(e.target.className='noteTab'){
            Control.textbox.value = JSON.parse(localStorage.getItem(e.target.textContent.slice(0,-1))).text;
            Control.curTarget = e.target.textContent.slice(0,-1);
        }else if (e.target.className='noteList'){
            Control.textbox.value = JSON.parse(localStorage.getItem(e.target.textContent)).text;
            Control.curTarget = e.target.textContent;
        }

        Control.priorTarget = Control.curTarget;
    }

    static saveText(){
        if(!Control.curTarget) {
            let obj = JSON.parse(localStorage.getItem(Control.curTarget));
            obj.text = textBox.value;
        }
    }

}



