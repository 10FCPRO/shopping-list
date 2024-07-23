const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
const itemFilter = document.getElementById("filter");
const formBtn = itemForm.querySelector("button");
let isEditMode = false;

function onAddItemSubmit(e) {
  e.preventDefault();
  const newItem = itemInput.value;
  itemInput.value = "";
  // Validations
  if (newItem === "") {
    alert("Please add an item");
    return;
  }
  if (isEditMode) {
    const itemToEdit = itemList.querySelector(".edit-mode");
    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.remove();
  } else {
    if (checkItemExists(newItem)) {
      alert("Item already exists!");
      return;
    }
  }
  addItemToDOM(newItem);
  addItemToLocalStorage(newItem);
}

function addItemToDOM(item) {
  const li = document.createElement("li");
  const text = document.createTextNode(item);
  li.appendChild(text);

  const btn = createButton("remove-item btn-link text-red");
  li.appendChild(btn);
  itemList.appendChild(li);
  checkUI();
}

function addItemToLocalStorage(item) {
  let itemsFromStorage = getItemsFromLocalStorage();
  // Add new item to array
  itemsFromStorage.push(item);

  //Convert to JSON String and set to local storage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function createButton(classes) {
  const btn = document.createElement("button");
  btn.className = classes;

  const icon = createIcon("fa-solid fa-xmark");
  btn.appendChild(icon);
  return btn;
}

function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}

function onClickItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    removeItem(e.target.parentElement.parentElement);
  } else if (e.target.tagName !== "UL") {
    setItemToEdit(e.target);
  }
}

function checkItemExists(item) {
  let itemsFromStorage = getItemsFromLocalStorage();
  // if (itemsFromStorage.includes(item)) {
  //   return true;
  // } else return false;
  itemsFromStorage = itemsFromStorage.map((i) => (i = i.toLowerCase()));
  item = item.toLowerCase();

  return itemsFromStorage.includes(item);
}

function setItemToEdit(item) {
  isEditMode = true;

  itemList
    .querySelectorAll("li")
    .forEach((i) => i.classList.remove("edit-mode"));

  item.classList.add("edit-mode");
  formBtn.style.backgroundColor = "#228b22";
  formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
  itemInput.value = item.textContent;
  console.log(itemList.children);
}

function removeItem(item) {
  if (confirm("Are you sure?")) {
    item.remove();
    removeItemFromStorage(item.textContent);
    checkUI();
  }
}

function removeItemFromStorage(item) {
  let itemsFromStorage = getItemsFromLocalStorage();
  itemsFromStorage = itemsFromStorage.filter(
    (itenFromStorage) => itenFromStorage !== item
  );
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function removeAllItems(e) {
  // itemList.innerHTML ='';

  // const children = Array.from(itemList.children);
  // children.forEach((item) => item.remove());

  while (itemList.firstChild) {
    itemList.firstChild.remove();
  }
  localStorage.removeItem("items");
  checkUI();
}

function checkUI() {
  const items = itemList.children;
  if (items.length === 0) {
    clearBtn.style.display = "none";
    itemFilter.style.display = "none";
  } else {
    clearBtn.style.display = "block";
    itemFilter.style.display = "block";
  }

  formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
  formBtn.style.backgroundColor = "#333";
  isEditMode = false;
}

function filter(e) {
  const items = itemList.querySelectorAll("li");
  const text = e.target.value.toLowerCase();
  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();
    if (itemName.indexOf(text) == -1) {
      item.style.display = "none";
      console.log(item.style.display);
    } else {
      item.style.display = "flex";
    }
  });
}

function getItemsFromLocalStorage() {
  let itemsFromStorage;
  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }
  return itemsFromStorage;
}

function displayItems() {
  const items = getItemsFromLocalStorage();
  items.forEach((item) => addItemToDOM(item));
  checkUI();
}

function init() {
  itemForm.addEventListener("submit", onAddItemSubmit);
  itemList.addEventListener("click", onClickItem);
  clearBtn.addEventListener("click", removeAllItems);
  itemFilter.addEventListener("input", filter);
  window.addEventListener("DOMContentLoaded", displayItems);
}

init();
