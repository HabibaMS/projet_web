const formulaire = document.querySelector("#formulaire");
const radios = document.querySelectorAll('input[name="unite"]');
const champImc = document.querySelector("#imc");
const categorie = document.querySelector("#categorie");

function fnMetrique(){
    return document.querySelector('input[name="unite"]:checked').value === "metrique";
}

function majUnites(){

    const pm = fnMetrique();
    document.querySelector("#unitePoids").textContent = pm ? "kg" : "lbs";
    document.querySelector("#uniteTaille1").textContent = pm ? "m" : "pi";
    document,querySelector("#uniteTaille2").textContent = pm ? "cm" : "po";
    champImc.value = "";
    categorie.textContent = "";
}

radios.forEach((r) => r.addEventListener("change", majUnites));

formulaire.addEventListener("submit", (e) => {
    e.preventDefault();

    const poids = parseFloat(document.querySelector("#poids").value);
    const t1 = parseFloat(document.querySelector("#taille1").value);
    const t2 = parseFloat(document.querySelector("#taille2").value);

    let imc;
    if (fnMetrique()) {
        const tailleM = t1 + (t2 / 100);
        imc = poids / (tailleM * tailleM);
    } else {
        const pouces = (t1 * 12) +t2;
        imc = (703 * poids) /(pouces *pouces);
    }

    if(!isFinite(imc) || imc <= 0){
        champImc.value = "";
        categorie.textContent = " Vérifiez les valeurs saisies s'il vous plait.";
        return;
    }

    champImc.value = imc.toFixed(1);

    if (imc < 18.5) categorie.textContent = "Insuffisance pondérale";
    else if (imc <25) categorie.textContent = "Poids normal";
    else if (imc <30) categorie.textContent = "Surpoids";
    else categorie.textContent = "Obésité";
});