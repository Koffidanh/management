import React, { useState } from "react";
import "./index.css";
import LoggedPage from "../LoggedPage";

function SignUp() {
    const [userName, setUsername] = useState("");
    const [passWord, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [error, setError] = useState("");
    const [approved, setApproved] = useState(false);

    const handleOnChangeFirstName = (event) => {
        setFirstName(event.target.value);
    };

    const handleOnChangeLastname = (event) => {
        setLastName(event.target.value);
    };

    const handleOnChangeUserName = (event) => {
        setUsername(event.target.value);
    };

    const handleOnChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const erroDisplay = () => {
        if (firstName.length <= 0 || lastName.length <= 0 || userName.length < 5 || passWord.length < 4) {
            setError("Please length of the userName needs to be more than 5, length of password needs to be more than 4");
        } else {
            // Save user information
            saveUserInfo();
            setApproved(true);
        }
    };

    const saveUserInfo = () => {
        // Create user object with the collected information
        const userInfo = {
            firstName: firstName,
            lastName: lastName,
            userName: userName,
            passWord: passWord
        };

        // Retrieve existing user data from localStorage or initialize an empty array
        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
        // Add the sign-up user to the array
        existingUsers.push(userInfo);

        // Add 20 more users
        for (let i = 0; i < 100; i++) {
            const userInfo = {
                firstName: `User${i + 1}`,
                lastName: `Lastname${i + 1}`,
                userName: `username${i + 1}`,
                passWord: `password${i + 1}`
            };
            existingUsers.push(userInfo);
        }

        // Save the updated user data array back to localStorage
        localStorage.setItem('users', JSON.stringify(existingUsers));
    };

    return (
        !approved ?
            <div id="signUpContainer">
                <div className="signTittle">SignUp To selfManagement</div>

                <div className="signUpBlockContainer">
                    <div className="signUpFirstname">
                        FirstName:
                        <input
                            type="text"
                            name="signFirstValue"
                            placeholder="firstName"
                            value={firstName}
                            onChange={handleOnChangeFirstName}
                        />
                    </div>

                    <div className="signUpLastName">
                        LastName:
                        <input
                            type="text"
                            name="signLastValue"
                            placeholder="lastName"
                            value={lastName}
                            onChange={handleOnChangeLastname}
                        />
                    </div>

                    <div className="signUpUsername">
                        UserName:
                        <input
                            type="text"
                            name="signUserNameValue"
                            placeholder="userName"
                            value={userName}
                            onChange={handleOnChangeUserName}
                        />
                    </div>

                    <div className="signUpPassword">
                        PassWord:
                        <input
                            name="signUpPassWordValue"
                            type="text"
                            placeholder="password"
                            value={passWord}
                            onChange={handleOnChangePassword}
                        />
                    </div>

                    <div className="signErrorFoprm">{error}</div>

                    <div className="signUpFinishBtn">
                        <button onClick={erroDisplay}>Finish</button>
                    </div>
                </div>
            </div>
            :
            <LoggedPage />
    );
}

export default SignUp;
