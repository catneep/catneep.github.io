document.getElementById("toggleDark").addEventListener("click", toggleDark);
let enabled = false;
let counter = 0;

function toggleDark(){
    counter++;
    // This is a pretty horrible implementation, but it works
    if (counter >= 2) counter = 0;
    else if (counter == 1){
        enabled = !enabled;
        let r = document.querySelector(':root');
        let rs = getComputedStyle(r);

        if (enabled){
            r.style.setProperty('--background', '#fff');
            r.style.setProperty('--foreground', '#111');
            r.style.setProperty('--foreground-shine', '#111b0');
        } else {
            r.style.setProperty('--background', '#131313');
            r.style.setProperty('--foreground', '#fff');
            r.style.setProperty('--foreground-shine', '#ffffffb0');
        }
        console.log(("The new value of --bg is: " + rs.getPropertyValue('--background')));
    }
}