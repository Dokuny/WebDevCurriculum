class Common {
    constructor() {
        this.file = this.create();
    }

    delete(){
        this.file =null;
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
        this.storage = null;
        super.delete();
    }

    create(){
        const file = document.createElement('div');
        file.setAttribute('class','window');

        const menu = document.createElement('ul');
        const closeBtn = document.createElement('li');
        menu.setAttribute('class','windowMenu')
        closeBtn.setAttribute('class','closeBtn');

        menu.appendChild(closeBtn);


        const storage = document.createElement('div');
        storage.setAttribute('class','storage')

        file.appendChild(menu);
        file.appendChild(storage);

        return file;
    }
}

class desktop extends Common{
    constructor() {
        super();
    }

    create(){
        const file = document.createElement('section');
        file.setAttribute('class',`desktop${desktopCount++}`);

        return file;
    }
}

let desktopCount = 1;