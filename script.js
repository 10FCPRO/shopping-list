const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
const itemFilter = document.getElementById("filter");

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
  itemList.appendChild(li);
  checkItemList();
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
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();
    }
    checkItemList();
  }
}

function removeAllItems(e) {
  // itemList.innerHTML ='';

  // const children = Array.from(itemList.children);
  // children.forEach((item) => item.remove());

  while (itemList.firstChild) {
    itemList.firstChild.remove();
  }
  checkItemList();
}

function checkItemList() {
  const items = itemList.children;
  if (items.length === 0) {
    clearBtn.style.display = "none";
    itemFilter.style.display = "none";
  } else {
    clearBtn.style.display = "block";
    itemFilter.style.display = "block";
  }
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

itemForm.addEventListener("submit", onAdd);
itemList.addEventListener("click", removeItem);
clearBtn.addEventListener("click", removeAllItems);
window.addEventListener("DOMContentLoaded", checkItemList);
itemFilter.addEventListener("input", filter);
