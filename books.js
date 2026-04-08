// GET /books
async function loadBooks() {
    try {
        const res = await fetch(`${API_URL}/books`);
        const data = await res.json();
        renderBooks(data.books || []);
    } catch (e) {
        console.error(e);
        alert('Erro ao carregar livros.');
    }
}

// GET /book (Unitário)
async function searchBook() {
    const name = document.getElementById('search-b-name').value;
    const author_id = document.getElementById('search-b-author').value;
    if (!name || !author_id) return alert('Informe o nome e o ID do autor(a) para buscar');

    try {
        const res = await fetch(`${API_URL}/book?name=${name}&author_id=${author_id}`);
        if (res.status === 404) return alert('Livro não encontrado');
        const data = await res.json();
        renderBooks([data]);
    } catch (e) {
        console.error(e);
        alert('Erro ao carregar livro.');
    }
}

// POST /book
async function addBook() {
    const formData = new FormData();
    const name = document.getElementById('b-name').value;
    const author_id = document.getElementById('b-author-id').value;
    const quantity = document.getElementById('b-quantity').value;
    const value = document.getElementById('b-value').value;
    const release_date = document.getElementById('b-release-date').value;


    if (!name) return alert('Preencha o nome do livro!');
    if (/^[\d\s]+$/.test(name)) return alert('O nome do livro não pode ser composto apenas por números!');
    if (!author_id) return alert('Preencha o ID do autor(a) do livro!');
    if (!quantity) return alert('Preencha a quantidade de livros disponíveis!');
    if (!value) return alert('Preencha valor em R$ do livro!');
    if (!release_date) return alert('Preencha a data de lançamento do livro!');

    formData.append('name', name);
    formData.append('author_id', author_id);
    formData.append('quantity', quantity);
    formData.append('value', value);
    formData.append('release_date', release_date);

    const res = await fetch(`${API_URL}/book`, {
        method: 'POST',
        body: formData
    });

    if (res.ok) {
        alert('Livro adicionado!');
        loadBooks();
    } else {
        const err = await res.json();
        alert(err.message);
    }
}

// DELETE /book
async function deleteBook(id) {
    if (!confirm(`Deseja mesmo deletar o livro ID ${id}?`)) return;
    const res = await fetch(`${API_URL}/book?id=${id}`, { method: 'DELETE' });
    if (res.ok) loadBooks();
    else alert('Erro ao deletar livro.');
}

// PUT /update_book
async function submitUpdateBook() {
    const id = document.getElementById('upd-id').value;
    const newName = document.getElementById('upd-name').value;
    const newAuthorId = document.getElementById('upd-author-id').value;
    const newValue = document.getElementById('upd-value').value;
    const newQuantity = document.getElementById('upd-quantity').value;
    const newReleaseDate = document.getElementById('upd-release-date').value;

    const formData = new FormData();
    formData.append('id', id);
    if (newName) formData.append('name', newName);
    if (newAuthorId) formData.append('author_id', parseInt(newAuthorId));
    if (newValue) formData.append('value', parseFloat(newValue));
    if (newQuantity) formData.append('quantity', parseInt(newQuantity));
    if (newReleaseDate) formData.append('release_date', newReleaseDate);

    const res = await fetch(`${API_URL}/update_book`, {
        method: 'PUT',
        body: formData
    });

    if (res.ok) {
        closeUpdateModal();
        loadBooks();
    } else {
        alert('Erro ao atualizar livro.');
    }
}

// Renderizador DOM Livros
function renderBooks(books) {
    currentBooksList = books; // Salva a lista atualizada na variável global
    const grid = document.getElementById('books-grid');
    grid.innerHTML = '';
    
    books.forEach(b => {
        let dataFormatada = "N/A";
        if (b.release_date) {
            const dataObj = new Date(b.release_date);
            
            const dia = String(dataObj.getUTCDate()).padStart(2, '0');
            const mes = String(dataObj.getUTCMonth() + 1).padStart(2, '0');
            const ano = dataObj.getUTCFullYear();
            
            dataFormatada = `${dia}/${mes}/${ano}`;
        }

        grid.innerHTML += `
            <div class="card">
                <h3>${b.name}</h3>
                <p><strong>Autor(a):</strong> ${b.author}</p>
                <p><strong>Lançamento:</strong> ${dataFormatada}</p>
                <p><strong>Estoque:</strong> ${b.quantity} un.</p>
                <p><strong>Preço:</strong> R$ ${b.value}</p>
                <p><strong>ID Livro:</strong> ${b.id}</p>
                <div class="card-actions">
                    <button class="btn btn-warning flex-1" onclick="openUpdateModal(${b.id})">Editar</button>
                    <button class="btn btn-danger flex-1" onclick="deleteBook(${b.id})">Excluir</button>
                </div>
            </div>
        `;
    });
}

// Lógica do modal
function openUpdateModal(id) {
    const book = currentBooksList.find(b => b.id === id);
    if (!book) return;

    document.getElementById('upd-id').value = book.id;
    document.getElementById('upd-name').value = book.name || '';
    document.getElementById('upd-author-id').value = book.author_id || '';
    document.getElementById('upd-value').value = book.value || '';
    document.getElementById('upd-quantity').value = book.quantity || '';
    // Convertendo a data do servidor de volta para AAAA-MM-DD para o input type="date" ler
    let dataInput = '';
    if (book.release_date) {
        const dataObj = new Date(book.release_date);
        const dia = String(dataObj.getUTCDate()).padStart(2, '0');
        const mes = String(dataObj.getUTCMonth() + 1).padStart(2, '0');
        const ano = dataObj.getUTCFullYear();
        dataInput = `${ano}-${mes}-${dia}`;
    }
    document.getElementById('upd-release-date').value = dataInput;

    document.getElementById('update-modal').classList.add('active');
}

function closeUpdateModal() {
    document.getElementById('update-modal').classList.remove('active');
}