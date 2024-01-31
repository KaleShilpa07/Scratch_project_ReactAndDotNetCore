﻿import React, { Fragment, useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    IconButton,
} from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { getData } from "ajv/dist/compile/validate";
import { ToastContainer, toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import "react-toastify/dist/ReactToastify.css";

const StudentCurd = () => {
    const [currentPhotoUrl, setCurrentPhotoUrl] = useState("");
    const [previewData, setPreviewData] = useState(false);

    // Add a new state for storing the selected file
    const [selectedFile, setSelectedFile] = useState(null);

    // Handler for file input change
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);

    };
    const handleEditFileChange = (e) => {
        SetEditPhotoBase64();
        setSelectedFile(e.target.files[0]);
    };

    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = () => {
        axios
            .get(`https://localhost:7190/api/home/search?searchTerm=${searchTerm}`)
            .then((result) => {
                Setdata(result.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const [open, setOpen] = useState(false);
    const [deleteId, setDeleteId] = useState();

    const handleClickOpen = (id) => {
        setDeleteId(id);
        setOpen(true);
    };
    const handleCloseDialog = () => {
        setOpen(false);
    };

    //
    const [showEditModal, setShowEditModal] = useState(false);
    const handleEditModal = () => {
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
    };

    //

    const [showPreviewImage, setShowPreviewImage] = useState(false);
    const handlePreviewModalImage = () => {
        setShowPreviewImage(true);
    };

    const handleClosePreviewModalImage = () => {
        setShowPreviewImage(false);
    };
    const [showPreviewModal, setShowPreviewModal] = useState(false);
    const handlePreviewModal = () => {
        setShowPreviewModal(true);
    };

    const handleClosePreviewModal = () => {
        setShowPreviewModal(false);
    };
    //
    //Delete Data


    const [selectedRows, setSelectedRows] = useState([]);

    const handleDeleteSelectedRows = async () => {
        try {
            await axios.delete('https://localhost:7190/api/home/deleteMultiple', {
                data: selectedRows
            });
            setTimeout(() => {
                window.location.reload();
            }, 5000);
            // Handle success
            toast.success("Data deleted successfully", { position: "top-center" });

            // Handle additional logic (e.g., update UI or fetch updated data)
        } catch (error) {
            // Handle error

            // Display an error toast
            toast.error("Please Select Row..", { position: "top-center" });
        }
    };


    //
    const HandleDelete = (id) => {
        handleClickOpen(id);
    };
    const confirmDelete = () => {
        axios
            .delete(`https://localhost:7190/api/home/${deleteId}`)
            .then((result) => {
                if (result.status === 200) {
                    toast.success("Student Delete SuccessFully..", { position: "top-center" });
                }
                handleCloseDialog(); // Close the confirmation dialog
            })
            .catch((error) => {
                toast.error(error, { position: "top-center" });
                handleCloseDialog(); // Close the confirmation dialog
            });
    };

    const [data, Setdata] = useState([]);

    const [Name, SetName] = useState("");
    const [IsActive, SetIsActive] = useState("");

    const [Age, SetAge] = useState("");
    const [City, SetCity] = useState("");
    const [Standard, SetStandard] = useState("");
    const [DOB, SetDOB] = useState("");
    const [Gender, SetGender] = useState("");
    const [MobileNo, SetMobileNo] = useState("");
    const [EmailId, SetEmailId] = useState("");

    const [Editid, SetEditid] = useState("");
    const [Editname, SetEditName] = useState("");
    const [EditAge, SetEditAge] = useState("");
    const [EditCity, SetEditCity] = useState("");
    const [EditStandard, SetEditStandard] = useState("");
    const [EditPhotoBase64, SetEditPhotoBase64] = useState("");
    const [EditDOB, SetEditDOB] = useState(new Date()); // Initial value, you can replace it with your actual initial value

    const [EditGender, SetEditGender] = useState("");
    const [EditIsActive, SetEditIsActive] = useState("");
    const [EditMobileNo, SetEditMobileNo] = useState("");
    const [EditEmailId, SetEditEmailId] = useState("");


    //Insert dummy data into table...
    // const rows = [
    //   {
    //     id: 1,
    //     Name: "Swara",
    //     age: 23,
    //     Address: "pune",
    //     Class: "second",

    //   },
    //   {
    //     id: 2,
    //     Name: "Sunita",
    //     age: 23,
    //     Address: "pune",
    //     Class: "second",

    //   },
    //   {
    //     id: 3,
    //     Name: "Mira",
    //     age: 23,
    //     Address: "pune",
    //     Class: "second",

    //   },
    // ];

    const refreshPage = () => {
        setTimeout(() => {
            window.location.reload();
        }, 5000);
    };
    // Function to convert a file to base64
    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = () => {
                resolve(reader.result.split(",")[1]); // Extract base64 part
            };

            reader.onerror = (error) => {
                reject(error);
            };
        });
    };
    //Save Data
    const HandleSave = async () => {
        const url1 = "https://localhost:7190/api/home";
        const formData = {
            Name: Name,
            Age: Age,
            DOB: DOB,
            Gender: Gender,
            City: City,
            EmailId: EmailId,
            MobileNo: MobileNo,
            isActive: IsActive,
            Standard: Standard,
            photo: selectedFile ? await getBase64(selectedFile) : null,
        };

        axios
            .post(url1, formData)
            .then((result) => {
                getData();
                Clear();
                toast.error("Error adding student", { position: "top-center" });
            })
            .catch(() => {
                console.error();
                toast.success("Student Add Successfully..", { position: "top-center" });
            });
    };
    const Clear = () => {
        SetName("");
        SetCity("");
        SetAge("");
        SetDOB("");
        SetGender("");
        SetMobileNo("");
        SetEmailId("");
        SetStandard("");
        SetIsActive("");
        EditPhotoBase64("");
        SetEditCity("");
        SetEditid("");
        SetEditName("");
        SetEditAge("");
        SetEditDOB("");
        SetEditMobileNo("");
        SetEditEmailId("");
        SetEditGender("");
        SetEditIsActive("");
        SetEditStandard("");
        SetEditPhotoBase64("");
    };
    const handleUpdate = async (id) => {
        const updatedData = {
            id: Editid,
            Name: Editname,
            Age: EditAge,
            City: EditCity,
            Standard: EditStandard,
            DOB: EditDOB,
            EmailId: EditEmailId,
            MobileNo: EditMobileNo,
            Gender: EditGender,
            IsActive: EditIsActive,

            //Photo: currentPhotoUrl.split(',')[1], // Extract base64 part
            PhotoBase64: currentPhotoUrl ? await getBase64(selectedFile) : null,
        };

        axios
            .put(`https://localhost:7190/api/home/${id}`, updatedData)
            .then((response) => {
                toast.success("Data updated successfully", { position: "top-center" });
                // Close the modal after successful update
                refreshPage();
            })
            .catch((error) => {
                console.error(error, { position: "top-center" });
                toast.error("Error updating data", { position: "top-center" });
            });
    };
    const HandleEdit = (id) => {
        handleEditModal();
        axios
            .get(`https://localhost:7190/api/home/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((result) => {
                SetEditPhotoBase64(result.data.PhotoBase64);
                SetEditName(result.data.name);
                SetEditAge(result.data.age);
                SetEditCity(result.data.city);
                SetEditStandard(result.data.standard);
                SetEditDOB(result.data.dob);
                SetEditEmailId(result.data.emailId);
                SetEditMobileNo(result.data.mobileNo);
                SetEditGender(result.data.gender);
                SetEditIsActive(result.data.isActive);
                setCurrentPhotoUrl(`data:image/png;base64,${result.data.photo}`);
                SetEditid(id);
                setShowEditModal(true); // You might need this line if you want to ensure the modal is visible after fetching data
            })
            .catch((error) => {
                console.error(error);
                toast.error("Error fetching student data for edit", { position: "top-center" });
            });
    };
    // const HandleDelete = (id) => {
    //   if (window.confirm("Are You sure to delete Student...") === true) {
    //     axios
    //       .delete(`https://localhost:7190/api/home/${id}`)
    //       .then((result) => {
    //         if (result.status === 200) {
    //           toast.success("Student Delete SuccessFully..");
    //           refreshPage();
    //         }
    //       })
    //       .catch((error) => {
    //         toast.error(error);
    //       });
    //   }
    // };


    const HandlePreview = (id) => {
        handlePreviewModal();


        axios
            .get(`https://localhost:7190/api/home/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((result) => {
                setPreviewData(result.data);
                // Open the preview modal
                setShowPreviewModal(true);

            })
            .catch((error) => {
                console.error(error);
                toast.error("Error fetching student data for preview", { position: "top-center" });
            });
    };
    const HandlePreview2 = (id) => {

        handlePreviewModalImage();

        axios
            .get(`https://localhost:7190/api/home/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((result) => {
                setPreviewData(result.data);
                // Open the preview modal

                setShowPreviewImage(true);
            })
            .catch((error) => {
                console.error(error);
                toast.error("Error fetching student data for preview", { position: "top-center" });
            });
    };

    const [showAddModal, setAddShowModal] = useState(false);

    const handleAddShowModal = () => {
        setAddShowModal(true);
    };

    const handleAddCloseModal = () => {
        setAddShowModal(false);
    };

    const handleIsActiveChange = (itemId) => {
        Setdata((prevData) =>
            prevData.map((item) =>
                item.id === itemId ? { ...item, isActive: !item.isActive } : item
            )
        );
        const checkbox = document.getElementById(`checkbox_${itemId}`);
        if (checkbox) {
            checkbox.classList.toggle('Red');
        }
    };
    // Disable all checkboxes by default
    const [checkboxesDisabled, setCheckboxesDisabled] = useState(true);




    useEffect(() => {
        Getdata();
    }, [searchTerm]);

    const Getdata = () => {
        axios
            .get("https://localhost:7190/api/home")
            .then((result) => {
                /* Setdata(result.data);*/
                Setdata(
                    result.data.map((item) => ({
                        ...item,
                        photoBase64: item.PhotoBase64,
                    }))
                );
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <Fragment>
            <br></br>
            <ToastContainer />

            <Container>
                <Row>
                    <Col
                        lg={4}
                        md={8}
                        style={{ position: "fixed", width: "20%", marginLeft: "860px" }}
                    >
                        <input
                            className="form-control"
                            type="search"
                            placeholder="Search here.."
                            aria-label="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </Col>
                    <Col
                        lg={2}
                        md={10}
                        style={{ position: "fixed", width: "20%", marginLeft: "1125px" }}
                    >
                        <button
                            className="btn btn-outline-success"
                            type="submit"
                            onClick={handleSearch}
                        >
                            Search
                        </button>&nbsp;
                        <button className="btn btn-outline-danger"

                            onClick={handleDeleteSelectedRows}>DeleteAll</button>
                    </Col>
                </Row>
            </Container>
            <Row>
                {" "}
                <div>
                    {" "}
                    <IconButton
                        color="btn btn-outline-Success"
                        style={{ color: "green" }}
                        onClick={handleAddShowModal}
                    >
                        <AddCircleOutlineIcon />
                        Add
                    </IconButton>{" "}
                </div>
            </Row>
            <br></br>

            <Modal show={showAddModal} onHide={handleAddCloseModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Add New Student</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col xs={12} md={6}>
                            <Form.Group>
                                <Form.Label></Form.Label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Name"
                                    value={Name}
                                    onChange={(e) => SetName(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={6}>
                            <Form.Group>
                                <Form.Label> </Form.Label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Mobile No"
                                    value={MobileNo}
                                    onChange={(e) => SetMobileNo(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12} md={6}>
                            <Form.Group>
                                <Form.Label></Form.Label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Age"
                                    value={Age}
                                    onChange={(e) => SetAge(e.target.value)}
                                />
                            </Form.Group>

                        </Col>
                        <Col xs={12} md={6}>
                            <Form.Group>
                                <Form.Label></Form.Label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Standard"
                                    value={Standard}
                                    onChange={(e) => SetStandard(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>



                    <Row>
                        <Col xs={12} md={6}>
                            <Form.Group>
                                <Form.Label></Form.Label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="City"
                                    value={City}
                                    onChange={(e) => SetCity(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={6}>

                            <Form.Group>
                                <Form.Label></Form.Label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Email Id"
                                    value={EmailId}
                                    onChange={(e) => SetEmailId(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <br></br>
                    <Row>

                        <Col xs={12} md={6}>
                            <Form.Group>
                                <div>
                                    <label>Gender &nbsp;:&nbsp;&nbsp;

                                        <Form.Check
                                            inline
                                            value={Gender}
                                            label="Male"
                                            type="radio"
                                            id="maleRadio"
                                            name="genderRadio"
                                            checked={Gender === "Male" || Gender === "male"}
                                            onChange={() => SetGender("Male")}
                                        />
                                        <Form.Check
                                            inline
                                            value={Gender}
                                            label="Female"
                                            type="radio"
                                            id="femaleRadio"
                                            name="genderRadio"
                                            checked={Gender === "Female" || Gender === "female"}
                                            onChange={() => SetGender("Female")}
                                        />

                                    </label>
                                </div>
                            </Form.Group>
                        </Col>


                        <Col xs={12} md={6}>
                            <Form.Group>
                                <label>IsActive &nbsp;:&nbsp;&nbsp;
                                    <Form.Check
                                        inline
                                        label="Yes"
                                        type="radio"
                                        id="yesRadio"
                                        name="isActiveRadio"
                                        checked={IsActive === true}
                                        style={{ color: IsActive ? 'green' : 'black', cursor: 'pointer' }}
                                        onChange={() => SetIsActive(true)}
                                    />
                                    <Form.Check
                                        inline
                                        label="No"
                                        type="radio"
                                        id="noRadio"
                                        name="isActiveRadio"
                                        checked={IsActive === false}
                                        style={{ color: IsActive ? 'red' : 'black', cursor: 'pointer' }}

                                        onChange={() => SetIsActive(false)}
                                    />
                                </label>
                            </Form.Group>
                        </Col>

                    </Row>
                    <Row>
                        <Col xs={12} md={4} style={{ marginTop: "24px", width: "260px" }}>
                            <Form.Group>
                                <Form.Label> </Form.Label>
                                <DatePicker
                                    selected={DOB ? new Date(DOB) : null}
                                    onChange={(date) => SetDOB(date)}
                                    className="form-control"
                                    placeholderText="Date of Birth"
                                />
                            </Form.Group>
                        </Col></Row>
                    <Row>
                        <Col xs={12} md={6} style={{ marginTop: "30px" }}>
                            <Form.Group>
                                <Form.Label></Form.Label>
                                <input type="file" onChange={(e) => handleFileChange(e)} />
                            </Form.Group>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleAddCloseModal}>
                        Close
                    </Button>
                    <Button
                        variant="success"
                        onClick={() => {
                            HandleSave();
                            refreshPage();
                            handleAddCloseModal();
                        }}
                    >
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
            <Table
                striped
                bordered
                style={{
                    marginRight: "40px",
                    top: "100px",
                    overflowX: "auto", // Add this line for horizontal scrollbar
                    maxWidth: "100%", // Ensure the table takes the full width
                }}
            >
                <thead>
                    <tr style={{ textAlign: "center" }}>
                        {/* <th>No</th>*/}
                        <th>SelectRow</th>
                        <th>Name</th>
                        <th>Date-Of-Birth</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Email Id</th>
                        <th>City</th>
                        <th>Standard</th>
                        <th>Mobile No</th>
                        <th>Photo</th>
                        <th>IsActive</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.length > 0
                        ? data.map((item, index) => {
                            return (
                                <>
                                    <tr key={index} style={{ textAlign: "center" }}>
                                        {/*  <td>{index + 1}</td>*/}
                                        <td>
                                            <input
                                                type="checkbox"
                                                value={item.id}
                                                onChange={(e) => {
                                                    const itemId = parseInt(e.target.value, 10);
                                                    setSelectedRows(prev => (
                                                        e.target.checked
                                                            ? [...prev, itemId]
                                                            : prev.filter(id => id !== itemId)
                                                    ));
                                                }}
                                            />


                                        </td>
                                        <td>{item.name}</td>
                                        <td>
                                            {item.dob
                                                ? new Date(item.dob).toLocaleDateString()
                                                : "N/A"}
                                        </td>
                                        <td>{item.age}</td>
                                        <td>{item.gender}</td>
                                        <td>{item.emailId}</td>
                                        <td>{item.city}</td>
                                        <td>{item.standard}</td>
                                        <td>{item.mobileNo}</td>
                                        <td>
                                            <div
                                                style={{
                                                    textAlign: "center",
                                                    maxWidth: "50px",
                                                    maxHeight: "50px",
                                                    overflow: "hidden",
                                                }}
                                            >
                                                {item.photo !== null ? (
                                                    <img
                                                        style={{
                                                            width: "100%",
                                                            height: "100%",
                                                            objectFit: "cover",
                                                        }}
                                                        src={`data:image/png;base64,${item.photo}`}
                                                        alt={`${item.name}`}
                                                        onClick={() => HandlePreview2(item.id)}
                                                    />
                                                ) : (
                                                    ".."
                                                )}
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            <input
                                                type="checkbox"
                                                defaultChecked={item.isActive}
                                                onChange={() => handleIsActiveChange(item.id)}
                                                disabled={checkboxesDisabled}
                                                id={`checkbox_${item.id}`}
                                            /></td>
                                        <td colSpan={2}>
                                            <EditIcon
                                                style={{ cursor: "pointer", color: "blue" }} // Set color or other styles as needed
                                                onClick={() => HandleEdit(item.id)}
                                            ></EditIcon>
                                            &nbsp;
                                            <VisibilityIcon
                                                onClick={() => HandlePreview(item.id)}
                                                style={{ cursor: "pointer" }}
                                            />
                                            &nbsp;
                                            <DeleteIcon
                                                onClick={() => {
                                                    HandleDelete(item.id);
                                                }}
                                                style={{ cursor: "pointer", color: "red" }} // Customize the color
                                            />
                                        </td>
                                    </tr>
                                </>
                            );
                        })
                        : "... No data here "}
                </tbody>
            </Table>



            <Dialog open={open} onClose={handleCloseDialog}>
                <DialogTitle>Confirmation</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this student?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>

                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            confirmDelete();
                            refreshPage();
                        }}
                        variant="danger"
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
            <div style={{
                position: "fixed",
                origin: "50%",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
            }}>
                {" "}
                <Modal
                    show={showPreviewModal}
                    onHide={handleClosePreviewModal}
                    animation={true}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Student Preview</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {previewData && (
                            <div>
                                <p>Name: {previewData.name}</p>
                                <p>DOB: {previewData.dob}</p>
                                <p>Age: {previewData.age}</p>
                                <p>Gender: {previewData.gender}</p>
                                <p>Email Id: {previewData.emailId}</p>
                                <p>City: {previewData.city}</p>
                                <p>Standard: {previewData.standard}</p>
                                <p>Mobile No: {previewData.mobileNo}</p>


                                {previewData.photo && (
                                    <img
                                        src={`data:image/png;base64,${previewData.photo}`}
                                        alt={`Photo of ${previewData.name}`}
                                        style={{ maxWidth: "100%", maxHeight: "400px" }}
                                    />
                                )}
                            </div>
                        )}
                    </Modal.Body>
                </Modal>{" "}
            </div>
            <div>
                <Modal
                    show={showPreviewImage}
                    onHide={handleClosePreviewModalImage}
                    animation={true}
                >
                    <Modal.Header closeButton>
                        <marquee> <Modal.Title> {previewData && (

                            <h >{previewData.name}'s Photo and MobileNo: {previewData.mobileNo} </h>)}
                        </Modal.Title></marquee>
                    </Modal.Header>
                    <Modal.Body>
                        {previewData && (
                            <div >
                                {previewData.photo && (
                                    <img
                                        src={`data:image/png;base64,${previewData.photo}`}
                                        alt={`Photo of ${previewData.name}`}
                                        style={{ maxWidth: "100%", maxHeight: "600px" }}
                                    />
                                )}
                            </div>
                        )}
                    </Modal.Body>
                </Modal>{" "}
            </div>
            <div>
                <Modal
                    show={showEditModal}
                    onHide={handleCloseEditModal}
                    animation={true}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Update/Edit Student</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col xs={12} md={6}>
                                <Form.Group>
                                    <Form.Label></Form.Label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Edit Name"
                                        value={Editname}
                                        onChange={(e) => SetEditName(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={6}>
                                <Form.Group>
                                    <Form.Label> </Form.Label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Edit Mobile No"
                                        value={EditMobileNo}
                                        onChange={(e) => SetEditMobileNo(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={12} md={6}>
                                <Form.Group>
                                    <Form.Label></Form.Label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Edit Age"
                                        value={EditAge}
                                        onChange={(e) => SetEditAge(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={6}>
                                <Form.Group>
                                    <Form.Label></Form.Label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Edit Standard"
                                        value={EditStandard}
                                        onChange={(e) => SetEditStandard(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={12} md={6}>
                                <Form.Group>
                                    <Form.Label></Form.Label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Edit Email Id"
                                        value={EditEmailId}
                                        onChange={(e) => SetEditEmailId(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={6}>
                                <Form.Group>
                                    <Form.Label></Form.Label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Edit City"
                                        value={EditCity}
                                        onChange={(e) => SetEditCity(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} md={4} style={{ marginTop: "24px", width: "265px" }} >
                                <Form.Group>
                                    <div>
                                        <label>Gender &nbsp;:&nbsp;&nbsp;

                                            <Form.Check
                                                inline
                                                value={EditGender}
                                                label="Male"

                                                id="maleRadio"
                                                name="genderRadio"
                                                type="radio"
                                                checked={EditGender === "Male" || EditGender === "male"}
                                                onChange={() => SetEditGender("Male")}
                                            />
                                            <Form.Check
                                                inline
                                                value={EditGender}
                                                label="Female"

                                                id="femaleRadio"
                                                name="genderRadio"
                                                type="radio"
                                                checked={EditGender === "Female" || EditGender === "female"}
                                                onChange={() => SetEditGender("Female")}
                                            />
                                        </label>
                                    </div>
                                </Form.Group>
                            </Col>

                            <Col xs={12} md={4} style={{ marginTop: "24px", width: "225px", marginLeft: "0px" }} >
                                <Form.Group>
                                    <label>IsActive &nbsp;:&nbsp;&nbsp;

                                        <Form.Check
                                            inline
                                            label="Yes"
                                            type="radio"
                                            id="yesRadio"
                                            name="isActiveRadio"
                                            checked={EditIsActive === true}
                                            style={{ color: EditIsActive ? 'green' : 'black', cursor: 'pointer' }}
                                            onChange={() => SetEditIsActive(true)}
                                        />
                                        <Form.Check
                                            inline
                                            label="No"
                                            type="radio"
                                            id="noRadio"
                                            name="isActiveRadio"
                                            checked={EditIsActive === false}
                                            style={{ color: EditIsActive ? 'red' : 'black', cursor: 'pointer' }}
                                            onChange={() => SetEditIsActive(false)}
                                        />


                                    </label>
                                </Form.Group>

                            </Col>
                        </Row>

                        <Row> <Col xs={12} md={6} style={{ marginTop: "24px", width: "220px" }}>

                            <Form.Group>
                                <Form.Label> </Form.Label>
                                <DatePicker
                                    selected={EditDOB ? new Date(EditDOB) : null}
                                    onChange={(date) => SetEditDOB(date)}
                                    className="form-control"
                                    placeholderText={
                                        EditDOB
                                            ? new Date(EditDOB).toLocaleDateString()
                                            : "Select DOB"
                                    }
                                />
                            </Form.Group>
                        </Col></Row>
                        <br></br>

                        <Row>
                            {/* Display the current photo */}
                            {currentPhotoUrl && (
                                <Col xs={12} md={6}>
                                    <Form.Group>
                                        <Form.Label></Form.Label>
                                        <img
                                            src={currentPhotoUrl}
                                            alt="Current Photo"
                                            style={{ maxWidth: "100%", maxHeight: "200px" }}
                                        />
                                    </Form.Group>
                                </Col>
                            )}
                            {/* File Input */}
                            <Col xs={12} md={6} style={{ marginTop: "30px" }}>
                                <Form.Group>
                                    <Form.Label></Form.Label>
                                    <input
                                        type="file"
                                        onChange={(e) => handleEditFileChange(e)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseEditModal}>
                            Close
                        </Button>
                        <Button
                            variant="primary"
                            onClick={() => {
                                handleUpdate(Editid);
                            }}
                        >
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </Fragment>
    );
};
export default StudentCurd;
