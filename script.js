const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");

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

itemForm.addEventListener("submit", onAdd);
