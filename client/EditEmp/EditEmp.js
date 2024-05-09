document.addEventListener("DOMContentLoaded", async function() {
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get('id');

  try {
    const response = await fetch(`http://localhost:8002/users/user/${userId}`);
    const data = await response.json();
    const userData = data.data;

    document.querySelector('.name').value = userData.name;
    document.querySelector('.email').value = userData.email;
    document.querySelector('.mobileno').value = userData.mobileno;
    document.querySelector('.designation').value = userData.designation;
    document.querySelector(`.gender[value="${userData.gender}"]`).checked = true;
    userData.course.forEach(course => {
      document.querySelector(`.course[value="${course}"]`).checked = true;
    });
    document.querySelector('.profile-image').src = `http://localhost:8002/uploads/${userData.image}`;

    const editForm = document.getElementById('editform');
    editForm.addEventListener('submit', async function(event) {
      event.preventDefault();
  
      const formData = {
        name: document.querySelector('.name').value,
        email: document.querySelector('.email').value,
        mobileno: document.querySelector('.mobileno').value,
        designation: document.querySelector('.designation').value,
        gender: document.querySelector('input[name="gender"]:checked').value,
        course: Array.from(document.querySelectorAll('input[name="course"]:checked')).map(checkbox => checkbox.value),
        image:document.querySelector('input[type="file"]').files[0]
      };

      try {
          const response = await fetch(`http://localhost:8002/users/userupdate/${userId}`, {
              method: 'PUT',
              body: JSON.stringify(formData),
              headers: {
                'Content-Type': 'application/json' 
              }
          });
          
          const updatedData = await response.json();
         alert("Updated Sucessfully")
      } catch (error) {
          console.error('Error updating user data:', error);
      }
    });
  
  } catch(err) {
    console.log(err);
  }
});
