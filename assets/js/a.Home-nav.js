let dragging = false;

function makeElementDraggable(el) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    el.onmousedown = dragMouseDown;
    el.ontouchstart = dragTouchStart;

    window.addEventListener("resize", updatePositionOnResize);

    function dragMouseDown(e) {
        e.preventDefault();
        startDrag(e.clientX, e.clientY);
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function dragTouchStart(e) {
        const touch = e.touches[0];
        startDrag(touch.clientX, touch.clientY);
        document.ontouchend = closeDragElement;
        document.ontouchmove = elementTouchDrag;
    }

    function startDrag(clientX, clientY) {
        dragging = false;
        pos3 = clientX;
        pos4 = clientY;
    }

    function elementDrag(e) {
        e.preventDefault();
        dragAction(e.clientX, e.clientY);
    }

    function elementTouchDrag(e) {
        const touch = e.touches[0];
        dragAction(touch.clientX, touch.clientY);
    }

    function dragAction(clientX, clientY) {
        dragging = true;
        pos1 = pos3 - clientX;
        pos2 = pos4 - clientY;
        pos3 = clientX;
        pos4 = clientY;
        el.style.top = (el.offsetTop - pos2) + "px";
        el.style.left = (el.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
        document.ontouchend = null;
        document.ontouchmove = null;

        updateElementPosition();
    }

    function updateElementPosition() {
        const currentY = el.offsetTop;
        const windowHeight = window.innerHeight;
        let newY = currentY;

        if (currentY < 7) {
            newY = 7;
        } else if (currentY > (windowHeight - el.offsetHeight - 7)) {
            newY = windowHeight - el.offsetHeight - 7;
        }

        const windowWidth = window.innerWidth;
        const currentX = el.offsetLeft;
        let newX;

        if (currentX < (windowWidth / 2)) {
            newX = 7;

            const rightMulticons = document.querySelectorAll('[id^="rmulticon"]');
            rightMulticons.forEach(function (element) {
                const newId = element.id.replace('rmulticon', 'lmulticon');
                element.id = newId;
            });
        } else {
            newX = windowWidth - el.offsetWidth - 7;

            const leftMulticons = document.querySelectorAll('[id^="lmulticon"]');
            leftMulticons.forEach(function (element) {
                const newId = element.id.replace('lmulticon', 'rmulticon');
                element.id = newId;
            });
        }
        setTimeout(() => {
            el.style.left = newX + "px";
            el.style.top = newY + "px";
            dragging = false;
        }, 100);
    }

    function updatePositionOnResize() {
        updateElementPosition();
    }
}

function shownav() {
    if (!dragging) {
        const elements = document.querySelectorAll('.navhide');
        elements.forEach(function (element) {
            if (element.classList.contains('show')) {
                element.classList.remove('show');
                element.classList.add('hide');
                element.classList.add('over');
            } else {
                element.classList.add('show');
                element.classList.remove('hide');
                element.classList.add('disabled');
                setTimeout(function () {
                    element.classList.remove('over');
                    element.classList.remove('disabled');
                }, 500);
            }
        });
    }
}

function checkScreenSize() {
    const elements = document.querySelectorAll('.navhide');
    if (window.innerWidth > 768) {
        elements.forEach(function (element) {
            element.classList.remove('show');
            element.classList.add('hide');
            element.classList.add('over');
        });
    }
}

function observeClassChanges(targetElement, classToRemove, affectedElementsSelector, classToRemoveFromAffected, classToAddFromAffected) {
    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.attributeName === "class") {
                const currentClassList = mutation.target.classList;
                if (!currentClassList.contains(classToRemove)) {
                    const affectedElements = document.querySelectorAll(affectedElementsSelector);
                    affectedElements.forEach(function (affectedElement) {
                        affectedElement.classList.remove(classToRemoveFromAffected);
                        affectedElement.classList.add(classToAddFromAffected);
                    });
                }
            }
        });
    });

    observer.observe(targetElement, { attributes: true });
}

window.onload = function () {
    makeElementDraggable(document.getElementById("navbutt"));
    window.addEventListener('resize', checkScreenSize);
    const elementToWatch = document.querySelector('.navradius');
    observeClassChanges(elementToWatch, 'show', '.multicon', 'show', 'hide');

    document.querySelector('#Pages div i').parentElement.addEventListener('click', function () {
        const multicons = document.querySelectorAll('.multiconpage');
        multicons.forEach(function (multiconpage) {
            const newClass = multiconpage.id;
            if (multiconpage.classList.contains('show')) {
                multiconpage.classList.remove('show');
                multiconpage.classList.add('hide');
            } else {
                multiconpage.classList.add('show');
                multiconpage.classList.remove('hide');
            }
        });
    });

    document.querySelector('#Transpos div i').parentElement.addEventListener('click', function () {
        const multicons = document.querySelectorAll('.multicontran');
        multicons.forEach(function (multicontran) {
            const newClass = multicontran.id;
            if (multicontran.classList.contains('show')) {
                multicontran.classList.remove('show');
                multicontran.classList.add('hide');
            } else {
                multicontran.classList.add('show');
                multicontran.classList.remove('hide');
            }
        });
    });
};
// chặn Devtool
// setInterval(function () {
//     if (window.outerHeight - window.innerHeight > 100 || window.outerWidth - window.innerWidth > 100) {
//         alert("Wut ảe u doing bro?");
//         window.location.reload();
//     }
// }, 1000);

// document.addEventListener('keydown', function (event) {
//     if (event.key === 'F12' ||
//         ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'I') ||
//         ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'J') ||
//         ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'C') ||
//         ((event.ctrlKey || event.metaKey) && event.key === 'U')) {
//         event.preventDefault();
//         alert("Wellcome to Devtool Lmao");
//     }
// });

// document.addEventListener('copy', function (event) {
//     event.preventDefault();
//     alert("Coppy Failed Successful !!!");
// });

// document.addEventListener('contextmenu', function (event) {
//     event.preventDefault();
//     alert("Rai cờ líc đít sa bờ lẹt");
// });

// // Lấy kích thước màn hình thiết bị
// let chieuRong = window.screen.width;
// let chieuCao = window.screen.height;
// // Tính giá trị 1/1080 chiều cao
// let motPhanChieuCao = chieuCao / 1080;
// let motPhanChieuRong = chieuRong / 1920;
// // Gán giá trị cho custom properties trong CSS
// document.documentElement.style.setProperty('--wid', chieuRong + 'px');
// document.documentElement.style.setProperty('--hig', chieuCao + 'px');

// // Gán giá trị cho biến CSS --phan-chieu-cao
// document.documentElement.style.setProperty('--pix', motPhanChieuCao + 'px');
// document.documentElement.style.setProperty('--pot', motPhanChieuRong + 'px');

