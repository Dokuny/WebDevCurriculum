class Common {
    constructor() {
        this.file = this.create();
    }

    delete(){
        this.file.remove();
    }

    create(){
    }
}


class Icon extends Common{
    constructor() {
        super();
    }

    create(){
        const file = document.createElement('div');
        file.setAttribute('class', 'icon');

        const icon = document.createElement('i');
        icon.setAttribute('class', 'fas fa-file');

        file.appendChild(icon);

        return file;
    }
}


class Folder extends Common{
    constructor() {
        super();
        this.windo = new Window();
    }

    open() {
        this.windo.file.style.display ='flex';
    }

    close(){
        this.windo.file.style.display = 'none';
    }

    delete() {
        this.windo.delete();
        super.delete();
    }

    create() {
        const file = document.createElement('div');
        file.setAttribute('class', 'folder');

        const icon = document.createElement('i');
        icon.setAttribute('class', 'fas fa-folder');

        file.appendChild(icon);

        return file;
    }
}


class Window extends Common{
    constructor() {
        super();
        this.storage = this.create().lastChild;
    }

    delete(){
        this.storage.remove();
        super.delete();
    }

    create(){
        const file = document.createElement('div');
        file.setAttribute('class','window');

        const menu = document.createElement('ul');
        const list = document.createElement('li');
        const closeBtn = document.createElement('button');
        closeBtn.innerText = 'X';
        menu.setAttribute('class','windowMenu')
        closeBtn.setAttribute('class','closeBtn');
        list.appendChild(closeBtn);
        menu.appendChild(list);




        const storage = document.createElement('div');
        storage.setAttribute('class','storage')

        file.appendChild(menu);
        file.appendChild(storage);

        return file;
    }
}

class Desktop {
    constructor(name) {
        this.file = this.create(name);
    }

    create(name){
        const file = document.createElement('section');
        file.id= `desktop-${name}`;
        file.setAttribute('class','desktop');

        return file;
    }
}