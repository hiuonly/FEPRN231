function ShowAlUser() {
    fetch('https://localhost:7180/api/user/listUser')
        .then(response => response.json())
        .then(data => {
            const Element = document.getElementById('apiuser');
            const row = data.map(data => `
            <tr>
                                    <td>${data.userId}</td>
                                    <td><img src="image/${data.uImg}" alt="" style="width: 50px; height: 50px; border-radius: 50%;" /> </td>
                                    <td>${data.email}</td>
                                    <td>${data.password}</td>
                                    <td>${data.firstName}</td>
                                    <td>${data.lastName}</td>
                                    <td>${data.phoneNumber}</td>
                                    <td>${data.roles.roleName}</td>
                                    <td>${data.address}</td>
                                </tr>
            `)
            Element.innerHTML = row.join('')
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        })
}
ShowAlUser();

