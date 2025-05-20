let itemForm;
let itemInput;
let itemsList;

function setup() {
     itemForm  = document.getElementById('item-form');
     itemInput = document.getElementById('itemInput');
     itemsList = document.getElementById('itemsList');
    
    itemForm.addEventListener('submit',formSubmit);       
}

function formSubmit(event) {
    event.preventDefault();
        
    const inputValue = itemInput.value.trim();
    
    if (inputValue) {
        addElement(inputValue);
    }
}

function addElement( value ) {
    // Create new list item
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item';
    const itemId = "li-" + genId();

    const itemTitle = document.createElement("div");
    itemTitle.textContent = value;
    listItem.appendChild(itemTitle);
    
    const itemIdEmt = document.createElement("pre");
    itemIdEmt.textContent = itemId;
    listItem.appendChild(itemIdEmt);
    
    const removeBtn = document.createElement("button");
    removeBtn.innerHTML = "&check;";
    removeBtn.classList.add("btn","btn-sm","btn-success");
    removeBtn.onclick = ()=>{
        listItem.classList.add("completed");
        itemTitle.textContent = `${value} (done)`;
    };
    listItem.appendChild(removeBtn);



    listItem.setAttribute("id",itemId)

    // Add the new item to the list
    itemsList.appendChild(listItem);
    
    // Clear the input field
    itemInput.value = '';
}

const ID_CHARS="qwertasdfgzxcvbmnlkjhpoiyu12324567890_";

function genId() {

    const idArr = [];
    for ( let i=0; i<5; i++ ) {
        idArr.push( ID_CHARS[ Math.floor(Math.random()*ID_CHARS.length) ]);
    }
    return idArr.join("");
}