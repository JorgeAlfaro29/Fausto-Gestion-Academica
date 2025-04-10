document.addEventListener('DOMContentLoaded', function () {
    const calendarEl = document.getElementById('calendar');
    let selectedEvent = null;
  
    const colores = {
      feriado: '#dc3545',
      vacaciones: '#ffc107',
      actividad: '#28a745'
    };
  
    const calendar = new FullCalendar.Calendar(calendarEl, {
      locale: 'es', // aún se usa para los días y botones
      initialView: 'dayGridMonth',
      height: 'auto',
      selectable: true,
      editable: true,
      titleFormat: {
        month: 'long',
        year: 'numeric'
      },
      buttonText: {
        today: 'Hoy',
        month: 'Mes',
        week: 'Semana',
        day: 'Día'
      },
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      events: [
        { title: 'Año Nuevo', start: '2025-01-01', allDay: true, color: '#dc3545', descripcion: 'Feriado nacional por el inicio del nuevo año.' },
        { title: 'Día de Juan Santamaría', start: '2025-04-11', allDay: true, color: '#dc3545', descripcion: 'Conmemoración del héroe nacional Juan Santamaría.' },
        { title: 'Jueves Santo', start: '2025-04-17', allDay: true, color: '#dc3545', descripcion: 'Feriado religioso correspondiente a la Semana Santa.' },
        { title: 'Viernes Santo', start: '2025-04-18', allDay: true, color: '#dc3545', descripcion: 'Día de reflexión religiosa.' },
        { title: 'Día del Trabajador', start: '2025-05-01', allDay: true, color: '#dc3545', descripcion: 'Feriado nacional en honor a los trabajadores.' },
        { title: 'Anexión del Partido de Nicoya', start: '2025-07-25', allDay: true, color: '#dc3545', descripcion: 'Celebración de la anexión del Partido de Nicoya a Costa Rica.' },
        { title: 'Día de la Virgen de los Ángeles', start: '2025-08-02', allDay: true, color: '#dc3545', descripcion: 'Celebración religiosa nacional.' },
        { title: 'Día de la Madre', start: '2025-08-15', allDay: true, color: '#dc3545', descripcion: 'Feriado dedicado a todas las madres.' },
        { title: 'Día de la Persona Negra y la Cultura Afrocostarricense', start: '2025-08-31', allDay: true, color: '#dc3545', descripcion: 'Reconocimiento a la cultura afrodescendiente en Costa Rica.' },
        { title: 'Día de la Independencia', start: '2025-09-15', allDay: true, color: '#dc3545', descripcion: 'Fiesta nacional por la independencia de Costa Rica.' },
        { title: 'Día de la Abolición del Ejército', start: '2025-12-01', allDay: true, color: '#dc3545', descripcion: 'Conmemoración de la abolición del ejército en 1948.' },
        { title: 'Navidad', start: '2025-12-25', allDay: true, color: '#dc3545', descripcion: 'Celebración del nacimiento de Jesús.' },
        { title: 'Vacaciones de Semana Santa', start: '2025-04-14', end: '2025-04-18', allDay: true, color: '#ffc107', descripcion: 'Receso académico por Semana Santa.' },
        { title: 'Vacaciones de Medio Año', start: '2025-07-07', end: '2025-07-18', allDay: true, color: '#ffc107', descripcion: 'Descanso escolar por finalización del primer semestre.' },
        { title: 'Vacaciones de Fin de Año', start: '2025-12-22', end: '2026-01-09', allDay: true, color: '#ffc107', descripcion: 'Receso de fin de año académico.' },
        { title: 'Reunión de Padres de Familia', start: '2025-02-15T18:00:00', color: '#17a2b8', descripcion: 'Reunión informativa para padres sobre el rendimiento académico.' },
        { title: 'Feria Científica Escolar', start: '2025-03-20T09:00:00', end: '2025-03-21T15:00:00', color: '#28a745', descripcion: 'Exposición de proyectos científicos realizados por los estudiantes.' },
        { title: 'Día Deportivo', start: '2025-06-10T08:00:00', end: '2025-06-10T12:00:00', color: '#0d6efd', descripcion: 'Jornada recreativa con competencias deportivas estudiantiles.' },
        { title: 'Festival de Arte Estudiantil', start: '2025-09-05T10:00:00', end: '2025-09-05T14:00:00', color: '#6f42c1', descripcion: 'Muestra artística y cultural protagonizada por los alumnos.' },
        { title: 'Simulacro de Evacuación', start: '2025-10-14T11:00:00', color: '#fd7e14', descripcion: 'Práctica institucional ante emergencias y evacuaciones.' },
        { title: 'Charla sobre Medio Ambiente', start: '2025-11-22T13:00:00', color: '#20c997', descripcion: 'Charla educativa sobre sostenibilidad y ecología.' },
        { title: 'Entrega de Notas Finales', start: '2025-12-15T08:00:00', color: '#343a40', descripcion: 'Último día de clases. Entrega de calificaciones finales.' }
      ],
      eventDidMount: function(info) {
        info.el.style.border = `1px solid ${info.event.backgroundColor}`;
      },
      eventClick: function(info) {
        selectedEvent = info.event;
        const modal = new bootstrap.Modal(document.getElementById('modalDetalle'));
        document.getElementById('detalleTitulo').textContent = info.event.title;
        document.getElementById('detalleFecha').textContent = new Date(info.event.start).toLocaleDateString();
        document.getElementById('detalleDescripcion').textContent = info.event.extendedProps.descripcion || 'Sin descripción';
        modal.show();
      },
      dateClick: function(info) {
        selectedEvent = null;
      }
    });
  
    calendar.render();
  
    // Agregar evento personalizado
    document.getElementById('formAgregarEvento').addEventListener('submit', function (e) {
      e.preventDefault();
      const titulo = document.getElementById('titulo').value;
      const fecha = document.getElementById('fecha').value;
      const tipo = document.getElementById('tipo').value;
      const descripcion = document.getElementById('descripcion').value;
  
      calendar.addEvent({
        title: titulo,
        start: fecha,
        backgroundColor: colores[tipo],
        borderColor: colores[tipo],
        descripcion: descripcion
      });
  
      bootstrap.Modal.getInstance(document.getElementById('modalAgregar')).hide();
      this.reset();
    });
  
    // Abrir modal editar
    document.getElementById('editarBtn').addEventListener('click', () => {
      if (!selectedEvent) return alert('Selecciona un evento primero');
      document.getElementById('editarTitulo').value = selectedEvent.title;
      document.getElementById('editarDescripcion').value = selectedEvent.extendedProps.descripcion || '';
      const modal = new bootstrap.Modal(document.getElementById('modalEditar'));
      modal.show();
    });
  
    // Guardar cambios editar
    document.getElementById('formEditarEvento').addEventListener('submit', function (e) {
      e.preventDefault();
      const nuevoTitulo = document.getElementById('editarTitulo').value;
      const nuevaDescripcion = document.getElementById('editarDescripcion').value;
  
      if (selectedEvent) {
        selectedEvent.setProp('title', nuevoTitulo);
        selectedEvent.setExtendedProp('descripcion', nuevaDescripcion);
      }
  
      bootstrap.Modal.getInstance(document.getElementById('modalEditar')).hide();
    });
  
    // Abrir modal eliminar
    document.getElementById('eliminarBtn').addEventListener('click', () => {
      if (!selectedEvent) return alert('Selecciona un evento primero');
      document.getElementById('mensajeEliminar').textContent = `¿Estás seguro de eliminar el evento "${selectedEvent.title}"?`;
      const modal = new bootstrap.Modal(document.getElementById('modalEliminar'));
      modal.show();
    });
  
    // Confirmar eliminación
    document.getElementById('confirmarEliminar').addEventListener('click', () => {
      if (selectedEvent) {
        selectedEvent.remove();
        selectedEvent = null;
        bootstrap.Modal.getInstance(document.getElementById('modalEliminar')).hide();
      }
    });
  });
  