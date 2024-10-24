/*onload = function() {
    // Desactiver le clic droit
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault()
    })

    // Désactiver la touche F12
    document.addEventListener('keydown', function(e) {
        if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
            e.preventDefault()
        }
    })

    // Fermer automatiquement l'inspecteur d'éléments
}

function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function detectDevTools() {
    if (!isMobileDevice()) {
        const threshold = 160;
        const widthThreshold = window.outerWidth - window.innerWidth > threshold;
        const heightThreshold = window.outerHeight - window.innerHeight > threshold;
        
        if (widthThreshold || heightThreshold || window.devtools.isOpen) {
            console.log("Les DevTools sont ouvertes !");
            window.location.href = "https://www.google.com";
        }
    }
} 

if (!isMobileDevice()) {
    setInterval(detectDevTools, 1000);

    window.addEventListener('devtoolschange', event => {
        if(event.detail.isOpen) {
            window.location.href = "https://www.google.com";
        }
    });
} 

*/
let clickCount = 0;

document.getElementById("singup").addEventListener("click", function(event) {
    event.preventDefault(); 
    
    clickCount++;

    if (clickCount === 1){
        document.getElementById("singup").textContent = "Vous avez un compte";
        const contC = document.querySelector('.cont-c');
        const contD = document.querySelector('.cont-d');
        
        contC.classList.add('active');
        
        setTimeout(function() {
            contC.style.display = 'none';
        }, 300);
        
        contD.style.display = 'flex';
        setTimeout(function() {
            contD.classList.add('active2');
        }, 10);

    } else if (clickCount === 2) {
        // Add the reverse logic here if needed
        clickCount = 0;
        
        document.getElementById("singup").textContent = "Cree un compte";
        const contC = document.querySelector('.cont-c');
        const contD = document.querySelector('.cont-d');
        
        contD.classList.remove('active2');
        
        setTimeout(function() {
            contD.style.display = 'none';
            contC.style.display = 'flex';
        }, 300);
        
        setTimeout(function() {
            contC.classList.remove('active');
        }, 10);
    }
});


   
