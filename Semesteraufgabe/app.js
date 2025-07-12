const API_BASE_URL = '/api/anleitung';
let aktuelleAnleitung = null;


const AppState = {
            currentImageIndex: 0,
            isEditing: false,
            maschenZaehler: 0,
            zaehlerSchritt: 1,
            anleitung: {
                titel: "Fadenzauber",
                materialien: [
                    "Baumwollgarn in Rot",
                    "Häkelnadel Stärke 4mm",
                    "Schere",
                    "Vernähnadel"
                ],
                runden: [
                    { text: "R1: 6 feste Maschen in einen Fadenring", completed: false },
                    { text: "R2: Jede Masche verdoppeln (12 fM)", completed: false },
                    { text: "R3: Jede 2. Masche verdoppeln (18 fM)", completed: false },
                    { text: "R4: Jede 3. Masche verdoppeln (24 fM)", completed: false }
                ],
                kommentare: "- viel Spaß in rot",
                youtubeLink: "https://youtube.com/watch?v=example"
            }
        };

        let editData = {};
        const bilder = [
            
        ];

        // Render Functions - Können später zu React Components werden
        function renderImages() {
            
        }

        function renderMaterials() {
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
            document.getElementById('comments-display').textContent = AppState.anleitung.kommentare;
            document.getElementById('comments-edit').value = editData.kommentare || AppState.anleitung.kommentare;
        }

        function renderCounter() {
            document.getElementById('counter-number').textContent = AppState.maschenZaehler;
        }

        // Event Handlers - Können später zu React Event Handlers werden
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

    // Die ID der aktuellen Anleitung holen
    const id = AppState.anleitung._id || (aktuelleAnleitung && aktuelleAnleitung._id);
    if (!id) {
        alert("Keine Anleitung ausgewählt!");
        return;
    }

    // API-Aufruf zum Speichern in der Datenbank
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

           
        
            cancelEditing();
            renderAll();
        

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

        // Edit Functions
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
            editData.runden.push({ text: `R${editData.runden.length + 1}: Neue Runde`, completed: false });
            renderRoundsEdit();
        }

        function removeRound(index) {
            editData.runden.splice(index, 1);
            renderRoundsEdit();
        }

        function renderAll() {
            renderImages();
            renderMaterials();
            renderRounds();
            renderComments();
            renderCounter();
        }

        // Initialize App
        renderAll();
