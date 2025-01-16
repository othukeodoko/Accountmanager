document.addEventListener('DOMContentLoaded', () => {
    // const submitButton = document.getElementById('submit');
    const roless = sessionStorage.getItem('roles');
    // const locationss = sessionStorage.getItem('locations');
    const locationIdss = sessionStorage.getItem('locationIds');
    const usernamess = sessionStorage.getItem('usernames');


    if (!roless || !usernamess || !locationIdss) {
        alert('User not authenticated or location data missing.');
        window.location.href = 'login.html';
        return;
    }

    document.querySelector('#username').textContent = usernamess;

    const emailfield=document.getElementById('email');
    const Roleform=document.getElementById('assignRole');
    const UserName=sessionStorage.getItem('Username');
    emailfield.value=UserName;

    Roleform.addEventListener('submit', (e) => {
        e.preventDefault();
        const User = emailfield.value;
        const Userrole = document.getElementById('userrole').value;

        if (!Userrole) {
            alert('Please select a role.');
            return;
        }

        fetch('/api/Role/assign', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            }, body: JSON.stringify({email:User, role: Userrole}),
        })
        .then ((response) => {
            if (!response.ok) {
                throw new Error(`HTTP eeror! Status: ${response.status}`);
            }
            return response.text();
        })
        .then((data) => {
            console.log(data);
            alert(`Role '${Userrole}' assigned to user '${User}' successfully`);
        })
        .catch ((error) => {
            console.error('Role assignment failed: ', error);
            alert('Failed to assign role.');
        })
    })

});