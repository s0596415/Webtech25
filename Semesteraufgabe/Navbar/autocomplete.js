let availableKeywords = [
'Blumenstecker', 'Biene','Biene-Anhänger', 'Huhn', 'Koala', 'Küken', 'Wal', 'Glückskeks', 'Mond', 'Rose','Rose-Anhänger',
'Sonnenblume', 'Duftglas', 'Hausschuhe Bunt', 'Hausschuhe Dunkel', 'Hausschuhe Rot', 'Hausschuhe Orange',
'Hausschuhe Grün-Bunt', 'Ateez Ligthstick Cover', 'Straykids Ligthstick Cover - Ateez',
'Straykids Ligthstick Cover', 'Beutel1', 'Beutel2', 'beutel3', 'Beutel4',
'Tasche klein und lang', 'Flaschentasche', 'Kindel Hülle', 'Laptop Hülle', 'Notfalltasche',
'Bunte Tasche klein und lang',  'Stulpen schwarz', 'Stulpen bunt', 'Stulpen blau', 'Stulpen grün','Glückskeks -Ate'
];

const resultsBox = document.querySelector(".result-box");
const inputBox = document.querySelector(".search-input"); // oder mit ID

// Mapping von Keywords zu URLs
const keywordMap = {
  "Blumenstecker": "/Semesteraufgabe/Anleitungen/details/Amigurumi/Blumenstecker.html",
  "Biene": "/Semesteraufgabe/Anleitungen/details/Amigurumi/Biene.html",
  "Biene-Anhänger": "/Semesteraufgabe/Anleitungen/details/Anhänger/Biene.html",
  "Huhn": "/Semesteraufgabe/Anleitungen/details/Amigurumi/Huhn.html",
  "Koala": "/Semesteraufgabe/Anleitungen/details/Amigurumi/Koala.html",
  "Küken": "/Semesteraufgabe/Anleitungen/details/Amigurumi/Küken.html",
  "Wal": "/Semesteraufgabe/Anleitungen/details/Amigurumi/Wal.html",
  "Glückskeks": "/Semesteraufgabe/Anleitungen/details/Anhänger/Glückskeks.html",
  "Mond": "/Semesteraufgabe/Anleitungen/details/Anhänger/Mond.html",
  "Rose- Anhänger": "/Semesteraufgabe/Anleitungen/details/Anhänger/Rose.html",
  "Rose": "/Semesteraufgabe/Anleitungen/details/geschenkideen/Rose.html",
  "Erdbeere": "Semesteraufgabe/Anleitungen/details/Anhänger/Erdbeere.html",
  "Sonnenblume": "/Semesteraufgabe/Anleitungen/details/Anhänger/Sonnenblume.html",
  "Duftglas": "/Semesteraufgabe/Anleitungen/details/geschenkideen/Duftglas.html",
  "Hausschuhe Bunt": "/Semesteraufgabe/Anleitungen/details/hausschuhe/1Bunt.html",
  "Hausschuhe Dunkel": "/Semesteraufgabe/Anleitungen/details/hausschuhe/3Dunkel.html",
  "Hausschuhe Rot": "/Semesteraufgabe/Anleitungen/details/hausschuhe/4Rot.html",
  "Hausschuhe Orange": "/Semesteraufgabe/Anleitungen/details/hausschuhe/5.html",
  "Hausschuhe Grün-Bunt": "/Semesteraufgabe/Anleitungen/details/hausschuhe/2.html",
  "Ateez Ligthstick Cover": "/Semesteraufgabe/Anleitungen/details/kpop/ateezLigthstick.html",
  "Straykids Ligthstick Cover - Ateez": "/Semesteraufgabe/Anleitungen/details/kpop/skz-ateezLigthstick.html",
  "Straykids Ligthstick Cover": "/Semesteraufgabe/Anleitungen/details/kpop/skzLigthstick.html",
  "Glückskeks-Ate": "Semesteraufgabe/Anleitungen/details/kpop/glückskeks.html",
  "Beutel1": "/Semesteraufgabe/Anleitungen/details/TaschenBeutel/beutel 1.html",
  "Beutel2": "/Semesteraufgabe/Anleitungen/details/TaschenBeutel/beutel2.html",
  "beutel3": "/Semesteraufgabe/Anleitungen/details/TaschenBeutel/beutel3.html",
  "Beutel4": "/Semesteraufgabe/Anleitungen/details/TaschenBeutel/beutel4.html",
  "Tasche klein und lang": "/Semesteraufgabe/Anleitungen/details/TaschenBeutel/BlaueTascheKlein.html",
  "Flaschentasche": "/Semesteraufgabe/Anleitungen/details/TaschenBeutel/Flaschentasche.html",
  "Kindel Hülle": "/Semesteraufgabe/Anleitungen/details/TaschenBeutel/Kindle.html",
  "Laptop Hülle": "/Semesteraufgabe/Anleitungen/details/TaschenBeutel/LaptopHülle.html",
  "Notfalltasche": "/Semesteraufgabe/Anleitungen/details/TaschenBeutel/notfalltasche.html",
  "Bunte Tasche klein und lang": "/Semesteraufgabe/Anleitungen/details/TaschenBeutel/miniTasche.html",
  "Stulpen schwarz": "/Semesteraufgabe/Anleitungen/details/winter/Stulpen.schwarz.html",
  "Stulpen bunt": "/Semesteraufgabe/Anleitungen/details/winter/StulpenBunt.html",
  "Stulpen blau": "/Semesteraufgabe/Anleitungen/details/winter/StulpenBlau.html",
  "Stulpen grün": "/Semesteraufgabe/Anleitungen/details/winter/StulpenGrün.html"
};



inputBox.onkeyup = function(){
let result = [];
 let input = inputBox.value;
if(input.length){
 result = availableKeywords.filter(keyword =>
 keyword.toLowerCase().includes(input.toLowerCase())
 );
 }
 display(result);
};

function display(result){
const content = result.map(item => {
 const link = keywordMap[item] || "#";
return `<li><a href="${link}" style="text-decoration:none;color:inherit;">${item}</a></li>`;
});
 resultsBox.innerHTML = "<ul>" + content.join('') + "</ul>";
}

