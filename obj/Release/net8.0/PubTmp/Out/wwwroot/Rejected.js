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
        const response = await fetch(`/accountmanager/api/AssignmentRequest/rejected`);
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
    let rowCounter = 0;

    results.innerHTML = RejectedData.map((rejected, index) => {

      const formattedComments = Array.isArray(rejected.commentDetails)
        ? rejected.commentDetails.map(comment => `${comment.commentDetails}`).join('<br>')
        : 'No comments yet';
      const CommentsTime = Array.isArray(rejected.commentDetails)
        ? rejected.commentDetails.map(Time => `${new Date(Time.commentDate).toLocaleDateString()}`).join('<br>')
        : 'No comments yet';
      if (rejected.location === locationss && rejected.status === "Rejected") {
        rowCounter++;
        return ` 
        <tr>
            <td>${rowCounter}</td>
            <td>${rejected.lastname}</td>
            <td>${rejected.firstname}</td>           
            <td>${rejected.status}</td>
            <td>${rejected.bdOfficerName}</td>
            <td>${formattedComments}</td>
            <td>${CommentsTime}</td>
        </tr>
        `;
      } else { return ''; }

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

  function searchFunction() {
    const input = document.getElementById('searchWord');
    const filter = input.value.toLowerCase();
    const table = document.getElementById('RejectedTable');
    const rows = table.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
      const cells = rows[i].getElementsByTagName('td');
      let match = false;

      for (let j = 0; j < cells.length; j++) {
        if (cells[j]) {
          const cellText = cells[j].textContent || cells[j].innerText;
          if (cellText.toLowerCase().indexOf(filter) > -1) {
            match = true;
            break;
          }
        }
      }
      rows[i].style.display = match ? '' : 'none';
    }
  }
  document.getElementById('searchWord').addEventListener('keyup', searchFunction);

  // function exportToExcel(filename = ''){
  //   console.log('Export excel data', tableData);
  //   var downloadlink;
  //   var tableData = 'application/vnd.ms-excel';
  //   var tableSelect = document.getElementById('customertable');
  //   var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');

  //   filename = filename?filename+'.xls':'excel_data.xls';
  //   downloadlink= document.createElement('a');

  //   document.body.appendChild(downloadlink);
  
  //   if(navigator.msSaveOrOpenBlob){
  //     var blob = new Blob(['\ufeff', tableHTML], {type: tableData});
  //     navigator.msSaveOrOpenBlob( blob, filename);
  // }else{
  //     // Create a link to the file
  //     downloadlink.href = 'data:' + tableData + ', '+ tableHTML;
  
  //     // Setting the file name
  //     downloadlink.download = filename;
      
  //     //triggering the function
  //     downloadlink.click();
  // }
  // }
  // document.getElementById('exportbtn').addEventListener('click', () => {
  //   exportToExcel('ExportedData');
  // });

  document.getElementById('exportbtn').addEventListener('click', () => {
      exportToExcel('ExportedData');
    });
  function exportToExcel(){
    const table=document.getElementById('customertable');
    const rows=Array.from(table.rows);

    const csvContent = rows.map(row => {
      const cells = Array.from(row.cells);
      return cells.map(cell => `"${cell.textContent}"`).join(',');
    }).join('\n');

    const blob=new Blob([csvContent],{type: 'text/csv'});
    const url = URL.createObjectURL(blob);

    const a=document.createElement('a');
    a.href = url;
    a.download = 'Rejected.csv';
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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