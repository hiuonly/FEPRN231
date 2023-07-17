const getUser = decodeJWTToken(localStorage.getItem('token'));

function Profile() {
    fetch('https://localhost:7180/api/user/UserInfor?id=' + getUser.userId)
        .then(response => response.json())
        .then(data => {
            const Element = document.getElementById('apiuser');
            const row = `
            <div class="col-md-12">
                                    <div class="avatar-wrapper">
                                        <img class="profile-pic" src="image/${data.uImg}" />
                                        <div class="upload-button">
                                            <i class="fa fa-arrow-circle-up" aria-hidden="true"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>First Name</label>
                                        <input type="text" class="form-control" value="${data.firstName}" readonly>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Last Name</label>
                                        <input type="text" class="form-control" value="${data.lastName}"readonly>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Email</label>
                                        <input type="text" class="form-control" value="${data.email}"readonly>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Address</label>
                                        <input type="text" class="form-control" value="${data.address}"readonly>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Phone number</label>
                                        <input type="text" class="form-control" value="${data.phoneNumber}"readonly>
                                    </div>
                                </div>
            `;
            Element.innerHTML = row
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        })
}
Profile();

function decodeJWTToken(token) {
    // Split the token into its three parts: header, payload, and signature
    const parts = token.split('.');

    // Decode the payload part using base64 decoding
    const payload = JSON.parse(atob(parts[1]));

    // Extract the data from the payload object
    const userId = payload.Id;
    const name = payload.UserName;
    const iat = payload.iat;
    const email = payload.email;
    const role = payload.role;

    // Create an object with the extracted data
    const decodedToken = {
        userId: userId,
        name: name,
        email: email,
        role: role,
        issuedAt: new Date(iat * 1000)
    };

    return decodedToken;
}

document.addEventListener("DOMContentLoaded", function () {
    GetResercation();
    function GetResercation() {
        fetch('https://localhost:7180/api/user/UserInfor?id=' + getUser.userId)
            .then((response) => response.json())
            .then((data) => {
                const firstname = document.getElementById("firstname");
                firstname.setAttribute("value", data.firstName);
                const lastname = document.getElementById("lastname");
                lastname.setAttribute("value", data.lastName);
                const address = document.getElementById("address");
                address.setAttribute("value", data.address);
                const phone = document.getElementById("phone");
                phone.setAttribute("value", data.phoneNumber);
                const pass = document.getElementById("pass");
                pass.setAttribute("value", data.password);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    var createBtn = document.querySelector("#UpdateUserButton");
    createBtn.onclick = function () {
        var firstname = document.querySelector("#firstname").value;
        var lastname = document.querySelector("#lastname").value;
        var address = document.querySelector("#address").value;
        var img = document.querySelector("#img").files[0].name;
        var phone = document.querySelector("#phone").value;
        var pass = document.querySelector("#pass").value;
        console.log(firstname, lastname, address, img, phone);
        var formdata = {
            'userId': getUser.userId,
            'uImg': img,
            'email': getUser.email,
            'password': pass,
            'firstName': firstname,
            'lastName': lastname,
            'phoneNumber': phone,
            'roleId': getUser.role == 'Admin' ? 1 : 2,
            'address': address,
        };
        fetch("https://localhost:7180/api/user", {
            method: "PUT",
            body: JSON.stringify(formdata),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then(function (response) {
                Profile();
                window.location.href = "/profile.html";
            })
            .catch(error => {
                console.error("There was a problem with the fetch operation:", error);
            });
    };
});