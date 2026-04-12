const formulario = document.querySelector('#formulario-tarefa '); // form
const inputTituloTarefa = document.querySelector('#input-titulo-tarefa'); // taksTitleInput
const botao = document.querySelector('botao-adicionar-tarefa'); // button
const ListaTarefas = document.querySelector('#lista-tarefas'); // todoListUl

let tarefas = [];

function renderizarTarefasHtml(tituloTarefa, done = false) {
    const li = document.createElement('li');
    const input = document.createElement('input')

    input.setAttribute('type', 'checkbox')

    input.addEventListener('change', (event)=>{
        const liToggle = event.target.parentElement;

        const spanTarefasToggle = liToggle.querySelector('span')

        const done = event.target.checked;
        if(done){
            liToggle.style.textDecoration = 'line-through'
        }else{
            liToggle.style.textDecoration = 'none'
        }
        tarefas = tarefas.map (t => {
            if(t.title === spanTarefasToggle.textContent){
                return{
                    title : t.title,
                    done: !t.done
                }
            }
            return t
        })
            localStorage.setItem('tarefas', JSON.stringify(tarefas))
    })

    input.checked = done;

    const span = document.createElement('span');
    span.textContent = tituloTarefa
    if(done){
        span.style.textDecoration = 'line-through'
    }

    const button = document.createElement('button')
    button.textContent = "Remover"
    button.addEventListener('click', (event)=>{
        const liToRemove = event.target.parentElement;
        const titleToRemove = liToRemove.querySelector('span').textContent
        tarefas = tarefas.filter(t => t.title !== titleToRemove)

        ListaTarefas.removeChild(liToRemove)

            localStorage.setItem('tarefas', JSON.stringify(tarefas))
    })

    li.appendChild(input)
    li.appendChild(span)
    li.appendChild(button)


    ListaTarefas.appendChild(li)

}

const tarefasLocalStorage = localStorage.getItem('tarefas')
window.onload = () => {
    if(!tarefasLocalStorage) return;

    tarefas = JSON.parse(tarefasLocalStorage)
    tarefas.forEach ( t => {
        renderizarTarefasHtml(t.title, t.done)
    });
}


// Formulário adicionar 
formulario.addEventListener('submit', (event) => {
    event.preventDefault();
    const tituloTarefa = inputTituloTarefa.value

    if(tituloTarefa < 3) {
        alert("A tarefa deve conter 3 caracteres ou mais.")
        return
    }
        tarefas.push({
            titulo : tituloTarefa
            
        })
            localStorage.setItem('tarefas', JSON.stringify(tarefas))
    

    renderizarTarefasHtml(tituloTarefa)

    inputTituloTarefa.value = ''
})
