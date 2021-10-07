class Common {
    constructor(classValue) {
        this.node = this.makeNode(classValue);
    }

    makeNode(classValue) {
        const node = document.createElement('div');
        node.setAttribute('class', classValue);
        return node;
    }

    appendNode(childNode) {
        this.node.appendChild(childNode);
    }

    removeSelf() {
        this.node.remove();
    }


}

// Wallpaper
class Wallpaper extends Common {
    constructor(desktop, classValue = 'wallpaper') {
        super(classValue);
        desktop.appendChild(this.node);
        this.folders = [];
        this.icons = [];
    }
}


// Icon
class Icon extends Common {
    constructor(name = '', classValue = 'icon', iconClass = 'fas fa-file') {
        super(classValue);
        this.appendTotal(name, iconClass);
    }

    makeIcon(iconClass) {
        const i = document.createElement('i');
        i.setAttribute('class', iconClass)
        return i;
    }

    makeText(name) {
        const text = document.createElement('span');
        text.innerText = name;
        return text;
    }

    appendTotal(name, iconClass) {
        this.appendNode(this.makeIcon(iconClass));
        this.appendNode(this.makeText(name));
    }

}

// Folder
class Folder extends Icon {
    constructor(name = '', classValue = 'folder', iconClass = 'fas fa-folder') {
        super(name, classValue, iconClass);
        this.windowNode = new Window(name);
    }

    removeSelf() {
        this.node.remove();
        this.windowNode.node.remove();
    }
}


// Window
class Window extends Common {
    constructor(name = '', classValue = 'window') {
        super(classValue);
        this.appendNode(this.makeWindowView());
        this.appendNode(this.makeInnerBox());
    }

    makeWindowView() {
        const menu = document.createElement('div');
        menu.setAttribute('class', 'windowMenu');
        const button = document.createElement('button');
        button.innerText = 'X';
        menu.appendChild(button);
        return menu;
    }

    makeInnerBox() {
        const innerbox = document.createElement('div');
        innerbox.setAttribute('class','innerbox')
        return innerbox;
    }
}

// 그 외의 기능들
const contextMenu = document.getElementById("custom_contextMenu");
const createIconMenu = document.getElementById("createIconMenu");
const createFolderMenu = document.getElementById("createFolderMenu");
const deleteElementMenu = document.getElementById("deleteElementMenu");


function eventHandler(wallpaper) {
    let clickNode;
    wallpaper.node.addEventListener('contextmenu', contextMenuHandler);
    wallpaper.node.addEventListener('click', clickHandler);
    contextMenu.addEventListener('click', selectMenu);
    wallpaper.node.addEventListener('dblclick', openFolder);

// 더블클릭시 폴더열기 + 닫기
    function openFolder(e) {
        for (let folder of wallpaper.folders) {
            if (e.target === folder.node || e.target.parentNode === folder.node) {
                folder.windowNode.node.style.display = 'flex';
                folder.windowNode.node.style.flexDirection = 'column';

            }
            folder.windowNode.node.firstChild.firstChild.addEventListener('click', () => {
                folder.windowNode.node.style.display = 'none';
            })
        }

    }


// 데스크탑 클릭 핸들러
    function clickHandler(e) {
        // 메뉴안보이게
        invisibleMenu();


        function invisibleMenu() {
            contextMenu.style.display = 'none';
            contextMenu.style.top = null;
            contextMenu.style.left = null;
        }
    }


// 데스크탑 마우스 오른쪽 핸들러
    function contextMenuHandler(e) {
        // 호출은 여기에
        visibleMenu(e);
        // 함수는 여기에
        // 메뉴보이게
        function visibleMenu() {
            e.preventDefault();

            // 선택적 메뉴
            clickNode = e.target;

            if (clickNode === wallpaper.node) {
                viewWallpaperMenu();
            } else {
                viewFolderMenu();
                for (let window of document.querySelectorAll('.window')) {
                    console.log(window.lastChild);
                    if (window.lastChild === clickNode) {
                        viewWallpaperMenu();
                    }
                }
            }


            contextMenu.style.display = 'block';

            contextMenu.style.left = `${e.clientX + 8}px`;
            contextMenu.style.top = `${e.clientY + 8}px`;
        }

        function filter(e) {
            switch (e.target) {

            }
        }

        function viewFolderMenu() {
            createIconMenu.style.display = 'none';
            createFolderMenu.style.display = 'none';
            deleteElementMenu.style.display = 'block';
        }

        function viewWallpaperMenu() {
            createIconMenu.style.display = 'block';
            createFolderMenu.style.display = 'block';
            deleteElementMenu.style.display = 'none';
        }

    }


//


// 메뉴선택
    function selectMenu(e) {
        switch (e.target) {
            case createIconMenu :
                const icon = new Icon();
                clickNode.appendChild(icon.node);
                wallpaper.icons.push(icon);
                dragFile();
                break;

            case createFolderMenu:
                const folder = new Folder();
                clickNode.appendChild(folder.node);
                wallpaper.folders.push(folder);
                wallpaper.node.appendChild(folder.windowNode.node);
                dragFile();
                break;

            case deleteElementMenu:
                for (let folder of wallpaper.folders) {
                    if (folder.node === clickNode || clickNode.parentNode === folder.node) {
                        folder.removeSelf();
                    }
                }
                for (let icon of wallpaper.icons) {
                    if (icon.node === clickNode || clickNode.parentNode === icon.node) {
                        icon.removeSelf();
                    }
                }
                break;
        }
    }

}


// 드래그 이벤트

function dragFile() {
    const files = document.querySelectorAll('section[id*=desktop] >.wallpaper>*');
    for (let file of files) { // 이미지가 찍혀도 div가 움직이도록.
        const offset = {x: 0, y: 0};
        const initialMousePos = {x: 0, y: 0};

        // mousemove
        const moveHandler = e => {
            offset.x = e.clientX - initialMousePos.x;
            offset.y = e.clientY - initialMousePos.y;
            file.style.transform = `translate3d(${offset.x}px,${offset.y}px,0)`;

        };

        // mousedown

        file.addEventListener('mousedown', e => {

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



