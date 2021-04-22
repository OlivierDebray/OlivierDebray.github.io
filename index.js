var config = {}

var xmlHttp = new XMLHttpRequest();
xmlHttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        config = JSON.parse(this.responseText)
    }
}
xmlHttp.open("GET", "/config.json", false)
xmlHttp.send()


// ============


var buttonScroll = false
var scrollLock = false

document.getElementById("navbar").addEventListener("click", () => {
    buttonScroll = true
    setTimeout(() => { buttonScroll = false }, 500)
})

function searchSection (element) {
    while (true) {
        if (element.tagName == "SECTION") {
            return element
        } else {
            element = element.parentElement
            if (element.tagName == "BODY") {
                return null
            }
        }
    }
}

function disableScroll() {
    document.getElementsByClassName("active")[0].click()
}

window.onscroll = () => {
    // console.log(window.pageYOffset + " " + sticky)
    // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky")
    } else {
        navbar.classList.remove("sticky");
    }
    
    middleEl = searchSection(document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2)).id
    if (document.getElementsByClassName("active")[0] != document.getElementById(middleEl + "Nav")) {
        if (!scrollLock) {
            document.getElementsByClassName("active")[0].classList.remove("active")
            document.getElementById(middleEl+"Nav").classList.add("active")
            document.getElementsByClassName("activeSection")[0].classList.remove("activeSection")
            document.getElementById(middleEl).classList.add("activeSection")
            if (!buttonScroll) {
                document.getElementsByClassName("active")[0].click()
                scrollLock = true
                window.addEventListener("scroll", disableScroll)
                setTimeout(() => { scrollLock = false; window.removeEventListener("scroll", disableScroll); }, 500)
            }
        }
    }
}

function compareValues(key, order = 'asc') {
    return function innerSort(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            // property doesn't exist on either object
            return 0;
        }
        
        const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
        const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];
        
        let comparison = 0;
        if (varA > varB) {
            comparison = 1;
        } else if (varA < varB) {
            comparison = -1;
        }
        return (
            (order === 'desc') ? (comparison * -1) : comparison
        );
    };
}


// Section Accueil


function fillAccueil() {
    target = document.getElementById("accueilTitle")
    html = ""
    config.front.accueil.title.forEach(line => {
        html += '<div class="accueilTitleLine">' + line + '</div>'
    })
    target.innerHTML += html

    target = document.getElementById("accueilForeword")
    html = ""
    config.front.accueil.foreword.forEach(line => {
        html += '<div class="accueilForewordLine">' + line + '</div>'
    })
    target.innerHTML += html

    target = document.getElementById("accueilCurrentSituation")
    html = ""
    config.front.accueil.currentSituation.forEach(line => {
        html += '<div class="accueilCurrentSituationLine">' + line + '</div>'
    })
    target.innerHTML += html
}
fillAccueil()

// Section CV


function cvNavSetActive(el) {
    document.querySelector(".cvNavActive").classList.remove("cvNavActive")
    document.querySelector(".cvActive").classList.remove("cvActive")
    el.classList.add("cvNavActive")
    document.getElementById(el.id.replace("Nav", "")).classList.add("cvActive")
    document.getElementById("cvNav").click()
}

function cvExpSetActive(el) {
    previous = document.querySelector(".cvExpActive")
    if (previous != null || previous == el)
        previous.classList.remove("cvExpActive")
    if (previous != el)
        el.classList.add("cvExpActive")
    document.getElementById("cvNav").click()
}

function cvLogiSetActive(el) {
    document.querySelector(".cvNavLogiActive").classList.remove("cvNavLogiActive")
    document.querySelector(".cvLogiActive").classList.remove("cvLogiActive")
    el.classList.add("cvNavLogiActive")
    document.getElementById("cvCompLogi" + el.innerHTML).classList.add("cvLogiActive")
}

function fillMain() {
    target = document.getElementById("cvMain")
    html = '<div id="cvMainDesc">'
    config.front.cv.main.desc.forEach(line => {
        html += '<div class="cvMainDescLine">' + line + '</div>'
    })
    html += '</div><div id="cvMainFooter">'
    config.front.cv.main.footer.forEach(line => {
        html += '<div class="cvMainFooterLine">' + line + '</div>'
    })
    html += '</div>'
    target.innerHTML += html
    document.getElementById("cvPdfLink").href = "/assets/CV Olivier DEBRAY - web.pdf"
}
fillMain()

function fillExp() {
    target = document.getElementById("cvExpContent")
    config.front.cv.exp.forEach(exp => {
        html = '<div class="aCvExp" onclick="cvExpSetActive(this)">' +
            '<div class="cvExpHead">' +
            '<div class="cvExpChevron"><i class="bi bi-chevron-right"></i></div>' +
            '<div class="cvExpTime">' + exp.time + '</div>' +
            '<div class="cvExpTitle">' + exp.title + '</div>' +
            '</div><div class="cvExpBody">'

        exp.sections.forEach(section => {
            html += '<div class="cvExpSectionTitle">' + section.title + ' :</div>'
            section.items.forEach(item => {
                html += '<div class="cvExpSectionItem">' + item + '</div>'
            })
        })

        html += '</div></div>'
        target.innerHTML += html
    })
}
fillExp()

function fillProj() {
    target = document.getElementById("cvProj")
    config.front.cv.proj.forEach(aSection => {
        html = '<p class="sectionTitle"><span>' + aSection.sectionTitle + '</span></p>'
        aSection.items.forEach(item => {
            html += '<div class="cvProjItem">' + item + '</div>'
        })

        target.innerHTML += html
    })
}
fillProj()

function fillForm() {
    target = document.getElementById("cvForm")
    config.front.cv.form.forEach(aSection => {
        html = '<p class="sectionTitle"><span>' + aSection.sectionTitle + '</span></p>'
        aSection.items.forEach(item => {
            html += '<div class="cvFormItem"><div class="cvFormHead">' +
                '<span class="cvFormTime">' + item.time + '</span>' +
                '<span class="cvFormName">' + item.name + '</span>' +
                '<span class="cvFormCity">' + item.city + '</span>' +
                '</div><div class="cvFormDesc">'
            
            item.desc.forEach(line => {
                html += '<div>' + line + '</div>'
            })
            html += '</div></div>'
        })

        target.innerHTML += html
    })
}
fillForm()

function fillComp() {
    config.front.cv.comp.forEach(section => {
        if (section.sectionTitle == "Développement") {
            document.getElementById("cvComp").innerHTML = '<p class="sectionTitle"><span>' + section.sectionTitle + '</span></p><div id="cvDevSection">' +
            '<div class="cvCompGrid" id="cvDevGrid"><div class="cvCompGridTitle">Langages</div></div>' +
            '<div class="cvCompGrid" id="cvFrWkGrid"><div class="cvCompGridTitle">Frameworks</div></div>' +
            '<div class="cvCompGrid" id="cvMiscGrid"><div class="cvCompGridTitle">Mais aussi..</div></div>' +
            '</div>'

            devGrid = document.getElementById("cvDevGrid")
            section.languages.sort(compareValues('name')).forEach(language => {
               html = '<div>' + language.name + '</div><div class="skillJauge">'
               for (i = 0 ; i < language.level ; i++)
                   html += '<span>&#11044;</span>'
               html += '</div>'
               devGrid.innerHTML += html
            })

            frWkGrid = document.getElementById("cvFrWkGrid")
            section.frameworks.sort(compareValues('name')).forEach(framework => {
                html = '<div>' + framework + '</div>'
                frWkGrid.innerHTML += html
            })

            miscGrid = document.getElementById("cvMiscGrid")
            section.miscs.sort(compareValues('name')).forEach(misc => {
                html = '<div>' + misc + '</div>'
                miscGrid.innerHTML += html
            })
        }
        else if (section.sectionTitle == "Logiciels") {
            target = document.getElementById("cvComp")
            target.innerHTML += '<p class="sectionTitle"><span>' + section.sectionTitle + '</span></p>' +
                '<div id="cvCompLogiNav"></div>'
            html = ""
            
            section.items.forEach(cat => {
                isFirstType = (section.items[0] == cat)
                document.getElementById("cvCompLogiNav").innerHTML += '' +
                    '<span '+(isFirstType?'class="cvNavLogiActive" ':'')+'onclick="cvLogiSetActive(this)">'+cat.type+'</span>'
                html += '<div id="cvCompLogi' + cat.type + '" class="cvCompLogi'+(isFirstType?' cvLogiActive':'')+'">'
                cat.items.forEach(item => {
                    html += '<div class="cvCompLogiItem" style="background-color: '+item.bg+';">' + '<i><img src="assets/logoSoft/'+item.logo+'"/></i>' + '<span>'+item.name+'</span></div>'
                })
                html += '</div>'
            })
            target.innerHTML += html
        }
        else if (section.sectionTitle == "Langues") {
            target = document.getElementById("cvComp")
            html = '<p class="sectionTitle"><span>' + section.sectionTitle + '</span></p>' +
                '<div class="cvCompLangSection">'
            section.items.forEach(item => {
                html += '<div class="cvCompLang">' +
                    '<div class="cvCompLangName">' +
                    '<img src="https://www.countryflags.io/' + item.lang + '/flat/32.png"/>' +
                    item.name + 
                    '</div>'
                item.desc.forEach(line => {
                    html += '<div class="cvCompLangDesc">' + line + '</div>'
                })
                html += '</div>'
            })
            html += '</div>'
            target.innerHTML += html
        }
    });
}
fillComp()

function fillMisc() {
    target = document.getElementById("cvMisc")
    config.front.cv.misc.forEach(aSection => {
        html = '<p class="sectionTitle"><span>' + aSection.sectionTitle + '</span></p>'
        aSection.items.forEach(item => {
            html += '<div class="cvMiscItem">' + item + '</div>'
        })

        target.innerHTML += html
    })
}
fillMisc()


// Portfolio


var circle = '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/></svg>'
var circleFilled = '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-circle-fill" viewBox="0 0 16 16"><circle cx="8" cy="8" r="8"/></svg>'

var sectionProjects = []
function fillPortfolioSections() {
    target = document.getElementById("portfolioSections")
    html = ""
    config.front.portfolio.sections.forEach(section => {
        html += '<div class="portfolioSection" onclick="fillPortfolioProjects(this, \''+section+'\')">'+section+'</div>'
        sectionProjects.push({ name: section, projects: [] })
    })
    target.innerHTML += html

    config.front.portfolio.projects.forEach(project => {
        project.types.forEach(type => { sectionProjects[type].projects.push(project) })
    });

    target.firstElementChild.click()
}
fillPortfolioSections()

function fillPortfolioProjects(caller, sectionName) {
    previous = document.getElementsByClassName("activePortfolioSection")[0]
    if (previous != undefined) previous.classList.remove("activePortfolioSection")
    caller.classList.add("activePortfolioSection")

    target = document.getElementById("portfolioProjects")
    html = ''
    sectionProjects.find(section => section.name == sectionName).projects.forEach(project => {
        html += '<div onclick="setActiveProject(this, \''+sectionName+'\', \''+project.title.replace("'", "_")+'\')">'+project.date+" - "+project.title+'</div>'
    })
    target.innerHTML = html
    target.firstElementChild.click()
}

function changeActiveProject(action) {
    let projects = document.getElementById("portfolioProjects").childNodes
    let active = document.getElementsByClassName("activePortfolioProject")[0]
    let index = Array.prototype.indexOf.call(projects, active)
    if (action == "prev") {
        if (index > 0)
            projects[index - 1].click()
        else
            projects[projects.length - 1].click()
    }
    else if (action == "next") {
        if (index + 1 < projects.length)
            projects[index + 1].click()
        else
            projects[0].click()
    }
    active.style.display = "none"
    setTimeout(() => { active.style.display = "" }, 250); // Pour éviter les bizzareries avec les transitions CSS
}

function setActiveProject(caller, sectionName, projectTitle) {
    projectTitle = projectTitle.replace("_", "'")
    previous = document.getElementsByClassName("activePortfolioProject")[0]
    if (previous != undefined) previous.classList.remove("activePortfolioProject")
    caller.classList.add("activePortfolioProject")
    document.getElementById("portfolioHead").style.paddingBottom = caller.clientHeight + 16 + "px"

    let project = sectionProjects.find(section => section.name == sectionName).projects.find(project => project.title == projectTitle)

    document.getElementById("portfolioProjectTitle").innerHTML = project.title
    document.getElementById("portfolioProjectContext").innerHTML = project.context
    let descHtml = ""
    project.desc.forEach(line => {
        descHtml += '<p>' + line + '</p>'
    })
    document.getElementById("portfolioProjectDesc").innerHTML = descHtml

    /* let indicators = document.getElementById("indicators")
    let carouselMedias = document.getElementById("portfolioMedia")
    indicators.innerHTML = ""
    carouselMedias.innerHTML = ""
    let i = 0
    project.medias.forEach(media => {
        let fileType = media.split('.').pop()
        let mediaElement = ""
        switch (fileType) {
            case "png":
            case "PNG":
            case "jpg":
            case "JPG":
            case "jpeg":
            case "JPEG":
                mediaElement = '<img src="/assets/portfolio/'+media+'" class="d-block w-100" alt=""/>'
                break;
            case "mp4":
            case "MP4":
            case "webm":
            case "WEBM":
                mediaElement = '<video controls><source src="/assets/portfolio/'+media+'" type="video/mp4" class="d-block w-100" alt=""></video>'
                break;
        }
        let indicator = '<button type="button" data-bs-target="#portfolioCarousel" data-bs-slide-to="0" '+(i==0?'class="active" aria-current="true"':'')+' aria-label="Slide '+(i+1)+'"></button>'
        let mediaDiv = '<div class="carousel-item '+(i==0?'active':'')+'">' + mediaElement + '</div>'
        indicators.innerHTML += indicator
        carouselMedias.innerHTML += mediaDiv
        i++
    }) */

    let mediaWrapper = document.getElementById("portfolioMediaWrapper")
    mediaWrapper.innerHTML = ""
    let indicators = document.getElementById("portfolioIndicators")
    indicators.innerHTML = ''
    let i = 0
    project.medias.forEach(media => {
        let fileType = media.split('.').pop()
        let mediaElement = ""
        switch (fileType) {
            case "png":
            case "PNG":
            case "jpg":
            case "JPG":
            case "jpeg":
            case "JPEG":
                if (i == 0)
                    mediaWrapper.classList.remove("disabledFullscreen")
                mediaElement = '<img class="portfolioCarouselItem '+(i==0?'activeMedia':'')+'" src="/assets/portfolio/'+media+'" onclick="displayFullScreen(this)"/>'
                break;
            case "mp4":
            case "MP4":
            case "webm":
            case "WEBM":
                if (i == 0)
                    mediaWrapper.classList.add("disabledFullscreen")
                mediaElement = '<video class="portfolioCarouselItem '+(i==0?'activeMedia':'')+'" controls><source src="/assets/portfolio/'+media+'" type="video/mp4"></video>'
                break;
        }
        // let mediaDiv = '<div class="portfolioCarouselItem '+(i==0?'activeMedia':'')+'">' + mediaElement + '</div>'
        mediaWrapper.innerHTML += mediaElement
        // if (mediaWrapper.childNodes[i].height > mediaWrapper.childNodes[i].width)
        //     mediaWrapper.childNodes[i].style.height = "100%"
        // else
        //     mediaWrapper.childNodes[i].style.width = "100%"
        // console.log(i)
        // console.log(mediaWrapper.childNodes[i])

        if (i == 0)
            indicators.innerHTML += circleFilled
        else
            indicators.innerHTML += circle
        let index = i
        indicators.childNodes[i].onclick = () => { changeActiveMedia("jump", index) }
        i++
    })
}

function changeActiveMedia(action, target) {
    let medias = document.getElementById("portfolioMediaWrapper").childNodes
    let indicators = document.getElementById("portfolioIndicators").childNodes
    let active = document.getElementsByClassName("activeMedia")[0]
    let index = Array.prototype.indexOf.call(medias, active)
    let newIndex = 0
    if (action == "prev") {
        if (index > 0)
            newIndex = index - 1
        else
            newIndex = medias.length - 1
    }
    else if (action == "next") {
        if (index + 1 < medias.length)
            newIndex = index + 1
        else
            newIndex = 0
    }
    else if (action == "jump") {
        newIndex = target
    }
    active.classList.remove("activeMedia")
    medias[newIndex].classList.add("activeMedia")
    
    if (medias[newIndex].localName == "video")
        document.getElementById("portfolioMediaWrapper").classList.add("disabledFullscreen")
    else
        document.getElementById("portfolioMediaWrapper").classList.remove("disabledFullscreen")

    indicators[index].outerHTML = circle
    indicators[newIndex].outerHTML = circleFilled
    indicators[index].onclick = () => { changeActiveMedia("jump", index) }
    indicators[newIndex].onclick = () => { changeActiveMedia("jump", newIndex) }
}

function displayFullScreen(img) {
    let mediaModal = document.getElementById("mediaModal")
    mediaModal.classList.add("activeModal")
    mediaModal.innerHTML = '<img src="'+img.src+'">'
    // mediaModal.onkeydown = (event) => { console.log(event) }
    document.addEventListener('keydown', (e) => { if (e.code == "Escape") { 
        mediaModal.classList.remove("activeModal")
     }});
}


// Contact


var isLegalToggled = false
function toggleLegal() {
    document.getElementById("contactNav").click()
    if (isLegalToggled) {
        document.body.classList.remove("toggledLegal")
        document.getElementById("legalOverlay").classList.remove("toggledLegal")
    }
    else {
        document.body.classList.add("toggledLegal")
        document.getElementById("legalOverlay").classList.add("toggledLegal")
    }
    isLegalToggled = !isLegalToggled
}

function fillLegal () {
    target = document.getElementById("legalPanel")
    config.front.contact.legal.forEach(aSection => {
        html = '<h3>' + aSection.sectionTitle + '</h3>'
        aSection.items.forEach(item => {
            html += '<div class="legalPanelItem">' + item + '</div>'
        })

        target.innerHTML += html
    })
}
fillLegal()


// ===== After init


// Get the navbar
var navbar = document.getElementById("navbar");
// Get the offset position of the navbar
var sticky = navbar.offsetTop;
var styles = '' +
    '#navbar.sticky { ' +
        'transform: skew(-30deg) translateX(calc(-50vw + (' + navbar.offsetWidth + 'px / 2) - 1em));' +
    '}'
var styleSheet = document.createElement("style")
styleSheet.type = "text/css"
styleSheet.innerText = styles
document.head.appendChild(styleSheet)