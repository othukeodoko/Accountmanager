document.addEventListener('DOMContentLoaded', () => {
    const roless = sessionStorage.getItem('roles');
    const locationss = sessionStorage.getItem('locations');
    const locationIdss = sessionStorage.getItem('locationIds');
    const usernamess = sessionStorage.getItem('usernames');


    if (!roless || !usernamess || !locationIdss) {
        alert('User not authenticated or location data missing.');
        window.location.href = 'login.html';
        return;
    }

    document.querySelector('#username').textContent = usernamess;
    document.querySelector('#location').textContent = locationss;


/*****************************************BEGINNING OF ASSIGNED API***************************************************/
    async function FetchCustomers() {
        try {
            const response = await fetch(`/accountmanager/api/Customer/${locationIdss}/Assigned`);
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
    
      function renderAssigned(data) {
        const result = document.getElementById('teamleadtable')
    
        result.innerHTML = data.map((assigned, index) => {
          return ` 
            <tr key=${index}>
                <td>${index + 1}</td>
                <td>${assigned.rsapin}</td>
                <td>${assigned.surname}</td>
                <td>${assigned.firstname}</td>
                <td>${assigned.othername}</td>
                <td>${assigned.locationName}</td>
                <td>${assigned.email}</td> 
                <td>${assigned.mobileNumber}</td>             
                <td>${assigned.aum}</td>
                <td>${assigned.bdOfficer}</td>
                <td>${assigned.commentDetails}</td>
            </tr>
            `;
        }).join('');
      }


      function populateFilters(managers) {
        const bdOfficerFilter = document.getElementById('bdOfficerFilter');
        bdOfficerFilter.innerHTML = '<option value="">Account Manager</option>';
        managers.forEach(manager => {
            const option = document.createElement('option');
            option.value = manager;
            option.textContent = manager;
            bdOfficerFilter.appendChild(option);
        });
    }

    function filterData(data, filters) {
        return data.filter(item => {
            const matchesBdOfficer = filters.bdOfficers === '' || item.bdOfficer === filters.bdOfficers;
            return matchesBdOfficer;
        });
    }

      async function initAssigned() {
        const assignedCustomer = await FetchCustomers();
        const allManagers = [...new Set(assignedCustomer.map(item => item.bdOfficer))];
        populateFilters(allManagers);
        renderAssigned(assignedCustomer);

        document.getElementById('bdOfficerFilter').addEventListener('change', () => applyFilters(assignedCustomer));

      function applyFilters(data) {
        const filters = {
            bdOfficers: document.getElementById('bdOfficerFilter').value
          };
          const filteredData = filterData(data, filters);
          renderAssigned(filteredData);
        }
        
      }
      window.addEventListener('load', initAssigned);
/*****************************************END OF ASSIGNED API***************************************************/


/*****************************************BEGINNING OF DASHBOARD API***************************************************/
      async function FetchCustomerDashboard() {
        try {
            const response = await fetch(`/accountmanager/api/Customer`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const dataDash = await response.json();
          console.log('Fetched Data', dataDash);
          return dataDash;
        } catch (error) {
          console.error('Failed to fetch customers:', error);
          return [];
        }
      };

      function renderAssignedDash(dataDash) {
        const result = document.getElementById('teamleadtableDash')
        let rowCounter=0; /***To enable the counter start from one regardless of the position of the data on the DB****/
    
        result.innerHTML = dataDash.map((assigned) => {
          if (assigned.locationName === locationss)/*Location hides if locationName on table is not same as the teamleads location stored in session storage*/
          {
          rowCounter++;
          return ` 
            <tr>
                <td>${rowCounter }</td>
                <td>${assigned.rsapin}</td>
                <td>${assigned.surname}</td>
                <td>${assigned.firstname}</td>
                <td>${assigned.othername}</td>
                <td>${assigned.locationName}</td>
                <td>${assigned.email}</td> 
                <td>${assigned.mobilenumber}</td>             
                <td>${assigned.aum}</td>
                <td>${assigned.bdofficername}</td>
            </tr>
            `;
        }else{return '';}}).join('');
        // var rows = document.querySelectorAll('#teamleadtableDash tr');
        // // Filter the rows based on the user's location
        // rows.forEach(function(row) {
        //   var locationCell = row.cells[5];  // 'locationName' is in the 6th column (index 5)
        //   var locationName = locationCell.textContent.trim();

        //   // Location hides if locationName on table is not same as the teamleads location stored in session storage
        //   if (locationName !== locationss) {
        //       row.style.display = 'none';
        //     }
        // });
      }


      function filterDataDash(dataDash, filtersDash) {
        return dataDash.filter(item => {
            const matchesBdOfficer = filtersDash.bdOfficers === '' || item.bdOfficer === filtersDash.bdOfficers;
            return matchesBdOfficer;
        });
    }

      async function initAssignedDash() {
        const assignedCustomerDash = await FetchCustomerDashboard();
        const allManagersDash = [...new Set(assignedCustomerDash.map(item => item.bdOfficer))];
        populateFilters(allManagersDash);
        renderAssignedDash(assignedCustomerDash);

        document.getElementById('bdOfficerFilter').addEventListener('change', () => applyFilters(assignedCustomerDash));

      function applyFilters(dataDash) {
        const filters = {
            bdOfficers: document.getElementById('bdOfficerFilter').value
          };
          const filteredData = filterDataDash(dataDash, filters);
          renderAssignedDash(filteredData);
        }
        
      }
      window.addEventListener('load', initAssignedDash);
/*****************************************END OF DASHBOARD API***************************************************/

function signouts() {
    sessionStorage.clear();
    document.cookie.split(';').forEach(function (c) {
        document.cookie = c.trim().replace(/=.*$/, '=;expires=Thu, 01 Jan 1970 12:15:60 GMT');
    });
    window.location.href = 'login.html'
}

document.getElementById('signout').addEventListener('click', signouts);
});