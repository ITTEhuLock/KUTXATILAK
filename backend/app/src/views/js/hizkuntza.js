

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
      eb:"Nueva reserva",
      edea:"No hay reservas activas",
      kk:"Administración de taquillas",
      kbs:"Crear taquilla nueva",
      kkod:"Código de taquilla",
      kko:"Localizacion de la taquilla",
      keth:"Inicio del período de uso de la taquilla",
      keth2:"Fin del período de uso de la taquilla",
      c:"Codigo",
      eg:"Estado",
      l:"Localización", 
      ekintza:"acción",
      ezabatu:"Eliminar",
      irekita:"Abierta",
      itxita:"Cerrada",
      gbg:"Añade una nueva Aula",
      eraikina:"Edificio",
      gm:"Tipo de Aula",
      ikasgela:"Aula",
      bulegoa:"Despacho",
      komuna:"Baño",
      igogailua:"Ascensor",
      kafetegia:"Cafeteria",
      eskailerak:"Escaleras",
      bestebatzuk:"otros",
      kokapena:"Selecciona la ubicación en el mapa",
      solairua:"Piso",
      erabk:"Administrador de usuarios",
      erabizn:"Nombre de usuario",
      datuak:"Datos",
      zigorturik:"Penalizado",
      zigorgabe:"Sin penalización", 
      kontua:"-ren conta",
      ezdago:"No hay reservas",
      pasahitzaZaharra:"La nueva contraseña es igual a la anterior",
      identifikazioa:"Identifcación",
      ERABILTZAILEA:"USUARIO",
      PASAHITZA:"CONTRASEÑA",
      Sartu:"Iniciar sesion",
      Erregistratu:"Erregistratu",
      POSTA:"CORREO ELECTRONICO",
      instalatu:"Instala",
      



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
      eb:"Erreserba berria",
      edea:"Ez daukazu erreserba aktiborik",
      kk: "Kutxatila kudeatu",
      kbs:"kutxatila berria sortu",
      kkod: "Kutxatilaren kodea",
      kko: "Kutxatilaren kokapena",
      keth:"Kutxatilaren erabilera tartearen hasiera",
      keth2:"Kutxatilaren erabilera tartearen amaiera",
      c:"Kodea",
      eg:"Egoera",
      l:"Kokapena", 
      ekintza:"ekintza",
      ezabatu:"Ezabatu",
      irekita:"Irekita",
      itxita:"Itxita",
      gbg:"Gela berria gehitu",
      eraikina:"Eraikina",
      gm:"Gela mota",
      ikasgela:"ikasgela",
      bulegoa:"bulegoa",
      komuna:"komuna",
      igogailua:"igogailua",
      kafetegia:"kafetegia",
      eskailerak:"eskailerak",
      bestebatzuk:"beste batzuk",
      kokapena:"Kokapena - Aukeratu mapan",
      solairua:"Solairua",
      erabk:"Erabiltzaileen kudeaketa",
      erabizn:"Erabiltzaile Izena",
      datuak:"Datuak",
      zigorturik:"Zigorturik",
      zigorgabe:"Zigor gabe",
      kontua:"-ren kontua",
      ezdago:"Ez dago kutxatilarik",
      pasahitzaZaharra:"Pasahitza berria zaharraren berdina da",
      identifikazioa:"Identifikazioa",
      ERABILTZAILEA:"ERABILTZAILEA",
      PASAHITZA:"PASAHITZA",
      Sartu:"Sartu",
      Erregistratu:"Erregistratu",
      POSTA:"POSTA ELEKTRONIKOA", 
      instalatu:"Instalatu",

      




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
        if (el.tagName === 'INPUT' || el.tagName === 'BUTTON') {
          el.value ? el.value = textos[clave] : el.textContent = textos[clave];
        } else {
          el.textContent = textos[clave];
        }
      }
    });
  
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const clave = el.getAttribute('data-i18n-placeholder');
      if (textos[clave]) {
        el.placeholder = textos[clave];
      }
    });
  }
  
  window.addEventListener('DOMContentLoaded', () => {
    const idiomaGuardado = localStorage.getItem('idioma') || 'es';
    aplicarTraduccion(idiomaGuardado);
  });
  

  