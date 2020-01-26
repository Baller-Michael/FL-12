const structure = [
    {
      'folder': true,
      'title': 'Films',
      'children': [
        {
          'title': 'Iron Man.avi'
        },
        {
          'folder': true,
          'title': 'Fantasy',
          'children': [
            {
              'title': 'The Lord of the Rings.avi'
            },
            {
              'folder': true,
              'title': 'New folder 1',
              'children': false
            }
          ]
        }
      ]
    },
    {
      'folder': true,
      'title': 'Documents',
      'children': [
        {
          'folder': true,
          'title': 'EPAM Homework answers',
          'children': null
        }
      ]
    }
];

const rootNode = document.getElementById('root');

function createStructure(arr, parent) {
	arr.forEach(function(el, index, array){
		let folderEl = document.createElement('div');
		folderEl.className = 'folder';
		folderEl.innerHTML = `<span class="folder-opener">
									<i class="material-icons">folder</i>
									<span class="text">${el.title}</span>
							  </span>
							  <div class="folder-slide"></div>`;

		let fileEl = document.createElement('span');
		fileEl.className = 'file';
		fileEl.innerHTML =`<i class="material-icons">insert_drive_file</i>
						   <span class="text">${el.title}</span>`;

		if(!parent) {
			if(el.folder) {
				if(!el.children) {
					folderEl.lastElementChild.insertAdjacentHTML('afterbegin','<span class="empty">Folder is' +
						' empty</span>');
				}

				rootNode.append(folderEl);
			} else {
				rootNode.append(fileEl);
			}
		} else {
			if(el.folder) {
				if(!el.children) {
					folderEl.lastElementChild.insertAdjacentHTML('afterbegin','<span class="empty">Folder is' +
						' empty</span>');
				}

				parent.append(folderEl);
			} else {
				parent.append(fileEl);
			}
		}

		if(el.children){
			createStructure(el.children, folderEl.lastElementChild);
			parent = null;

		} else if(el.children && array.length === index + 1) {
			parent = null;

		} else if(!el.children && array.length === index + 1) {
			parent = null;

		} else if(!el.children && array.length > index) {
			return false;
		} else {
			parent = null;
		}
	});
}

createStructure(structure);

let openerArr = document.querySelectorAll('.open-folder');

openerArr.forEach(function(opener){
	opener.addEventListener('click', function (){
		let folderParent = this.parentElement;
		folderParent.classList.toggle('active');

		this.firstChild;

		if(folderParent.classList.contains('active')) {
			this.firstElementChild.innerHTML = 'folder_open';
		} else {
			this.firstElementChild.innerHTML = 'folder';
		}
	});
});