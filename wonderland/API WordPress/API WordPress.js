var nbPostsPerAuthor = {} , nbAuteur;   // Définition des variables utiles pour fillNbPosts

var getJSON2 = function(url) {  // Fonction permettant de récupérer les données JSON depuis une URL donnée
    return new Promise(function (data,err){
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'json';
        xhr.onload = function() {
            var status = xhr.status;
            if (status === 200) {
                data(xhr.response);
            } else {
                err(status, xhr.response);
            }
        };
        xhr.send();
    });
};

const fillHTML = function(data) {   // Fonction prenant en paramètre les données JSON des auteurs
    nbAuteur = data.length; // On récupère le nombre d'auteurs

    for (var i = 0 ; i < nbAuteur ; i++) { // Pour chaque auteur ...

        createArticle(i);

        document.getElementById("auteur"+i).textContent = data[i].name; // On récupère le nom de l'auteur

        document.getElementById("avatar"+i).src = data[i].avatar_urls[96];  // On récupère l'avatar

        var description = document.createElement("p");  // On crée un élément paragraphe ...
        description.textContent = data[i].description;  // On définit comme texte de cet élément la description de l'auteur ..
        document.getElementById("description"+i).appendChild(description);  // On ajoute l'élément à la partie description de la page

        var idAuteur = document.createElement("meta");  // On crée un élément meta pour contenir l'id de l'auteur ..
        idAuteur.title = "idAuteur";    // On définit le titre de l'élément ..
        idAuteur.content = data[i].id;  // On définit le contenu de l'élément, à savoir l'id de l'auteur ..
        document.getElementById("auteur"+i).appendChild(idAuteur);  // On ajoute l'élément meta à la partie auteur de la page

        nbPostsPerAuthor[idAuteur.content] = 0; // Dans l'objet littéral, on définit à 0 le compte pour l'id de l'auteur considéré
    }
};

const fillNbPosts = function (data) {   // Fonction prenant en paramètre les données JSON des articles
    for (var i = 0; i < data.length; i++)   // Pour chaque article ...
        nbPostsPerAuthor[data[i].author]++; // On incrémente le compte pour l'id de l'auteur de l'article

    for (var author = 0 ; author < nbAuteur ; author++) // Pour chaque auteur, on ajoute le nombre d'articles sur la page
        document.getElementById("nb"+author).textContent += nbPostsPerAuthor[document.querySelector("#auteur"+author+" meta").content];
};

const createArticle = function (noArticle) {
    var article = document.createElement("article");
    var div = document.createElement("div");
    var h2 = document.createElement("h2");
    var img = document.createElement("img");
    var p = document.createElement("p");
    var strong = document.createElement("strong");

    h2.id = "auteur" + noArticle;
    img.id = "avatar" + noArticle;
    p.id = "description" + noArticle;
    strong.id = "nb" + noArticle;
    strong.textContent = "Nombre d'articles : ";

    div.appendChild(h2);
    div.appendChild(img);
    p.appendChild(strong);
    article.appendChild(div);
    article.appendChild(p);

    document.getElementById("corpus").appendChild(article);
}


document.getElementById("recherche").addEventListener("click" , function () {
    document.getElementById("corpus").remove();

    var corpus = document.createElement("div");
    corpus.id = "corpus"
    document.getElementById("principale").appendChild(corpus);

    var nbUsers = document.getElementById("nbUsers").value , nbPosts = document.getElementById("nbPosts").value;
    var url = "http://geekpress.fr/wp-json/wp/v2/" , urlUser = "users?per_page=" + nbUsers , urlPosts = 'posts?per_page=' + nbPosts;

    getJSON2(url+urlUser).then(fillHTML);        // On remplit la page Web des noms, avatars et descriptions des auteurs
    getJSON2(url+urlPosts).then(fillNbPosts);    // On remplit la page Web des nombres d'articles des auteurs
});

