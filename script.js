import Camper from "./camper.js";

const btnRegister = document.getElementById('register');
const modalRegister = document.getElementById('modalRegister');
const btnCloseRegister = document.querySelectorAll('.btn-close-register');
const filter = document.getElementById('filter');
const filter_section = document.getElementById('filter_section');
const filter_select = document.getElementById('filter_selected');
const filter_input = document.getElementById('filter_input');

let campers = [],
    campers_filter = [];

btnRegister.addEventListener('click', () => {
    modalRegister.style.display = 'flex';
    modalRegister.querySelector('.modal-header-container span').textContent = 'Registrar Camper';
    modalRegister.querySelector('.modal-footer-container .btn-success').textContent = 'Registrar';
    modalRegister.querySelector('.modal-footer-container .btn-success').addEventListener('click', () => btn_save_camper());
})

btnCloseRegister.forEach(e => {
    e.addEventListener('click', () => {
        modalRegister.style.display = 'none';
        const create_id_input = modalRegister.querySelector('.modal-body-container #id'),
        create_name_input = modalRegister.querySelector('.modal-body-container #name'),
        create_phone_number_input = modalRegister.querySelector('.modal-body-container #phone_number'),
        create_email_input = modalRegister.querySelector('.modal-body-container #email'),
        create_group_input = modalRegister.querySelector('.modal-body-container #group');
        create_id_input.value = '';
        create_name_input.value = '';
        create_phone_number_input.value = '';
        create_email_input.value = '';
        create_group_input.value = '';
    })
});

filter.addEventListener('click', () => {
    if (filter_section.style.display == 'none' || filter_section.style.display == '') {
        filter_section.style.display = 'flex';
        filter.textContent = 'Cerrar Filtro';
    } else {
        filter_section.style.display = 'none';
        filter.textContent = 'FILTRAR'
        create_html(campers)
    }
    filter_select.value = 0
    filter_input.style.display = 'none';
    filter_input.value = '';
});

filter_select.addEventListener('change', () => {
    filter_input.value = '';
    filter_input.style.display = 'block';
});

filter_input.addEventListener('keyup', () => searchFilter());

const searchFilter = () => {
    if (filter_select.value == 1) {
        campers_filter = [...campers.filter(c => {
            c.id = c.id.toLowerCase();
            return c.id.indexOf(filter_input.value) > -1; 
        })];
    } else if(filter_select.value == 2) {
        campers_filter = [...campers.filter(c => {
            c.name = c.name.toLowerCase();
            return c.name.indexOf(filter_input.value) > -1; 
        })];
    }
    create_html(campers_filter);
}

const openToast = (text) => {
    const toast = document.getElementById('toast');

    toast.textContent = text;
    if (!toast.classList.contains("show")) {
        toast.classList.add("show");

        setTimeout(() => {
            toast.classList.remove("show");
        }, 2700);
    }
}

const btn_save_camper = () => {
    const create_id_input = modalRegister.querySelector('.modal-body-container #id'),
        create_name_input = modalRegister.querySelector('.modal-body-container #name'),
        create_phone_number_input = modalRegister.querySelector('.modal-body-container #phone_number'),
        create_email_input = modalRegister.querySelector('.modal-body-container #email'),
        create_group_input = modalRegister.querySelector('.modal-body-container #group');

    if(create_id_input.value == '' ||
        create_name_input.value == '' ||  
        create_phone_number_input.value == '' || 
        create_email_input.value == '' || 
        create_group_input.value ==''){
            (modalRegister.style.display == 'flex') ? alert('DATO INVALIDO') : ''; 
        return true;
    }
    
    const camper = new Camper(create_id_input.value, 
                            create_name_input.value, 
                            create_phone_number_input.value, 
                            create_email_input.value, 
                            create_group_input.value,
                            0
                        );

    if(campers.filter(e => e.id == create_id_input.value).length > 0){
        alert('NUMERO DE IDENTIFICACION YA REGISTRADO');
    } else {
        campers.push(camper);
        localStorage.setItem('list_campers', JSON.stringify(campers));
        create_html(JSON.parse(localStorage.getItem('list_campers')));
        alert('Camper registrado correctamente')
        modalRegister.style.display = 'none';
        create_id_input.value = '';
        create_name_input.value = '';
        create_phone_number_input.value = '';
        create_email_input.value = '';
        create_group_input.value = '';
    }
}

let flag = false;
let camper_id_old = null;

const btn_open_edit_camper = (id_camper) => {
    //Traemos el camper que queremos editar
    const camper = [...campers.filter(c => c.id == id_camper)];

    //Abrimos el modal y le cambiamos el nombre, el nombre del botón y le agregamos un evento al editar
    modalRegister.style.display = 'flex';
    modalRegister.querySelector('.modal-header-container span').textContent = 'Actualizar Camper';
    modalRegister.querySelector('.modal-footer-container .btn-success').textContent = 'Actualizar';
    camper_id_old = id_camper
    if (flag == false) {
        modalRegister.querySelector('.modal-footer-container .btn-success').addEventListener('click', () => btn_edit_camper());
    }
    flag = true;

    //Llenamos los inputs con los datos del camper
    modalRegister.querySelector('.modal-body-container #id').value = camper[0].id
    modalRegister.querySelector('.modal-body-container #name').value = camper[0].name
    modalRegister.querySelector('.modal-body-container #phone_number').value = camper[0].phone_number
    modalRegister.querySelector('.modal-body-container #email').value = camper[0].email
    modalRegister.querySelector('.modal-body-container #group').value = camper[0].group
}

const btn_edit_camper = () => {
    const edit_id_input = modalRegister.querySelector('.modal-body-container #id'),
        edit_name_input = modalRegister.querySelector('.modal-body-container #name'),
        edit_phone_number_input = modalRegister.querySelector('.modal-body-container #phone_number'),
        edit_email_input = modalRegister.querySelector('.modal-body-container #email'),
        edit_group_input = modalRegister.querySelector('.modal-body-container #group');

        if (edit_id_input.value !== camper_id_old) {
            if(campers.filter(e => e.id == edit_id_input.value).length > 0){
                alert('NUMERO DE IDENTIFICACION YA REGISTRADO');
                return false;
            }
        }
        let camperEdit = campers.filter(c => c.id == camper_id_old)[0];

        camperEdit.name = edit_name_input.value;
        camperEdit.phone_number = edit_phone_number_input.value;
        camperEdit.email = edit_email_input.value;
        camperEdit.group = edit_group_input.value;
        camperEdit.id = edit_id_input.value;
        localStorage.setItem('list_campers', JSON.stringify(campers));
        create_html(campers);
        modalRegister.style.display = 'none';
        edit_id_input.value = '';
        edit_name_input.value = '';
        edit_phone_number_input.value = '';
        edit_email_input.value = '';
        edit_group_input.value = '';

        if (filter_section.style.display !== 'none' && filter_section.style.display !== '') {
            filter.click();
        }
}

const btn_delete_camper = (id_camper) => {
    campers = [...campers.filter(c => c.id !== id_camper)];
    localStorage.setItem('list_campers', JSON.stringify(campers));
    if (filter_section.style.display !== 'none' && filter_section.style.display !== '') {
        filter.click();
    }
    create_html(campers);
}

const create_html = (arrayCampers) => {
    const table = document.getElementById('table_list_campers');
    const tbody = table.querySelectorAll('tbody')[0];
    tbody.innerHTML = '';
    arrayCampers.forEach(i => {
        const row = document.createElement('tr');
        const  c_id = document.createElement('td'),
            c_name = document.createElement('td'),
            c_group = document.createElement('td'),
            c_coins = document.createElement('td'),
            c_actions = document.createElement('td');

        // contenido de la tabla
        c_id.textContent = i.id;
        c_name.textContent = i.name;
        c_group.textContent = i.group;
        c_coins.textContent = i.coins;

        //Le ponemos al ultimo td la clase actions
        c_actions.classList.add('actions')

        //Creamos 4 divs
        const div1 = document.createElement('div'),
            div2 = document.createElement('div')/* ,
            div3 = document.createElement('div'),
            div4 = document.createElement('div') */;

        //Le ponemos a cada div la clase btn-actions
        div1.classList.add('btn-actions');
        div2.classList.add('btn-actions');/* 
        div3.classList.add('btn-actions');
        div4.classList.add('btn-actions'); */

        //Insertamos el icono de ver Juegos Adquiridos
        /* div1.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z" />
                            </svg>`;

        //Insertamos el icono de ver puntos de fidelización
        div2.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                            </svg>`; */

        //Insertamos el icono de editar Camper
        div1.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                            </svg>`;

        //Insertamos el icono de eliminar Camper
        div2.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg> `;

        // div1.addEventListener('click', () => btn_games_client(i.id));
        // div2.addEventListener('click', () => btn_loyalty_client(i.id));

        div1.addEventListener('click', () => btn_open_edit_camper(i.id));
        div2.addEventListener('click', () => btn_delete_camper(i.id));

        c_actions.appendChild(div1);
        c_actions.appendChild(div2);
        // c_actions.appendChild(div3);
        // c_actions.appendChild(div4);

        row.appendChild(c_id);
        row.appendChild(c_name);
        row.appendChild(c_group);
        row.appendChild(c_coins);
        row.appendChild(c_actions);
        tbody.appendChild(row);
    });
}



window.addEventListener('load', () => {
    if(localStorage.getItem('list_campers') == null){
        campers = [];
    } else { 
        campers = JSON.parse(localStorage.getItem('list_campers'));
    }
    create_html(campers);
})