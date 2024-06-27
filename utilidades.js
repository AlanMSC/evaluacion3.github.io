const valida = (e) => {
    document.querySelectorAll('.form-control,.form-select').forEach(item => {
        verificar(item.id)
    })
    validaRadio('ttapa')
    e.preventDefault()
}
const limpiar = () => {
    document.querySelector('form').reset()
    document.querySelectorAll('.form-control,.form-select,.form-check-input').forEach(item => {
        item.classList.remove('is-invalid')
        item.classList.remove('is-valid')
        console.log(item)
        document.getElementById('e-' + item.name)
    })
    document.getElementById('btnSave').value = 'Guardar'
}
const validaRadio =(name) =>{
    const radio = document.querySelector('input[name="'+ name +'"]:checked')
    const div = document.getElementById('e-'+name)
    const all = document.querySelectorAll('input[name="'+ name +'"]')
    if(!radio){
        div.innerHTML = '<span class="badge bg-danger">El campo es obligatorio</span>'
        all.forEach(item => {
            item.classList.add('is-invalid')
        })
    }
    else{
        div.innerHTML = ''
        all.forEach(item => {
            item.classList.remove('is-invalid')
            item.classList.add('is-valid')
        })
    }
}

const verificar = (id) => {
    const input = document.getElementById(id)
    const div = document.getElementById('e-' + id)
    input.classList.remove('is-invalid')
    if (input.value.trim() == '') {
        input.classList.add('is-invalid') 
        div.innerHTML = '<span class="badge bg-danger">El campo es obligatorio</span>'
    } else {
        input.classList.add('is-valid') 
        div.innerHTML = ''
    }
}

const soloNumeros = (e) => {
    if (e.keyCode >= 48 && e.keyCode <= 57)
        return true
    return false 
}


