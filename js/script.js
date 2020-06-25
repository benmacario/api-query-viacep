const cep = document.querySelector("#cep")
const btn = document.querySelector(".btn")

cep.addEventListener("keyup", (e) => {
  let value = cep.value.replace(/^([\d]{5})$/, `${cep.value}-`)
  cep.value = value
})

const showData = (result) => {
  for(const campo in result) {
    if(document.querySelector(`#${campo}`)) {
      const campos = document.querySelector(`#${campo}`)
      campos.value = result[campo]
    }

  }
}

btn.addEventListener("click", (e) => {
  e.preventDefault()
  let search = cep.value.replace("-","")

  const option = {
    method: 'GET',
    mode: 'cors',
    cache: 'default'
  }

  fetch(`https://viacep.com.br/ws/${search}/json`, option)
  .then(res => {res.json()
    .then(data => showData(data))  
  })
  .catch(err => console.log("Deu erro: " + err))
})
