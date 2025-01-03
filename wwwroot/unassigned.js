document.addEventListener('DOMContentLoaded', () => {
    const roless = sessionStorage.getItem('roles');
    const locationss = sessionStorage.getItem('locations');
    const locationIdss = sessionStorage.getItem('locationIds');
    const usernamess = sessionStorage.getItem('usernames');
    //const agents = JSON.parse(sessionStorage.getItem('userids')) || [];
    const agents = [
        { userid: '101', username: 'hercules.odoko@gtpensionmanagers.com' },//Test Account
        { userid: '402', username: 'victoria.ijeoma@gtpensionmanagers.com' },//Test Account
        { userid: '403', username: 'taiwo.owolabi@gtpensionmanagers.com' },//Test Account
        { userid: '527', username: 'chisom.anyaegbu@gtpensionmanagers.com' },
        { userid: '528', username: 'ireoluwa.abayomi@gtpensionmanagers.com' },
        { userid: '529', username: 'haruna.ahmodu@gtpensionmanagers.com' },
        { userid: '602', username: 'matthew.thomas@gtpensionmanagers.com' },
        { userid: '601', username: 'daniel.david@gtpensionmanagers.com' },
        { userid: '490', username: 'oluwakanyinsola.joseph@gtpensionmanagers.com' },
        { userid: '492', username: 'oluwaseyi.awopetu@gtpensionmanagers.com' },
        { userid: '497', username: 'oseremen.alika@gtpensionmanagers.com' },
        { userid: '430', username: 'Deborah.Omolade@gtpensionmanagers.com' },
        { userid: '485', username: 'Gabriel.Ezenwata@gtpensionmanagers.com' },
        { userid: '433', username: 'deborah.akinyemi@gtpensionmanagers.com' },
        { userid: '436', username: 'Olatokun.Abraham@gtpensionmanagers.com' },
        { userid: '494', username: 'chioma.okpara@gtpensionmanagers.com' },
        { userid: '496', username: 'oluwatumininu.adebajo@gtpensionmanagers.com' },
        { userid: '278', username: 'immaculate.ukanwoke@gtpensionmanagers.com' },
        { userid: '242', username: 'esther.sunday@gtpensionmanagers.com' },
        { userid: '463', username: 'oluwatosin.ero-phillips@gtpensionmanagers.com' },
        { userid: '533', username: 'samson.abah@gtpensionmanagers.com' },
        { userid: '617', username: 'abdulmutallab.tukur@gtpensionmanagers.com' },
        { userid: '440', username: 'anuoluwapo.oluwagbemiro@gtpensionmanagers.com' },
        { userid: '441', username: 'Iriagbonse.Eweka@gtpensionmanagers.com' }

    ];
    if (!roless || !usernamess || !locationIdss) {
        alert('User not authenticated or location data missing.');
        window.location.href = 'login.html';
        return;
    }

    document.querySelector('#username').textContent = usernamess;
    document.querySelector('#location').textContent = locationss;

    //async function FetchCustomers() {
    //    try {
    //        const response = await fetch(`/accountmanager/api/Customer/${locationIdss}/Unassigned`);
    //        if (!response.ok) {
    //            throw new Error(`HTTP error! status: ${response.status}`);
    //        }
    //        const data = await response.json();
    //        console.log('Fetched Data', data);
    //        return data;
    //    } catch (error) {
    //        console.error('Failed to fetch customers:', error);
    //        return [];
    //    }
    //};
    async function FetchCustomers(pageNumber = 1, pageSize = 10) {
        try {
            const response = await fetch(`/accountmanager/api/Customer/${locationIdss}/Unassigned?pageNumber=${pageNumber}&pageSize=${pageSize}`);
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
    }

    //function renderAssigned(data) {
    //    const result = document.getElementById('UnassignedTable')
    //    const agentOptions = agents.map(agent => `<option value="${agent.userid}">${agent.username}</option>`).join('');
    //    result.innerHTML = data.map((assigned, index) => {
    //        return `
    //    <tr key=${index}>
    //    <td><input type="checkbox" class="tickCheckbox" data-id="${assigned.customerId}"></td>
    //        <td>${index + 1}</td>
    //        <td>${assigned.rsapin}</td>
    //        <td>${assigned.surname}</td>
    //        <td>${assigned.firstname}</td>
    //        <td>${assigned.othername}</td>
    //        <td>${assigned.locationName}</td>
    //        <td>${assigned.email}</td>
    //        <td>${assigned.mobileNumber}</td>
    //        <td>${assigned.aum}</td>

    //        <td><select class="selectAgent"><option value="">Select Agent</option>${agentOptions}</select></td>
    //    </tr>
    //    `;
    //    }).join('');

    //    const table = document.getElementById("UnassignedTable");
    //    const totalRows = table.rows.length;
    //    // const dataRows = totalRows - 1;

    //    document.getElementById("rowCount").innerText = `Unassigned customers are ${totalRows}`;
    //}
    function renderAssigned(data) {
		
		
        const result = document.getElementById('UnassignedTable');
		if(!result){
			console.error("Element with ID 'UnassignedTable' not found");
			return;
		}
        const agentOptions = agents.map(agent => `<option value="${agent.userid}">${agent.username}</option>`).join('');

        // Display pagination metadata
        document.getElementById('pagination-metadata').innerHTML = `Page ${data.pageNumber} of ${data.totalPages} (${data.totalRecords} records)`;

        result.innerHTML = data.data.map((assigned, index) => {
            return `
      <tr key=${index}>
        <td><input type="checkbox" class="tickCheckbox" data-id="${assigned.customerId}"></td>
        <td>${index + 1}</td>
        <td>${assigned.rsapin}</td>
        <td>${assigned.surname}</td>
        <td>${assigned.firstname}</td>
        <td>${assigned.othername}</td>
        <td>${assigned.locationName}</td>
        <td>${assigned.email}</td>
        <td>${assigned.mobileNumber}</td>
        <td>${assigned.aum}</td>
        <td><select class="selectAgent"><option value="">Select Agent</option>${agentOptions}</select></td>
      </tr>
    `;
        }).join('');

        // Add pagination controls
        const paginationControls = document.getElementById('pagination-controls');
        paginationControls.innerHTML = `
    <button id="previous-button" ${data.pageNumber === 1 ? 'disabled' : ''}>Previous</button>
    <button id="next-button" ${data.pageNumber === data.totalPages ? 'disabled' : ''}>Next</button>
  `;

        document.getElementById('previous-button').addEventListener('click', () => {
            FetchCustomers(data.pageNumber - 1, data.pageSize).then(renderAssigned);
        });

        document.getElementById('next-button').addEventListener('click', () => {
            FetchCustomers(data.pageNumber + 1, data.pageSize).then(renderAssigned);
        });
    }

    async function submitAssignments() {
        const assignments = [];
        console.log(assignments)
        const checkboxes = document.querySelectorAll('.tickCheckbox:checked');
        let allValid = true;

        checkboxes.forEach(checkbox => {
            const row = checkbox.closest('tr');
            const accountId = checkbox.getAttribute('data-id');
            const agentSelect = row.querySelector('.selectAgent');
            const agentId = agentSelect.value || agents;
            if (agentId) {
                // Here, we assume that you need to collect additional data for each selected account.
                assignments.push({ customerId: accountId, bdOfficerId: agentId, status: "Pending" });
            } else {
                allValid = false; // If any checkbox has no agent selected
                agentSelect.style.borderColor = 'red'; // Highlight missing selections
            }
        });

        if (!allValid) {
            alert('Please select an agent for all checked accounts.');
            return;
        }
        if (assignments.length === 0) {
            alert('No valid assignments Request');
            return;
        }

        try {
            const response = await fetch('/accountmanager/api/AssignmentRequest/batch', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(assignments)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            alert('Assignment request submitted successfully!');
            await initAssigned(); // Refresh unassigned table

        } catch (error) {
            console.error('Failed to submit assignment request:', error);
            return [];
        }

    }

    document.getElementById('submit-all').addEventListener('click', submitAssignments);

    //async function initAssigned() {
    //    const assignedCustomer = await FetchCustomers();
    //    renderAssigned(assignedCustomer);
    //}
    async function initAssigned() {
        const assignedCustomer = await FetchCustomers();
        renderAssigned(assignedCustomer);
    }

    function searchFunction() {
        const input = document.getElementById('searchWord');
        const filter = input.value.toLowerCase();
        const table = document.getElementById('UnassignedTable');
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

    window.addEventListener('load', initAssigned);

    function signouts() {
        sessionStorage.clear();
        document.cookie.split(';').forEach(function (c) {
            document.cookie = c.trim().replace(/=.*$/, '=;expires=Thu, 01 Jan 1970 12:15:60 GMT');
        });
        window.location.href = 'login.html'
    }

    document.getElementById('signout').addEventListener('click', signouts)
});