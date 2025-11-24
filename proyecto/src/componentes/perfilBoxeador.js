import mostrarNuevaSesion from './mostrarNuevaSesion.js';

export default function mostrarPerfilBoxeador() {
  const app = document.getElementById('app');

  app.innerHTML = `
    <h2>Perfil del boxeador</h2>

    <label>Nombre:</label><br>
    <input type="text" id="bx-nombre" placeholder="Tu nombre"><br><br>

    <label>Edad:</label><br>
    <input type="number" id="bx-edad" min="10" max="80"><br><br>

    <label>Peso (kg):</label><br>
    <input type="number" id="bx-peso" min="30" max="150" step="0.1"><br><br>

    <label>Altura (cm):</label><br>
    <input type="number" id="bx-altura" min="130" max="220"><br><br>

    <label>Guardia:</label><br>
    <select id="bx-guardia">
      <option value="ortodoxo">Ortodoxo (diestro)</option>
      <option value="zurdo">Zurdo</option>
      <option value="mixto">Mixto</option>
    </select><br><br>

    <label>Nivel:</label><br>
    <select id="bx-nivel">
      <option value="principiante">Principiante</option>
      <option value="intermedio">Intermedio</option>
      <option value="avanzado">Avanzado</option>
    </select><br><br>

    <label>Objetivo principal:</label><br>
    <textarea id="bx-objetivo" rows="3"
      placeholder="Ej: Mejorar defensa y condición física"></textarea><br><br>

    <button id="bx-guardar">Guardar perfil</button>
    <button id="bx-ir-sesion">Ir a registrar sesión</button>

    <hr>
    <h3>Resumen del perfil</h3>
    <pre id="bx-resumen">(aún no has guardado tu perfil)</pre>
  `;

  const btnGuardar = document.getElementById('bx-guardar');
  const btnIrSesion = document.getElementById('bx-ir-sesion');
  const resumen = document.getElementById('bx-resumen');

  btnGuardar.addEventListener('click', () => {
    const perfil = {
      nombre: document.getElementById('bx-nombre').value,
      edad: Number(document.getElementById('bx-edad').value),
      peso: Number(document.getElementById('bx-peso').value),
      altura: Number(document.getElementById('bx-altura').value),
      guardia: document.getElementById('bx-guardia').value,
      nivel: document.getElementById('bx-nivel').value,
      objetivo: document.getElementById('bx-objetivo').value
    };

    console.log('Perfil boxeador:', perfil);
    resumen.textContent = JSON.stringify(perfil, null, 2);
    alert('Perfil guardado (luego lo mandamos a Firebase).');
  });

  btnIrSesion.addEventListener('click', () => {
    mostrarNuevaSesion();
  });
}