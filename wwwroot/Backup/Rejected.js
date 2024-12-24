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
  
    async function FetchCustomers() {
      try {
          const response = await fetch(`/api/AssignmentRequest/rejected`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const rejectedData = await response.json();
        console.log('Rejected Data', rejectedData);
        return rejectedData;
      } catch (error) {
        console.error('Failed to fetch data:', error);
        return [];
      }
    };
  
    function renderAssign(RejectedData) {
      const results = document.getElementById('RejectedTable')
      let rowCounter=0;
  
      results.innerHTML = RejectedData.map((rejected, index) => {
        if(rejected.location === locationss  && rejected.status === "Rejected")
        {
          rowCounter++;
          return ` 
        <tr>
            <td>${rowCounter}</td>
            <td>${rejected.lastname}</td>
            <td>${rejected.firstname}</td>           
            <td>${rejected.status}</td>
            <td>${rejected.bdOfficerName}</td>
            <td>${rejected.commentDetails}</td>
        </tr>
        `;
        }else{return '';}
        
      }).join('');
    }
  


    function populateFilters(Customersmanager) {
  
      const bdOfficerFilter = document.getElementById('bdOfficerFilter');
      bdOfficerFilter.innerHTML = '<option value="">Account Manager</option>'; 
      Customersmanager.forEach(manager => {
          const option = document.createElement('option');
          option.value = manager;
          option.textContent = manager;
          bdOfficerFilter.appendChild(option);
      });
  }
  
  function filterData(datafiltered, filters) {
      return datafiltered.filter(item => {
          const matchesBdOfficer = filters.bdOfficer === '' || item.bdOfficerName === filters.bdOfficer;
          return matchesBdOfficer;
      });
  }
  
    async function initAssign() {
      const assignedCustomers = await FetchCustomers();
      const allManagers = [...new Set(assignedCustomers.map(item => item.bdOfficerName))];
      populateFilters(allManagers);
      renderAssign(assignedCustomers);
  
      document.getElementById('bdOfficerFilter').addEventListener('change', () => applyFilters(assignedCustomers));
  
        function applyFilters(data) {
          const filters = {
              bdOfficer: document.getElementById('bdOfficerFilter').value
            };
            const filteredData = filterData(data, filters);
            renderAssign(filteredData);
          }
    }
  
    window.addEventListener('load', initAssign);
  
    function signouts() {
      sessionStorage.clear();
      document.cookie.split(';').forEach(function (c) {
        document.cookie = c.trim().replace(/=.*$/, '=;expires=Thu, 01 Jan 1970 12:15:60 GMT');
      });
      window.location.href = 'login.html'
    }
  
    document.getElementById('signout').addEventListener('click', signouts)
  });