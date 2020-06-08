
"use strict";

// IIFE - Immediate-Invoked Function Expression - Module Pattern
(function() {
    
    function getStudents() {
        fetch("http://localhost:8080/eRegistrarWebApi/api/student/list")
            .then((response) => {
                if(response.ok) {
                    return response.json();
                } else {
                    console.log({status: response.status, statusText: response.statusText});
                    return Promise.reject({status: response.status, statusText: response.statusText});
                }
            })
            .then(students => {
                let content = "";
                students.forEach((student, i) => {
                    if(student.transcript!= null) {
                        content += `
                            <tr>
                                <th scope="row">${i+1}.</th>
                                <td>${student.firstName}</td>
                                <td>
                                    <div>
                                        <span>${student.transcript.degreeTitle}</span><br>
                                    </div>
                                </td>
                        `;
                    } else {
                        content += `
                        <tr>
                            <th scope="row">${i+1}.</th>
                            <td>${student.firstName}</td>
                            <td></td>
                    `;
                    }
                });
                document.querySelector("#tbodyStudentList").innerHTML = content;
            })
            .catch(err => {
                console.log(err);
                const errorMsg = "<tr><td align='center' colspan='3'><p style='color: red;'>We are sorry. The StudentMgmt WebAPI is unavailable. Please try again later</p></td></tr>";
                document.querySelector("#tbodyStudentList").innerHTML = errorMsg;
            })
    }
    getStudents();

})();