
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
document.getElementById("code-activation").addEventListener("input", handleInput);
document.getElementById("nom-boutique").addEventListener("input", checkNomBoutique);

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

function checkNomBoutique() {
    const nomBoutique = document.getElementById("nom-boutique").value;
       
    if (nomBoutique.length > 0) {
        document.getElementById("lunch").style.opacity = "1";
        document.getElementById("lunch").style.cursor = "pointer";
        document.getElementById("lunch").style.background = "#8282f3";
    } else {
        document.getElementById("lunch").style.opacity = "0.3";
        document.getElementById("lunch").style.cursor = "no-drop";
    }
}

document.getElementById("cnx").addEventListener("click", async function(event) {
    event.preventDefault();
    hideErrors();

    const email = document.getElementById("put-email").value;
    const password = document.getElementById("put-password").value;
   
    document.getElementById("overlay").style.display = "block";
    console.log("Tentative de connexion avec l'email:", email);

    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        const user = userCredential.user;
        localStorage.setItem('user', JSON.stringify(user));        
        console.log("Utilisateur connecté :", user.uid);

        // Récupération des données utilisateur
        const userData = await getUserData(user.uid);

        if (userData && userData.statue === 'no confirm') {
            document.getElementById("overlay").style.display = "none";
            const contC = document.querySelector('.cont-c');
            const contD = document.querySelector('.cont-d');
            const contE = document.querySelector('.cont-e');
            if (contC && contD && contE) {
                contC.style.display = 'none';
                contD.style.display = 'none';
                contE.classList.add('visi');
                
                // Démarrer le minuteur
                document.getElementById("crono").style.cursor = "no-drop";
                document.getElementById("crono").style.color = "red";
                document.getElementById("crono").style.opacity = "0.5";
        
                const activ = Math.floor(100000 + Math.random() * 900000);
                localStorage.setItem('activationCode', activ);
                const email = document.getElementById("put-email").value;
                const name = userData.name || "Utilisateur"; // Récupérer le nom depuis userData
                localStorage.setItem('name', name);
                localStorage.setItem('email', email);

                try {
                    const response = await fetch('https://platforme.onrender.com/email-send2', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ uid: user.uid, activ, email, name }),
                    });
        
                    if (!response.ok) {
                        throw new Error('Erreur lors de l\'envoi du code');
                    }
        
                    const data = await response.json();
                    console.log(data);
                    startTimer();
        
                } catch (error) {
                    console.error("Erreur lors de l'envoi de l'email :", error.message);
                } finally {
                    document.getElementById("overlay").style.display = "none";
                }
        
            }

        } else if (userData && userData.statue === 'confirm' && userData.boutique === '0') {
            document.getElementById('cont-c').style.display = "none";
            document.getElementById('cont-f').style.display = "flex";
            document.getElementById('singup').style.display = "none";
            document.getElementById("overlay").style.display = "none";

        } else if (userData && userData.statue === 'confirm' && userData.boutique !== '0') {
            // Rediriger vers la page penal.html si le statut est "confirm" et le nombre de boutiques n'est pas 0
            window.location.href = '/V 1.0/main/penal.html';

        } else {
            showError('erreur', "Erreur de statut utilisateur.");
            document.getElementById("overlay").style.display = "none";
        }

    } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        if (error.code === 'auth/too-many-requests') {
            showError('erreur', "Trop de tentatives infructueuses. Veuillez réessayer plus tard.");
        } else if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
            showError('erreur', "Email ou mot de passe incorrect.");
        } else {
            showError('erreur', "Erreur inconnue. Veuillez réessayer.");
        }
       
    }
});

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("lunch").addEventListener("click", async function(event) {
        event.preventDefault();
        
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const boutiqueName = document.getElementById("nom-boutique").value;
            localStorage.setItem('boutiqueName', boutiqueName);
            const etat = 'hor service';
            
            if (!boutiqueName) {
                showError('erreur', "Veuillez entrer un nom de boutique.");
                return;
            }

            if (!etat) {
                showError('erreur', "errur");
                return;
            }

            if (!user || !user.uid) {
                showError('erreur', "Utilisateur non authentifié.");
                return;
            }

            document.getElementById("overlay").style.display = "block";

            const response = await fetch(`http://127.0.0.1:3000/boutique/${user.uid}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: boutiqueName , etat: etat})
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erreur lors de la création de la boutique');
            }

            const data = await response.json();
            console.log(data);
            console.log("Nom de la boutique dans le localStorage:", localStorage.getItem('boutiqueName'));
            window.open('/V 1.0/main/penal.html', '_self');
         

        } catch (error) {
            console.error("Erreur:", error.message);
            showError('erreur3', error.message);
        } finally {
            document.getElementById("overlay").style.display = "none";
        }
    });
});

// Fonction d'affichage des erreurs
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
    }
}

// Fonction pour récupérer les données utilisateur depuis le serveur
async function getUserData(uid) {
    try {
        const response = await fetch(`https://platforme.onrender.com/user/${uid}`);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données de l\'utilisateur : ' + response.statusText);
        }
        const userData = await response.json();
        console.log(userData); // Traiter les données ici
    } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur :', error);
    }
}




async function handleInput() {
    const codeInput = document.getElementById("code-activation");
    const code = codeInput.value;
    const user = JSON.parse(localStorage.getItem('user')); // Désérialiser l'objet user
    const userId = user?.uid; // Récupérer l'UID de l'utilisateur depuis les données stockées
    const activ = localStorage.getItem('activationCode'); // Récupérer le code d'activation stocké
    

    if (code.length > 6) {
        codeInput.value = code.slice(0, 6); // Réduit la longueur à 6 chiffres
    }

    if (code.length === 6) {
        document.getElementById("overlay").style.display = "block";
        
        if (code === activ) {
            hideErrors();

            try {
                const response = await fetch(`http://localhost:3000/user/${userId}/statue`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ statue: "confirm" })
                });

                if (response.ok) {
                    // Utilisation de `getElementById` pour `cont-e` et `cont-f`
                    document.getElementById('cont-e').style.display = "none";
                    document.getElementById('cont-f').style.display = "flex";
                    document.getElementById('singup').style.display = "none";
                } else if (response.status === 404) {
                    showError('erreur2', "Utilisateur non trouvé.");
                } else {
                    showError('erreur2', "Erreur lors de la mise à jour du statut.");
                }
            } catch (error) {
                console.error("Erreur lors de la mise à jour du statut :", error);
                showError('erreur2', "Erreur de connexion au serveur.");
            } finally {
                document.getElementById("overlay").style.display = "none";
            }

        } else {
            showError('erreur2', "Code de verification incorrect");
            document.getElementById("overlay").style.display = "none";
        }
    }
}





// Fonction pour démarrer le minuteur
function startTimer() {
    let timeLeft = 60;
    const cronoElement = document.getElementById("crono");
    if (!cronoElement) return;

    cronoElement.textContent = `${timeLeft} secondes restantes`;

    const timerId = setInterval(() => {
        timeLeft--;
        cronoElement.textContent = `${timeLeft} secondes restantes`;

        if (timeLeft <= 0) {
            clearInterval(timerId);
            cronoElement.textContent = "Renvoyez le code";
            cronoElement.style.cursor = "pointer";
            cronoElement.style.color = "#0505fb";
            cronoElement.style.opacity = "1";
        }
    }, 1000);
}


document.getElementById("inc").addEventListener("click", async function(event) {
    event.preventDefault();
    hideErrors();

    const name = document.getElementById("cree-nom").value;
    const email = document.getElementById("cree-email").value;
    const password = document.getElementById("cree-password").value;
    const activ = Math.floor(100000 + Math.random() * 900000);

    localStorage.setItem('activationCode', activ);
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);

    document.getElementById("overlay").style.display = "block";

    try {
        const response = await fetch('http://127.0.0.1:3000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password, activ }),
        });

        if (!response.ok) {
            // Vérifier si l'erreur est due à un conflit (utilisateur déjà existant)
            if (response.status === 409) {
                throw new Error('Ce compte existe déjà.');
            } else {
                throw new Error('Erreur lors de l\'inscription');
            }
        }

        const data = await response.json();
        console.log(data);

        if (data.uid) {
            localStorage.setItem('UID', data.uid);
        } else {
            console.log('Erreur lors de la création de l\'utilisateur:', data.message);
        }

        const contC = document.querySelector('.cont-c');
        const contD = document.querySelector('.cont-d');
        const contE = document.querySelector('.cont-e');
        if (contC && contD && contE) {
            contD.style.display = 'none';
            contC.classList.add('visi');
        }
        
        const singupElement = document.getElementById("singup");
        if (singupElement) singupElement.style.display = 'none';

        const putEmail = document.getElementById("put-email");
        const putPassword = document.getElementById("put-password");
        if (putEmail && putPassword) {
            putEmail.value = email;
            putPassword.value = password;
        }

    } catch (error) {
        showError('erreur1', error.message);
    } finally {
        document.getElementById("overlay").style.display = "none";
    }
});



document.getElementById("crono").addEventListener("click", async function(event) {
        startTimer();

        document.getElementById("crono").style.cursor = "no-drop";
        document.getElementById("crono").style.color = "red";
        document.getElementById("crono").style.opacity = "0.5";

        const uid = localStorage.getItem('UID');
        const activ = localStorage.getItem('activationCode');
        const email = localStorage.getItem('email');
        const name = localStorage.getItem('name');

        try {
            const response = await fetch('http://127.0.0.1:3000/email-send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ activ, uid, email, name }),
            });

            if (!response.ok) {
                throw new Error('Erreur lors de l\'envoi du code');
            }

            const data = await response.json();
            console.log(data);

        } catch (error) {
            console.error("Erreur lors de l'envoi de l'email :", error.message);
        } finally {
            document.getElementById("overlay").style.display = "none";
        }
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




