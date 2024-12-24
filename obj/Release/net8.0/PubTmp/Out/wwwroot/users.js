document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('usercreation');
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
  // document.querySelector('#location').textContent = locationss;



  // form.addEventListener('submit', function (event) {
  //   event.preventDefault();

    // const name = document.getElementById('fullname').value;
    // const username = document.getElementById('usernames').value;
    // const email = document.getElementById('emails').value;
    // const AgentCode = document.getElementById('agentcodes').value;
    // const idlocation = document.querySelector('.action-select').value;
    // const pass = document.getElementById('password').value;
    // const pass2 = document.getElementById('password2').value;

    // const formdata = new FormData()
    // formdata.append('name', name)
    // formdata.append('username', username)
    // formdata.append('email', email)
    // formdata.append('AgentCode', AgentCode)
    // formdata.append('.action-select', idlocation)
    // formdata.append('pass', pass)
    // formdata.append('2pass', pass2)

    // fetch('http://localhost:5157/api/Auth/register', {
    //   method: 'POST',
    //   body: formdata,
    // })

  
  async function submitregistration() {
    const registration = [];
    console.log(registration)
    let allValid = true;
      const name = document.getElementById('fullname').value;
      const username = document.getElementById('usernames').value;
      const email = document.getElementById('emails').value;
      const AgentCode = document.getElementById('agentcodes').value;
      const idlocation = document.getElementById('Idlocations').value;
      const pass = document.getElementById('password').value;
      const pass2 = document.getElementById('password2').value;

      const formdata = new FormData()
      if (formdata) {
        formdata.append('name', name)
        formdata.append('username', username)
        formdata.append('email', email)
        formdata.append('agentCode', AgentCode)
        formdata.append('locationId', idlocation)
        formdata.append('password', pass)
        formdata.append('confirmPassword', pass2)

        // Here, we assume that you need to collect additional data for each selected account.
        registration.push(formdata);
      } else {
        allValid = false;
        agentSelect.style.borderColor = 'red'; // Highlight missing selections
      };

    if (!allValid) {
      alert('Please select an agent for all checked accounts.');
      return;
    }

    try {
        const registrations = await fetch('/accountmanager/api/Auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registration)
      });
      if (!registrations.ok) {
        throw new Error(`HTTP error! status: ${registrations.status}`);
      }
      alert('Registration successful!');

    } catch (error) {
      console.error('registration unsuccessful', error);
      return [];
    }

  }
  document.getElementById('submit').addEventListener('click', submitregistration);
// });














  /*****************************************BEGINNING OF CREATING USER API***************************************************/
  // async function CreateUser() {
  //   try {
  //     const userResponse = await fetch(`.......`);
  //     if (!userResponse.ok) {
  //       throw new Error(`HTTP error! status: ${userResponse.status}`);
  //     }
  //     const userData = await userResponse.json();
  //     console.log('Users Data', userData);
  //     return userData;
  //   } catch (error) {
  //     console.error('Failed to fetch customers:', error);
  //     return [];
  //   }
  // };

  // function renderUser(userData) {
  //   const result = document.getElementById('userDetailsTable')
  //   let rowCounter = 0; /***To enable the counter start from one regardless of the position of the data on the DB****/

  //   result.innerHTML = userData.map((created) => {
  //       rowCounter++;
  //       return ` 
  //           <tr>
  //               <td>${rowCounter}</td>
  //               <td>${created.agentcode}</td>
  //               <td>${created.surname}</td>
  //               <td>${created.firstname}</td>
  //               <td>${created.locationName}</td>
  //               <td>${created.email}</td> 
  //               <td>${created.bdofficername}</td>
  //           </tr>
  //           `;
  //   }).join('');
  // }


  // function filterUserData(userData, filtersuserData) {
  //   return userData.filter(item => {
  //     const matchesuserData = filtersuserData.bdOfficers === '' || item.bdOfficer === filtersuserData.bdOfficers;
  //     return matchesuserData;
  //   });
  // }

  // async function initUserData() {
  //   const userdata = await CreateUser();
  //   const alluserdata = [...new Set(userdata.map(item => item.bdOfficer))];
  //   populateFilters(alluserdata);
  //   renderAssignedDash(userdata);

  //   document.getElementById('bdOfficerFilter').addEventListener('change', () => applyFilters(assignedCustomerDash));

  //   function applyFilters(userData) {
  //     const filters = {
  //       bdOfficers: document.getElementById('bdOfficerFilter').value
  //     };
  //     const filteredData = filterDataDash(dataDash, filters);
  //     renderAssignedDash(filteredData);
  //   }

  // }

  // // function searchFunction() {
  // //   const input = document.getElementById('searchWord');
  // //   const filter = input.value.toLowerCase();
  // //   const table = document.getElementById('userDetailsTable');
  // //   const rows = table.getElementsByTagName('tr');

  // //   for (let i = 0; i < rows.length; i++) {
  // //     const cells = rows[i].getElementsByTagName('td');
  // //     let match = false;

  // //     for (let j = 0; j < cells.length; j++) {
  // //       if (cells[j]) {
  // //         const cellText = cells[j].textContent || cells[j].innerText;
  // //         if (cellText.toLowerCase().indexOf(filter) > -1) {
  // //           match = true;
  // //           break;
  // //         }
  // //       }
  // //     }
  // //     rows[i].style.display = match ? '' : 'none';
  // //   }
  // // }
  // // document.getElementById('searchWord').addEventListener('keyup', searchFunction);

  // window.addEventListener('load', initUserData);
  /*****************************************END OF CREATING USER API***************************************************/

  function signouts() {
    sessionStorage.clear();
    document.cookie.split(';').forEach(function (c) {
      document.cookie = c.trim().replace(/=.*$/, '=;expires=Thu, 01 Jan 1970 12:15:60 GMT');
    });
    window.location.href = 'login.html'
  }

  document.getElementById('signout').addEventListener('click', signouts);
});