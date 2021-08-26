function mostrarScroll() {
    let animado = document.querySelectorAll(".animado");
    let scrollTop = document.documentElement.scrollTop;
    for (var i = 0; i < animado.length; i++) {
        let alturaAnimado = animado[i].offsetTop;
        if (alturaAnimado - 300 < scrollTop) {
            animado[i].style.opacity = 1;
            animado[i].classList.add("mostrarArriba");
        }
    }
}

window.addEventListener("scroll", mostrarScroll);

/////////////////////-------DARK MODE-------/////////////////////

const botonSwitch = document.querySelector("#darkMode");
botonSwitch.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    botonSwitch.classList.toggle("activo");
});
/////////////////////-------DARK MODE-------/////////////////////