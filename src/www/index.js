
console.log('ola buenas');
const BASE_PATH = "http://backend:3900/api"

const traerFirmas = () => {
    fetch(`${BASE_PATH}/firmas`)
        .then(res => res.json())
        .catch(error => {
            console.log(error)
        }).then(data => {
            console.log(data.results)
            const tbody = document.getElementById("tbody")
            data.results.forEach((row, i) => {
                tbody.innerHTML += `
              <tr>
              <th scope="row">${i + 1}</th>
              <td>${row.email}</td>
              <td>${row.Nombre}</td>
              <td>${row.Comentario}</td>
            </tr>
              `
            });
        })
}

traerFirmas()

const guardarFirma = e => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value,
        email = document.getElementById("correo").value,
        comentario = document.getElementById("comentario").value,
        data = { nombre, email, comentario }

    fetch(`${BASE_PATH}/save`, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            const toastLiveExample = document.getElementById('liveToast')

            const toast = new bootstrap.Toast(toastLiveExample)
            toast.show()
            console.log('Success:', response)
            window.location = "todaslasfirmas.html"
        });
}


