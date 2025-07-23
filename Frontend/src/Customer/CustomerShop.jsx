
import React, {useEffect, useState} from 'react'    // Imports the React library
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import { Outlet } from 'react-router-dom';
import { CUSTOMER_TOKEN_KEY } from '../consts';


const CustomerShop = () => {
    const [data, setData] = useState([]);
    const [cart, setCart] = useState({});

    const [startPriceRange, setStartPriceRange] = useState(0.00);
    const [endPriceRange, setEndPriceRange] = useState(0.00);

    const [history, setHistory] = useState([]);

    const [isOrdering, setIsOrdering] = useState(false);
    const [searchBookTitle, setSearchBookTitle] = useState("");
    const [isSearchMode, setIsSearchMode] = useState(false); // Search Mode to know whether to search or load all books after creating/updating

    const [show, setShow] = useState(false); // Modal Visibility State
    const handleClose = () => {
        getCartKeys().forEach(x => {
            if(cart[x]["amountToOrder"] <= 0){
                delete cart[x];
            }
        });
        setCart(cart);
        setShow(false);
    }
    const handleShow = () => setShow(true);


    const [historyShow, setHistoryShow] = useState(false); // Modal Visibility State
    const handleHistoryClose = () => {
        setHistoryShow(false);
    }
    const handleHistoryShow = () => {
        fetch("http://localhost:8081/customer/getOrderHistory", {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem(CUSTOMER_TOKEN_KEY)}`,
            },
        })
        .then(response => response.json())
        .then(data => {
            if(data["status"]) {
                let history = {};
                let historyData = data["data"];
                for(var i = 0; i < historyData.length; i++){
                    if(!(historyData[i]["OrderID"] in history)){
                        history[historyData[i]["OrderID"]] = [];
                    }
                    history[historyData[i]["OrderID"]].push(historyData[i]);
                }
                console.log(history);
                setHistory(history);
                setHistoryShow(true);
            }
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        });
    };

    const getCartKeys = () => {
        return Object.keys(cart);
    }

    const isValidOrder = () => {
        let is_valid = false;
        getCartKeys().forEach(x => {
            if(cart[x]["amountToOrder"] > 0){
                is_valid = true;
            }
        });
        return is_valid;
    }

    const addToCart = (index) => {
        let book = data[index];
        if(book["id"] in cart){
            if("amountToOrder" in cart[book["id"]]){
                cart[book["id"]]["amountToOrder"] += 1;
            } else {
                cart[book["id"]]["amountToOrder"] = 1;
            }
        } else {
            cart[book["id"]] = book;
            cart[book["id"]]["amountToOrder"] = 1;
        }

        if(cart[book["id"]]["amountToOrder"] > book["current_stock"]){
            cart[book["id"]]["amountToOrder"] = book["current_stock"];
        }

        setCart(cart);
    }

    const placeOrder = () => {
        if(isValidOrder() && !isOrdering){
            setIsOrdering(true);
            fetch("http://localhost:8081/customer/order", {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem(CUSTOMER_TOKEN_KEY)}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cart)
            })
            .then(response => response.json())
            .then(data => {
                handleClose();
                setCart({});
                setIsOrdering(false);
                searchBook();
                console.log(data);
            })
            .catch(err => {
                setIsOrdering(false);
                console.log(err);
            });
        }
    };

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
                    data["data"] = data["data"].filter(x => x["current_stock"] > 0);
                    if(startPriceRange != endPriceRange && startPriceRange < endPriceRange){
                        setData(data["data"].filter(x => x["price"] >= startPriceRange && x["price"] <= endPriceRange));
                    } else {
                        setData(data["data"]);
                    }
                } else {
                    console.log(data);
                    console.error("Failed to load books!");
                }
           })                 
           .catch(err => console.log(err));             // logs the error msg to the console.
        }
    }

    const loadBooks = () => {
           fetch('http://localhost:8081/books')       // call backend route
           .then(response => response.json())           // Converts the response from the fetch request into JSON format.
           .then(data => {                              // Updates the state variable data with the fetched data using the setData function.
                if(data["status"]){
                    data["data"] = data["data"].filter(x => x["current_stock"] > 0);
                    if(startPriceRange != endPriceRange && startPriceRange < endPriceRange){
                        setData(data["data"].filter(x => x["price"] >= startPriceRange && x["price"] <= endPriceRange));
                    } else {
                        setData(data["data"]);
                    }
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
        <div style={{width: '100%', display: 'grid', alignItems: 'center', gridAutoFlow: "column", gap: "10px", justifyContent: 'center', margin: '20px 0'}}>
            <Button variant="primary" onClick={() => {handleShow()}}>
                View Cart
            </Button>
            <Button variant="info" onClick={() => {handleHistoryShow()}}>
                View Order History
            </Button>
            <Button variant="danger" onClick={() => {
                window.location.href = "/logout"
            }}>
                Logout
            </Button>
        </div>
            
        {/* Modal Container for the create/edit book fields */}
        <Modal show={historyShow} onHide={handleHistoryClose} size="lg">
            <Modal.Header closeButton>
            <Modal.Title>Order History</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Accordion>
                {
                    Object.keys(history).map((key, i) => (
                        <Accordion.Item eventKey={`order_container_${key}`} key={`order_container_${key}`}>
                            <Accordion.Header>Order {i + 1}</Accordion.Header>
                            <Accordion.Body>
                                <table className="styled-table" style={{marginBottom: "50px", width: "100%"}}>
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>ISBN</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Cost</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            // Else, we display the items in the data array
                                            history[key].map((item, i) => (
                                                <tr key={`orderTable_${i}`}>
                                                    <td>{item.title}</td>
                                                    <td>{item.isbn}</td>
                                                    <td>{item.BookPrice}</td>
                                                    <td>{item.quantityOrdered}</td>
                                                    <td>${(item.quantityOrdered * item.BookPrice).toFixed(2)}</td>
                                                </tr>
                                            ))
                                        }
                                        <tr key={`total_${key}`}>
                                            <td colSpan={4}>Total:</td>
                                            <td colSpan={1}>${history[key].map(x => x.quantityOrdered * x.BookPrice).reduce((partialSum, a) => partialSum + a, 0).toFixed(2)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))
                }
                </Accordion>
            </Modal.Body>
        </Modal>

        {/* Modal Container for the create/edit book fields */}
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
            <Modal.Title></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    getCartKeys().length <= 0 ? <h1>No items in cart!</h1> :
                    <table className="styled-table" style={{marginBottom: "50px", width: "100%"}}>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>ISBN</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                // Else, we display the items in the data array
                                getCartKeys().map((key, i) => (
                                    <tr key={i}>
                                        <td>{cart[key].title}</td>
                                        <td>{cart[key].isbn}</td>
                                        <td>{cart[key].price}</td>
                                        <td>
                                            <Button 
                                                onClick={(elem) => {
                                                    cart[key].amountToOrder -= 1;
                                                    if(cart[key].amountToOrder <= 0){
                                                        cart[key].amountToOrder = 0;
                                                    }
                                                    setCart(cart);
                                                    elem.target.nextElementSibling.innerHTML = cart[key].amountToOrder;
                                                    elem.target.parentElement.nextElementSibling.innerHTML = `$${cart[key].amountToOrder * cart[key].price}`;
                                                }}
                                            >-</Button>
                                            <span style={{"padding": "10px"}}>{cart[key].amountToOrder}</span>
                                            <Button onClick={(elem) => {
                                                cart[key].amountToOrder += 1;
                                                if(cart[key].amountToOrder > cart[key].current_stock){
                                                    cart[key].amountToOrder = cart[key].current_stock;
                                                }
                                                setCart(cart);
                                                elem.target.previousElementSibling.innerHTML = cart[key].amountToOrder;
                                                elem.target.parentElement.nextElementSibling.innerHTML = `$${(cart[key].amountToOrder * cart[key].price).toFixed(2)}`;
                                            }}>+</Button>
                                        </td>
                                        <td>${cart[key].amountToOrder * cart[key].price}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                }

                {
                    getCartKeys().length <= 0 ? '' : <Button variant='success' style={{"width": "100%"}} onClick={() => placeOrder()}>Place Order!</Button>
                }
            </Modal.Body>
        </Modal>

        {/* Table that contains the search book title input box and the search button */}
        <table style={{margin:"50px auto", width:"400px"}}>
            <tbody>
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
                        
                        <div style={{display: "grid", gridAutoFlow: "column", gap: "10px", paddingTop: "10px"}}>
                            <Form.Control type="number" placeholder="Minimum Price Range" step={1.00} min={0.00}
                                onChange={(event) => {
                                    setStartPriceRange(event.target.value);
                                }} onInput={(event) => {
                                    console.log(event.target.value);
                                    setStartPriceRange(event.target.value);
                                }}>
                            </Form.Control>
                            <Form.Control type="number" placeholder="Maximum Price Range" step={1.00} min={0.00}
                                onChange={(event) => {
                                    setEndPriceRange(event.target.value);
                                }} onInput={(event) => {
                                    console.log(event.target.value);
                                    setEndPriceRange(event.target.value);
                                }}>
                            </Form.Control>
                        </div>
                        
                    </td>
                    <td>
                        <Button variant='secondary' onClick={searchBook}>Search!</Button>
                    </td>
                </tr>
            </tbody>
        </table>

       {/* Table that contains the results */}
       <table className="styled-table" style={{marginBottom: "50px"}}>
        <thead>
            <tr>
                <th>Title</th>
                <th>ISBN</th>
                <th>Price</th>
                <th>Current Stock</th>
                <th>Publication Year</th>
                <th>Add to Cart</th>
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
                            <td>{d.title}</td>
                            <td>{d.isbn}</td>
                            <td>{d.price}</td>
                            <td>{d.current_stock}</td>
                            <td>{d.publication_year}</td>
                            <td> <Button variant='success' onClick={() => addToCart(i)}>Add to Cart</Button> </td>
                        </tr>
                        ))
            }
        </tbody>
       </table>
    </div>
)
}

export default CustomerShop;