const traducciones = {
    es: {
      titulo: "Bienvenido",
      descripcion: "Esta es una página de ejemplo con soporte multilingüe.",
      boton_inicio: "Inicio",
      pk: "Administrar perfil",
      contra:"Contraseña",
      cambiar:"Cambiar",
      pa:"Cambiar contraseña",
      ke:"Borrar cuenta",
      ki:"Cerrar sesión",
      pb:"Nueva contraseña"
    },
    eu: {
      titulo: "Ongietorri",
      descripcion: "Hau hizkuntza-aniztasunarekin lagundutako adibide orrialdea da.",
      boton_inicio: "Hasiera",
      pk: "Profila kudeatu",
      contra:"Pasahitza",
      cambiar:"Aldatu",
      pa:"Pasahitza aldatu",
      ke:"Kontua ezabatu",
      ki:"Saioa itxi",
      pb:"Pasahitza berria"
    }
  };
  
  function cambiarIdioma(idioma) {
    localStorage.setItem('idioma', idioma);
    aplicarTraduccion(idioma);
    location.reload(); 

  }
  
  function aplicarTraduccion(idioma) {
    const textos = traducciones[idioma];
    if (!textos) return;
  
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const clave = el.getAttribute('data-i18n');
      if (textos[clave]) {
        el.textContent = textos[clave];
      }
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
        const clave = el.getAttribute("data-i18n-placeholder");
        if (textos[clave]) {
          el.placeholder = textos[clave];
        }
      });
  }
  
  window.addEventListener('DOMContentLoaded', () => {
    const idiomaGuardado = localStorage.getItem('idioma') || 'es';
    aplicarTraduccion(idiomaGuardado);
  });

  