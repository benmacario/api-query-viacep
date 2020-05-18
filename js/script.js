const cep = document.querySelector("#cep")

const showData = (result) => {
  for(const campo in result) {
    if(document.querySelector(`#${campo}`)) {
      const campos = document.querySelector(`#${campo}`)
      campos.value = result[campo]
    }

  }
}

cep.addEventListener("blur", (e) => {
  let search = cep.value.replace("-","")

  const option = {
    method: 'GET',
    mode: 'cors',
    cache: 'default'
  }

  fetch(`http://viacep.com.br/ws/${search}/json`, option)
  .then(res => {res.json()
    .then(data => showData(data))  
  })
  .catch(err => console.log("Deu erro: " + err))
})