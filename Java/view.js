function activateButton() {
    const activeButton = document.getElementById('Active-button');
    const inactiveButton = document.getElementById('inactive-Button');
    activeButton.addEventListener('click', () => {
        activeButton.classList.add('active');
        inactiveButton.classList.remove('active');
    });
    inactiveButton.addEventListener('click', () => {
        inactiveButton.classList.add('active');
        activeButton.classList.remove('active');
    });
}
function filterSearch(){
    const searchInput = document.getElementById('search');
    const table = document.getElementById('table');
    searchInput.addEventListener('keyup', () => {
        const searchTerm = searchInput.value.toLowerCase();
        Array.from(table.querySelectorAll('tbody tr')).forEach(row => {
          const name = row.cells[1].textContent.toLowerCase();
          if (name.includes(searchTerm)) {
            row.style.display = '';
          } else {
            row.style.display = 'none';
          }
        });
      });
}
activateButton();
filterSearch();






