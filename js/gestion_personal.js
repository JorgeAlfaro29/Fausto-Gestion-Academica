document.addEventListener('DOMContentLoaded', () => {
    const lista = document.getElementById('listaPersonal');
    const formAgregar = document.getElementById('formAgregar');
    const formEditar = document.getElementById('formEditar');
    const modalAgregar = new bootstrap.Modal(document.getElementById('modalAgregar'));
    const modalEditar = new bootstrap.Modal(document.getElementById('modalEditar'));
    const modalEliminar = new bootstrap.Modal(document.getElementById('modalEliminar'));
    const confirmarEliminarBtn = document.getElementById('confirmarEliminar');
    const mensajeEliminar = document.getElementById('mensajeEliminar');
  
    let personalSeleccionado = null;
    let personaAEditar = null;
  
    const personal = [
      {
        nombre: "Laura Gómez",
        identificacion: "118750999",
        correo: "laura.gomez@fausto.ed.cr",
        telefono: "88880011",
        tipo: "Docente",
        horario: "Lunes a Viernes de 07:00 a 15:00",
        activo: true
      },
      {
        nombre: "Carlos Ramírez",
        identificacion: "115490821",
        correo: "carlos.ramirez@fausto.ed.cr",
        telefono: "88997766",
        tipo: "Administrativo",
        horario: "Lunes a Viernes de 08:00 a 16:00",
        activo: true
      },
      {
        nombre: "Ana Rodríguez",
        identificacion: "117360441",
        correo: "ana.rodriguez@fausto.ed.cr",
        telefono: "83441234",
        tipo: "Docente",
        horario: "Medio Tiempo (13:00 a 17:00)",
        activo: false
      }
    ];
  
    function renderizarPersonal() {
      lista.innerHTML = '';
      if (personal.length === 0) {
        lista.innerHTML = '<tr><td colspan="8" class="text-center text-muted">No hay personal registrado.</td></tr>';
        return;
      }
  
      personal.forEach((p, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${p.nombre}</td>
          <td>${p.tipo}</td>
          <td>${p.identificacion}</td>
          <td>${p.correo}</td>
          <td>${p.telefono}</td>
          <td>${p.horario}</td>
          <td><span class="badge ${p.activo ? 'bg-success' : 'bg-secondary'}">${p.activo ? 'Activo' : 'Inactivo'}</span></td>
          <td class="acciones-btns">
            <button class="btn btn-sm btn-outline-primary" onclick="editarPersonal(${index})"><i class="bi bi-pencil"></i> Editar</button>
            <button class="btn btn-sm btn-outline-danger" onclick="confirmarEliminar(${index})"><i class="bi bi-trash"></i> Eliminar</button>
            <button class="btn btn-sm btn-outline-${p.activo ? 'secondary' : 'success'}" onclick="toggleEstado(${index})">
              <i class="bi bi-${p.activo ? 'x-circle' : 'check-circle'}"></i> ${p.activo ? 'Inactivar' : 'Activar'}
            </button>
          </td>
        `;
        lista.appendChild(tr);
      });
    }
  
    formAgregar.addEventListener('submit', (e) => {
      e.preventDefault();
      const nuevoPersonal = {
        nombre: document.getElementById('nombre').value.trim(),
        identificacion: document.getElementById('identificacion').value.trim(),
        correo: document.getElementById('correo').value.trim(),
        telefono: document.getElementById('telefono').value.trim(),
        tipo: document.getElementById('tipo').value,
        horario: document.getElementById('horario').value,
        activo: true
      };
      personal.push(nuevoPersonal);
      formAgregar.reset();
      modalAgregar.hide();
      renderizarPersonal();
    });
  
    window.confirmarEliminar = function(index) {
      personalSeleccionado = index;
      mensajeEliminar.textContent = `¿Está seguro de que desea eliminar a "${personal[index].nombre}" del registro?`;
      modalEliminar.show();
    };
  
    confirmarEliminarBtn.addEventListener('click', () => {
      if (personalSeleccionado !== null) {
        personal.splice(personalSeleccionado, 1);
        personalSeleccionado = null;
        renderizarPersonal();
        modalEliminar.hide();
      }
    });
  
    window.editarPersonal = function(index) {
        personaAEditar = index;
        const p = personal[index];
        document.getElementById('editarNombre').value = p.nombre;
        document.getElementById('editarIdentificacion').value = p.identificacion;
        document.getElementById('editarCorreo').value = p.correo;
        document.getElementById('editarTelefono').value = p.telefono;
        document.getElementById('editarTipo').value = p.tipo;
        document.getElementById('editarHorario').value = p.horario;
        modalEditar.show();
      };
      
      formEditar.addEventListener('submit', (e) => {
        e.preventDefault();
        if (personaAEditar !== null) {
          personal[personaAEditar].nombre = document.getElementById('editarNombre').value.trim();
          personal[personaAEditar].identificacion = document.getElementById('editarIdentificacion').value.trim();
          personal[personaAEditar].correo = document.getElementById('editarCorreo').value.trim();
          personal[personaAEditar].telefono = document.getElementById('editarTelefono').value.trim();
          personal[personaAEditar].tipo = document.getElementById('editarTipo').value;
          personal[personaAEditar].horario = document.getElementById('editarHorario').value;
          renderizarPersonal();
          modalEditar.hide();
        }
      });
      
  
    window.toggleEstado = function(index) {
      personal[index].activo = !personal[index].activo;
      renderizarPersonal();
    };
  
    renderizarPersonal();
  });
  