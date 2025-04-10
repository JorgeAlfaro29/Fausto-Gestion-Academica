document.addEventListener('DOMContentLoaded', () => {
    const lista = document.getElementById('listaVacaciones');
    const formJustificacion = document.getElementById('formJustificacion');
    const modalJustificacion = new bootstrap.Modal(document.getElementById('modalJustificacion'));
  
    let solicitudSeleccionada = null;
  
    const solicitudes = [
      {
        nombre: 'Laura Jiménez',
        cedula: '118760111',
        departamento: 'Administración',
        inicio: '2025-06-01',
        fin: '2025-06-07',
        motivo: 'Vacaciones familiares',
        estado: 'Pendiente',
        justificacion: ''
      },
      {
        nombre: 'Carlos Mora',
        cedula: '115230222',
        departamento: 'Docencia',
        inicio: '2025-07-10',
        fin: '2025-07-15',
        motivo: 'Viaje internacional',
        estado: 'Pendiente',
        justificacion: ''
      },
      {
        nombre: 'María Rodríguez',
        cedula: '119990333',
        departamento: 'Contabilidad',
        inicio: '2025-08-20',
        fin: '2025-08-25',
        motivo: 'Descanso personal',
        estado: 'Pendiente',
        justificacion: ''
      },
      {
        nombre: 'José Álvarez',
        cedula: '116540444',
        departamento: 'Informática',
        inicio: '2025-09-01',
        fin: '2025-09-05',
        motivo: 'Motivo personal',
        estado: 'Pendiente',
        justificacion: ''
      },
      {
        nombre: 'Andrea Chaves',
        cedula: '117890555',
        departamento: 'Biblioteca',
        inicio: '2025-10-12',
        fin: '2025-10-15',
        motivo: 'Boda de un familiar',
        estado: 'Pendiente',
        justificacion: ''
      },
      {
        nombre: 'Pedro Fernández',
        cedula: '114560666',
        departamento: 'Seguridad',
        inicio: '2025-11-01',
        fin: '2025-11-10',
        motivo: 'Viaje programado',
        estado: 'Pendiente',
        justificacion: ''
      },
      {
        nombre: 'Silvia Blanco',
        cedula: '113450777',
        departamento: 'Dirección',
        inicio: '2025-05-10',
        fin: '2025-05-14',
        motivo: 'Maternidad',
        estado: 'Pendiente',
        justificacion: ''
      },
      {
        nombre: 'Luis Rojas',
        cedula: '118760888',
        departamento: 'Soporte Técnico',
        inicio: '2025-12-20',
        fin: '2025-12-27',
        motivo: 'Vacaciones navideñas',
        estado: 'Pendiente',
        justificacion: ''
      }
    ];
  
    function renderizarSolicitudes() {
      lista.innerHTML = '';
  
      if (solicitudes.length === 0) {
        lista.innerHTML = '<tr><td colspan="8" class="text-center text-muted">No hay solicitudes registradas.</td></tr>';
        return;
      }
  
      solicitudes.forEach((s, index) => {
        const estadoClase = s.estado === 'Pendiente' ? 'badge-pendiente'
                            : s.estado === 'Aprobada' ? 'badge-aprobada'
                            : 'badge-rechazada';
  
        const fila = document.createElement('tr');
        fila.innerHTML = `
          <td>${s.nombre}</td>
          <td>${s.cedula}</td>
          <td>${s.departamento}</td>
          <td>${s.inicio}</td>
          <td>${s.fin}</td>
          <td>${s.motivo}</td>
          <td><span class="badge ${estadoClase}">${s.estado}</span></td>
          <td class="d-flex flex-column gap-1">
            ${s.estado === 'Pendiente' ? `
              <button class="btn btn-sm btn-success" onclick="aprobar(${index})">
                <i class="bi bi-check-circle"></i> Aprobar
              </button>
              <button class="btn btn-sm btn-danger" onclick="abrirModalJustificacion(${index})">
                <i class="bi bi-x-circle"></i> Rechazar
              </button>` :
              `<span class="text-muted small">Ya procesada</span>`
            }
          </td>
        `;
        lista.appendChild(fila);
      });
    }
  
    window.aprobar = function(index) {
      solicitudes[index].estado = 'Aprobada';
      solicitudes[index].justificacion = '';
      renderizarSolicitudes();
    };
  
    window.abrirModalJustificacion = function(index) {
      solicitudSeleccionada = index;
      document.getElementById('justificacion').value = '';
      modalJustificacion.show();
    };
  
    formJustificacion.addEventListener('submit', (e) => {
      e.preventDefault();
      const justificacion = document.getElementById('justificacion').value.trim();
      if (solicitudSeleccionada !== null && justificacion !== '') {
        solicitudes[solicitudSeleccionada].estado = 'Rechazada';
        solicitudes[solicitudSeleccionada].justificacion = justificacion;
        solicitudSeleccionada = null;
        modalJustificacion.hide();
        renderizarSolicitudes();
      }
    });
  
    renderizarSolicitudes();
  });
  