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
