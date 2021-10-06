class Desktop {
    /* TODO: Desktop 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */

    constructor(iconNum = 0, folderNum = 0, name = 1) {  // 구동시작점
        this.name = name;
        this.makeDesktop();
        this.desktop = document.querySelector(`.desktop_${name}`);
        this.icons = [];
        this.folders = [];
        this.windows = [];

        for (let i = 0; i < iconNum; i++) {
            this.createFile('icon');
        }
        for (let i = 0; i < folderNum; i++) {
            this.createFile('folder')
        }
        this.initUtil();
    }

    initUtil() {
        this.dragFile();
        this.openFolder();
        this.closeFolder();

    }

    handleContext() {
        const context = document.querySelector('.user_context');
        this.desktop.appendChild(context);
        let trashcan;

        this.desktop.addEventListener('contextmenu', e => {
            e.preventDefault();

            if (e.target === this.desktop) {
                document.querySelector('.deleteFile').style.display = 'none';
                trashcan = null;
            } else {
                document.querySelector('.deleteFile').style.display = 'block';
                trashcan = e.target;
                if (e.target.toString() === '[object HTMLElement]') {
                    trashcan =e.target.parentNode;
                }
            }

            console.log(e.target);
            console.log(e.target.toString());
            console.log(trashcan);


            context.style.display = 'block';
            context.style.left = `${e.clientX + 5}px`;
            context.style.top = `${e.clientY + 5}px`;

        });

        context.addEventListener('click', e => {
                if (e.target === document.querySelector('.createFile')) {
                    this.createFile('icon');
                } else if (e.target === document.querySelector('.createFolder')) {
                    this.createFile('folder');
                } else if (e.target === document.querySelector('.deleteFile')) {
                    trashcan.remove();
                }


            this.initUtil();
        });

        this.desktop.addEventListener('click', () => {
            context.style.display = 'none';
            context.style.top = null;
            context.style.left = null;
        });


    }

    closeFolder() {
        const targets = this.folders;

        for (let target of targets) {
            const clickHandler = () => {
                target.windowNode.style.display = 'none';
                target.node.innerHTML = '<i class="fas fa-folder"></i>';
            };

            target.windowNode.firstChild.firstChild.addEventListener('click', clickHandler);
        }
    }

    openFolder() {
        const targets = this.folders;

        for (let target of targets) {
            const dblclickHandler = () => {
                target.windowNode.style.display = 'flex';
                target.windowNode.style.flexDirection = 'column';
                target.node.innerHTML = '<i class="fas fa-folder-open"></i>';
            };

            target.node.addEventListener('dblclick', dblclickHandler);
        }

    }


    makeDesktop() { // 데스크탑 만들기,은닉화 해야함 ㅜㅜ
        let desk = document.createElement('section');
        desk.classList.add(`desktop_${this.name}`);
        document.body.appendChild(desk);
    }

    dragFile() {
        const targets = document.querySelectorAll('section[class *= desktop] *:not(i,.menu,button,.innerBox,.user_context li)');

        for (let target of targets) { // 이미지가 찍혀도 div가 움직이도록.

            const offset = {x: 0, y: 0};
            const initialMousePos = {x: 0, y: 0};

            // mousemove
            const moveHandler = e => {
                offset.x = e.clientX - initialMousePos.x;
                offset.y = e.clientY - initialMousePos.y;
                target.style.transform = `translate3d(${offset.x}px,${offset.y}px,0)`;

            };

            // mousedown

            target.addEventListener('mousedown', e => {

                initialMousePos.x = e.clientX - offset.x;
                initialMousePos.y = e.clientY - offset.y;
                document.addEventListener('mousemove', moveHandler);
            });

            // mouseup
            document.addEventListener('mouseup', () => {
                document.removeEventListener('mousemove', moveHandler)
            });

        }
    }

    createFile(type, isFolder, folderNode) {
        if (isFolder === 'folder') {
            if (type === 'icon' || type === 'Icon') {
                const file = new Icon();
                const node = file.node;
                folderNode.appendChild(node);
                folderNode.push(file);
            } else if (type === 'folder' || type === 'Folder') {
                const file = new Folder();
                const node = file.node;
                const windo = file.windowNode;
                folderNode.appendChild(node);
                folderNode.appendChild(windo)
                this.windows.push(windo);
                this.folders.push(file);
            }
        }


        if (type === 'icon' || type === 'Icon') {
            const file = new Icon();
            const node = file.node;
            this.desktop.appendChild(node);
            this.icons.push(file);
        } else if (type === 'folder' || type === 'Folder') {
            const file = new Folder();
            const node = file.node;
            const windo = file.windowNode;
            this.desktop.appendChild(node);
            this.desktop.appendChild(windo)
            this.windows.push(windo);
            this.folders.push(file);
        }
    }


}

class Icon {
    /* TODO: Icon 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
    constructor() {
        this.node = this.makeFile();
    }

    makeFile() {
        const file = document.createElement('div');
        file.setAttribute('class', 'icon')
        file.innerHTML = '<i class="fas fa-file"></i>';
        return file;
    }
}

class Folder extends Icon {
    /* TODO: Folder 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
    constructor() {
        super();
        this.windowNode = new Window().node;
    }

    makeFile() {
        const file = document.createElement('div');
        file.innerHTML = '<i class="fas fa-folder"></i>';
        file.setAttribute('class', 'folder')
        return file;
    }
}

//<i class="fas fa-folder-open"></i> 열린파일
class Window {
    /* TODO: Window 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
    constructor() {
        this.node = this.makeFile();
    }

    makeFile() {
        const file = document.createElement('div');
        file.setAttribute('class', 'window');
        const menu = document.createElement('div');
        menu.setAttribute('class', 'menu');
        const btn = document.createElement('button');
        btn.textContent = 'X';
        const innerbox = document.createElement('div');
        innerbox.setAttribute('class', 'innerBox');
        menu.appendChild(btn);
        file.appendChild(menu);
        file.appendChild(innerbox);
        return file;
    }

    contextHandler() {
        this.node.lastChild.addEventListener('context', e => {
            e.preventDefault()
        })
    }


}
