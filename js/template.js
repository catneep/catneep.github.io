if ('content' in document.createElement('template')) {
    console.log('Template element is supported');
    
    //Contenedor para elementos de template
    const container = document.querySelector("#project-list");
    //Elemento a clonar
    const template = document.querySelector('#template');

    // Clone the new row and insert it into the table
    for (i = 0; i < 6; i++){
        let clone = template.content.cloneNode(true);
        let p = clone.querySelectorAll("p");
        p[0].textContent = `idolazo ${i + 7}`
        p[1].textContent = `element: ${i}`;

        container.appendChild(clone);
    }

} else console.log('Template element is NOT supported');