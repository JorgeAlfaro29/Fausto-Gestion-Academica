document.addEventListener('DOMContentLoaded', () => {
    const formEntrada = document.getElementById('formEntrada');
    const tablaHistorial = document.getElementById('tablaHistorial');
    const btnSalida = document.getElementById('btnSalida');
  
    let entradaActual = null;
    const historial = [];
  
    // Evento: Registrar Entrada
    formEntrada.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const nombre = document.getElementById('nombre').value.trim();
      const cedula = document.getElementById('cedula').value.trim();
  
      if (!nombre || !cedula) {
        alert("Debe completar los campos de nombre y cédula.");
        return;
      }
  
      const ahora = new Date();
      const fecha = ahora.toLocaleDateString('es-CR');
      const horaEntrada = ahora.toLocaleTimeString('es-CR', { hour: '2-digit', minute: '2-digit' });
  
      entradaActual = {
        nombre,
        cedula,
        fecha,
        entrada: horaEntrada,
        salida: '',
        horasTrabajadas: ''
      };
  
      historial.push(entradaActual);
      renderizarHistorial();
  
      formEntrada.reset();
    });
  
    // Evento: Registrar Salida
    btnSalida.addEventListener('click', () => {
      if (!entradaActual) {
        alert("Debe registrar su entrada antes de marcar salida.");
        return;
      }
  
      const ahora = new Date();
      const horaSalida = ahora.toLocaleTimeString('es-CR', { hour: '2-digit', minute: '2-digit' });
  
      const horaInicio = convertirAHoras(entradaActual.entrada);
      const horaFin = convertirAHoras(horaSalida);
  
      const duracionMs = horaFin - horaInicio;
      const horas = Math.floor(duracionMs / (1000 * 60 * 60));
      const minutos = Math.floor((duracionMs / (1000 * 60)) % 60);
  
      entradaActual.salida = horaSalida;
      entradaActual.horasTrabajadas = `${horas}h ${minutos}min`;
  
      renderizarHistorial();
      entradaActual = null;
    });
  
    // Renderiza la tabla
    function renderizarHistorial() {
      tablaHistorial.innerHTML = '';
  
      if (historial.length === 0) {
        tablaHistorial.innerHTML = '<tr><td colspan="4" class="text-center text-muted">No hay registros.</td></tr>';
        return;
      }
  
      historial.forEach(marca => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${marca.fecha}</td>
          <td>${marca.entrada}</td>
          <td>${marca.salida || '-'}</td>
          <td>${marca.horasTrabajadas || '-'}</td>
        `;
        tablaHistorial.appendChild(tr);
      });
    }
  
    // Convierte string "HH:mm" a objeto Date
    function convertirAHoras(horaStr) {
      const [h, m] = horaStr.split(':');
      return new Date(0, 0, 0, parseInt(h), parseInt(m));
    }
  });
  