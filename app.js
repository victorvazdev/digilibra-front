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