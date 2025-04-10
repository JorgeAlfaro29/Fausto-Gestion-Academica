document.addEventListener('DOMContentLoaded', () => {
    const lista = document.getElementById('listaDocumentos');
    const archivoInput = document.getElementById('archivoInput');
    const formSubir = document.getElementById('formSubir');
    const modalEliminar = new bootstrap.Modal(document.getElementById('modalEliminar'));
    const modalEditar = new bootstrap.Modal(document.getElementById('modalEditar'));
    const modalSubir = new bootstrap.Modal(document.getElementById('modalSubir'));
  
    let archivoSeleccionado = null;
    let documentoEditar = null;
  
    const documentos = [];
  
    function renderizarDocumentos() {
      lista.innerHTML = '';
      if (documentos.length === 0) {
        lista.innerHTML = '<tr><td colspan="5" class="text-center text-muted">No hay documentos disponibles.</td></tr>';
        return;
      }
  
      documentos.forEach((doc, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${doc.nombre}</td>
          <td>${doc.tipo}</td>
          <td>${doc.fecha}</td>
          <td class="detalle-celda" title="${doc.detalle}">${doc.detalle}</td>
          <td class="acciones-btns">
            <button class="btn btn-sm btn-outline-primary" onclick="descargarDocumento(${index})">
              <i class="bi bi-download"></i> Descargar
            </button>
            <button class="btn btn-sm btn-outline-warning" onclick="editarDocumento(${index})">
              <i class="bi bi-pencil"></i> Editar
            </button>
            <button class="btn btn-sm btn-outline-danger" onclick="confirmarEliminar(${index})">
              <i class="bi bi-trash"></i> Eliminar
            </button>
          </td>
        `;
        lista.appendChild(tr);
      });
    }
  
    formSubir.addEventListener('submit', (e) => {
      e.preventDefault();
      const archivo = archivoInput.files[0];
      const detalle = document.getElementById('detalleInput').value.trim();
      if (!archivo) return;
  
      const nuevoDoc = {
        nombre: archivo.name,
        tipo: archivo.type || 'Desconocido',
        fecha: new Date().toLocaleDateString(),
        detalle: detalle || 'Sin detalles.',
        blob: archivo
      };
  
      documentos.push(nuevoDoc);
      renderizarDocumentos();
      archivoInput.value = '';
      document.getElementById('detalleInput').value = '';
      modalSubir.hide();
    });
  
    window.confirmarEliminar = function(index) {
      archivoSeleccionado = index;
      document.getElementById('mensajeEliminar').textContent = `¿Está seguro de que desea eliminar "${documentos[index].nombre}"?`;
      modalEliminar.show();
    };
  
    document.getElementById('confirmarEliminar').addEventListener('click', () => {
      if (archivoSeleccionado !== null) {
        documentos.splice(archivoSeleccionado, 1);
        archivoSeleccionado = null;
        renderizarDocumentos();
        modalEliminar.hide();
      }
    });
  
    window.editarDocumento = function(index) {
      documentoEditar = index;
      document.getElementById('editarNombre').value = documentos[index].nombre;
      document.getElementById('editarDetalle').value = documentos[index].detalle || '';
      modalEditar.show();
    };
  
    document.getElementById('formEditar').addEventListener('submit', (e) => {
      e.preventDefault();
      if (documentoEditar !== null) {
        documentos[documentoEditar].nombre = document.getElementById('editarNombre').value;
        documentos[documentoEditar].detalle = document.getElementById('editarDetalle').value;
        renderizarDocumentos();
        modalEditar.hide();
      }
    });
  
    window.descargarDocumento = function(index) {
      const doc = documentos[index];
      if (!doc.blob) {
        alert("Este documento no está disponible para descargar.");
        return;
      }
      const url = URL.createObjectURL(doc.blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = doc.nombre;
      a.click();
      URL.revokeObjectURL(url);
    };
  
    renderizarDocumentos();
  });
  