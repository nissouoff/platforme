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

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log("Utilisateur connecté:", user.uid); // Vérifiez l'UID de l'utilisateur
        // L'utilisateur est connecté, vous pouvez maintenant appeler getBoutiqueData ici si nécessaire
        const boutiqueName = localStorage.getItem('boutiqueName');
        if (boutiqueName) {
            getBoutiqueData(user.uid, boutiqueName);
        } else {
            console.log('Nom de la boutique non trouvé dans le localStorage');
        }
    } else {
        console.log("Aucun utilisateur connecté");
    }
});

// Fonction pour récupérer les données de la boutique
function getBoutiqueData(uid, nomb) {
    if (uid) {
        database.ref(`boutiques/${uid}/${nomb}`).once('value')
            .then((snapshot) => {
                const boutiqueData = snapshot.val();
                const boutiqueetat = boutiqueData.etat
                if (boutiqueData) {
                    console.log('Données de la boutique:', boutiqueData);
                    document.getElementById('n-boutique').textContent = boutiqueData.name;
                    document.getElementById('e-boutique').textContent = boutiqueData.etat;

                    if (boutiqueetat === 'hor service'){
                        document.getElementById('e-boutique').style.color = 'red';

                    } else {
                        document.getElementById('e-boutique').style.color = 'green';

                    }
                    
                    return boutiqueData; // Cette valeur est retournée à l'intérieur d'une promesse.
                } else {
                    console.log('Boutique non trouvée');
                    return null;
                }
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération des données:', error);
                return null;
            });
    } else {
        console.log('Aucun utilisateur connecté');
        return null;
    }
}

// Fonction pour récupérer et afficher le solde de l'utilisateur
function getUserSold(uid) {
    if (uid) {
        database.ref(`users/${uid}`).once('value')
            .then((snapshot) => {
                const userData = snapshot.val();
                if (userData && userData.solde) {  // Utilisez `solde` ici pour correspondre à la clé dans Firebase
                    document.getElementById('s-sold').textContent = '$ '+ userData.solde +'.00';
                } else {
                    document.getElementById('s-sold').textContent = '0 $'; // Affiche 0 si `solde` est inexistant
                }
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération du solde:', error);
                document.getElementById('s-sold').textContent = '0 $';
            });
    }
}


// Appeler getUserSold lorsque l'utilisateur est connecté
auth.onAuthStateChanged((user) => {
    if (user) {
        getUserSold(user.uid);
    }
});




// Nouvelle fonction pour récupérer toutes les boutiques d'un utilisateur


document.getElementById("st-1").addEventListener("click", function(event) {
    event.preventDefault(); // Empêche le comportement par défaut du bouton
    
    document.getElementById('kk').style.width = '900px';
    document.getElementById("put").style.display = 'block';
    document.getElementById("cnf").style.display = 'block';
    document.getElementById("st-1").style.display = 'none';  
});

document.getElementById("put").addEventListener("input", function() {
    if (this.value.length > 0) {
        document.getElementById("cnf").style.opacity = "1";
        document.getElementById("cnf").style.cursor = "pointer";
    } else {
        document.getElementById("cnf").style.opacity = "0.5";
        document.getElementById("cnf").style.cursor = "no-drop";
    }
  
});


document.getElementById("s-bord").addEventListener("click", function(event) {
    event.preventDefault(); // Empêche le comportement par défaut du bouton
    document.getElementById("s-bord").classList.add("clikable");
    document.querySelector('.parti-home').style.display = 'block';
    document.getElementById("s-boutique").classList.remove("clikable");
    document.getElementById("s-commandes").classList.remove("clikable");
    document.getElementById("s-produit").classList.remove("clikable"); 
    document.getElementById("s-factur").classList.remove("clikable");
    document.getElementById("s-analys").classList.remove("clikable");
    document.getElementById("s-support").classList.remove("clikable");
    document.getElementById("s-reglage").classList.remove("clikable");
});

document.getElementById("s-boutique").addEventListener("click", function(event) {
    event.preventDefault(); // Empêche le comportement par défaut du bouton
    document.getElementById("s-boutique").classList.add("clikable");
    document.getElementById("s-bord").classList.remove("clikable");
    document.getElementById("s-commandes").classList.remove("clikable");
    document.getElementById("s-produit").classList.remove("clikable"); 
    document.getElementById("s-factur").classList.remove("clikable");
    document.getElementById("s-analys").classList.remove("clikable");
    document.getElementById("s-support").classList.remove("clikable");
    document.getElementById("s-reglage").classList.remove("clikable");
    document.querySelector('.parti-home').style.display = 'none';
});

document.getElementById("s-commandes").addEventListener("click", function(event) {
    event.preventDefault(); // Empêche le comportement par défaut du bouton
    document.getElementById("s-commandes").classList.add("clikable");
    document.getElementById("s-bord").classList.remove("clikable");
    document.getElementById("s-boutique").classList.remove("clikable");
    document.getElementById("s-produit").classList.remove("clikable"); 
    document.getElementById("s-factur").classList.remove("clikable");
    document.getElementById("s-analys").classList.remove("clikable");
    document.getElementById("s-support").classList.remove("clikable");
    document.getElementById("s-reglage").classList.remove("clikable");
    document.querySelector('.parti-home').style.display = 'none';
});

document.getElementById("s-produit").addEventListener("click", function(event) {
    event.preventDefault(); // Empêche le comportement par défaut du bouton
    document.getElementById("s-produit").classList.add("clikable");
    document.getElementById("s-bord").classList.remove("clikable");
    document.getElementById("s-boutique").classList.remove("clikable");
    document.getElementById("s-commandes").classList.remove("clikable"); 
    document.getElementById("s-factur").classList.remove("clikable");
    document.getElementById("s-analys").classList.remove("clikable");
    document.getElementById("s-support").classList.remove("clikable");
    document.getElementById("s-reglage").classList.remove("clikable");
    document.querySelector('.parti-home').style.display = 'none';
});

document.getElementById("s-factur").addEventListener("click", function(event) {
    event.preventDefault(); // Empêche le comportement par défaut du bouton
    document.getElementById("s-factur").classList.add("clikable");
    document.getElementById("s-bord").classList.remove("clikable");
    document.getElementById("s-boutique").classList.remove("clikable");
    document.getElementById("s-commandes").classList.remove("clikable"); 
    document.getElementById("s-produit").classList.remove("clikable");
    document.getElementById("s-analys").classList.remove("clikable");
    document.getElementById("s-support").classList.remove("clikable");
    document.getElementById("s-reglage").classList.remove("clikable");
    document.querySelector('.parti-home').style.display = 'none';
});

document.getElementById("s-analys").addEventListener("click", function(event) {
    event.preventDefault(); // Empêche le comportement par défaut du bouton
    document.getElementById("s-analys").classList.add("clikable");
    document.getElementById("s-bord").classList.remove("clikable");
    document.getElementById("s-boutique").classList.remove("clikable");
    document.getElementById("s-commandes").classList.remove("clikable"); 
    document.getElementById("s-produit").classList.remove("clikable");
    document.getElementById("s-factur").classList.remove("clikable");
    document.getElementById("s-support").classList.remove("clikable");
    document.getElementById("s-reglage").classList.remove("clikable");
    document.querySelector('.parti-home').style.display = 'none';
});

document.getElementById("s-support").addEventListener("click", function(event) {
    event.preventDefault(); // Empêche le comportement par défaut du bouton
    document.getElementById("s-support").classList.add("clikable");
    document.getElementById("s-bord").classList.remove("clikable");
    document.getElementById("s-boutique").classList.remove("clikable");
    document.getElementById("s-commandes").classList.remove("clikable"); 
    document.getElementById("s-produit").classList.remove("clikable");
    document.getElementById("s-factur").classList.remove("clikable");
    document.getElementById("s-analys").classList.remove("clikable");
    document.getElementById("s-reglage").classList.remove("clikable");
    document.querySelector('.parti-home').style.display = 'none';
});

document.getElementById("s-reglage").addEventListener("click", function(event) {
    event.preventDefault(); // Empêche le comportement par défaut du bouton
    document.getElementById("s-reglage").classList.add("clikable");
    document.getElementById("s-bord").classList.remove("clikable");
    document.getElementById("s-boutique").classList.remove("clikable");
    document.getElementById("s-commandes").classList.remove("clikable"); 
    document.getElementById("s-produit").classList.remove("clikable");
    document.getElementById("s-factur").classList.remove("clikable");
    document.getElementById("s-analys").classList.remove("clikable");
    document.getElementById("s-support").classList.remove("clikable");
    document.querySelector('.parti-home').style.display = 'none';
});

document.getElementById("cnf").addEventListener("click", async function(event) {
    event.preventDefault(); // Empêche le comportement par défaut du bouton
    const name = document.getElementById("put").value;

    // Récupère l'UID de l'utilisateur
    const userId = localStorage.getItem('uid');
    if (!userId) {
        console.error("Erreur : UID non trouvé dans le localStorage.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/boutique/${userId}/name`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },            
            body: JSON.stringify({ name: name })
        });

        if (response.ok) {
            // Statut mis à jour avec succès
            
        } else {
            console.log('Erreur lors de la mise à jour du statut.');
        }
    } catch (error) {
        console.error("Erreur lors de la mise à jour du statut :", error);
        console.error("Erreur lors de la mise à jour du statut :", error);
    }
});


// Écouteur pour le chargement de la page
document.addEventListener("DOMContentLoaded", async () => {
    // Récupération de l'utilisateur connecté
    const user = firebase.auth().currentUser;

    if (user) {
        console.log("Utilisateur connecté:", user.uid);

        // Appel à getData avec l'UID de l'utilisateur pour récupérer les informations
        const userInfo = await getData(user.uid);

        if (userInfo) {
            console.log("Données de l'utilisateur récupérées avec succès :", userInfo);
        } else {
            console.log("Aucune donnée utilisateur trouvée.");
        }
    } else {
        console.log("Aucun utilisateur connecté.");
    }
});
