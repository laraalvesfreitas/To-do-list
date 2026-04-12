const formulario = document.querySelector('#formulario-tarefa');
const input = document.querySelector('#input-titulo-tarefa');
const lista = document.querySelector('#lista-tarefas');

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];


function renderizar() {
    lista.innerHTML = "";

    tarefas.forEach((tarefa, index )=> {
        const li = document.createElement('li')

        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox';
        checkbox.checked = tarefa.done

        const span = document.createElement('span')
        span.textContent = tarefa.title
        span.style.textDecoration = tarefa.done ? 'line-through' : 'none'

        const btn = document.createElement('button')
        btn.textContent = 'Remover'

    


        checkbox.addEventListener('change',() => {
            tarefas[index].done = !tarefas[index].done
            salvar();
            renderizar()
        })

        btn.addEventListener('click', ()=> {
            tarefas.splice(index,1)
        salvar()
        renderizar()
        })

        li.append(checkbox,span,btn)
        lista.appendChild(li)

    })
}


function salvar(){
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
}

formulario.addEventListener('submit', (event) => {
    event.preventDefault()

    const titulo = input.value.trim()

    if(titulo.length < 3){
        alert('A tarefa deve ter pelo menos 3 caracteres.')
        return
    }

    tarefas.push({title: titulo, done: false})

    salvar()
    renderizar()

    input.value = ''
})

renderizar()