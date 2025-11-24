// 1. Función para cargar los ejercicios desde tu "API" (el JSON de public)
// Este componente aydua a registrar una nueva sesion
async function cargarEjercicios() {
  const response = await fetch('/ejercicios-boxeo.json'); // archivo en /public
  const ejercicios = await response.json();
  return ejercicios;
}

// 2. Componente principal: muestra la pantalla "Nueva sesión de boxeo"
export default async function mostrarNuevaSesion() {
  const app = document.getElementById('app');

  // Estructura básica del formulario
  app.innerHTML = `
    <h2>Nueva sesión de boxeo</h2>

    <label>Ejercicio principal:</label><br>
    <select id="selectEjercicio"></select><br><br>

    <label>Duración (minutos):</label><br>
    <input type="number" id="duracion" min="1" max="180"><br><br>

    <label>Intensidad (1–5):</label><br>
    <input type="number" id="intensidad" min="1" max="5"><br><br>

    <label>¿Qué mejoraste hoy?</label><br>
    <textarea id="nota" rows="4"
      placeholder="Ej: Movimientos de cabeza, juego de pies, coordinación..."></textarea><br><br>

    <button id="btnGuardarSesion">Guardar sesión</button>

    <hr>
    <h3>Resumen de la sesión (temporal)</h3>
    <pre id="sesion-resumen">(todavía no has registrado nada)</pre>
  `;

  // 3. Cargar ejercicios desde el JSON y llenar el <select>
  let ejercicios;
  try {
    ejercicios = await cargarEjercicios();
  } catch (e) {
    console.error('Error cargando ejercicios:', e);
    document.getElementById('sesion-resumen').textContent =
      'No se pudieron cargar los ejercicios.';
    return;
  }

  const select = document.getElementById('selectEjercicio');

  ejercicios.forEach((ej) => {
    const option = document.createElement('option');
    option.value = ej.id;
    option.textContent = `${ej.nombre} (${ej.categoria} - ${ej.nivel})`;
    select.appendChild(option);
  });

  // 4. Manejar el click en "Guardar sesión"
  const btnGuardar = document.getElementById('btnGuardarSesion');
  const resumen = document.getElementById('sesion-resumen');

  btnGuardar.addEventListener('click', () => {
    const sesion = {
      ejercicioId: select.value,
      ejercicioNombre: select.options[select.selectedIndex].textContent,
      duracion: Number(document.getElementById('duracion').value),
      intensidad: Number(document.getElementById('intensidad').value),
      nota: document.getElementById('nota').value,
      fecha: new Date().toISOString()
    };

    console.log('Sesión registrada (por ahora solo local):', sesion);
    resumen.textContent = JSON.stringify(sesion, null, 2);
    alert('Sesión registrada (luego la mandamos a Firebase).');
  });
}