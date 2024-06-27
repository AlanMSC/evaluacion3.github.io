import { getData, getDocumento, remove, save, update } from './firestore.js'

let id = 0

document.getElementById('btnSave').addEventListener('click', async (event) => {
    event.preventDefault()

    document.querySelectorAll('.form-control').forEach(item => {
        verificar(item.id)
    })

    if (document.querySelectorAll('.is-invalid').length == 0) {
            const tapas = document.querySelector('input[name="ttapa"]:checked').value;

            const libro = {
                nombre: document.getElementById('nombre').value,
                autor: document.getElementById('autor').value,
                saga: document.getElementById('saga').value,
                precio: document.getElementById('precio').value,
                npagina: document.getElementById('npagina').value,
                libro: tapas,
            }
            if (id == 0) {
                save(libro);
                Swal.fire('Guardado', '', 'success');
            } 
            else {
                console.log("hola")
                update(id, libro);
            }
            id = 0;
            limpiar();
    }
});

window.addEventListener('DOMContentLoaded', () => {
    getData((datos) => {
        let tabla = ''
        datos.forEach((libr) => {
            const item = libr.data()
            tabla += `<tr>
                <td>${item.nombre}</td>
                <td>${item.autor}</td>
                <td>${item.saga}</td>
                <td>${item.precio}</td>
                <td>${item.npagina}</td>
                <td>${item.libro}</td>
                <td nowrap>
                    <button class="btn btn-warning" id="${libr.id}">Editar</button>
                    <button class="btn btn-danger" id="${libr.id}">Eliminar</button>
                </td>
            </tr>`
        })
        document.getElementById('contenido').innerHTML = tabla
        document.querySelectorAll('.btn-danger').forEach(btn => {
            btn.addEventListener('click', () => {
                Swal.fire({
                    title: "¿Estás seguro de eliminar el registro?",
                    text: "No podrás revertir los cambios",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Eliminar"
                }).then((result) => {
                    if (result.isConfirmed) {
                        remove(btn.id)
                        limpiar(btn.id)
                        Swal.fire({
                            title: "Eliminado!",
                            text: "Su registro ha sido eliminado",
                            icon: "success"
                        })
                    }
                })
            })
        })
        document.querySelectorAll('.btn-warning').forEach(btn => {
            btn.addEventListener('click', async () => {
                const doc = await getDocumento(btn.id)
                const libr = doc.data()

                document.getElementById('nombre').value = libr.nombre
                document.getElementById('autor').value = libr.autor
                document.getElementById('saga').value = libr.saga
                document.getElementById('precio').value = libr.precio
                document.getElementById('npagina').value = libr.npagina

                if (libr.libros === 'dura') {
                    document.getElementById('tapa_dura').checked = true;
                } else if (libr.libros === 'blanda') {
                    document.getElementById('tapa_blanda').checked = true;
                }

                id = doc.id

                document.getElementById('btnSave').value = 'Editar'
            })
        })
    })
})
