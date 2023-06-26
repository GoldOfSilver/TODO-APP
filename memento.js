// TRUCs de base

//constante variable
let prenom = jason;
let nombre = 0;

const fruits = ("Banane", "Fraise", "Pomme");
const etudiant = {
    prenom: "Jason",
    nom: "Simonis"
};

// Capturer un événement d'un seul objet
document.getElementById('machin').addEventListener('click', function() {
    // ...
});

document.querySelector('#machin').addEventListener('click', function() {
    // ...
});

// Capturer un événement plusieurs objets
document.querySelectorAll('.machin').forEach(elt => {
elt.addEventListener('click', function () {
    // ...
});
});