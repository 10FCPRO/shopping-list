const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");

function onAdd(e) {
  e.preventDefault();
  // Validations
  if (itemInput.value === "") {
    alert("Please add an item");
    return;
  }
  const li = document.createElement("li");
  const text = document.createTextNode(itemInput.value);
  li.appendChild(text);

  const btn = createButton("remove-item btn-link text-red");
  li.appendChild(btn);
  document.querySelector("ul").appendChild(li);
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

function removeItem(e) {
  if (e.target.tagName === "I") {
    e.target.parentElement.parentElement.remove();
  }
}

function removeAllItems(e) {
  // itemList.innerHTML ='';

  // const children = Array.from(itemList.children);
  // children.forEach((item) => item.remove());

  while (itemList.firstChild) {
    itemList.firstChild.remove();
  }
}

itemForm.addEventListener("submit", onAdd);
itemList.addEventListener("click", removeItem);
clearBtn.addEventListener("click", removeAllItems);
