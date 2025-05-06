var idCollector = document.querySelector('.id_collector');

var guide = document.querySelector('.guide');
var guideOpacity = guide.querySelector('.box_opacity');
var guideClose = document.querySelector('.guide_close');
var guideOpen = document.querySelector('.guide_button');

var confirm = document.querySelector('.confirm');
var confirmOpacity = confirm.querySelector('.box_opacity');
var confirmYes = document.querySelector('.confirm_yes');
var confirmNo = document.querySelector('.confirm_no');

var boxOpened = 'box_open';

var yourCards = document.querySelector('.ids');

var limit = false;

guideOpen.addEventListener('click', () => {
    guide.classList.add(boxOpened)
});

guideClose.addEventListener('click', () => {
    guide.classList.remove(boxOpened)
});

guideOpacity.addEventListener('click', () => {
    guide.classList.remove(boxOpened)
});

confirmOpacity.addEventListener('click', () => {
    confirm.classList.remove(boxOpened);
});

confirmNo.addEventListener('click', () => {
    confirm.classList.remove(boxOpened);
});

confirmYes.addEventListener('click', () => {
    fetch('/panel/delete', {
        method: 'POST',
        body: JSON.stringify({
            'id': deleteing
        })
    });
    confirm.classList.remove(boxOpened);
    document.getElementById(deleteing).remove();
    if (idCollector.childNodes.length == 0){
        yourCards.style.display = 'none';
    }
    notify("Dowód został usunięty.", "success");
    limit = false;
});

load("default");

var template =
'<div class="id_top">' +
'<p class="number">Id: {id}</p>' +
'</div>' +
'<p class="data">Data urodzenia <span class="data_highlight">{date}</span></p>' +
'<p class="data">Imię <span class="data_highlight">{name}</span></p>' +
'<p class="data">Nazwisko <span class="data_highlight">{surname}</span></p>' +
'<div class="id_action">'+
'<div class="delete" onclick="deleteId({id})">' +
'<img class="delete_image" src="assets/images/delete_id.png">' +
'</div>' +
'<p class="action_button" onclick="editId({id})">Edytuj</p>' +
'</div>';

var create = document.querySelector('.create');
if (create){
    create.addEventListener('click', () => {
        if (limit){
            notify('Osiągnięto limit dowodów.', 'error')
        }else{
            location.href = '/generator'
        }
    });
}

function createIds(ids){
    if (ids.length == 0){
        yourCards.style.display = 'none';
    }else{
        ids.forEach((id) => {
            createId(id);
        });
    }
}

function load(type){
    fetch('/panel/' + type, {
        method: 'POST'
    })
    .then(response => response.json())
    .then(result => {
        if (type === "default"){
            limit = result.limit;

            if (result.admin){
                var admin =  document.querySelector(".admin");
                admin.style.display = "block";
                admin.addEventListener('click', () => {
                    location.href = '/admin';
                });
            }
        }

        createIds(result.ids);
    });
}

var options = { year: 'numeric', month: '2-digit', day: '2-digit' };

function createId(id){
    var temp = template;
    temp = temp.replaceAll("{id}", id.id);
    temp = temp.replaceAll("{name}", htmlEncode(id.name.toUpperCase()));
    temp = temp.replaceAll("{surname}", htmlEncode(id.surname.toUpperCase()));

    var date = new Date();
    date.setDate(id.day);
    date.setMonth(id.month-1);
    date.setFullYear(id.year);

    temp = temp.replaceAll("{date}", date.toLocaleDateString("pl-PL", options));
    
    var element = document.createElement("div");
    element.classList.add("id");
    element.id = id.id;
    element.innerHTML = temp;

    var child = idCollector.firstChild;
    if (child){
        idCollector.insertBefore(element, child);
    }else{
        idCollector.appendChild(element);
    }
}

var deleteing = 0;

function deleteId(id){
    deleteing = parseInt(id);
    confirm.classList.add(boxOpened);
}

function editId(id){
    location.href = '/generator?id=' + id;
}
