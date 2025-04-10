document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formVacaciones');
    const tabla = document.getElementById('tablaSolicitudes');
    const modalEliminar = new bootstrap.Modal(document.getElementById('modalEliminar'));
    const modalDetalle = new bootstrap.Modal(document.getElementById('modalDetalle'));
    let solicitudes = [];
    let solicitudSeleccionada = null;
  
    function renderizarTabla() {
      tabla.innerHTML = '';
  
      if (solicitudes.length === 0) {
        tabla.innerHTML = `<tr><td colspan="5" class="text-center text-muted">No hay solicitudes registradas.</td></tr>`;
        return;
      }
  
      solicitudes.forEach((s, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${s.inicio}</td>
          <td>${s.fin}</td>
          <td class="text-truncate" title="${s.motivo}">${s.motivo}</td>
          <td><span class="badge ${
            s.estado === 'Aprobada' ? 'badge-aprobada' :
            s.estado === 'Rechazada' ? 'badge-rechazada' :
            'badge-pendiente'}">${s.estado}</span></td>
          <td>
            <div class="btn-group-sm d-flex flex-column align-items-center">
              <button class="btn btn-outline-info btn-sm" onclick="verDetalle(${index})">
                <i class="bi bi-eye"></i> Ver
              </button>
              ${
                s.estado === 'Pendiente'
                  ? `<button class="btn btn-outline-danger btn-sm" onclick="confirmarEliminar(${index})">
                       <i class="bi bi-trash"></i> Eliminar
                     </button>`
                  : ''
              }
            </div>
          </td>
        `;
        tabla.appendChild(tr);
      });
    }
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const nuevaSolicitud = {
        inicio: document.getElementById('fechaInicio').value,
        fin: document.getElementById('fechaFin').value,
        motivo: document.getElementById('motivo').value.trim(),
        estado: 'Pendiente',
        atendidoPor: '',
        comentario: ''
      };
  
      solicitudes.push(nuevaSolicitud);
      form.reset();
      renderizarTabla();
    });
  
    window.confirmarEliminar = function (index) {
      solicitudSeleccionada = index;
      modalEliminar.show();
    };
  
    document.getElementById('confirmarEliminar').addEventListener('click', () => {
      if (solicitudSeleccionada !== null) {
        solicitudes.splice(solicitudSeleccionada, 1);
        solicitudSeleccionada = null;
        renderizarTabla();
        modalEliminar.hide();
      }
    });
  
    window.verDetalle = function (index) {
      const s = solicitudes[index];
      document.getElementById('detalleFechas').textContent = `${s.inicio} al ${s.fin}`;
      document.getElementById('detalleMotivo').textContent = s.motivo;
      document.getElementById('detalleEstado').textContent = s.estado;
  
      if (s.estado !== 'Pendiente') {
        document.getElementById('detalleAdmin').style.display = 'block';
        document.getElementById('detalleComentario').style.display = 'block';
        document.getElementById('detalleAdministrador').textContent = s.atendidoPor || 'Desconocido';
        document.getElementById('detalleJustificacion').textContent = s.comentario || 'Sin comentario';
      } else {
        document.getElementById('detalleAdmin').style.display = 'none';
        document.getElementById('detalleComentario').style.display = 'none';
      }
  
      modalDetalle.show();
    };
  
    renderizarTabla();
  });
  