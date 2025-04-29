

 const traducciones = {
    es: {
      titulo: "Bienvenido !",
      descripcion: "Esta es una página de ejemplo con soporte multilingüe.",
      boton_inicio: "Inicio",
      pk: "Administrar perfil",
      contra:"Contraseña",
      cambiar:"Cambiar",
      pa:"Cambiar contraseña",
      ke:"Borrar cuenta",
      ki:"Cerrar sesión",
      pb:"Nueva contraseña",
      mk:"Administrador de mapas",
      n:"¿A donde quieres ir?",
      b:"Buscar",
      g:"Limpiar",
      origen: "Origen",
      destino: "Destino",
      ek: "Administrar reservas",
      ebs: "Crear reserva",
      kea: "Selecciona el edificio de origen",
      ka: "Selecciona la taquilla",
      eh: "Fecha de inicio",
      eha: "Fecha de fin",  
      s: "Crear",
      eek: "Consultar las reservas del usuario",
      z: "Detalles",
      e: "Editar",
      i: "Cerrar",
      ee: "Editar reserva",
      eez: "Eliminar reserva",
      ede: "No hay reservas para mostrar",
      edki: "No hay taquillas abiertas en este momento",
      a:"Abrir",
      err:"Reservas",
      eb:"Nueva reserva"



    },
    eu: { 
      titulo: "Ongi Etorri !",
      descripcion: "Hau hizkuntza-aniztasunarekin lagundutako adibide orrialdea da.",
      boton_inicio: "Hasiera",
      pk: "Profila kudeatu",
      contra:"Pasahitza",
      cambiar:"Aldatu",
      pa:"Pasahitza aldatu",
      ke:"Kontua ezabatu",
      ki:"Saioa itxi",
      pb:"Pasahitza berria",
      mk:"Mapen kudeaketa",
      n:"Nora joan nahi duzu?",
      b:"Bilatu",
      g:"Garbitu",
      origen: "Jatorria",
      destino: "Helmuga",
      ek: "Erreserben kudeaketa",
      ebs: "Erreserba berria sortu",
      kea: "Kutxatilaren eraikina aukeratu",
      ka: "Kutxatila aukeratu",
      eh: "Erreserbaren hasiera",
      eha: "Erreserbaren amaiera",
      s: "Sortu",
      eek: "Erabiltzailearen erreserbak kontsultatu",
      z: "Zehaztapenak",  
      e: "Editatu",
      i: "Itxi",
      ee: "Erreserba editatu",
      eez: "Erreserba ezabatu",
      ede: "Ez daukazu erreserbarik",
      edki: "Ez dago kutxatila irekirik momentu honetan",
      a:"Ireki",
      err:"Erreserbak",
      eb:"Erreserba berria"




    }
  };
 

  function cambiarIdioma() {
    let idiomaActual = localStorage.getItem('idioma') || 'es';
    let nuevoIdioma = idiomaActual === 'es' ? 'eu' : 'es';
    
    localStorage.setItem('idioma', nuevoIdioma);
    aplicarTraduccion(nuevoIdioma);

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

  
