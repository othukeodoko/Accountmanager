document.addEventListener('DOMContentLoaded', () => {
    const roless = sessionStorage.getItem('roles');
    const locationss = sessionStorage.getItem('locations');
    const locationIdss = sessionStorage.getItem('locationIds');
    const usernamess = sessionStorage.getItem('usernames');
    // const locationsss = sessionStorage.getItem('userids');
  
  
    if (!roless || !usernamess || !locationIdss) {
      alert('User not authenticated or location data missing.');
      window.location.href = 'login.html';
      return;
    }
  
    document.querySelector('#username').textContent = usernamess;
    document.querySelector('#location').textContent = locationss;
  
    async function FetchCustomers() {
      try {
          const response = await fetch(`/accountmanager/api/Customer`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const customerdata = await response.json();
        console.log('Fetched Data', customerdata);
        return customerdata;
      } catch (error) {
        console.error('Failed to fetch customers:', error);
        return [];
      }
    };
  
    function renderCustomers(customerdata) {
      const result = document.getElementById('customersTable')
  
      result.innerHTML = customerdata.map((cust, index) => {
        return ` 
          <tr key=${index}>
              <td>${index + 1}</td>
              <td>${cust.rsapin}</td>
              <td>${cust.surname}</td>
              <td>${cust.firstname}</td>
              <td>${cust.othername}</td>
              <td>${cust.locationName}</td>
              <td>${cust.email}</td> 
              <td>${cust.mobilenumber}</td>             
              <td>${cust.aum}</td>
              <td>${cust.bdofficername}</td>
          </tr>
          `;
      }).join('');
    }  

    function populateFilters(Customerlocation, Customersmanager) {
      const locationFilter = document.getElementById('locationFilter');
      locationFilter.innerHTML = '<option value="">Location</option>';
      Customerlocation.forEach(location => {
          const option = document.createElement('option');
          option.value = location;
          option.textContent = location;
          locationFilter.appendChild(option);
      });
  
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
        const matchesLocation = filters.location === '' || item.locationName === filters.location;
        const matchesBdOfficer = filters.bdOfficer === '' || item.bdofficername === filters.bdOfficer;
        return matchesLocation && matchesBdOfficer;
    });
}
  
    async function initCustomer() {
      const Customers = await FetchCustomers();
      const allLocations = [...new Set(Customers.map(item => item.locationName))];
      const allManagers = [...new Set(Customers.map(item => item.bdofficername))];
      populateFilters(allLocations, allManagers);
      renderCustomers(Customers);
  
      document.getElementById('locationFilter').addEventListener('change', () => applyFilters(Customers));
      document.getElementById('bdOfficerFilter').addEventListener('change', () => applyFilters(Customers));
  
        function applyFilters(data) {
          const filters = {
              location: document.getElementById('locationFilter').value,
              bdOfficer: document.getElementById('bdOfficerFilter').value
            };
            const filteredData = filterData(data, filters);
            renderCustomers(filteredData);
          }

    }
    window.addEventListener('load', initCustomer);
  
    function signouts() {
      sessionStorage.clear();
      document.cookie.split(';').forEach(function (c) {
        document.cookie = c.trim().replace(/=.*$/, '=;expires=Thu, 01 Jan 1970 12:15:60 GMT');
      });
      window.location.href = 'login.html'
    }
  
    document.getElementById('signout').addEventListener('click', signouts)
  });