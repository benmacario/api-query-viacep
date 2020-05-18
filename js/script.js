const cep = document.querySelector("#cep")

cep.addEventListener("blur", (e) => {
  let search = cep.value.replace("-","")

  const option = {
    method: 'GET',
    mode: 'cors',
    cache: 'default'
  }

  fetch(`http://viacep.com.br/ws/${search}/json`, option)
  .then(res => {res.json()
    .then(data => console.log(data))  
  })
  .catch(err => console.log("Deu erro: " + err))
})