let availableKeywords = [
'Blumenstecker', 'Biene', 'Huhn', 'Koala', 'Küken', 'Wal', 'Glückskeks', 'Mond', 'Rose',
'Sonnenblume', 'Duftglas', 'Hausschuhe Bunt', 'Hausschuhe Dunkel', 'Hausschuhe Rot', 'Hausschuhe Orange',
'Hausschuhe Grün-Bunt', 'Ateez Ligthstick Cover', 'Straykids Ligthstick Cover - Ateez',
'Straykids Ligthstick Cover', 'Beutel1', 'Beutel2', 'beutel3', 'Beutel4',
'Tasche klein und lang', 'Flaschentasche', 'Kindel Hülle', 'Laptop Hülle', 'Notfalltasche',
'Bunte Tasche klein und lang', 'Mütze', 'Stulpen schwarz', 'Stulpen bunt', 'Stulpen blau', 'Stulpen grün'
];

const resultsBox = document.querySelector(".result-box");
const inputBox = document.querySelector(".search-input"); // oder mit ID

// Mapping von Keywords zu URLs
const keywordMap = {
"Blumenstecker": "/Semesteraufgabe/Anleitungen/details/Amigurumi/Blumstecker.html",
"Biene": "/Semesteraufgabe/Anleitungen/details/Amigurumi/Biene.html",
"Hausschuhe Bunt": "/Semesteraufgabe/Anleitungen/details/hausschuhe/1Bunt.html",
 "Koala": "/Semesteraufgabe/Anleitungen/details/Amigurumi/Koala.html",
"Mütze": "/Semesteraufgabe/Anleitungen/details/winter/Mütze.html",
 
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

