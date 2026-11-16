fetch("http://localhost:3000/users")
.then(response=> response.json())
.then(data=>
{
    console.log(data)
    document.getElementById('data').innerHTML= data.map(user=> `
        <tr>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.city}</td>
        <td>${user.phone}</td>
        <td>${user.role}</td>


        </tr>

        `).join('');
}
)