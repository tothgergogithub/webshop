

function betolt(){
fetch("http://localhost:3000/users")
.then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);

    let tbody = document.getElementById("tbody");
    let szoveg = "";

    for (let i = 0; i < data.length; i++) {
      szoveg += `
      <tr class="table-dark">
            <th scope="col">${data[i].name}</th>
            <th scope="col">${data[i].email}</th>
            <th scope="col">${data[i].city}</th>
            <th scope="col">${data[i].phone}</th>
            <th scope="col">${data[i].role}</th>
        </tr>
      `
    }

    tbody.innerHTML = szoveg;
  })
  .catch(function (error) {
    console.error("Hiba:", error);
  });


  function hozzaadUser(){
    function hozzaadUser() {
  let nev = document.getElementById("nev").value;
  let email = document.getElementById("email").value;
  let varos = document.getElementById("varos").value;
  let telefonszam = document.getElementById("telefonszam").value;
  let szerep = document.getElementById("szerep").value;

  if (nev == "" || email == "" || varos == "" || telefonszam == "" || szerep == "") {
    alert("Kérjük adja meg az összes adatot");
    return;
  }

  let ujUser = {
    name: nev,
    email: email,
    city: varos,
    phone: telefonszam,
    role: szerep
  };

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ujUser)
  })
    .then(function (response) {
      if (!response.ok) {
        alert("A szerver hibát adott: " + response.status);
        return;
      }
      document.getElementById("nev").value = "";
      document.getElementById("email").value = "";
      document.getElementById("varos").value = "";
      document.getElementById("telefonszam").value = "";
      document.getElementById("szerep").value = "";
      betolt();
    })
    .catch(function (error) {
      console.error("Hiba:", error);
    });
}

}
}
betolt()

