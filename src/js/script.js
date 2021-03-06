const getCep = document.querySelector("#cep")
const buttonSearch = document.querySelector("#btn")
const modalError = document.querySelector(".danger")
const modalSuccess = document.querySelector(".success")

const option = {
  method: 'GET',
  mode: 'cors',
  cache: 'default'
}

const onlyNumber = (e) => {
  let charCode = e.charCode ? e.charCode : e.keyCode;
  if (charCode != 8 && charCode != 9) {
    if (charCode < 48 || charCode > 57) {
      return false;
    }
  }
}

const setData = (data) => {
  for(label in data) {
    if(document.querySelector(`#${label}`)) {
      const setValue = document.querySelector(`#${label}`)
      setValue.value = data[label]
    }
  }
}

getCep.addEventListener("keyup", (e) => {
  e.preventDefault();

  let value = getCep.value.replace(/^([\d]{5})$/, `${getCep.value}-`)
  getCep.value = value
})

buttonSearch.addEventListener("click", (e) => {
  e.preventDefault()
  let search = getCep.value.replace("-","")

  fetch(`https://viacep.com.br/ws/${search}/json`, option)
  .then(res => {res.json()
    .then(data => {
      setData(data)
      modalSuccess.style.display = "flex"
      modalSuccess.classList.add("fadeAnimateWarning");

      const timeWarn = setTimeout(() => {
        modalSuccess.style.display = "none"
      }, 5000);
    });
  })
  .catch(() => {
    modalError.style.display = "flex"
    modalError.classList.add("fadeAnimateWarning")

    const timeWarn = setTimeout(() => {
      modalError.style.display = "none"
    }, 5000);
  })
})
