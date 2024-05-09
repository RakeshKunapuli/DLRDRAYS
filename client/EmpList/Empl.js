document.addEventListener("DOMContentLoaded", function() {
    var createEmpBtn = document.querySelector(".createEmpBtn");
    createEmpBtn.addEventListener("click", function() {
      window.location.href = "../CreateEmp/createEmp.html";
    });
  
    var tbody = document.getElementById("tbody");
    const searchInput = document.querySelector('.serchInp');
    searchInput.addEventListener('input', filterTable);
  
    async function fetchData() {
      try {
        var response = await fetch("http://localhost:8002/users/all-users");
        var data = await response.json();
        var userData = await data.data;
        tbody.innerHTML = "";
        userData.forEach((user, i) => {
          var row = `<tr>
            <td>${i + 1}</td>
            <td><img class="profileimg" src="http://localhost:8002/uploads/${user.image}" alt="user profile"></td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.mobileno}</td>
            <td>${user.designation}</td>
            <td>${user.gender}</td>
            <td>${user.course.join(', ')}</td>
            <td>${new Date(user.createdAt).toLocaleDateString()}</td>
            <td>
              <button class="editBtn" data-id="${user._id}">Edit</button>
              <button class="deleteBtn" data-id="${user._id}">Delete</button>
            </td>
          </tr>`;
          tbody.innerHTML += row;
        });
      } catch (err) {
        console.error(err);
      }
    }
  
    tbody.addEventListener("click", function(event) {
      var target = event.target;
      if (target.classList.contains("deleteBtn")) {
        var userId = target.dataset.id;
        deleteUser(userId);
      } else if (target.classList.contains("editBtn")) {
        var userId = target.dataset.id;
        editUser(userId);
      }
    });
  
    async function deleteUser(id) {
      try {
        var response = await fetch(`http://localhost:8002/users/userdelete/${id}`, {
          method: "DELETE"
        });
        if (response.ok) {
          fetchData();
        } else {
          console.log("Failed to delete user. Status:", response.status);
        }
      } catch (err) {
        console.log("Internal server error", err);
      }
    }
  
    function editUser(id) {
      window.location.href = `../EditEmp/EditEmp.html?id=${id}`;
    }
  
    function filterTable() {
      const searchTerm = searchInput.value.toLowerCase();
      const tableRows = document.querySelectorAll('#tbody tr');
  
      tableRows.forEach(row => {
        const name = row.querySelector('td:nth-child(3)').textContent.toLowerCase();
  
        if (name.includes(searchTerm)) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    }
  
    fetchData();
    filterTable(); // Call filterTable initially
  });