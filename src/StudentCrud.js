// import axios from "axios";
// import { useEffect, useState } from "react";
// import './StudentCrud.css';
// function StudentCrud() {
//   const [id, setId] = useState("");
//   const [stname, setName] = useState("");
//   const [course, setCourse] = useState("");
//   const [students, setUsers] = useState([]);

//   useEffect(() => {
//     (async () => await Load())();
//   }, []);

//   async function Load() {

//     const result = await axios.get("http://localhost:5000/api/Student/GetStudent");
//     setUsers(result.data);
//     console.log(result.data);
//   }

//   async function save(event) {

//     event.preventDefault();
//     try {
//       await axios.post("http://localhost:5000/api/Student/AddStudent", {

//         stname: stname,
//         course: course,

//       });
//       alert("Student Added Successfully");
//       setId("");
//       setName("");
//       setCourse("");


//       Load();
//     } catch (err) {
//       alert(err);
//     }
//   }
//   async function editStudent(students) {
//     setName(students.stname);
//     setCourse(students.course);


//     setId(students.id);
//   }

//   async function DeleteStudent(id) {
//     await axios.delete("http://localhost:5000/api/Student/DeleteStudent/" + id);
//     alert("Student deleted Successfully");
//     setId("");
//     setName("");
//     setCourse("");
//     Load();
//   }

//   async function update(event) {
//     event.preventDefault();
//     try {
//       await axios.patch("http://localhost:5000/api/Student/UpdateStudent/" + students.find((u) => u.id === id).id || id,
//         {
//           id: id,
//           stname: stname,
//           course: course,
//         }
//       );
//       alert("Student Updated Successfully");
//       setId("");
//       setName("");
//       setCourse("");

//       Load();
//     } catch (err) {
//       alert(err);
//     }
//   }
//   return (
//     <div className="">
//       <h1 className="text-center text-secondary">Student Information </h1>
//       <button className="btn btn-primary mt-4 mr-4" onClick={save}>
//               Add Student
//             </button>
//       <div className="borderbox container mt-4">
//           <h3 className="text-primary mb-4">Add Student</h3>
//         <form>
//           <div className="form-group">
//             <input
//               type="text"
//               className="form-control"
//               id="id"
//               hidden
//               value={id}
//               onChange={(event) => {
//                 setId(event.target.value);
//               }}
//             />
//             <label>Student Name</label>
//             <input
//               type="text"
//               className="form-control"
//               id="stname"
//               value={stname}
//               onChange={(event) => {
//                 setName(event.target.value);
//               }}
//             />
//           </div>
//           <div className="form-group">
//             <label>Course</label>
//             <input
//               type="text"
//               className="form-control"
//               id="course"
//               value={course}
//               onChange={(event) => {
//                 setCourse(event.target.value);
//               }}
//             />
//           </div>
//           <div className="d-flex justify-content-between">
//             <button className="btn btn-primary mt-4 mr-4" onClick={save}>
//               Add Student
//             </button>
//             <button className="btn btn-info mt-4 mr-4" onClick={update}>
//               Update Student
//             </button>
//           </div>
//         </form>
//       </div>
//       <br></br>
//       <table className="table table-striped table-bordered table-hover">
//         <thead className="thead-primary">
//           <tr>
//             <th scope="col">Student Id</th>
//             <th scope="col">Student Name</th>
//             <th scope="col">Course</th>
//             <th scope="col">Options</th>
//           </tr>
//         </thead>
//         <tbody>
//           {students.map(function fn(student) {
//             return (
//               <tr key={student.id}>
//                 <td>{student.id}</td>
//                 <td>{student.stname}</td>
//                 <td>{student.course}</td>
//                 <td>
//                   <div className="btn-group" role="group">
//                     <button
//                       type="button"
//                       className="btn btn-info btn-sm mr-4"
//                       onClick={() => editStudent(student)}
//                     >
//                       Edit
//                     </button>
//                     <button
//                       type="button"
//                       className="btn btn-danger btn-sm"
//                       onClick={() => DeleteStudent(student.id)}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default StudentCrud;
import React, { useState, useEffect } from "react";
import axios from "axios";
import './StudentCrud.css';

function StudentCrud() {
  const [id, setId] = useState("");
  const [stname, setName] = useState("");
  const [course, setCourse] = useState("");
  const [students, setStudents] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    Load();
  }, []);

  async function Load() {
    try {
      const result = await axios.get("http://localhost:5000/api/Student/GetStudent");
      setStudents(result.data);
    } catch (error) {
      console.error("Error loading students:", error);
    }
  }

  async function save(event) {
    event.preventDefault();
    try {
      debugger;
      if (id) {
        await axios.patch(`http://localhost:5000/api/Student/UpdateStudent/${id}`, {
          id: id,
          stname: stname,
          course: course,
        });
        alert("Student Details Updated Successful");
      } else {
        await axios.post("http://localhost:5000/api/Student/AddStudent", {
          stname: stname,
          course: course,
        });
        alert("Student Details Added Successful");
      }
      setName("");
      setCourse("");
      setId("");
      Load();
      setShowAddForm(false);
    } catch (error) {
      alert("Error saving student: " + error.message);
    }
  }

  async function editStudent(student) {
    setId(student.id);
    setName(student.stname);
    setCourse(student.course);
    setShowAddForm(true);
  }

  async function DeleteStudent(id) {
    try {
      await axios.delete(`http://localhost:5000/api/Student/DeleteStudent/${id}`);
      alert("Student deleted Successfully");
      Load();
    } catch (error) {
      alert("Error deleting student: " + error.message);
    }
  }

  const handleCancel = () => {
    setShowAddForm(false);
    setId("");
    setName("");
    setCourse("");
  };

  return (
    <div className="">
      <h3 className="text-center text-rimary">STUDENT INFORMATION</h3>
      {!showAddForm && (
        <button className="btn btn-primary mb-2 mr-4" onClick={() => setShowAddForm(true)}>
          Add Student
        </button>
      )}
      {showAddForm && (
        <div className="borderbox container mt-4">
          <h3 className="text-primary mb-4">Add Student</h3>
          <form>
            <div className="form-group">
              <label>Student Name</label>
              <input
                type="text"
                className="form-control"
                value={stname}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Course</label>
              <input
                type="text"
                className="form-control"
                value={course}
                onChange={(event) => setCourse(event.target.value)}
              />
            </div>
            <div className="d-flex justify-content-between">
              <button className="btn btn-primary mt-4 mr-4" onClick={save}>
                {id ? "Update Student" : "Add Student"}
              </button>
              <button className="btn btn-danger mt-4 mr-4" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      <br />
      <table className="table table-striped table-bordered table-hover table-sm">
        <thead className="table-dark">
          <tr>
            <th scope="col">Student Id</th>
            <th scope="col">Student Name</th>
            <th scope="col">Course</th>
            <th scope="col">Options</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.stname}</td>
              <td>{student.course}</td>
              <td>
                <div className="btn-group" role="group">
                  <button
                    type="button"
                    className="btn btn-info btn-sm mr-4"
                    onClick={() => editStudent(student)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => DeleteStudent(student.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentCrud;
