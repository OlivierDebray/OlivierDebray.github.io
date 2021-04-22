var navBar = document.createElement("nav");

var pages = [
    {
        name: "home",
        title: "Accueil"
    },
    {
        name: "CV",
        title: "CV"
    },
    {
        name: "journuit",
        title: "Jour / Nuit"
    },
    // {
    //     name: "memory",
    //     title: "Memory"
    // },
    {
        name: "API%20WordPress",
        title: "Api WordPress"
    },
    // {
    //     name: "pictoGuesser",
    //     title: "PictoGuesser"
    // },
    {
        name: "sandbox",
        title: "Sandbox"
    }
]

navBar.innerHTML = "";

pages.forEach(page => {
    navBar.innerHTML += '<a href="../'+page.name+'/'+page.name+'.html">'+page.title+'</a>'
});

document.body.appendChild(navBar);