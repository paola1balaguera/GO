import Concept from "./concept.js";

const btnCreate = document.getElementById('create');
const modalCreate = document.getElementById('modalCreate');
const btnCloseCreate = document.querySelectorAll('.btn-close-create');

let concepts = [];
let cont_concepts = 0;

btnCreate.addEventListener('click', () => {
    modalCreate.style.display = 'flex';
    modalCreate.querySelector('.modal-header-container span').textContent = 'Crear Concepto';
    modalCreate.querySelector('.modal-footer-container .btn-success').textContent = 'Crear';
    modalCreate.querySelector('.modal-footer-container .btn-success').addEventListener('click', () => btn_save_concept());
})

btnCloseCreate.forEach(e => {
    e.addEventListener('click', () => {
        modalCreate.style.display = 'none';
    })
});

const btn_save_concept = () => {
    const create_description_input = modalCreate.querySelector('.modal-body-container #description'),
        create_value_input = modalCreate.querySelector('.modal-body-container #value');

    if(create_description_input.value == '' ||
        create_value_input.value == ''){
            (modalCreate.style.display == 'flex') ? alert('DATO INVALIDO') : ''; 
        return true;
    }
    
    cont_concepts = cont_concepts + 1;

    const game = new Concept(cont_concepts, 
                            create_description_input.value,
                            create_value_input.value
                        );

    concepts.push(game);
    localStorage.setItem('concept_list', JSON.stringify(concepts));
    create_html(JSON.parse(localStorage.getItem('concept_list')));
    alert('Videojuego registrado correctamente')
    modalCreate.style.display = 'none';
    create_description_input.value = '';
    create_value_input.value = '';
}

const btn_delete_game = (id_concept) => {
    concepts = [...concepts.filter(c => c.id !== id_concept)];
    localStorage.setItem('concept_list', JSON.stringify(concepts));
    create_html(concepts);
}

const create_html = (concept_list) =>{
    const table = document.getElementById('table_concept_list');
    const tbody = table.querySelectorAll('tbody')[0];
    tbody.innerHTML = '';
    concept_list.forEach(i => {
        const row = document.createElement('tr');
        const  c_id = document.createElement('td'),
            c_description = document.createElement('td'),
            c_value = document.createElement('td'),
            c_actions = document.createElement('td');

        // contenido de la tabla
        c_id.textContent = i.id;
        c_description.textContent = i.description;
        c_value.textContent = i.value;

        //Le ponemos al ultimo td la clase actions
        c_actions.classList.add('actions');

        //Creamos 4 divs
        const div1 = document.createElement('div');

        //Le ponemos a cada div la clase btn-actions
        div1.classList.add('btn-actions');

        //Insertamos el icono de ver puntos de fidelización
        div1.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg> `;

        div1.addEventListener('click', () => btn_delete_game(i.id));

        c_actions.appendChild(div1);

        row.appendChild(c_id);
        row.appendChild(c_description);
        row.appendChild(c_value);
        row.appendChild(c_actions);
        tbody.appendChild(row);
    });
}



window.addEventListener('load', () => {
    if(localStorage.getItem('concept_list') == null){
        concepts = [];
    } else { 
        concepts = JSON.parse(localStorage.getItem('concept_list'));
        const contentIdMax = concepts.reduce((previous, current) => {
            return current.id > previous.id ? current : previous;
        });
        cont_concepts = contentIdMax.id;
    }
    if (localStorage.getItem('concept_list') == null) {
        concepts = [];
    } else {
        concepts = JSON.parse(localStorage.getItem('concept_list'));
    }   

    create_html(concepts);
})