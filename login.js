
    document.querySelectorAll('.contenu-a div').forEach((element) => {
        element.addEventListener('click', function() {
            this.classList.toggle('active'); // Activer ou désactiver la classe active au tap
        });
    });