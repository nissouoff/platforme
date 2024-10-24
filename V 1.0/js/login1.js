onload = function() {
    // Desactiver le clic droit
   /* document.addEventListener('contextmenu', function(e) {
        e.preventDefault()
    })*/

    // Désactiver la touche F12
    document.addEventListener('keydown', function(e) {
        if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
            e.preventDefault()
        }
    })

    // Fermer automatiquement l'inspecteur d'éléments
}


