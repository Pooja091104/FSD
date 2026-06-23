import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const ProfileWidget = () => {
  const [employee, setEmployee] = useState({});
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const config_details = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  const ProfileApi = "http://localhost:8080/api/employee/profile";
  const ChangePassword = "http://localhost:8080/api/employee/change-password"
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(ProfileApi, config_details);
        console.log(response.data);
        setEmployee(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchEmployee();
  }, []);

  const handlePasswordChange = async () => {
    if (!newPassword || !confirmPassword) {
      setPasswordMsg("Please fill all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMsg("Passwords do not match");
      return;
    }

    try {
      const response = await axios.put(
        ChangePassword,
        {
          newPassword,
        },
        config_details
      );

      console.log(response.data);
      setPasswordMsg("Password changed successfully");
      setShowPasswordModal(false);
      setNewPassword("");
      setConfirmPassword("");
      setPasswordMsg("");
    } catch (error) {
      console.log(error);
      setPasswordMsg("Failed to change password");
    }
  };

  return (
    <>
      <div className="container-fluid">
        
          {/* Header */}
          <div className="card-header bg-white py-3">
            <h3 className="fw-bold mb-1">My Profile</h3>
            <p className="text-muted mb-0">
              Manage your personal information.
            </p>
          </div>

          {/* Body */}
          <div className="row">
            {/* Left Section */}
            <div className="col-md-4 border-end text-center">
              <div className="p-4">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="Profile"
                  className="rounded-circle border shadow-sm"
                  width="140"
                  height="140"
                />

               
              </div>
            </div>

            {/* Right Section */}
            <div className="col-md-8">
              <div className="p-3">
                <div className="row mb-4">
                  <div className="col-md-4 fw-bold">
                    Full Name
                  </div>
                  <div className="col-md-8">
                    {employee.fullName}
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col-md-4 fw-bold">
                    Employee ID
                  </div>
                  <div className="col-md-8">
                    {employee.employeeId}
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col-md-4 fw-bold">
                    Department
                  </div>
                  <div className="col-md-8">
                    {employee.department}
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col-md-4 fw-bold">
                    Phone
                  </div>
                  <div className="col-md-8">
                    {employee.phoneNumber}
                  </div>
                </div>

                <hr />

                <div className="mt-4">
                  <button
                    className="btn btn-outline-primary me-3"
                    onClick={() => {
                      setPasswordMsg("");
                      setShowPasswordModal(true);
                    }}
                  >
                    Change Password
                  </button>

                
                </div>
              </div>
            </div>
          </div>
        </div>
      

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div
          className="modal fade show"
          style={{
            display: "block",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow">
              <div className="modal-header">
                <h5 className="modal-title">
                  Change Password
                </h5>

                <button
                  type="button"
                  className="btn-close"
                  onClick={() =>
                    setShowPasswordModal(false)
                  }
                ></button>
              </div>

              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">
                    New Password
                  </label>

                  <input
                    type="password"
                    className="form-control"
                    value={newPassword}
                    onChange={(e) =>
                      setNewPassword(e.target.value)
                    }
                    placeholder="Enter new password"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Confirm Password
                  </label>

                  <input
                    type="password"
                    className="form-control"
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(e.target.value)
                    }
                    placeholder="Confirm password"
                  />
                </div>

                {passwordMsg && (
                  <div
                    className={`alert ${passwordMsg.includes("success")
                        ? "alert-success"
                        : "alert-danger"
                      }`}
                  >
                    {passwordMsg}
                  </div>
                )}
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() =>
                    setShowPasswordModal(false)
                  }
                >
                  Cancel
                </button>

                <button
                  className="btn btn-primary"
                  onClick={handlePasswordChange}
                >
                  Update Password
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileWidget;