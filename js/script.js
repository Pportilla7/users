const url='https://jsonplaceholder.typicode.com/users';

const Usuario = {
    name: '',
    age: '',
    username: '',
    img: '',
    phone: '',
    email: '',
    company: '',
    address: {
        street: '',
        suite: '',
        city: ''
    }
};

const usuarios=[];

let imagenesUtilizadas = [];


fetch(url).then((response)=>{
    if(!response.ok)
    {
        throw new Error('La solicitud NOK');
    }
    return response.json();
})
.then((data)=>{
    data.forEach(element => {
        extraerDatos(element);
    });
    console.log(usuarios);
    usuarios.forEach(agregarUsuarioALaLista);
    
})
.catch((error) => {
    console.error('Error al obtener los personajes:', error);
});



function extraerDatos(element){
    const edadAleatoria = Math.floor(Math.random() * 101);


    const nuevoUser={...Usuario,...element, age: edadAleatoria};

    let imgIndex;
    do {
        imgIndex = Math.floor(Math.random() * 10) + 1; 
    } while (imagenesUtilizadas.includes(imgIndex));

    imagenesUtilizadas.push(imgIndex);
    
    nuevoUser.img = `/assets/img/${imgIndex}.jpeg`;
    
    usuarios.push(nuevoUser);
}


function agregarUsuarioALaLista(usuario) {
    let listaUsuarios = document.getElementById('listaUsuarios');

    let nuevoUsuarioLi = document.createElement('li');
    nuevoUsuarioLi.id='usuarioLi';
    console.log(nuevoUsuarioLi);

    let nombreUsuario=document.createElement('div');
    nombreUsuario.id='nombreUsuario';

    let listaNombreUsuario=document.createElement('ul');
    listaNombreUsuario.innerHTML=`
    <li>Nombre: ${usuario.name}</li>
    <li>Edad: ${usuario.age}</li>
    <li>Nombre de Usuario: ${usuario.username}</li>
    <li>Teléfono: ${usuario.phone}</li>
    <li>Email: ${usuario.email}</li>
    `;
    
    nombreUsuario.appendChild(listaNombreUsuario);
    nuevoUsuarioLi.appendChild(nombreUsuario);
    
    let imagenUsuario=document.createElement('div');
    let imgUsuario=document.createElement('img');
    imgUsuario.src=usuario.img;
    imgUsuario.height = '100';
    imgUsuario.width = '70';

    imagenUsuario.appendChild(imgUsuario);
    
    nombreUsuario.insertAdjacentElement('afterend', imagenUsuario);

    let detallesEmpresaDireccion = document.createElement('div');
    let listaDetallesEmpresaDireccion = document.createElement('ul');
    listaDetallesEmpresaDireccion.innerHTML = `
        <li>Empresa: ${usuario.company.name}</li>
        <li>Dirección: ${usuario.address.street}, ${usuario.address.suite}, ${usuario.address.city}</li>
    `;

    detallesEmpresaDireccion.appendChild(listaDetallesEmpresaDireccion);
    imagenUsuario.insertAdjacentElement('afterend',detallesEmpresaDireccion);

    listaUsuarios.appendChild(nuevoUsuarioLi);
}

