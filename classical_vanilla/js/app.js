// Je remplis artificiellement le localStorage.tasks
// localStorage.tasks = JSON.stringify([
//     {id: 1, content: "Tâche 1", completed: true},
//     {id: 2, content: "Tâche 2", completed: false}
// ]);

// {id:xxx, content: 'xx', completed:xxx}
function getTaskDomElement (task) {
  const li = document.createElement("li");
  // J'ajoute le data-id avec l'ide de la task
  li.dataset.id = task.id;
  if (task.completed) {
    li.classList.add('completed');
  } 
  li.innerHTML = `
    <div class="view">
        <input class="toggle" type="checkbox" ${ task.completed ? 'checked': '' } />
        <label class="editable">${ task.content } </label>
        <button class="destroy"></button>
    </div>`;
  return li;
}

// 1. Initialiser le localstorage
// tasks -> []
    if (localStorage.tasks === undefined) {
        localStorage.tasks = JSON.stringify([]);
    }

// 2. Afficher les tasks dans le DOM
const ul = document.querySelector(".todo-list");
const tasks = JSON.parse(localStorage.tasks);
tasks.forEach(task => {
  ul.appendChild(getTaskDomElement(task));
});

// initialiser les function
renderNotCompletedCount();
editabletask();
validateedit();

// AJOUT D'UNE TÂCHE ------------------------------------------
// Keyup, enter et que le champ n'est pas vide
// Créer un li et l'ajouter dans le UL
// Il va falloir mettre à jour le tableau tasks et le localStorage
document.querySelector(".new-todo").addEventListener("keyup",function (e){
  if(e.key === "Enter" && this.value != ''){
    // 1. Créer un objet littéral
    const newTask = {
        id: new Date().valueOf(),
        content: this.value,
        completed: false,
    };

    // 2. Ajouter un li dans le ul (insertBefore)
    ul.insertBefore(getTaskDomElement(newTask), ul.firstChild);
        
    // 3. Ajouter la tâche dans tasks (push)
    tasks.unshift(newTask);

    // 4. Ecraser le localStorage.tasks avec les tasks
    //localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.tasks = JSON.stringify(tasks);

    // 5. Vider le champs
    this.value = '';

    // Lance les function
    renderNotCompletedCount();
    editabletask();
    validateedit();
  }
});
    
// TERMINER UNE TÂCHE ------------------------------------------
// Quand on change le checkbox
// 1. On ajoute ou on supprime la classe 'completed' sur le li correspondant (toggle)
// 2. On Modifie la task dans le tasks (true/false)
// 3. on écrase le localStorage.tasks

// Capture par sélection
// document.querySelectorAll(".toggle").forEach(trigger => {
//     trigger.addEventListener('change', function() {
//         this.closest('li').classList.toggle("completed");
//     })
// });

// Capture par délégation
document.addEventListener('change', (e) => {
  if (e.target.matches('.toggle')) {
    e.target.closest('li').classList.toggle("completed");

    // On récupère l'id dans le li
    const id = e.target.closest('li').dataset.id;

    // On récupère dans le tableau tasks la task qui correspond à l'id
    const task = tasks.find(task => task.id == id);
    task.completed = !task.completed;

    // J'écrase le localStorage.tasks
    localStorage.tasks = JSON.stringify(tasks);

    // Relance les function
    renderNotCompletedCount();
    editabletask();
    validateedit();
  }
});

// SUPRIMER UNE TACHE
document.addEventListener('click', (e, i) => {
  if (e.target.matches('.destroy')) {
    // On supprime dans le local storage l'élément
    tasks.splice(i, 1);

    // J'écrase le localStorage.tasks
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Suppression dans le DOM
    e.target.closest('li').remove();

    // Relance des function
    renderNotCompletedCount();
    editabletask();
    validateedit();
  }
});

// Modification d'une tâche
editabletask();
validateedit();

// sauvegarder dans le localstorage
localStorage.tasks = JSON.stringify(tasks);

// Afficher toute les tâches dans le docuemnt
document.addEventListener('DOMContentLoaded', function() {
    const allLink = document.querySelector('a[href="#/"]');
    const todoList = document.querySelector('.todo-list');
  
    allLink.addEventListener('click', function(event) {
      event.preventDefault();
      const allItems = todoList.querySelectorAll('li');
  
      allItems.forEach(function(item) {
        item.classList.remove('hidden');
      });
    });

    // Relance des function
    renderNotCompletedCount();
    editabletask();
    validateedit();
});

// Afficher que les active dans le document
document.addEventListener('DOMContentLoaded', function() {
    const activeLink = document.querySelector('a[href="#/active"]');
    const todoList = document.querySelector('.todo-list');
  
    activeLink.addEventListener('click', function(event) {
      event.preventDefault();
      const allItems = todoList.querySelectorAll('li');
  
      allItems.forEach(function(item) {
        if (item.classList.contains('completed')) {
          item.classList.add('hidden');
        } else {
          item.classList.remove('hidden');
        }
      });
    });

    // Relance des function
    renderNotCompletedCount();
    editabletask();
    validateedit();
});

// Afficher que les completed dans le document
document.addEventListener('DOMContentLoaded', function() {
    const activeLink = document.querySelector('a[href="#/completed"]');
    const todoList = document.querySelector('.todo-list');
  
    activeLink.addEventListener('click', function(event) {
      event.preventDefault();
      const allItems = todoList.querySelectorAll('li');
      const completedItems = todoList.querySelectorAll('li.completed');
  
      allItems.forEach(function(item) {
        item.classList.add('hidden');
      });
  
      completedItems.forEach(function(item) {
        item.classList.remove('hidden');
      });
    });

    // Relance des function
    renderNotCompletedCount();
    editabletask();
    validateedit();
});

// Supprimer tout les tâches avec le bouton clear-completed
document.addEventListener('DOMContentLoaded', function() {
  const clearButton = document.querySelector('.clear-completed');
  const todoList = document.querySelector('.todo-list');

  clearButton.addEventListener('click', function(i) {
    const completedItems = todoList.querySelectorAll('li.completed');
    completedItems.forEach(function(item) {
      item.remove();
    });

    if (todoList.querySelectorAll('li.completed').length === 0) {
      clearButton.classList.add('hidden');
    }
  });

  // On supprime dans le local storage l'élément
  tasks.splice(i, 1);

  // J'écrase le localStorage.tasks
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // Relance des function
  renderNotCompletedCount();
  editabletask();
  validateedit();
});

// Function 
// pour compter le nombre délément présent dans le tableau
function renderNotCompletedCount() {
  const count = document.querySelectorAll(".todo-list li:not(.completed)").length
  document.querySelector('.todo-count').innerHTML = 
  `<strong>${count}</strong> item(s) left`;
}

// editer une tache
function editabletask() {
document.querySelectorAll(".editable").forEach(e => {
    e.addEventListener('dblclick', function(e) {
      const currentValue = document.querySelector('.editable').value;

      this.innerHTML = `<input type="text" class="validate" id="input-${Date.now()}" value="${currentValue}" />`;
    })
});
}

// valider une tache
function validateedit() {
document.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    // Récupère l'identifiant unique de l'input
    const inputId = e.target.id;

    // Récupère la valeur de l'input correspondant
    const newValue = document.querySelector(`#${inputId}`).value; 

    document.querySelector('.editable').innerHTML = newValue;
  }

// Relance des function
renderNotCompletedCount();
editabletask();
validateedit();
});
}