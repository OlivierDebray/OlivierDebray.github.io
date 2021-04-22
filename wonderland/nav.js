var config = {}

var xmlHttp = new XMLHttpRequest();
xmlHttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        config = JSON.parse(this.responseText)

        document.getElementById("title").innerHTML = window.location.pathname

        html = ""
        config.wonderlandModules.forEach(module => {
            html += '<li><a href="./'+module.name+'">'+module.title+'</a></li>'
        })
        document.getElementById("children").innerHTML = html
    }
}
xmlHttp.open("GET", "/config.json", false)
xmlHttp.send()