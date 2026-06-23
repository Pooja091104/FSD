import axios from "axios";
import { useState } from "react";
import "./EmployeeOnboard.css";

const EmployeeOnboard = () => {

    const [fullName, setFullName] = useState();
    const [username, setUsername] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [gender, setGender] = useState();
    const [address, setAddress] = useState();
    const [department, setDepartment] = useState();

    const postApi = 'http://localhost:8080/api/employee/add';

    const [successMsg, setSuccessMsg] = useState();
    const [errMsg, setErrMsg] = useState();

    const [errMsgFullName, setErrMsgFullName] = useState();
    const [errMsgUsername, setErrMsgUsername] = useState();

    const onboardEmployee = async (e) => {
        e.preventDefault();

        let body = {
            fullName,
            username,
            phoneNumber,
            gender,
            address,
            department
        };

        const config_details = {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem('token')
            }
        };

        try {
            const response = await axios.post(postApi, body, config_details);

            setSuccessMsg("Employee Onboarded");
            setFullName('');
            setUsername('');
            setPhoneNumber('');
            setGender('');
            setAddress('');
            setDepartment('');

            setErrMsg(undefined);
            setErrMsgFullName(undefined);
            setErrMsgUsername(undefined);

        } catch (err) {
            console.log(err.response.data);

            setErrMsg("Onboarding Failed " + (err.response?.data?.message || ""));
            setErrMsgFullName(err.response?.data?.fullName || undefined);
            setErrMsgUsername(err.response?.data?.username || undefined);

            setSuccessMsg(undefined);
        }

    };

    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="card">
                    <div className="card-header">
                        Employee Onboarding
                    </div>
                    <div className="card-body">
                        <form onSubmit={(e) => onboardEmployee(e)}>

                            {
                                successMsg !== undefined ?
                                    <div className="alert alert-primary mb-4">
                                        {successMsg}
                                    </div> : ""
                            }

                            {
                                errMsg !== undefined ?
                                    <div className="alert alert-danger mb-4">
                                        {errMsg}
                                    </div> : ""
                            }

                            <div className="mb-4">
                                <label>Full Name: </label>
                                {
                                    errMsgFullName !== undefined ?
                                        <span style={{ color: 'red', fontSize: '11px' }}>
                                            {errMsgFullName}
                                        </span> : ""
                                }
                                <input type="text" className="form-control" required
                                    onChange={(e) => setFullName(e.target.value)} value={fullName} />
                            </div>

                            <div className="mb-4">
                                <label>Username: </label>
                                {
                                    errMsgUsername !== undefined ?
                                        <span style={{ color: 'red', fontSize: '11px' }}>
                                            {errMsgUsername}
                                        </span> : ""
                                }
                                <input type="text" className="form-control" required
                                    onChange={(e) => setUsername(e.target.value)} value={username} />
                            </div>

                            <div className="mb-4">
                                <label>Phone Number: </label>
                                <input type="text" className="form-control" required
                                    onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} />
                            </div>

                            <div className="mb-4">
                                <label>Gender: </label>
                                <input type="text" className="form-control" required
                                    onChange={(e) => setGender(e.target.value)} value={gender} />
                            </div>

                        

                            <div className="mb-4">
                                <label>Department: </label>
                                <input type="text" className="form-control" required
                                    onChange={(e) => setDepartment(e.target.value)} value={department} />
                            </div>

                            <div className="mb-4">
                                <input type="submit" className="btn btn-secondary"
                                    value="Add Employee in System" />
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeOnboard;