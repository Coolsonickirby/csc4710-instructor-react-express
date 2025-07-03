
import React, {useEffect, useState} from 'react'    // Imports the React library
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';


function App() {
    const [data, setData] = useState([])            //  Initializes a state variable called data and a function setData to update this state.
    
    const [createStudentModalText, setCreateStudentModalText] = useState("");
    const [createStudentID, setCreateStudentID] = useState(-1);
    const [createStudentName, setCreateStudentName] = useState("");
    const [createStudentBirthday, setCreateStudentBirthday] = useState("");
    const [createStudentGPA, setCreateStudentGPA] = useState(-1);
    const [isCreatingStudent, setIsCreatingStudent] = useState(false);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const editStudent = (idx) => {
        let student = data[idx];
        setCreateStudentID(student["id"]);
        setCreateStudentName(student["name"]);
        setCreateStudentBirthday(student["birthday"].substr(0, 'XXXX-XX-XX'.length)); // Trimming this string to remove the extra metadata added by the database
        setCreateStudentGPA(student["gpa"]);
        setCreateStudentModalText(`Edit ${student["id"]} - ${student["name"]}`);
        handleShow();
    }
    const deleteStudent = (idx) => {
        let student = data[idx];
        if(window.confirm(`Are you sure you want to delete ${student["name"]} (${student["id"]})?`)) {
            if(window.confirm(`Are you really sure you want to delete ${student["name"]} (${student["id"]})?`)) {
                if(window.confirm(`Are you REALLY REALLY sure you want to delete ${student["name"]} (${student["id"]})? (THIS IS YOUR LAST CHANCE. ONCE YOU DELETE THEM, THEY'RE GONE FOREVER.)`)) {
                    let url = `http://localhost:8081/student/${student["id"]}`;
                    fetch(url, {
                        method: "DELETE",
                    })
                    .then(data => {
                        console.log(data);
                        loadStudents();
                    })
                    .catch(err => {
                        console.log(err);
                    });
                }
            }
        }

    }

    const createStudent = () => {
        if(isCreatingStudent){
            return;
        }
        setIsCreatingStudent(true);
        
        if(createStudentName == "" || createStudentBirthday == "" || createStudentGPA <= -0.01 || createStudentGPA > 4){
            setIsCreatingStudent(false);
            return;
        }

        let url = createStudentID == -1 ? 'http://localhost:8081/student' : `http://localhost:8081/student/${createStudentID}`;
        let method = createStudentID == -1 ? "POST" : "PUT";
        fetch(url, {
            method: method,
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "name": createStudentName,
                "birthday": createStudentBirthday,
                "gpa" : createStudentGPA
            })
        })
        .then(response => response.json())
        .then(data => {
            setIsCreatingStudent(false);
            if(data["status"]){
                console.log(data);
                handleClose();
                loadStudents();
            } else {
                console.log(data);
                console.error("Failed to create student!");
            }
        })
        .catch(err => {
            setIsCreatingStudent(false);
            console.log(err);
        });
    };

    const loadStudents = () => {
                                       // define the userEffect hook, useEffect(() => { ... }, [])
           fetch('http://localhost:8081/listall')       // call backend route
           .then(response => response.json())           // Converts the response from the fetch request into JSON format.
           .then(data => {                              // Updates the state variable data with the fetched data using the setData function.
                if(data["status"]){
                    setData(data["data"]);
                } else {
                    console.log(data);
                    console.error("Failed to load students!");
                }
           })                 
           .catch(err => console.log(err));             // logs the error msg to the console.
    }

    useEffect(() => {
        loadStudents();
    }, [])                                          // The empty dependency array [] means it only runs once when the component is first rendered.
                                                    // to be rendered in the UI

return(
    <div>

        <div style={{width: '100%', display: 'grid', alignItems: 'center', justifyContent: 'center', margin: '20px 0'}}>
            <Button variant="primary" onClick={() => {
                setCreateStudentModalText("Create Student");
                setCreateStudentID(-1);
                setCreateStudentName("");
                setCreateStudentBirthday("");
                setCreateStudentGPA(-1);
                handleShow();
            }}>
                Create Student
            </Button>
        </div>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>{createStudentModalText}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <table className="styled-table">
                    <tbody>
                        <tr>
                            <td>Student Name</td>
                            <td>
                                <Form.Control type='text' placeholder='Student Name'
                                value={createStudentName}
                                onChange={(event) => {
                                    console.log(event.target.value);
                                    setCreateStudentName(event.target.value);
                                }} onInput={(event) => {
                                    console.log(event.target.value);
                                    setCreateStudentName(event.target.value);
                                }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Birthday</td>
                            <td><Form.Control type='date' placeholder='Birthday'
                                value={createStudentBirthday}
                                onChange={(event) => {
                                    console.log(event.target.value);
                                    setCreateStudentBirthday(event.target.value);
                                }} onInput={(event) => {
                                    console.log(event.target.value);
                                    setCreateStudentBirthday(event.target.value);
                                }}
                            /></td>
                        </tr>
                        <tr>
                            <td>GPA</td>
                            <td><Form.Control type='number' min={0.1} placeholder='GPA'
                                value={createStudentGPA == -1 ? '' : createStudentGPA}
                                onChange={(event) => {
                                    console.log(event.target.value);
                                    setCreateStudentGPA(event.target.value);
                                }} onInput={(event) => {
                                    console.log(event.target.value);
                                    setCreateStudentGPA(event.target.value);
                                }}
                            /></td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <div className="d-grid gap-2">
                                    <Button variant='success' size="lg" onClick={createStudent}>
                                        {createStudentModalText}
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Modal.Body>
        </Modal>


       <table className="styled-table">
       <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>birthday</th>
            <th>gpa</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
       </thead>
       <tbody>
             {data.map((d, i) => (                 // Maps over the data array to create a table row (<tr>) for each item d in data. The index i is used as a unique key for each row.
                  <tr key={i}>
                    <td>{d.id}</td>
                    <td>{d.name}</td>
                    <td>{new Date(d.birthday).toLocaleDateString()}</td>
                    <td>{d.gpa}</td>
                    <td> <Button variant='warning' onClick={() => editStudent(i)}>Edit</Button> </td>
                    <td> <Button variant='danger' onClick={() => deleteStudent(i)}>Delete</Button> </td>
                  </tr>
             ))}
       </tbody>
       </table>
    </div>
)
}

export default App                               // so it can be imported in other files.
