
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
// Initialiser Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAdo42qfCCYjwvdi5_JthsrDXxcRIxsbE0",
    authDomain: "infofoot-32892.firebaseapp.com",
    databaseURL: "https://infofoot-32892-default-rtdb.firebaseio.com",
    projectId: "infofoot-32892",
    storageBucket: "infofoot-32892.appspot.com",
    messagingSenderId: "439273116379",
    appId: "1:439273116379:web:9eb86071e411f748c772fe"
};

// Initialiser Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();




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

document.getElementById("put-email").addEventListener("input", checkLoginInputs);
document.getElementById("put-password").addEventListener("input", checkLoginInputs);
document.getElementById("cree-nom").addEventListener("input", checkSignupInputs);
document.getElementById("cree-email").addEventListener("input", checkSignupInputs);
document.getElementById("cree-password").addEventListener("input", checkSignupInputs);
document.getElementById("cree-rpassword").addEventListener("input", checkSignupInputs);

function checkLoginInputs() {
    const email = document.getElementById("put-email").value;
    const password = document.getElementById("put-password").value;
    
    if (email.length > 0 && password.length > 0) {
        document.getElementById("cnx").style.opacity = "1";
        document.getElementById("cnx").style.cursor = "pointer";
    } else {
        document.getElementById("cnx").style.opacity = "0.3";
        document.getElementById("cnx").style.cursor = "no-drop";
    }
}

function checkSignupInputs() {
    const cname = document.getElementById("cree-nom").value;
    const cemail = document.getElementById("cree-email").value;
    const cpassword = document.getElementById("cree-password").value;
    const crpassword = document.getElementById("cree-rpassword").value;
       
    if (cemail.length > 0 && cpassword.length > 0 && cname.length > 0 && cpassword === crpassword) {
        document.getElementById("inc").style.opacity = "1";
        document.getElementById("inc").style.cursor = "pointer";
    } else {
        document.getElementById("inc").style.opacity = "0.3";
        document.getElementById("inc").style.cursor = "no-drop";
    }
}

document.getElementById("cnx").addEventListener("click", function(event) {
    event.preventDefault(); 

    const email = document.getElementById("put-email").value;
    const password = document.getElementById("put-password").value;
    
    auth.signInWithEmailAndPassword(email, password)  // Correction de la fonction
        .then((userCredential) => {
            const user = userCredential.user;

            // Vérification si l'email est vérifié
            if (!user.emailVerified) {
                user.sendEmailVerification();
                hideErrors();
                showError('erreur', "Votre compte n'est pas activé. Veuillez l'activer depuis votre adresse e-mail.");
                auth.signOut();  // Déconnexion si le compte n'est pas activé

                return;
            }

            window.location.href = "/V 1.0/main/penal.html";
        })
        .catch((error) => {
            hideErrors();
            showError('erreur', "Email ou mot de passe incorrect.");
        });
});

document.getElementById("inc").addEventListener("click", function(event){
    event.preventDefault();
    const name = document.getElementById("cree-nom").value;
    const email = document.getElementById("cree-email").value;
    const password = document.getElementById("cree-password").value;
    const subject = 'Activation de votre compte';
    const message = 'Bonjour'+ name +',\n\n'+ 'Veuillez cliquer'

    auth.createUserWithEmailAndPassword(email, password)
        .then(async (userCredential)=> {
            const user = userCredential.user;
            const userId = user.uid;

            database.ref('users/' + userId).set ({
                name: name,
                email: email,
                premium: 'non',
                statue: 'first',
                id: userId,
                boutique: '0',
            });

            try {
                const response = await fetch('https://boutiquedz.onrender.com/send-email', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, subject, message }),
                  });                  
        
                if (response.ok) {
                  alert('Email envoyé avec succès');
                } else {
                  alert('Erreur lors de l\'envoi de l\'email');
                }
                
              } catch (error) {
                console.error('Erreur:', error);
              }
    

            document.getElementById("put-email").value = email;
            document.getElementById("put-password").value = password;
            document.getElementById("cont-c").style.display = "none";

        })
       
        .catch((error) => {
            showError('erreur', "Erreur lors de l'inscription : " + error.message);
        });
});

document.getElementById("put-email").addEventListener("click", function(event) {
    document.getElementById("cont-c").classList.add("force")

});

document.getElementById("cree-nom").addEventListener("click", function(event) {
    document.getElementById("cont-c").classList.add("force")

});

document.getElementById("put-password").addEventListener("click", function(event) {
    document.getElementById("cont-c").classList.add("force")

});

document.getElementById("recup").addEventListener("click", function(event) {
    event.preventDefault();
    const email = document.getElementById("put-email").value;
    
    if (!email) {
        hideErrors();
        showError('erreur', "Veuillez entrer votre adresse email.");
        return;
    }

    auth.sendPasswordResetEmail(email)
        .then(() => {
            hideErrors();
            showError('erreur', "Un email de récupération a été envoyé à votre adresse.");
        })
        .catch((error) => {
            hideErrors();
            showError('erreur', "Erreur lors de l'envoi de l'email de récupération.");
        });
});

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

function hideErrors() {
    document.querySelectorAll('.error').forEach((errorElement) => {
        errorElement.style.display = 'none';f
    });
}

      