const rootNode = document.getElementById('root');
const ZERO = 0;
const TWO = 2;
const FIVE = 5;
const EIGHT = 8;

function Page() {
    const mainPage = document.createElement('div');
    const setBlock = document.createElement('div');
    const learnedBlock = document.createElement('div');
    const addNewBtn = document.createElement('button');
    const addPage = document.createElement('div');
    const titleInput = document.createElement('input');
    const confirmBtn = document.createElement('button');
    const cancelBtn = document.createElement('button');
    const terms = document.createElement('div');
    const addTerm = document.createElement('button');
    const modifyPage = document.createElement('div');
    const modifyTitleInput = document.createElement('input');
    const saveBtn = document.createElement('button');
    const modifyCancelBtn = document.createElement('button');
    const modifyTerms = document.createElement('div');
    const modifyAddTerm = document.createElement('button');


    addNewBtn.textContent = 'Add new';
    confirmBtn.textContent = 'Confirm';
    cancelBtn.textContent = 'Cancel';
    addTerm.textContent = 'Add Term';
    modifyAddTerm.textContent = 'Add Term';
    saveBtn.textContent = 'Save';
    modifyCancelBtn.textContent = 'Cancel';
    mainPage.classList.add('main_page');
    addNewBtn.classList.add('addButton');
    addPage.classList.add('.addNewWrapper');
    addPage.classList.add('setWrapper');
    setBlock.classList.add('modifyCancel');
    terms.classList.add('terms');
    modifyPage.classList.add('modifyButton');
    modifyPage.classList.add('open');
    modifyTerms.classList.add('deleteButton');
    mainPage.append(addNewBtn);
    mainPage.append(setBlock);
    mainPage.append(learnedBlock);
    addPage.append(titleInput);
    addPage.append(addTerm);
    addPage.append(confirmBtn);
    addPage.append(cancelBtn);
    addPage.append(terms);
    modifyPage.append(modifyTitleInput);
    modifyPage.append(modifyAddTerm);
    modifyPage.append(saveBtn);
    modifyPage.append(modifyCancelBtn);
    modifyPage.append(modifyTerms);
    rootNode.append(mainPage);
    rootNode.append(addPage);
    rootNode.append(modifyPage);

    if (localStorage.length !== ZERO) {
        drawSet();
    }

    cancelBtn.addEventListener('click', () => {
        window.location.hash = 'main';
    });

    addNewBtn.addEventListener('click', () => {
        window.location.hash = 'add';
    });


    modifyCancelBtn.addEventListener('click', () => {
        window.location.hash = 'main';
    });

    function saveNewSet(title, place, flag) {
        if (title.value) {
            let buff = new Array();
            buff.push(`${title.value}+`);
            const terms = document.querySelector(`.${place.getAttribute('class')}`).childNodes;

            terms.forEach((item) => {
                if (item.firstChild.value || item.firstChild.nextSibling.value) {
                    buff.push(`${item.firstChild.value}+`);
                    buff.push(`${item.firstChild.nextSibling.value}+`);
                } else {
                    alert('You should fill the gap');
                }
            });

            buff = buff.join('');
            let index = document.querySelector('.set_block');
            if (flag) {
                index = index.lastChild === null ? ZERO : +index.lastChild.getAttribute('id').substring(FIVE);
                localStorage.setItem(index, buff.slice(ZERO, buff.length - 1));
            } else {
                index = window.location.hash.substring(EIGHT);
                localStorage.removeItem(+index.substring(FIVE) - 1);
                localStorage.setItem(+index.substring(FIVE) - 1, buff.slice(ZERO, buff.length - 1));
            }

            window.location.hash = 'main';
            return index;
        } else {
            alert('You should fill Name');
            return false;
        }
    }

    confirmBtn.addEventListener('click', () => {
        renderSet(saveNewSet(titleInput, terms, true));
    });

    saveBtn.addEventListener('click', () => {
        saveChanges(saveNewSet(modifyTitleInput, modifyTerms, false));
    });

    function termAdder(place) {
        const block = document.createElement('div');
        const term = document.createElement('input');
        const def = document.createElement('input');
        const removeTerm = document.createElement('button');
        term.setAttribute('placeholder', 'Enter term');
        def.setAttribute('placeholder', 'Enter definition');
        removeTerm.textContent = 'Remove';
        removeTerm.classList.add('remove_term');

        block.classList.add('term_block');
        place.append(block);
        block.append(term);
        block.append(def);
        block.append(removeTerm);


        removeTerm.addEventListener('click', (event) => {
            const target = event.target.parentNode;
            target.setAttribute('id', 'delete');
            const parent = target.parentNode;

            parent.removeChild(target);
        });

        return { term, def };
    }

    addTerm.addEventListener('click', () => {
        termAdder(terms);
    }, false);
    modifyAddTerm.addEventListener('click', () => {
        termAdder(modifyTerms);
    }, false);


    function openAddPage() {
        clearInput(titleInput, terms);
        addPage.classList.toggle('open');
        mainPage.classList.toggle('open');
    }

    function openMainPage() {
        mainPage.classList.toggle('open');
        if (!modifyPage.classList.contains('open')) {
            modifyPage.classList.toggle('open');
        }
        if (!addPage.classList.contains('open')) {
            addPage.classList.toggle('open');
        }
    }

    function openModifyPage() {
        mainPage.classList.toggle('open');
        modifyPage.classList.toggle('open');
    }


    function removeListener(item) {
        item.addEventListener('click', (event) => {
            const target = event.target;
            const parent = target.parentNode.parentNode;

            let index = target.parentNode.getAttribute('id').substring(FIVE) - 1;
            localStorage.removeItem(index);
            parent.removeChild(target.parentNode);
        });
    }

    function editListener(item) {
        item.addEventListener('click', (event) => {
            clearInput(modifyTitleInput, modifyTerms);
            const target = event.target.parentNode;
            const id = +target.getAttribute('id').substring(FIVE);
            modifyTitleInput.value = target.firstChild.textContent;

            const buff = localStorage.getItem(id - 1).split('+');

            if (buff.length > 1) {
                for (let i = 1; i < buff.length; i += TWO) {
                    const termObj = termAdder(modifyTerms);

                    termObj.term.value = `${buff[i]}`;
                    termObj.def.value = `${buff[i + 1]}`;
                }
            }
            window.location.hash = `modify/item-${id}`;
        });
    }

    function renderSet(id) {
        if (id !== false) {
            const setItem = document.createElement('div');
            const setTitle = document.createElement('span');
            const removeBtn = document.createElement('button');
            const editBtn = document.createElement('button');

            let buff = localStorage.getItem(id);

            buff = buff.split('+');
            setTitle.textContent = buff[ZERO];
            removeBtn.textContent = 'Remove';
            editBtn.textContent = 'Edit';

            setItem.setAttribute('id', 'item-' + (id + 1));

            setItem.append(editBtn);
            setItem.append(setTitle);
            setItem.append(removeBtn);
            setBlock.append(setItem);
            removeListener(removeBtn);
            editListener(editBtn);
        }
    }

    function drawSet() {
        let keys = Object.keys(localStorage);
        let max = Math.max(...keys);
        for (let i = 0; i <= max; i++) {
            if (localStorage.getItem(i) !== null) {
                renderSet(i);
            } else {
                continue;
            }
        }
    }

    function clearInput(title, place) {
        title.value = '';
        const terms = document.querySelector(`.${place.getAttribute('class')}`);
        let elem = terms.firstChild;
        while (elem) {
            terms.removeChild(elem);
            elem = terms.firstChild;
        }
    }

    return {
        openAddPage,
        openMainPage,
        openModifyPage
    }
}

function saveChanges(index) {
    const block = document.getElementById(index);
    const buff = localStorage.getItem(+index.substring(FIVE) - 1).split('+');

    block.firstChild.textContent = buff[ZERO];

}

const WEBPAGE = new Page();


window.addEventListener('hashchange', hashControler);

function hashControler() {
    if (window.location.hash === '#add') {
        WEBPAGE.addPage();
    } else if (window.location.hash === '#main') {
        WEBPAGE.openMainPage();
    } else if (window.location.hash.includes('modify')) {
        WEBPAGE.openModifyPage();
    }
}