import React, { useState } from 'react';
import axios from 'axios';

const Email = () => {
    const [emailData, setEmailData] = useState({
        to: '',
        subject: '',
        body: ''
    });

    const handleInputChange = (e) => {
        setEmailData({
            ...emailData,
            [e.target.name]: e.target.value
        });
    };

    const sendEmail = () => {
        axios.post('https://localhost:7190/api/SendEmail', emailData)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ width: '400px' }}>
                <div className="form-group">
                    <label htmlFor="inputEmail">To</label>
                    <input type="email" className="form-control" id="inputEmail" name="to" onChange={handleInputChange} placeholder="Write email" />
                </div>
                <div className="form-group">
                    <label htmlFor="inputSubject">Subject</label>
                    <input type="text" className="form-control" id="inputSubject" name="subject" onChange={handleInputChange} placeholder="Subject" />
                </div>
                <div className="form-group">
                    <label htmlFor="inputBody">Body</label>
                    <textarea className="form-control" id="inputBody" name="body" onChange={handleInputChange} rows="3"></textarea>
                </div>
                <div className="form-group">
                    <button type="submit" onClick={sendEmail} className="btn btn-primary mb-2">Send Email</button>
                </div>
            </div>
        </div>
    );
};

export default Email;
