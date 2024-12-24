document.addEventListener('DOMContentLoaded', () => {
    const roless = sessionStorage.getItem('roles');
    const locationss = sessionStorage.getItem('locations');
    const locationIdss = sessionStorage.getItem('locationIds');
    const usernamess = sessionStorage.getItem('usernames');
    const agents = JSON.parse(sessionStorage.getItem('userids')) || [];
    //if (userids) {
    //    try {
    //        const agents = JSON.parse(userids);
    //        console.log('Parsed agents:', agents);
    //    } catch (error) {
    //        console.error('Error parsing userids:', error);
    //    }
    //} else {
    //    console.log('No userids value found in session storage.');
    //}
    //const agents = [
    //    { userid: '401', username: 'hercules.odoko@gtpensionmanagers.com' },
    //    { userid: '402', username: 'victoria.ijeoma@gtpensionmanagers.com' },
    //    { userid: '403', username: 'taiwo.owolabi@gtpensionmanagers.com' }
    //];
    //sessionStorage.setItem('userids', JSON.stringify(simulatedAgents));

    if (!roless || !usernamess || !locationIdss) {
        alert('User not authenticated or location data missing.');
        window.location.href = 'login.html';
        return;
    }

    document.querySelector('#username').textContent = usernamess;
    document.querySelector('#location').textContent = locationss;

    async function FetchCustomers() {
        try {
            const response = await fetch(`/api/Customer/${locationIdss}/Unassigned`);
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
        const result = document.getElementById('UnassignedTable')
        const agentOptions = agents.map(agent => `<option value="${agent.userid}">${agent.username}</option>`).join('');
        result.innerHTML = data.map((assigned, index) => {
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
    }

    async function submitAssignments() {
        const assignments = [];
        console.log(assignments)
        const checkboxes = document.querySelectorAll('.tickCheckbox:checked');
        let allValid = true;

        checkboxes.forEach(checkbox=> {
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
            const response = await fetch('/api/AssignmentRequest/batch', {
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

    async function initAssigned() {
        const assignedCustomer = await FetchCustomers();
        renderAssigned(assignedCustomer);
    }

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