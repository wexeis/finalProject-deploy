import React, { useState, useEffect } from "react";
import "./user.css";
import editImage from "../image/edit.png";
import deleteImage from "../image/delete.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserAdmin() {
  const [userslist, setUserslist] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getUserData();
  }, []);

  const [currentUser, setCurrentUser] = useState(null);
  const [showUser, setShowUser] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const handleShowUser = () => {
    setShowUser(!showUser);
  };

  const getUserData = () => {
    axios
      .get("https://final-project-idzh.onrender.com/user")
      .then((response) => {
        setUserslist(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteUser = async (id) => {
    const url = `https://final-project-idzh.onrender.com/user/${id}`;
    try {
      await axios.delete(url);
      getUserData();
      toast.success("User deleted successfully!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      toast.error("Error!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.log(error);
    }
  };

  return (
    <div className="user-admin">
      <div className="user-container">
        <ToastContainer />

        <div className="page-name">
          <h1 className="title-page-dashboard">Users</h1>
        </div>
        <div className="table-container">
          <div className="search-table">
            <div className="search">
              <input
                placeholder="Search By Name, Email, or Role"
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                }}
              />
            </div>
            <table className="user-table">
              <thead className="head-table">
                <tr className="table-head-tr">
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  {/* <th>Update</th> */}
                  <th>Delete</th>
                </tr>
              </thead>

              <tbody className="table-tbody">
                {userslist
                  .filter((userlist) => {
                    if (!searchTerm) {
                      return userlist;
                    } else if (
                      userlist.firstName
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      userlist.lastName
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      userlist.email
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      userlist.role
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    ) {
                      return userlist;
                    } else {
                      return null;
                    }
                  })
                  .map((userlist, key) => {
                    return (
                      <tr className="table-tr" key={key}>
                        <td className="table-td">
                          {userlist.firstName + " " + userlist.lastName}
                        </td>
                        <td className="table-td">{userlist.email}</td>
                        <td className="table-td">{userlist.role}</td>
                      
                        <td className="table-td">
                          <button onClick={() => handleDeleteUser(userlist._id)}>
                            <img
                              src={deleteImage}
                              alt="delete"
                              className="delete"
                            />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserAdmin;
