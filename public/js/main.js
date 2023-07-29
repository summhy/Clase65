const listado = document.getElementById("correos");

async function llenar(){
    const response =  await fetch("/correos");
    const correos = await response.json();
   
    correos.forEach(element => {
        const item = document.createElement("li");
        item.textContent =  `${element.nombre} <${element.mail}>`;
        listado.appendChild(item);
        
    });
    

}

llenar();