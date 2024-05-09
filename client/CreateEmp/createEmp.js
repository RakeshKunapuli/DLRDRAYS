document.addEventListener('DOMContentLoaded', function() {
    var employeeForm = document.getElementById('employeeForm'); 
    employeeForm.addEventListener('submit', async function(event) {
        event.preventDefault();  
        var name = document.querySelector('.name').value;
        var email = document.querySelector('.email').value;
        var mobileno = document.querySelector('.mobileno').value;
        var designation = document.querySelector('.designation').value;
        var gender = document.querySelector('.gender:checked').value;
        var course = [];
        var checkedCourses = document.querySelectorAll('.course:checked');
        checkedCourses.forEach(function(checkbox) {
            course.push(checkbox.value);
        });
        var image = document.querySelector('.image').files[0];

        var formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('mobileno', mobileno);
        formData.append('designation', designation);
        formData.append('gender', gender);
        course.forEach(function(courseValue) {
            formData.append('course', courseValue);
        });
        if (image) {
            formData.append('image', image)
        }

        try {
            const response = await fetch("http://localhost:8002/users/submit-form", {
                method: "POST",
                body: formData
            });
            if (!response.ok) {
                throw new Error('Failed to submit form');
            }
        }catch(err) {
            console.log("error",err);
        }
    });
});
