var usaApi1   = document.getElementById("LlamaAPI1");
var usaApi2   = document.getElementById("LlamaAPI2");
var mensajes  = document.getElementById("log");


usaApi1.addEventListener("click", enviaDatos);
usaApi2.addEventListener("click", enviaInfo);

function enviaRequest(verbo, url, datos) {

    const promise = new Promise((resolve, reject) => {

        let xhr = new XMLHttpRequest();
        xhr.open(verbo, url);
        xhr.respondeType = "json";
        mensajes.innerHTML = "==== USANDO XHR ====";
        xhr.onload = () => {
            resolve(JSON.parse(xhr.response));
        };

        xhr.send(JSON.stringify(datos));

    });

  return promise;

}

function enviaInfo() {

  const estrellas = document.getElementById("estrellas").value;
  const hotel   = document.getElementById("hotel").value;
  const region = document.getElementById("region").value;

	const valorAEnviar = { estrellas, hotel, region };
    enviaValores(valorAEnviar);

}

async function enviaDatos() {

  const estrellas = document.getElementById("estrellas").value;
  const hotel   = document.getElementById("hotel").value;
  const region = document.getElementById("region").value;

	const valorAEnviar = { estrellas, hotel, region };

    enviaRequest("POST", "https://inp3440-tarea-4-default-rtdb.firebaseio.com/registro_xhr.json", valorAEnviar )
    .then(dataRespuesta=> {
      mensajes.innerHTML+= '\n' + JSON.stringify(dataRespuesta); })
}


const enviaValores = datos =>{

    fetch("https://inp3440-tarea-4-default-rtdb.firebaseio.com/registro_fetch.json",
         { method:"POST", body:JSON.stringify(datos), headers:{"Content-type":"application/json"} })
        .then(responde =>{ return responde.json() })
        .then(dataRespuesta=>{ mensajes.innerText = JSON.stringify(dataRespuesta); })
}
