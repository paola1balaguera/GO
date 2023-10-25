let campers = [];
let concepts = [];
const camperSelectConsignement = document.querySelector('#consignment #campers');
const camperSelectDiscount = document.querySelector('#discount #campers-d');

const conceptsSelectConsignement = document.querySelector('#consignment #concepts');
const conceptsSelectDiscount = document.querySelector('#discount #concepts-d');

const btnConsignment = document.querySelector('#consignment button');
const btnDiscount = document.querySelector('#discount button');

const get_campers = () => {
    campers = JSON.parse(localStorage.getItem('list_campers'));

    campers.forEach(c => {
        let option = document.createElement('option');
        let option2 = document.createElement('option');

        option.setAttribute('value', c.id);
        option.textContent = c.name;

        option2.setAttribute('value', c.id);
        option2.textContent = c.name;

        camperSelectConsignement.appendChild(option);
        camperSelectDiscount.appendChild(option2);
    });
}

const get_concepts = () => {
    concepts = JSON.parse(localStorage.getItem('concept_list'));
    console.log(concepts);
    concepts.forEach(c => {
        let option = document.createElement('option');
        let option2 = document.createElement('option');

        option.setAttribute('value', c.id);
        option.textContent = c.description;

        option2.setAttribute('value', c.id);
        option2.textContent = c.description;

        if (c.value > 0) {
            conceptsSelectConsignement.appendChild(option);
        } else {
            conceptsSelectDiscount.appendChild(option2);
        }
    });
}

btnConsignment.addEventListener('click', () => {
    const camper = campers.filter(c => c.id == camperSelectConsignement.value);
    const concept = concepts.filter(c => c.id == conceptsSelectConsignement.value);

    camper[0].coins = Number(concept[0].value) + Number(camper[0].coins)
    localStorage.setItem('list_campers', JSON.stringify(campers));
})

btnDiscount.addEventListener('click', () => {
    const camper = campers.filter(c => c.id == camperSelectDiscount.value);
    const concept = concepts.filter(c => c.id == conceptsSelectDiscount.value);
    
    camper[0].coins = Math.abs(Math.abs(Number(concept[0].value)) - Math.abs(Number(camper[0].coins)))
    localStorage.setItem('list_campers', JSON.stringify(campers));
})


window.addEventListener('load', () => {
    get_campers()
    get_concepts()
})