const get_campers = () => {
    campers = JSON.parse(localStorage.getItem('list_campers'));

}
window.addEventListener('load', () => {
    get_campers()
})