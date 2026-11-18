const url = "http://localhost:3000/users";
let felhasznalok = [];
let szerkesztettId = null;

function betolt() {
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      felhasznalok = data;
      let tbody = document.getElementById("tbody");
      let szoveg = "";

      for (let i = 0; i < data.length; i++) {
        szoveg += `
          <tr>
            <td>${data[i].name}</td>
            <td>${data[i].email}</td>
            <td>${data[i].city}</td>
            <td>${data[i].phone}</td>
            <td>${data[i].role}</td>
            <td>
              <button type="button" class="btn btn-outline-primary btn-sm" onclick="szerkeszt(${data[i].id})">Módosítás</button>
              <button type="button" class="btn btn-outline-danger btn-sm" onclick="torolUser(${data[i].id})">Törlés</button>
            </td>
          </tr>
        `;
      }

      tbody.innerHTML = szoveg;
    })
    .catch(function (error) {
      console.error("Hiba:", error);
    });
}

  function torolUser(id) {
    

    fetch(url + "/" + id, {
      method: "DELETE"
    })
      .then(function (response) {
        if (!response.ok) {
          alert("A törlés nem sikerült.");
          return;
        }
        betolt();
      })
      .catch(function (error) {
        console.error("Hiba:", error);
      });
  }

function szerkeszt(id) {
 
  let user = felhasznalok.find(function (u) {
    return String(u.id) === String(id);
  });
  if (!user) return;

  szerkesztettId = user.id;

  document.getElementById("nev").value = user.name;
  document.getElementById("email").value = user.email;
  document.getElementById("varos").value = user.city;
  document.getElementById("telefonszam").value = user.phone;
  document.getElementById("szerep").value = user.role;

  document.getElementById("mentesGomb").textContent = "Módosítás mentése";
  document.getElementById("megseGomb").style.display = "inline-block";
}

function urlapTorles() {
  document.getElementById("nev").value = "";
  document.getElementById("email").value = "";
  document.getElementById("varos").value = "";
  document.getElementById("telefonszam").value = "";
  document.getElementById("szerep").value = "";

  szerkesztettId = null;
  document.getElementById("mentesGomb").textContent = "Hozzáad";
  document.getElementById("megseGomb").style.display = "none";
}


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

  let mentendoUrl = url;
  let metodus = "POST";

  if (szerkesztettId !== null) {
    mentendoUrl = url + "/" + szerkesztettId;
    metodus = "PUT";
  }

  fetch(mentendoUrl, {
    method: metodus,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ujUser)
  })
    .then(function (response) {
      if (!response.ok) {
        alert("A szerver hibát adott: " + response.status);
        return;
      }
      urlapTorles();
      betolt();
    })
    .catch(function (error) {
      console.error("Hiba:", error);
    });
}

betolt(); 