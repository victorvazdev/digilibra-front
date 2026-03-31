const API_URL = 'http://127.0.0.1:8000';
let currentAuthorsList = [];

// ================= SPA ROTEAMENTO BÁSICO =================
function navigate(view) {
    document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
    document.getElementById(`view-${view}`).classList.add('active');

    if (view === 'books') loadBooks();
    if (view === 'authors') loadAuthors();
}

// Inicia carregando os livros
document.addEventListener('DOMContentLoaded', () => {
    loadBooks();
});