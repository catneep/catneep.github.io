function overlayOff(){
    const ov = document.getElementById('overlay');
    ov.style.display = "none";
}

function overlayOn(){
    const ov = document.getElementById('overlay');
    ov.style.display = "block";
}

function displayProjects(){
    const ov = document.getElementById('projects-overlay');
    ov.classList.remove('hidden');
    ov.classList.add('shown');
    if (!drawn)
        drawTemplates();
}

function hideProjects(){
    const ov = document.getElementById('projects-overlay');
    ov.classList.remove('shown');
    ov.classList.add('hidden');
}