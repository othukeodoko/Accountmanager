document.addEventListener('DOMContentLoaded', () => {
    const roless = sessionStorage.getItem('roles');
    const locationss = sessionStorage.getItem('locations');
    const locationIdss = sessionStorage.getItem('locationIds');
    const usernamess = sessionStorage.getItem('usernames');
    const locationsss = sessionStorage.getItem('userids');
  
  
    if (!roless || !usernamess || !locationIdss) {
      alert('User not authenticated or location data missing.');
      window.location.href = 'login.html';
      return;
    }
  
    document.querySelector('#username').textContent = usernamess;
    document.querySelector('#location').textContent = locationss;
  
    async function FetchAgentCustomer() {
      try {
          const response = await fetch(`/accountmanager/api/Customer/${locationsss}/ByAgent`);
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
      const result = document.getElementById('bdofficertable')
  
      result.innerHTML = data.map((employee, index) => {
        return ` 
          <tr key=${index}>
              <td>${index + 1}</td>
              <td>${employee.rsapin}</td>
              <td>${employee.surname}</td>
              <td>${employee.firstname}</td>
              <td>${employee.othername}</td>
              <td>${employee.locationName}</td>
              <td>${employee.email}</td> 
              <td>${employee.mobileNumber}</td>             
              <td>
                <input type="text" class="comment-input" data-id="${employee.customerId}" placeholder="Enter comment">
                <button class="submit-btn" data-id="${employee.customerId}">Submit</button>
                <a href="#" class="View-comments-link" data-id="${employee.customerId}">View Comments</a>
            </td>
            <td class="timestamp">${employee.commentTimestamp ? new Date(employee.commentTimestamp).toLocaleString() : 'No comment yet'}</td>
          </tr>
          `;
      }).join('');
    }
  
    async function initagentcustomer() {
      const agentCustomer = await FetchAgentCustomer();
      renderAssigned(agentCustomer);
    }
    window.addEventListener('load', initagentcustomer);
  
    function signouts() {
      sessionStorage.clear();
      document.cookie.split(';').forEach(function (c) {
        document.cookie = c.trim().replace(/=.*$/, '=;expires=Thu, 01 Jan 1970 12:15:60 GMT');
      });
      window.location.href = 'login.html'
    }
  
    document.getElementById('signout').addEventListener('click', signouts)
  });