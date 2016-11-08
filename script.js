window.onload  = function () {


    var body = document.body;
    var h1 = document.createElement('h1');
    var h2 = document.createElement('h2');
    var	h4 = document.createElement('h4');
    var div = document.createElement('div');
    var ul = document.createElement('ul');
    var li = document.createElement('li');

    var btnLoad = document.getElementById('load');
    var btnClear = document.getElementById('clear');

    var i=0;

    // element constructor
    h1.innerHTML = '#07 task';
    h2.innerHTML = 'Phone Book  via xmlHttpRequest';

    var divContainerL = div.cloneNode(false);
    divContainerL.className = 'container';
    var divContainerR = divContainerL.cloneNode(false);

    var divWrapper = div.cloneNode(false);
    divWrapper.className = 'wrapper';

    var cover = div.cloneNode(false);

// page loading
    body.appendChild(h1);
    body.appendChild(h2);
    body.appendChild(divWrapper);
    divWrapper.appendChild(divContainerL);
    divWrapper.appendChild(divContainerR);
    divContainerL.appendChild(cover);
    //ul.appendChild(li);
    loadClients();

    // load data from JSON to the page
    btnLoad.addEventListener('click', loadClients);
    function loadClients() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/json/clients.json', false);
        xhr.send();
        if (xhr.status != 200) {
            // обработать ошибку
            h4.innerHTML = xhr.status ;
        } else {
            // вывести результат
            var clients = JSON.parse(xhr.responseText);
            showClients(clients);
        }
    }
    function showClients(obj) {
        obj.forEach(function(obj) {
            li = cover.appendChild(li.cloneNode(false));
            li.innerHTML = obj.general.firstName + '  ' + obj.general.lastName;
        });
    }


    // clear the page from data
    btnClear.addEventListener('click' , clearData);
    function clearData() {
        while (ul.hasChildNodes()) {
            ul.removeChild(ul.lastChild);
        }
    }

    cover.addEventListener("click", selectUser);
    function selectUser(event) {
        var user = event.target;
        for (i = 0; i<user.parentNode.childNodes.length; i++) {
            if (user.parentNode.childNodes[i].classList.contains('active')) {
                user.parentNode.childNodes[i].classList.remove('active');
            }
        }
        user.classList.add('active');
        console.log(i);

    }


}