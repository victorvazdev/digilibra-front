// GET /authors
async function loadAuthors() {
    try {
        const res = await fetch(`${API_URL}/authors`);
        const data = await res.json();
        renderAuthors(data.authors || []);
    } catch (e) {
        console.error(e);
        alert('Erro ao carregar autores.');
    }
}

// GET /author (Unitário)
async function searchAuthor() {
    const id = document.getElementById('search-a-id').value;
    if (!id) return alert('Informe o ID do autor(a).');
    try {
        const res = await fetch(`${API_URL}/author?id=${id}`);
        if (res.status === 404) return alert('Autor(a) não encontrado');
        const data = await res.json();
        renderAuthors([data]); // Renderiza como array para reaproveitar a função
    } catch (e) {
        console.error(e);
        alert('Erro ao carregar autor(a).');
    }
}

// POST /author
async function addAuthor() {
    const name = document.getElementById('a-name').value;
    if (!name) return alert('Informe o nome do(a) autor(a).');
    if (/^[\d\s]+$/.test(name)) return alert('O nome do autor(a) não pode ser composto apenas por números.');

    const formData = new FormData();
    formData.append('name', name);

    const res = await fetch(`${API_URL}/author`, {
        method: 'POST',
        body: formData
    });

    if (res.ok) {
        alert('Autor(a) adicionado!');
        document.getElementById('a-name').value = '';
        loadAuthors();
    } else {
        const err = await res.json();
        alert(err.message);
    }
}

// DELETE /author
async function deleteAuthor(id) {
    const author = currentAuthorsList.find(a => a.id === id);
    if (!author) return;

    if (!confirm(`Deseja mesmo deletar o(a) autor(a) ${author.name} (${id})?`)) return;
    const res = await fetch(`${API_URL}/author?id=${id}`, { method: 'DELETE' });
    if (res.ok) loadAuthors();
    else alert('Erro ao deletar autor(a).');
}

// PUT /update_author
async function submitUpdateAuthor() {
    const id = document.getElementById('upd-author-id').value;
    const newName = document.getElementById('upd-author-name').value;

    if (!newName) {
        alert("O nome do autor(a) não pode ficar vazio!");
        return;
    }

    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', newName);

    const res = await fetch(`${API_URL}/update_author`, {
        method: 'PUT',
        body: formData
    });

    if (res.ok) {
        closeUpdateAuthorModal();
        loadAuthors();
    } else {
        alert('Erro ao atualizar autor(a).');
    }
}

// Renderizador DOM Autores
function renderAuthors(authors) {
    currentAuthorsList = authors;
    const grid = document.getElementById('authors-grid');
    grid.innerHTML = '';
    
    authors.forEach(a => {
        grid.innerHTML += `
            <div class="card">
                <h3>${a.name}</h3>
                <p><strong>ID do Autor(a):</strong> ${a.id}</p>
                <div class="card-actions">
                    <button class="btn btn-warning flex-1" onclick="openUpdateAuthorModal(${a.id})">Editar</button>
                    <button class="btn btn-danger flex-1" onclick="deleteAuthor(${a.id})">Excluir</button>
                </div>
            </div>
        `;
    });
}

// Lógica do modal de autores
function openUpdateAuthorModal(id) {
    const author = currentAuthorsList.find(a => a.id === id);
    if (!author) return;

    document.getElementById('upd-author-id').value = author.id;
    document.getElementById('upd-author-name').value = author.name || '';

    document.getElementById('update-author-modal').classList.add('active');
}

function closeUpdateAuthorModal() {
    document.getElementById('update-author-modal').classList.remove('active');
}