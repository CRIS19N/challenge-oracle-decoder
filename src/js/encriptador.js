function readyDom() {
  let texto = document.getElementById("textoUser");
  let textresult = document.getElementById("textareaEncriptDesencript");

  function desencriptarText() {
    let textoEncrip = texto.value;

    textoEncrip = textoEncrip.replace(/ai/g, "a");
    textoEncrip = textoEncrip.replace(/enter/g, "e");
    textoEncrip = textoEncrip.replace(/imes/g, "i");
    textoEncrip = textoEncrip.replace(/ober/g, "o");
    textoEncrip = textoEncrip.replace(/ufat/g, "u");

    textresult.value = textoEncrip;
  }

  function encriptarText() {
    let textoEncrip = "";
    for (let i = 0; i < texto.value.length; i++) {
      switch (texto.value[i]) {
        case "a":
          textoEncrip += texto.value[i] = "ai";
          break;
        case "e":
          textoEncrip += texto.value[i] = "enter";
          break;
        case "i":
          textoEncrip += texto.value[i] = "imes";
          break;
        case "o":
          textoEncrip += texto.value[i] = "ober";
          break;
        case "u":
          textoEncrip += texto.value[i] = "ufat";
          break;

        default:
          textoEncrip += texto.value[i];
          break;
      }
    }

    textresult.value = textoEncrip;
  }

  function pasteText() {
    texto.focus(); //foco sobre el campo donde se va pasar el contenido
    navigator.clipboard.readText().then(() => (texto.value = textresult.value)); //pego el contenido del portapapeles
  }

  function copiarText() {
    textresult.select(); //selecciono todo el texto

    //se copia el texto, en caso de ser true llama la funcion pasteText
    if (document.execCommand("copy")) {
      pasteText();
    }
  }

  function validarTextarea() {
    MENSAJEADVERTENCIA.textContent = ""; //limpiar mensaje de advertencia
    //pasamos todos los caracteres a minúsculas
    this.value = this.value.toLowerCase();

    console.log(this.value);
    //validamos que no hayan caracteres diferentes a las letras minúsculas, es decir devuelve false si encuentra caracteres diferentes.
    let result = /^[a-z-ñ ]+$/.test(this.value);

    if (!result) {
      MENSAJEADVERTENCIA.textContent =
        "Solo se permiten letras, elimina cualquier otro carácter. como:=>(./ñ-)";
      BTNENCRYPT.setAttribute("disabled", true); //deshabilitamos el botón de encriptar
      BTNDESENCRYPT.setAttribute("disabled", true); //deshabilitamos el botón de desencriptar
      BTNCOPIETEXT.setAttribute("disabled", true); //deshabilitamos el botón de copiar y pegar
    } else {
      BTNENCRYPT.removeAttribute("disabled"); //habilitamos el botón de encriptar
      BTNDESENCRYPT.removeAttribute("disabled"); //habilitamos el botón de desencriptar
      BTNCOPIETEXT.removeAttribute("disabled"); //habilitamos el botón de copiar y pegar
    }
  }

  const MENSAJEADVERTENCIA = document.getElementById("mensaje-advertencia");

  const TEXTAREA = document.getElementById("textoUser");
  TEXTAREA.onkeyup = validarTextarea;

  const BTNENCRYPT = document.querySelector("#encriptarText");
  const BTNDESENCRYPT = document.querySelector("#desencriptarText");
  const BTNCOPIETEXT = document.querySelector("#copieText");

  BTNENCRYPT.onclick = encriptarText;
  BTNDESENCRYPT.onclick = desencriptarText;
  BTNCOPIETEXT.onclick = copiarText;
}

window.onload = readyDom;
