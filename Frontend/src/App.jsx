
import React, {useEffect, useState} from 'react'    // Imports the React library
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';


function App() {
    const [data, setData] = useState([])            //  Initializes a state variable called data and a function setData to update this state.
    const [searchBookTitle, setSearchBookTitle] = useState("");
    const [isSearchMode, setIsSearchMode] = useState(false); // Search Mode to know whether to search or load all books after creating/updating

    // The following region (Modal Variables) are the variables used for creating and editing book entires
    //#region Modal Variables
    const [createBookModalText, setCreateBookModalText] = useState("");
    const [createBookID, setCreateBookID] = useState(-1); // When it's -1, a new book is created. When it's not, a book is getting edited
    const [createBookTitle, setCreateBookTitle] = useState("");
    const [createBookISBN, setCreateBookISBN] = useState("");
    const [createBookPrice, setCreateBookPrice] = useState(-1.0);
    const [createBookCurrentStock, setCreateBookCurrentStock] = useState(-1);
    const [createBookPublicationYear, setCreateBookPublicationYear] = useState(-1);
    const [isCreatingBook, setIsCreatingBook] = useState(false);
    //#endregion

    const [show, setShow] = useState(false); // Modal Visibility State
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const editBook = (idx) => {
        let book = data[idx];
        setCreateBookModalText(`Edit ${book["title"]} - ${book["isbn"]}`);
        setCreateBookID(book["id"]); // Set the book ID so the later functions know it's going to be updated instead of creating a new one
        
        // Set the rest of the variables so that the modal can be accurate to the book entry
        setCreateBookTitle(book["title"]);
        setCreateBookISBN(book["isbn"]);
        setCreateBookPrice(book["price"]);
        setCreateBookCurrentStock(book["current_stock"]);
        setCreateBookPublicationYear(book["publication_year"]);
        handleShow();
    }

    const deleteBook = (idx) => {
        let book = data[idx];
        // Confirm THREE (3) times since this isn't a reversible operation
        if(window.confirm(`Are you sure you want to delete ${book["title"]} - ${book["isbn"]} (${book["id"]})?`)) {
            if(window.confirm(`Are you really sure you want to delete ${book["title"]} - ${book["isbn"]} (${book["id"]})?`)) {
                if(window.confirm(`Are you REALLY REALLY sure you want to delete ${book["title"]} - ${book["isbn"]} (${book["id"]})? (THIS IS YOUR LAST CHANCE. ONCE YOU DELETE THEM, THEY'RE GONE FOREVER.)`)) {
                    let url = `http://localhost:8081/books/${book["id"]}`;
                    fetch(url, {
                        method: "DELETE",
                    })
                    .then(data => {
                        console.log(data);
                        loadBooks();
                    })
                    .catch(err => {
                        console.log(err);
                    });
                }
            }
        }

    }

    const searchBook = () => {
        // If the searchBookTitle field is empty, then we assume that the user wants to go back to listing all books
        if(searchBookTitle.trim() == ""){
            setIsSearchMode(false);
            loadBooks();
        } else {
            // Else, we search for the book
            setIsSearchMode(true);
            fetch(`http://localhost:8081/books/search/${searchBookTitle.trim()}`)       // call backend route
           .then(response => response.json())           // Converts the response from the fetch request into JSON format.
           .then(data => {                              // Updates the state variable data with the fetched data using the setData function.
                if(data["status"]){
                    setData(data["data"]);
                } else {
                    console.log(data);
                    console.error("Failed to load books!");
                }
           })                 
           .catch(err => console.log(err));             // logs the error msg to the console.
        }
    }

    const createBook = () => {
        if(isCreatingBook){
            return;
        }
        setIsCreatingBook(true);
        
        if(
            // Validate all fields before sending off to creating since NULLs aren't allowed in the database
            createBookTitle == "" ||
            createBookISBN == "" ||
            createBookPrice < 0.00 || createBookPrice > 300.00 ||
            createBookCurrentStock < 0 ||
            createBookPublicationYear < 0
        ) {
            setIsCreatingBook(false);
            return;
        }

        // If the createBookID is -1, we go to the books route in POST (for creation).
        // If it isn't -1, then we go to the books/:id route in PUT to update.
        let url = createBookID == -1 ? 'http://localhost:8081/books' : `http://localhost:8081/books/${createBookID}`;
        let method = createBookID == -1 ? "POST" : "PUT";
        fetch(url, {
            method: method,
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "title": createBookTitle,
                "isbn": createBookISBN,
                "price": createBookPrice,
                "current_stock": createBookCurrentStock,
                "publication_year": createBookPublicationYear,
            })
        })
        .then(response => response.json())
        .then(data => {
            setIsCreatingBook(false);
            if(data["status"]){
                console.log(data);
                handleClose();
                // If we're in search mode, load the new search results
                if(isSearchMode){
                    searchBook();
                } else {
                    // Else load all books
                    loadBooks();
                }
            } else {
                console.log(data);
                console.error("Failed to create book!");
            }
        })
        .catch(err => {
            setIsCreatingBook(false);
            console.log(err);
        });
    };

    const loadBooks = () => {
                                       // define the userEffect hook, useEffect(() => { ... }, [])
           fetch('http://localhost:8081/books')       // call backend route
           .then(response => response.json())           // Converts the response from the fetch request into JSON format.
           .then(data => {                              // Updates the state variable data with the fetched data using the setData function.
                if(data["status"]){
                    setData(data["data"]);
                } else {
                    console.log(data);
                    console.error("Failed to load books!");
                }
           })                 
           .catch(err => console.log(err));             // logs the error msg to the console.
    }

    useEffect(() => {
        loadBooks();
    }, [])                                          // The empty dependency array [] means it only runs once when the component is first rendered.
                                                    // to be rendered in the UI

return(
    <div>

        <div style={{width: '100%', display: 'grid', alignItems: 'center', justifyContent: 'center', margin: '20px 0'}}>
            <Button variant="primary" onClick={() => {
                setCreateBookModalText("Create Book");
                // Set the book ID to -1 so we know we're creating a new book entry, and clear out the rest of the variables
                setCreateBookID(-1);
                setCreateBookTitle("");
                setCreateBookISBN("");
                setCreateBookPrice(-1.00);
                setCreateBookCurrentStock(-1);
                setCreateBookPublicationYear(-1);
                handleShow();
            }}>
                Create Book
            </Button>
        </div>
            
        {/* Modal Container for the create/edit book fields */}
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>{createBookModalText}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <table className="styled-table">
                    <tbody>
                        <tr>
                            <td>Title</td>
                            <td>
                                <Form.Control type='text' placeholder='Title'
                                value={createBookTitle}
                                onChange={(event) => {
                                    console.log(event.target.value);
                                    setCreateBookTitle(event.target.value);
                                }} onInput={(event) => {
                                    console.log(event.target.value);
                                    setCreateBookTitle(event.target.value);
                                }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>ISBN</td>
                            <td>
                                <Form.Control type='text' placeholder='ISBN'
                                value={createBookISBN}
                                onChange={(event) => {
                                    console.log(event.target.value);
                                    setCreateBookISBN(event.target.value);
                                }} onInput={(event) => {
                                    console.log(event.target.value);
                                    setCreateBookISBN(event.target.value);
                                }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Price ($)</td>
                            <td><Form.Control type='number' min={0.01} placeholder='Price ($)'
                                value={createBookPrice < 0.00 ? '' : createBookPrice}
                                onChange={(event) => {
                                    console.log(event.target.value);
                                    setCreateBookPrice(event.target.value);
                                }} onInput={(event) => {
                                    console.log(event.target.value);
                                    setCreateBookPrice(event.target.value);
                                }}
                            /></td>
                        </tr>
                        <tr>
                            <td>Current Stock</td>
                            <td><Form.Control type='number' min={0} placeholder='Current Stock'
                                value={createBookCurrentStock == -1 ? '' : createBookCurrentStock}
                                onChange={(event) => {
                                    console.log(event.target.value);
                                    setCreateBookCurrentStock(event.target.value);
                                }} onInput={(event) => {
                                    console.log(event.target.value);
                                    setCreateBookCurrentStock(event.target.value);
                                }}
                            /></td>
                        </tr>
                        <tr>
                            <td>Publication Year</td>
                            <td><Form.Control type='number' min={0} placeholder='Publication Year'
                                value={createBookPublicationYear == -1 ? '' : createBookPublicationYear}
                                onChange={(event) => {
                                    console.log(event.target.value);
                                    setCreateBookPublicationYear(event.target.value);
                                }} onInput={(event) => {
                                    console.log(event.target.value);
                                    setCreateBookPublicationYear(event.target.value);
                                }}
                            /></td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <div className="d-grid gap-2">
                                    <Button variant='success' size="lg" onClick={createBook}>
                                        {createBookModalText}
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Modal.Body>
        </Modal>

        {/* Table that contains the search book title input box and the search button */}
        <table style={{margin:"50px auto", width:"400px"}}>
            <tr>
                <td style={{paddingRight: "10px"}}>
                    <Form.Control type="text" placeholder="Search Book Title" value={searchBookTitle} 
                        onChange={(event) => {
                            console.log(event.target.value);
                            setSearchBookTitle(event.target.value);
                        }} onInput={(event) => {
                            console.log(event.target.value);
                            setSearchBookTitle(event.target.value);
                        }}>
                    </Form.Control>
                </td>
                <td>
                    <Button variant='primary' onClick={searchBook}>Search!</Button>
                </td>
            </tr>
        </table>

       {/* Table that contains the results */}
       <table className="styled-table" style={{marginBottom: "50px"}}>
       <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>ISBN</th>
            <th>Price</th>
            <th>Current Stock</th>
            <th>Publication Year</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
       </thead>
       <tbody>
        {
            // Check to see if the data array contains any itmes
            (data.length <= 0) ? 
            // If not, then we display a message so the user doesn't wait forever assuming it's still loading
            <tr>
                <td colSpan={8}><h2 style={{textAlign: "center"}}>No Results Found!</h2></td>
            </tr> :
            // Else, we display the items in the data array
            data.map((d, i) => (                 // Maps over the data array to create a table row (<tr>) for each item d in data. The index i is used as a unique key for each row.
                    <tr key={i}>
                        <td>{d.id}</td>
                        <td>{d.title}</td>
                        <td>{d.isbn}</td>
                        <td>{d.price}</td>
                        <td>{d.current_stock}</td>
                        <td>{d.publication_year}</td>
                        <td> <Button variant='warning' onClick={() => editBook(i)}>Edit</Button> </td>
                        <td> <Button variant='danger' onClick={() => deleteBook(i)}>Delete</Button> </td>
                    </tr>
                    ))
        }
       </tbody>
       </table>
    </div>
)
}

export default App                               // so it can be imported in other files.
