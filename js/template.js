let drawn = false;

function drawTemplates(){
    if ('content' in document.createElement('template')) {
        console.log('Template element is supported');
        
        //Contenedor para elementos de template
        const container = document.querySelector("#project-list");
        //Elemento a clonar
        const template = document.querySelector('#project-card-template');
    
        // Clone the new row and insert it into the table
        for (i = 0; i < 7; i++){
            let clone = template.content.cloneNode(true);
            let p = clone.querySelectorAll('h3');
            p[0].textContent = `idolazo ${i + 1}`
            // p[1].textContent = `element: ${i + 1}`;
    
            container.appendChild(clone);
        }
        drawn = true;
    } else console.log('Template element is NOT supported');
}