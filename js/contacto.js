
window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    if (window.scrollY > 60) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
  
  
  document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Evita el envío real del formulario
  
    // Mostrar el modal de confirmación
    var modal = document.getElementById('confirmationModal');
    modal.style.display = "block";
  
    // Mostrar alerta adicional
    
  
    // Limpiar el formulario después del envío
    this.reset(); // Esto limpia el formulario si deseas
  });
  
  // Cerrar el modal cuando el usuario hace clic en la "x"
  document.getElementById('closeModal').addEventListener('click', function() {
    var modal = document.getElementById('confirmationModal');
    modal.style.display = "none";
  });
  
  // Cerrar el modal si el usuario hace clic fuera de él
  window.onclick = function(event) {
    var modal = document.getElementById('confirmationModal');
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
  