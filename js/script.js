const $cep = document.querySelector("#cep")
const $btn = document.querySelector("#btn")
const $danger = document.querySelector(".danger")
const $success = document.querySelector(".success")

function onlyNumber(e) {
  let charCode = e.charCode ? e.charCode : e.keyCode;
  if (charCode != 8 && charCode != 9) {
    if (charCode < 48 || charCode > 57) {
      return false;
    }
  }
}

$cep.addEventListener("keyup", (e) => {
  e.preventDefault()
  let value = $cep.value.replace(/^([\d]{5})$/, `${$cep.value}-`)
  $cep.value = value
})

const showData = (result) => {
  for(const field in result) {
    if(document.querySelector(`#${field}`)) {
      const $field = document.querySelector(`#${field}`)
      $field.value = result[field]
    }
  }
}

$btn.addEventListener("click", (e) => {
  e.preventDefault()
  let search = $cep.value.replace("-","")

  if(document.querySelector(".error")) {
    $danger.classList.remove("error")
  }

  const option = {
    method: 'GET',
    mode: 'cors',
    cache: 'default'
  }

  fetch(`https://viacep.com.br/ws/${search}/json`, option)
  .then(res => {res.json()
    .then(data => {
      showData(data)
    $success.style.display = "flex"
    $success.classList.add("fadeAnimateWarning");

    const timeWarn = setTimeout(() => {
      $success.style.display = "none"
    }, 5000);
    cleanTimeout(timeWarn);
    });
  })
  .catch(err => {
    $danger.style.display = "flex"
    $danger.classList.add("fadeAnimateWarning")

    const timeWarn = setTimeout(() => {
      $danger.style.display = "none"
    }, 5000);
    cleanTimeout(timeWarn);
  })
})
