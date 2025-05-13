 export const traducciones = {
    es: {
      titulo: "Bienvenido,",
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
      n:"¿A dónde vas?",
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
      edea: "No hay reservas activas",
      edki: "No hay taquillas abiertas en este momento",
      a:"Abrir",
      err:"Reservas",
      eb:"Nueva reserva",
      ezdago:"No hay reservas",
      pasahitzaZaharra:"La nueva contraseña es igual a la anterior",
      identifikazioa:"Identificacion",
      ERABILTZAILEA:"USUARIO",
      PASAHITZA:"CONTRASEÑA",
      Sartu:"Iniciar sesión",
      Erregistratu:"Registrarse",
      POSTA:"CORREO ELETRÓNICO",
      instalatu:"Instalar",
      EHULOCK:" Quiero utilizar la aplicación EHULOCK Maps.",
      Zure:" Tu LDAP de usuario",
      Sartutako:"Los datos ingresados no son válidos",
      aplikazioa:"Esta aplicación solo es para usuarios.",
      Izen:"El usuario con ese nombre o correo electrónico ingresado ya existe",
      saioa:"Cerrar sesión",
      Joan:"Ir a la pantalla de inicio",
      ezi:"Ver reservas anteriores",
      mehg:"Reservas están en marcha o sin empezar",
      aner:"Reservas anteriores",
      erre:"¿Ya tienes una cuenta? Inicia sesión",
      ldapErab:"Tu LDAP",
      erreserba: "Reserva",
      kutxatila: "Taquilla",
      zigortuta:"Estás sancionado, no puedes usar el servicio de taquillas",




    },
    eu: { 
      erreserba: "Erreserba",
      kutxatila: "Kutxatila",
      titulo: "Ongi Etorri,",
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
      edea: "Ez dago erreserba aktiborik",
      edki: "Ez dago kutxatila irekirik momentu honetan",
      a:"Ireki",
      err:"Erreserbak",
      eb:"Erreserba berria",
      ezdago:"Ez dago kutxatilarik",
      pasahitzaZaharra:"Pasahitza berria zaharraren berdina da",
      identifikazioa:"Identifikazioa",
      ERABILTZAILEA:"ERABILTZAILEA",
      PASAHITZA:"PASAHITZA",
      Sartu:"Sartu",
      POSTA:"POSTA ELEKTRONIKOA",
      instalatu:"Instalatu",
      EHULOCK:"EHULOCK Maps erabili nahi dut.",
      Zure:"Zure LDAP erabiltzailea",
      Sartutako:"Sartutako datuak ez dira zuzenak",
      aplikazioa:"Aplikazio hau erabiltzaileentzat soilik da.",
      Izen:"Izen edo posta horrekin dagoen erabiltzailea jada existizen da",
      Joan:"Joan hasiera orrira",
      saioa:"Saioa itxi",
      ezi:"Erreserba zaharrak ikusi",
      mehg:"Martxan edo hasi gabe dauden erreserbak",
      aner:"Antzinako erreserbak",
      erre:"Erregistratuta zaude? Hasi saioa",
      Erregistratu:"Erregistratu",
      ldapErab:"Zure LDAP erabiltzailea",
      zigortuta:"Zigortuta zaude, ezin duzu kutxatilen zerbitzua erabili",

    }
  };
 

export  function cambiarIdioma() {
    let idiomaActual = localStorage.getItem('idioma') || 'es';
    let nuevoIdioma = idiomaActual === 'es' ? 'eu' : 'es';
    
    localStorage.setItem('idioma', nuevoIdioma);
    aplicarTraduccion(nuevoIdioma);

  }
  
 export function aplicarTraduccion(idioma) {
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

  
