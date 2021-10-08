let rightClickNode;
let leftClickNode;
let folders = [];

// context menu
class ContextMenu {
    static file = document.getElementById('custom_contextMenu');

    static openContext(e) {
        this.file.style.display = 'inline-block';
        this.file.style.left = `${e.clientX + 8}px`;
        this.file.style.top = `${e.clientY + 8}px`;
    }

    static closeContext() {
        this.file.style.display = 'none';
    }

    static changeContextMenu(e) { // 우클릭용
        switch (e.target.className) {
            case 'desktop' :
            case 'storage':
                ContextMenu.file.children[0].style.display = 'block';
                ContextMenu.file.children[1].style.display = 'block';
                ContextMenu.file.children[2].style.display = 'none';

                break;
            case 'folder':
            case 'icon':
            case 'fas fa-folder':
            case 'fas fa-file':
                ContextMenu.file.children[0].style.display = 'none';
                ContextMenu.file.children[1].style.display = 'none';
                ContextMenu.file.children[2].style.display = 'block';

                break;
            default:
                ContextMenu.file.children[0].style.display = 'none';
                ContextMenu.file.children[1].style.display = 'none';
                ContextMenu.file.children[2].style.display = 'none';

                break;
        }
    }

    static selectContextMenu(e) {  // 좌클릭용
        switch (e.target.id) {
            case 'createIconMenu':
                const icon = new Icon();
                rightClickNode.appendChild(icon.file);
                dragFile(icon.file);
                break;
            case 'createFolderMenu':
                const folder = new Folder();
                folders.push(folder);
                rightClickNode.appendChild(folder.file);
                e.currentTarget.appendChild(folder.windo.file);
                dragFile(folder.windo.file);
                dragFile(folder.file);
                if(rightClickNode.className!=='storage'){
                    dragFile(folder.file);
                }
                break;
            case 'deleteElementMenu' :
                if (rightClickNode.tagName === 'I') {
                    rightClickNode = rightClickNode.parentNode;
                }

                if (rightClickNode.className === 'icon') {
                    rightClickNode.remove();
                } else if (rightClickNode.className === 'folder') {
                    [...folders].forEach(folder => {
                        if (rightClickNode === folder.file) {
                            folder.delete();
                        }
                    })
                }
                break;

        }
    }
}


document.body.addEventListener('contextmenu', rightClick);
document.body.addEventListener('click', leftClick);
document.body.addEventListener('dblclick', doubleClick);
// document.body.addEventListener('click', leftClick);

// 클릭별 모음
function rightClick(e) {
    e.preventDefault();

    rightClickNode = e.target;
    ContextMenu.changeContextMenu(e);
    ContextMenu.openContext(e);

}

function leftClick(e) {
    leftClickNode = e.target;
    ContextMenu.closeContext();
    ContextMenu.selectContextMenu(e);
    closeWindow(e);
}

function doubleClick(e) {

    openFolder(e);
}

// 그 외
function closeWindow(e) {
    if (e.target.className === 'closeBtn') {
        e.target.parentNode.parentNode.parentNode.style.display = 'none';
    }
}

function openFolder(e) {
    [...folders].forEach(folder => {
        if (folder.file === e.target || folder.file === e.target.parentNode) {
            folder.windo.file.style.display = 'block';
        }
    });
}

// drag 이벤트
function dragFile(file) {
        const offset = {x: 0, y: 0};
        const initialMousePos = {x: 0, y: 0};

        // mousemove
        const moveHandler = e => {
            offset.x = e.clientX - initialMousePos.x;
            offset.y = e.clientY - initialMousePos.y;
            file.style.transform = `translate3d(${offset.x}px,${offset.y}px,0)`;

        };
        // mousedown
        function md (e){
            initialMousePos.x = e.clientX - offset.x;
            initialMousePos.y = e.clientY - offset.y;
            document.addEventListener('mousemove', moveHandler);
            e.stopPropagation();
        }
        file.addEventListener('mousedown', md);

        // mouseup
        document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', moveHandler)
        });
}

