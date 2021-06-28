let img0 = document.getElementById('btnEye0');
let img1 = document.getElementById('btnEye1');
let img2 = document.getElementById('btnEye2');
let img3 = document.getElementById('btnEye3');
let img4 = document.getElementById('btnEye4');
let img5 = document.getElementById('btnEye5');

let eye = "images/eye.png";

let comida = "";
let comidaCount = 0;

let chicken = "";
let chickenCount = 0;

let carne = "";
let carneCount = 0;

let opcion1 = undefined;
let opcion2 = undefined;
let contador = 0;

function showImage(number) {
    if (contador <= 2) {
        let img = document.getElementById(`btnEye${number}`).getAttribute('imgBack');
        document.getElementById(`btnEye${number}`).attributes['src'].value = img;
        if (contador == 0) {
            opcion1 = number;   
        } else if (contador == 1) {
            opcion2 = number;
        }

        if (contador == 1) {
            if (document.getElementById(`btnEye${opcion1}`).attributes['src'].value == document.getElementById(`btnEye${opcion2}`).attributes['src'].value) {
                contador = -1;
            } else {
                setTimeout(() => {
                    document.getElementById(`btnEye${opcion1}`).attributes['src'].value = eye;
                    document.getElementById(`btnEye${opcion2}`).attributes['src'].value = eye;
                    contador = 0;
                }, 300);
            }
        }
        contador++;
    }
}


getImagen().then((resp) => {
    comida = resp
    getImagen().then((resp) => {
        chicken = resp
        getImagen().then((resp) => {
            carne = resp
        });
    });
});


document.getElementById('btnNewGame').onclick = function (e) {
    document.getElementById('btnReset').click();

    while (comidaCount < 2 ) {
        const number = getNumber();
        setImagenComida(number);
    }

    while (chickenCount < 2 ) {
        const number = getNumber();
        setImagenChicken(number)
    }

    while (carneCount < 2 ) {
        const number = getNumber();
        setImagenCarne(number);
    }

    setEyes();

};

function setImagenComida(number) {
    if (document.getElementById(`btnEye${number}`).attributes['src'].value === eye) {
        if (comidaCount < 2) {
            document.getElementById(`btnEye${number}`).attributes['src'].value = comida;
            document.getElementById(`btnEye${number}`).setAttribute('imgBack', comida);
            comidaCount++;
        }
    }
}

function setImagenChicken(number) {
    if (document.getElementById(`btnEye${number}`).attributes['src'].value === eye) {
        if (chickenCount < 2) {
            document.getElementById(`btnEye${number}`).attributes['src'].value = chicken;
            document.getElementById(`btnEye${number}`).setAttribute('imgBack', chicken);
            chickenCount++;
        }
    }
}

function setImagenCarne(number) {
    if (document.getElementById(`btnEye${number}`).attributes['src'].value === eye) {
        if (carneCount < 2) {
            document.getElementById(`btnEye${number}`).attributes['src'].value = carne;
            document.getElementById(`btnEye${number}`).setAttribute('imgBack', carne);
            carneCount++;
        }
    }
}

document.getElementById('btnReset').onclick = function(e) {
    setEyes();
    resetCount();
}

function setEyes() {
    img0.attributes['src'].value = eye;
    img1.attributes['src'].value = eye;
    img2.attributes['src'].value = eye;
    img3.attributes['src'].value = eye;
    img4.attributes['src'].value = eye;
    img5.attributes['src'].value = eye;
}

function resetCount() {
    comidaCount = 0;
    chickenCount = 0;
    carneCount = 0;
    contador = 0;
}

function getNumber() {
    return Math.round((Math.random() * (5 - 0)+0)); 
}


function getImagen() {
    return fetch('https://dog.ceo/api/breeds/image/random')
    .then(response => response.json())
    .then(data => {
        return (data.message)
    });
}