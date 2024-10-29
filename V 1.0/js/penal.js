window.onload = function() {
    document.getElementById('s-bord').classList.add("clikable");
    document.querySelector('.parti-home').style.display = 'block';

}

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