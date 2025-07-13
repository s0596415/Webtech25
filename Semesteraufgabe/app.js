
// === Konfiguration ===
const API_BASE_URL = 'http://localhost:3000/api/anleitung';
let aktuelleAnleitung = null;

// === AppState ===
const AppState = {
    currentImageIndex: 0,
    isEditing: false,
    maschenZaehler: 0,
    zaehlerSchritt: 1,
    anleitung: null // Wird nach dem Laden gesetzt!
};

let editData = {};
const bilder = [
   
];



// === Anleitung laden ===
async function ladeAnleitung(id) {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (response.ok) {
        const anleitung = await response.json();
        AppState.anleitung = anleitung;
        aktuelleAnleitung = anleitung;
        renderAll();
    } else {
        alert('Anleitung konnte nicht geladen werden!');
    }
}

// === Render-Funktionen ===
function renderImages() {
    if (!bilder.length) return;
    document.getElementById('main-image').src = bilder[AppState.currentImageIndex];
    document.getElementById('image-counter').textContent = `${AppState.currentImageIndex + 1} / ${bilder.length}`;
}

function renderMaterials() {
    if (!AppState.anleitung) return;
    const container = document.getElementById('materials-display');
    container.innerHTML = AppState.anleitung.materialien.map(material => 
        `<div class="material-item">
            <div class="material-dot"></div>
            <span>${material}</span>
        </div>`
    ).join('');
}

function renderMaterialsEdit() {
    const container = document.getElementById('materials-edit');
    container.innerHTML = editData.materialien.map((material, index) => 
        `<div class="edit-row">
            <input type="text" value="${material}" onchange="updateMaterial(${index}, this.value)">
            <button class="btn red" onclick="removeMaterial(${index})">✕</button>
        </div>`
    ).join('') + '<button class="add-btn" onclick="addMaterial()">+ Material</button>';
}

function renderRounds() {
    if (!AppState.anleitung) return;
    const container = document.getElementById('rounds-display');
    container.innerHTML = AppState.anleitung.runden.map((runde, index) => 
        `<div class="round-item ${runde.completed ? 'completed' : ''}">
            <input type="checkbox" ${runde.completed ? 'checked' : ''} 
                   onchange="toggleRound(${index})">
            <span class="round-text ${runde.completed ? 'completed' : ''}">${runde.text}</span>
        </div>`
    ).join('');
}

function renderRoundsEdit() {
    const container = document.getElementById('rounds-edit');
    container.innerHTML = editData.runden.map((runde, index) => 
        `<div class="edit-row">
            <input type="text" value="${runde.text}" onchange="updateRound(${index}, this.value)">
            <button class="btn red" onclick="removeRound(${index})">✕</button>
        </div>`
    ).join('') + '<button class="add-btn" onclick="addRound()">+ Runde</button>';
}

function renderComments() {
    if (!AppState.anleitung) return;
    document.getElementById('comments-display').textContent = AppState.anleitung.kommentare;
    document.getElementById('comments-edit').value = editData.kommentare || AppState.anleitung.kommentare;
}

function renderCounter() {
    document.getElementById('counter-number').textContent = AppState.maschenZaehler;
}

// === Event Handler ===
function nextImage() {
    AppState.currentImageIndex = (AppState.currentImageIndex + 1) % bilder.length;
    renderImages();
}

function prevImage() {
    AppState.currentImageIndex = (AppState.currentImageIndex - 1 + bilder.length) % bilder.length;
    renderImages();
}

function increaseCounter() {
    AppState.maschenZaehler += AppState.zaehlerSchritt;
    renderCounter();
}

function decreaseCounter() {
    AppState.maschenZaehler = Math.max(0, AppState.maschenZaehler - AppState.zaehlerSchritt);
    renderCounter();
}

function resetCounter() {
    AppState.maschenZaehler = 0;
    renderCounter();
}

function setStep(step) {
    AppState.zaehlerSchritt = step;
    document.querySelectorAll('.step-btn').forEach((btn, i) => {
        btn.classList.toggle('active', [1, 10][i] === step);
    });
}

function toggleRound(index) {
    AppState.anleitung.runden[index].completed = !AppState.anleitung.runden[index].completed;
    renderRounds();
}

function startEditing() {
    AppState.isEditing = true;
    editData = JSON.parse(JSON.stringify(AppState.anleitung));
    
    document.getElementById('edit-btn').classList.add('hidden');
    document.getElementById('save-btn').classList.remove('hidden');
    document.getElementById('cancel-btn').classList.remove('hidden');
    
    document.getElementById('materials-display').classList.add('hidden');
    document.getElementById('materials-edit').classList.remove('hidden');
    document.getElementById('rounds-display').classList.add('hidden');
    document.getElementById('rounds-edit').classList.remove('hidden');
    document.getElementById('comments-display').classList.add('hidden');
    document.getElementById('comments-edit').classList.remove('hidden');
    document.getElementById('youtube-edit-section').classList.remove('hidden');
    
    renderMaterialsEdit();
    renderRoundsEdit();
    renderComments();
    document.getElementById('youtube-edit').value = editData.youtubeLink;
}

async function saveChanges() {
    editData.kommentare = document.getElementById('comments-edit').value;
    editData.youtubeLink = document.getElementById('youtube-edit').value;

    const id = AppState.anleitung._id || (aktuelleAnleitung && aktuelleAnleitung._id);
    if (!id) {
        alert("Keine Anleitung ausgewählt!");
        return;
    }

    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData)
    });

    if (response.ok) {
        const neueAnleitung = await response.json();
        AppState.anleitung = neueAnleitung;
        aktuelleAnleitung = neueAnleitung;
        cancelEditing();
        renderAll();
        alert('Gespeichert!');
    } else {
        alert('Fehler beim Speichern!');
    }
}

function cancelEditing() {
    AppState.isEditing = false;
    document.getElementById('edit-btn').classList.remove('hidden');
    document.getElementById('save-btn').classList.add('hidden');
    document.getElementById('cancel-btn').classList.add('hidden');
    document.getElementById('materials-display').classList.remove('hidden');
    document.getElementById('materials-edit').classList.add('hidden');
    document.getElementById('rounds-display').classList.remove('hidden');
    document.getElementById('rounds-edit').classList.add('hidden');
    document.getElementById('comments-display').classList.remove('hidden');
    document.getElementById('comments-edit').classList.add('hidden');
    document.getElementById('youtube-edit-section').classList.add('hidden');
}

// === Edit Functions ===
function updateMaterial(index, value) {
    editData.materialien[index] = value;
}
function addMaterial() {
    editData.materialien.push("Neues Material");
    renderMaterialsEdit();
}
function removeMaterial(index) {
    editData.materialien.splice(index, 1);
    renderMaterialsEdit();
}
function updateRound(index, value) {
    editData.runden[index].text = value;
}
function addRound() {
    editData.runden.push({ text: `R${editData.runden.length + 1}: `, completed: false });
    renderRoundsEdit();
}
function removeRound(index) {
    editData.runden.splice(index, 1);
    renderRoundsEdit();
}

// === Render All ===
function renderAll() {
    renderImages();
    renderMaterials();
    renderRounds();
    renderComments();
    renderCounter();
}

// === Initialisierung ===
window.onload = function() {
    ladeAnleitung(ANLEITUNG_ID);
};
