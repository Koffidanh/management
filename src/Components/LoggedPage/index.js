import React, { useState, useEffect } from "react";
import "./index.css";

function LoggedPage({ mainUser }) {
    const [name, setName] = useState("");
    const [searchResult, setSearchResult] = useState("");
    const [users, setUsers] = useState([]);
    const [duration, setDuration] = useState();
    const [durationBubble, setDurationBubble] = useState();
    const [searchResultBubble, setSearchResultBubble] = useState("");
    const [durationQuick, setDurationQuick] = useState();
    const [searchResultQuick, setSearchResultQuick] = useState("");

    // Fetch data from local storage when the component mounts
    useEffect(() => {
        const retrievedData = localStorage.getItem('users');
        if (retrievedData !== null) {
            const parsedData = JSON.parse(retrievedData);
            setUsers(parsedData);
        } else {
            console.log('No data found in local storage');
        }
    }, []);

    const handleOnChangeSearch = (event) => {
        const value = event.target.value;
        setName(value);
    
        const startTime = performance.now(); // Start timer
    
        // Perform binary search to find the name
        const result = binarySearch(users, value);
    
        const endTime = performance.now(); // End timer
        setDuration(endTime - startTime); // Calculate duration in milliseconds
    
        const startTimeBubble = performance.now(); // Start timer
    
        // Perform bubble search to find the name
        const resultBubble = bubbleSearch(users, value);
    
        const endTimeBubble = performance.now(); // End timer
        setDurationBubble(endTimeBubble - startTimeBubble); // Calculate duration in milliseconds


        const startTimeQuick = performance.now(); // Start timer
    
        // Perform Quick search to find the name
        const resultQuick = quickSearch(users, value);
    
        const endTimeQuick= performance.now(); // End timer
        setDurationQuick(endTimeQuick - startTimeQuick); // Calculate duration in milliseconds
    
        setSearchResult(result);
        setSearchResultBubble(resultBubble);
        setSearchResultQuick(resultQuick);
    };
    

    const binarySearch = (arr, target) => {
        let left = 0;
        let right = arr.length - 1;

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            const user = arr[mid];

            if (user?.firstName === target) {
                return user.firstName; // Name found
            } else if (user?.firstName < target) {
                left = mid + 1; // Search right half
            } else {
                right = mid - 1; // Search left half
            }
        }

        return "Name not found"; // Name not found
    };

    const bubbleSearch = (arr, target) => {
        let n = arr.length;
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (arr[j].firstName > arr[j + 1].firstName) {
                    // Swap arr[j] and arr[j+1]
                    let temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    
        // Perform linear search to find the target
        for (let i = 0; i < n; i++) {
            if (arr[i].firstName === target) {
                return arr[i].firstName; // Name found
            }
        }
    
        return "Name not found"; // Name not found
    };

    const quickSearch = (arr, target) => {
        let left = 0;
        let right = arr.length - 1;
    
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            const user = arr[mid];
    
            if (user?.firstName === target) {
                return user.firstName; // Name found
            } else if (user?.firstName < target) {
                // Search right half
                return quickSearch(arr.slice(mid + 1, right + 1), target);
            } else {
                // Search left half
                return quickSearch(arr.slice(left, mid), target);
            }
        }
    
        return "Name not found"; // Name not found
    };
    
    

    return (
        <div className="loggedInContainer">
            <div className="loggedInName">Welcome {mainUser?.firstName}</div>
            <div className="searchContainer">
                <input
                    name="nameValue"
                    type="text"
                    placeholder="firstName"
                    value={name}
                    onChange={handleOnChangeSearch}
                />
            </div>
            <div className="foundResult">Found Named with Binary search: {searchResult} Time is took: {duration} milliseconds</div>
            <div className="foundResult">Found Named with Bubble search: {searchResultBubble} Time is took: {durationBubble} milliseconds</div>
            <div className="foundResult">Found Named with Quick search: {searchResultQuick} Time is took: {durationQuick} milliseconds</div>
            <div className="listsOfUserContainer">
                {users.map((user, index) => (
                    <div key={index} className="userItem">
                        <div className="firstNameList">{user?.firstName}</div>
                        <div className="lastNameList">{user?.lastName}</div>
                    </div>
                ))}
            </div>

            {/* <div className="buttonContainer">
                <div className="saveBtn"><button> Save</button></div>
                <div className="deleteBtn"><button> Delete</button></div>
            </div> */}
        </div>
    );
}

export default LoggedPage;
