document.addEventListener('DOMContentLoaded', () => {
    //Get reference to the form
    const form = document.getElementById('loginform');
    const emailInput = document.getElementById('email');
    const errorMessage = document.getElementById('error-message');
    const simulatedAgents = [
        { userid: '2', username: 'Rosemary.ashibuogwu@gtpensionmanagers.com' },
        { userid: '5', username: 'michael.chris-bello@gtpensionmanagers.com' },
        { userid: '7', username: 'taiwo.owolabi@gtpensionmanagers.com' },
        { userid: '8', username: 'victoria.ijeoma@gtpensionmanagers.com' },
        { userid: '1011', username: 'Taiwo@gtpensionmanagers.com' },
        { userid: '1010', username: 'pelumi@gtpensionmanagers.com' },
        { userid: '1009', username: 'owolabi.taiwo@gtpensionmanagers.com' },
        { userid: '1008', username: 'deborah.akinyemi@gtpensionmanagers.com' }
    ]; sessionStorage.setItem('userids', JSON.stringify(simulatedAgents));

    //Defining the domain to validate
    const validDomain = 'test.com';

    //Add an event listener to the form submission
    form.addEventListener('submit', function (event) {
        //get the value of the email input
        const emailValue = emailInput.value;

        //create a regular expression to check if the email ends with the valid domain
        const domainNameCheck = new RegExp(`@${validDomain}$`, 'i');

        //test the email value against the regular expression
        // if(!domainNameCheck.test(emailValue)){
        //     //show the error message if the email is invalid
        //     errorMessage.style.display='block';
        //     //prevent form submission
        //     event.preventDefault();
        // }else{
        //     //Hide the error message if the email is valid
        //     errorMessage.style.display='none';
        // }
    });

    // const validateUser = async function() {
    //     try {
    //       const response = await fetch('http://localhost:5218/api/Auth/validateLogin');
    //       if (!response.ok) {
    //         throw new Error(`HTTP error! status: ${response.status}`);
    //       }
    //       const data = await response.json();
    //       console.log(data);
    //     } catch (error) {
    //       console.error('Username or password incorrect', error);
    //     }
    //   };

    //   validateUser();

    //get reference to the form
    // const passwordInput=document.getElementById('password');
    // const passwordstrength=document.getElementById('password-strength');
    // const lengthRequirement = document.getElementById('length');
    // const uppercaseRequirement = document.getElementById('uppercase');
    // const lowercaseRequirement = document.getElementById('lowercase');
    // const numberRequirement = document.getElementById('number');
    // const specialRequirement = document.getElementById('special');

    //function to evaluate the strength of the password

    // function evaluatepasswordStrength(password){
    //     let strength='Weak'; //Default Strength
    //     const length=password.length >= 8;
    //     const uppercase= /[A-Z]/.test(password);
    //     const lowercase= /[a-z]/.test(password);
    //     const number=/\d/.test(password);
    //     const specialChar=/[!@#$%&*?]/.test(password);

    //     //determine strength based on criteria
    //     if (length && uppercase && lowercase && number && specialChar){
    //         strength='Strong';
    //     } else if (length && (uppercase || lowercase) && (number || specialChar)){
    //         strength='Medium';
    //     } return strength;
    // }

    // //function to update the strength indicator
    // function updatepasswordstrength(){
    //     const password=passwordInput.value;
    //     const strength=evaluatepasswordStrength(password);

    //     //apply css classes based on strength
    //     passwordstrength.className='';
    //     if (strength === 'Weak') {
    //         passwordstrength.classList.add('weak');
    //     } else if(strength === 'Medium'){
    //         passwordstrength.classList.add('medium');
    //     } else if(strength === 'Strong'){
    //         passwordstrength.classList.add('strong');
    //     }

    //     // Update requirements list
    //     lengthRequirement.className = password.length >= 8 ? 'valid' : 'invalid';
    //     uppercaseRequirement.className = /[A-Z]/.test(password) ? 'valid' : 'invalid';
    //     lowercaseRequirement.className = /[a-z]/.test(password) ? 'valid' : 'invalid';
    //     numberRequirement.className = /\d/.test(password) ? 'valid' : 'invalid';
    //     specialRequirement.className = /[!@#$%&*?]/.test(password) ? 'valid' : 'invalid';
    // }

    // //an event listener to update the strength of the password based on input
    // passwordInput.addEventListener('input', updatepasswordstrength);

    //document.addEventListener("DOMContentLoaded", function() {
    //const form = document.getElementById('loginform');
    // const messageDiv = document.getElementById('message');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // Get user input
        const username = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const formData = new FormData()
        formData.append('username', username)
        formData.append('password', password)


        // Fetch request to validate user
        fetch('/accountmanager/api/Auth/validateLogin', {
            method: 'POST',
            body: formData,
        })

            .then(response => response.json())
            .then(data => {
                if (data) {

                    sessionStorage.setItem('roles', data.userdetails.role);
                    sessionStorage.setItem('locations', data.userdetails.location);
                    sessionStorage.setItem('locationIds', data.userdetails.locationId);
                    sessionStorage.setItem('usernames', data.userdetails.username);
                    // sessionStorage.setItem('userids', JSON.stringify(simulatedAgents));

                    // messageDiv.textContent = 'Login successful!';
                    // Redirect to another page or perform other actions
                    console.log(data)
                    if (data.userdetails.role === 'bdofficer') {
                        window.location.href = 'bdofficer.html'; // Example redirect
                    } else if (data.userdetails.role === 'bdteamlead') {
                        window.location.href = 'BDteamlead.html'; // Example redirect
                    } else if (data.userdetails.role === 'bdhead') {
                        window.location.href = 'BDhead.html'; // Example redirect
                    } else if (data.userdetails.role === 'administrator') {
                        window.location.href = 'admin.html'; // Example redirect
                    } else {
                        alert('Are you a Scammer? How did you get an account?')
                        window.location.href = '/'; // Example redirect
                    }

                } else {
                    alert('Invalid username or password.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                // messageDiv.textContent = 'An error occurred. Please try again.';
            });
    });
})