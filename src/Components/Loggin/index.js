import React, { useState } from "react";
import "./index.css";
import SignUp from "../SignUp";
import LoggedPage from "../LoggedPage";

function Loggin() {
    const [userName, setUsername] = useState("");
    const [passWord, setPassword] = useState("");
    const [toSignUp, setToSignUp] = useState(false);
    const [userData, setUserData] = useState(null);

    const handleOnChangeUserName = (event) => {
        setUsername(event.target.value);
    };

    const handleOnChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = () => {
        // Retrieve users data from local storage
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Perform binary search to find the user
        const userIndex = binarySearch(users, userName, passWord);

        // Check if user is found
        if (userIndex !== -1) {
            alert('Login successful!');
            // Set user data and redirect to logged page
            setUserData(users[userIndex]);
        } else {
            alert('Invalid username or password. Please try again.');
        }
    };

    const binarySearch = (arr, targetUserName, targetPassWord) => {
        let left = 0;
        let right = arr.length - 1;

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            const user = arr[mid];

            if (user.userName === targetUserName && user.passWord === targetPassWord) {
                return mid; // User found
            } else if (user.userName < targetUserName || (user.userName === targetUserName && user.passWord < targetPassWord)) {
                left = mid + 1; // Search right half
            } else {
                right = mid - 1; // Search left half
            }
        }

        return -1; // User not found
    };

    return (
        userData ? (
            <LoggedPage mainUser={userData} />
        ) : (
            !toSignUp ? (
                <div id="logginContainer">
                    <div className="logginTittle">Loggin To selfManagement</div>
                    <div className="logginBlockContainer">
                        <div className="logginUsername">
                            UserName:
                            <input
                                type="text"
                                name="userNameValue"
                                placeholder="userName"
                                onChange={handleOnChangeUserName}
                            />
                        </div>
                        <div className="logginPassword">
                            PassWord: <input
                                name="passWordValue"
                                type="text"
                                placeholder="password"
                                onChange={handleOnChangePassword}
                            />
                        </div>
                    </div>
                    <div className="logginSignUpContainer">
                        <div className="logginBtn">
                            <button onClick={handleLogin}>LoggIn</button>
                        </div>
                        <div className="signUpBtn">
                            <button onClick={() => setToSignUp(true)}>SignUp</button>
                        </div>
                    </div>
                </div>
            ) : (
                <SignUp />
            )
        )
    );
}

export default Loggin;
