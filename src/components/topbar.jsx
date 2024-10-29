import React from "react";


const Topbar = () => {
    return (
        <div style={{
            height: "50px",            // Fixed height for the top bar
            width: "100%",
            backgroundColor: "#333",
            color: "white",
            display: "flex",
            alignItems: "center",
            padding: "0 20px",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 1
        }}>
            <h3 style={{ margin: 0 }}>Your Name</h3>
        </div>
    );
};

export default Topbar;