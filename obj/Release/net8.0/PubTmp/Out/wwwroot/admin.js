document.addEventListener('DOMContentLoaded', () => {
  const role = sessionStorage.getItem('roles');
  const location = sessionStorage.getItem('locations');
  const username = sessionStorage.getItem('usernames');

  if (!role || !username || !location) {
    alert('User not authenticated or location data missing.');
    window.location.href = 'login.html';
    return;
  }

  document.querySelector('#username').textContent = username;

  async function FetchCustomers() {
    try {
        const response = await fetch(`/accountmanager/api/Customer`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Fetched Data', data);
      return data;
    } catch (error) {
      console.error('Failed to fetch customers:', error);
      return [];
    }
  };


  //const agents = ['Kanyinsola David','Chioma Okpara','Deborah Omolade','Deborah Akinyemi','Gabriel Ezenwata']

  // function renderEmployees(data){
  //     const result = document.getElementById('dynamic-rendering')
  //     result.innerHTML = data.map((employee,index)=> {
  //     //const agentOptions = agents.map(agents => `<option value="${agents}">${agents}</option>`).join('');
  //         return ` 
  //         <tr key=${index}>
  //             <td>${index + 1}</td>
  //             <td>${employee.rsaPin}</td>
  //             <td>${employee.surname}</td>
  //             <td>${employee.firstname}</td>
  //             <td>${employee.othername}</td>
  //             <td>${employee.locationId}</td>
  //             <td>${employee.email}</td> 
  //             <td>${employee.mobileNumber}</td>             
  //             <td>${employee.aum}</td>
  //             <td>
  //                 <select class="agent-select">
  //                     <option value="">Select Agent</option>
  //                     <optgroup label="MainLand"></optgroup>
  //                     <option>Gabriel Ezenwata</option>
  //                     <option>Pelumi Olutunde</option> 
  //                     <option>Oluwatumininu Adebajo</option>
  //                     <option>Deborah Omolade</option>
  //                     <optgroup label="Island"></optgroup>
  //                     <option>Deborah Akinyemi</option>
  //                     <option>Kanyinsola Joseph</option>
  //                     <option>Chioma Okpara</option>
  //                     <option>Oseremen Alika</option>
  //                     <optgroup label="Abuja"></optgroup>
  //                     <option>Chisom Anyaegbu</option>
  //                     <option>Ahmodu Haruna</option> 
  //                     <option>Ireoluwa Abayomi</option>  
  //                 </select>
  //             </td>
  //             <td><button class="submit-btn" data-index="${index}">Submit</button></td>
  //         </tr>
  //         `;
  //     }).join('');
  //     document.querySelectorAll('.submit-btn').forEach(button =>{
  //         button.addEventListener('click', handleSubmit);
  //     });
  // }

  // function handleSubmit(event) {
  //     const index = event.target.getAttribute('data-index');
  //     const employee = employees[index];
  //     const selectedAgent = event.target.closest('tr').querySelector('.agent-select').value;

  //     if (selectedAgent) {
  //         const submissionData = { ...employee, assignedAgent: selectedAgent };
  //         console.log('Submitted Data:', submissionData);
  //     } else {
  //         alert('Please select an agent before submitting.');
  //     }
  // }

  // async function init(){
  //     const customers = await FetchCustomers();
  //     renderEmployees(customers);
  // } 

  // window.addEventListener('load', init);
});
function signouts() {
  sessionStorage.clear();
  document.cookie.split(';').forEach(function (c) {
    document.cookie = c.trim().replace(/=.*$/, '=;expires=Thu, 01 Jan 1970 12:15:60 GMT');
  });
  window.location.href = 'login.html'
}

document.getElementById('signout').addEventListener('click', signouts);