function toggleSection(id) {
  const section = document.getElementById(id);
  const button = section.previousElementSibling;
  if (section.style.display === "none" || section.style.display === "") {
    section.style.display = "block";
    button.textContent = "Ocultar";
  } else {
    section.style.display = "none";
    button.textContent = "Mostrar";
  }
}

window.onload = () => {
  const { jsPDF } = window.jspdf;

  // Botón Transferencia
  document.querySelector('.custom-button:nth-child(2)').addEventListener('click', () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("Carta de Transferencia", 20, 20);
    doc.setFontSize(12);
    doc.text("Yo, Christopher Briceño Arias, por la presente solicito la transferencia a otra institución.", 20, 40);
    doc.text("Matrícula: 1010", 20, 50);
    doc.text("Grado: 7", 20, 60);
    doc.text("Fecha: " + new Date().toLocaleDateString(), 20, 70);
    doc.save("transferencia.pdf");
  });

// Botón Carnet
document.querySelector('.custom-button:nth-child(3)').addEventListener('click', () => {
  const doc = new jsPDF('landscape', 'mm', [90, 55]);
  const img = new Image();
  img.src = '/images/luffy.PNG'; // Asegúrate de que esta ruta funcione

  img.onload = () => {
    doc.setDrawColor(0);
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, 90, 55, 'F');
    doc.addImage(img, 'PNG', 5, 5, 25, 25);
    doc.setFontSize(10);
    doc.text("Nombre: Christopher Briceno Arias", 35, 10);
    doc.text("ID: 118760495", 35, 16);
    doc.text("Grado: 7", 35, 22);
    doc.text("Institución: Fausto Herrera", 35, 28);
    doc.setFontSize(8);
    doc.text("Carnet Estudiantil", 35, 45);
    doc.save("carnet.pdf");
  };

  img.onerror = () => {
    alert("Error: No se pudo cargar la imagen del carnet. Verifica la ruta.");
  };
});

  // Botón Calificaciones
  document.querySelector('.custom-button:nth-child(4)').addEventListener('click', () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("Calificaciones - 2024", 20, 20);
    const materias = [
      ["Materia", "Nota"],
      ["Matemáticas", "95"],
      ["Español", "90"],
      ["Ciencias", "92"],
      ["Estudios Sociales", "88"],
      ["Educación Física", "100"]
    ];
    let y = 30;
    materias.forEach(fila => {
      doc.text(fila[0], 20, y);
      doc.text(fila[1], 100, y);
      y += 10;
    });
    doc.save("calificaciones.pdf");
  });

  // Botón Editar
  document.querySelector('.custom-button:nth-child(1)').addEventListener('click', () => {
    const formDiv = document.getElementById('edit-form');
    const infoList = document.getElementById('info-list');

    if (formDiv.style.display === 'none' || formDiv.style.display === '') {
      formDiv.style.display = 'block';
      // Oculta los <li>
      [...infoList.children].forEach(child => {
        if (child.tagName === 'LI') child.style.display = 'none';
      });

      // Carga el formulario (una sola vez si no existe contenido)
      if (formDiv.innerHTML.trim() === '') {
        formDiv.innerHTML = `
          <h4 class="mt-4">Editar Información</h4>
          <form class="p-3 rounded border" style="background-color: #f9f9f9; max-width: 700px;">
            <div class="row">
              <div class="col-md-6 mb-2"><label>Matrícula</label><input type="text" class="form-control" value="1010"></div>
              <div class="col-md-6 mb-2"><label>Nombre</label><input type="text" class="form-control" value="Christopher Briceno Arias"></div>
              <div class="col-md-6 mb-2"><label>Identificación</label><input type="text" class="form-control" value="118760495"></div>
              <div class="col-md-6 mb-2"><label>Fecha de Nacimiento</label><input type="date" class="form-control" value="2003-06-04"></div>
              <div class="col-md-6 mb-2"><label>Edad</label><input type="text" class="form-control" value="20"></div>
              <div class="col-md-6 mb-2"><label>Grado</label><input type="text" class="form-control" value="7"></div>
              <div class="col-md-6 mb-2"><label>Sexo</label><select class="form-control"><option selected>Masculino</option><option>Femenino</option></select></div>
              <div class="col-md-6 mb-2"><label>Nacionalidad</label><input type="text" class="form-control" value="Costarricense"></div>
              <div class="col-md-6 mb-2"><label>Medicamentos</label><input type="text" class="form-control" value="No"></div>
              <div class="col-md-6 mb-2"><label>Enfermedades</label><input type="text" class="form-control" value="Ninguna"></div>
              <div class="col-md-6 mb-2"><label>Adecuación Curricular</label><input type="text" class="form-control" value="No"></div>
              <div class="col-md-6 mb-2"><label>Dirección</label><input type="text" class="form-control" value="San Antonio"></div>
              <div class="col-md-6 mb-2"><label>Provincia</label><input type="text" class="form-control" value="San José"></div>
              <div class="col-md-6 mb-2"><label>Cantón</label><input type="text" class="form-control" value="Vázquez de Coronado"></div>
              <div class="col-md-6 mb-2"><label>Distrito</label><input type="text" class="form-control" value="San Antonio"></div>
            </div>
          </form>
        `;
      }
    } else {
      formDiv.style.display = 'none';
      // Muestra los <li> otra vez
      [...infoList.children].forEach(child => {
        if (child.tagName === 'LI') child.style.display = 'list-item';
      });
    }
  });
};
// Función para alternar la visibilidad de los detalles
function toggleSection(id) {
  const section = document.getElementById(id);
  section.style.display = section.style.display === 'none' ? 'block' : 'none';
}
function enviarNotas() {
  // Aquí puedes agregar la lógica para enviar las notas (por ejemplo, a través de AJAX o similar)
  console.log("Notas enviadas exitosamente");

  // Cerrar el modal después de realizar la acción
  var modal = new bootstrap.Modal(document.getElementById('enviarNotasModal'));
  modal.hide();
}
