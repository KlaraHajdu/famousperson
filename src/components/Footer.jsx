import React from "react";
import styled from "styled-components";

const Styles = styled.div`
    .footer-container {
        background-color: rgba(70, 70, 70, 0.3);
        bottom: 0;
        position: fixed;
        text-align: center;
        width: 100%;
        height: 25px;
    }

    .footer-main {
        color: darkgrey;
    }
`;

export default function Footer() {
    return (
        <Styles>
            <div className="footer-container">
                <p className="footer-main">Klára Hajdu - CodeCool {new Date().getFullYear()} </p>
            </div>
        </Styles>
    );
}
