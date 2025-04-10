document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formVacaciones');
  const tabla = document.getElementById('tablaSolicitudes');
  const modalEliminar = new bootstrap.Modal(document.getElementById('modalEliminar'));
  const modalDetalle = new bootstrap.Modal(document.getElementById('modalDetalle'));

  let solicitudes = [];
  let solicitudSeleccionada = null;

  function getStyleForEstado(estado) {
    switch (estado) {
      case 'Aprobada':
        return 'background-color: #b5e6c5; color: #155724;';
      case 'Rechazada':
        return 'background-color: #f8c2c2; color: #842029;';
      case 'Pendiente':
      default:
        return 'background-color: #fce083; color: #7a5b00;';
    }
  }

  function renderizarTabla() {
    tabla.innerHTML = '';

    if (solicitudes.length === 0) {
      tabla.innerHTML = `<tr><td colspan="5" class="text-center text-muted">No hay solicitudes registradas.</td></tr>`;
      return;
    }

    solicitudes.forEach((s, index) => {
      const styleEstado = getStyleForEstado(s.estado);

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${s.inicio}</td>
        <td>${s.fin}</td>
        <td class="text-truncate" title="${s.motivo}">${s.motivo}</td>
        <td><span class="badge w-100" style="${styleEstado}">${s.estado}</span></td>
        <td class="text-center">
          <div class="btn-group-sm d-flex flex-column align-items-stretch gap-1">
            <button class="btn btn-outline-info btn-sm w-100" onclick="verDetalle(${index})">
              <i class="bi bi-eye"></i> Ver
            </button>
            ${
              s.estado === 'Pendiente'
                ? `<button class="btn btn-outline-danger btn-sm w-100" onclick="confirmarEliminar(${index})">
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

  // Simulación de solicitudes ficticias
  solicitudes = [
    {
      inicio: '2025-06-10',
      fin: '2025-06-14',
      motivo: 'Vacaciones familiares.',
      estado: 'Pendiente',
      atendidoPor: '',
      comentario: ''
    },
    {
      inicio: '2025-05-01',
      fin: '2025-05-05',
      motivo: 'Viaje personal.',
      estado: 'Aprobada',
      atendidoPor: 'Administrador',
      comentario: 'Disfrute sus vacaciones.'
    },
    {
      inicio: '2025-07-15',
      fin: '2025-07-20',
      motivo: 'Atención médica.',
      estado: 'Rechazada',
      atendidoPor: 'Administrador',
      comentario: 'No se puede otorgar esas fechas.'
    }
  ];

  renderizarTabla();
});
