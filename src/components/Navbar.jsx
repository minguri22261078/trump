import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Navbar = () => {
    return (
        <NavContainer>
            <LogoLink to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                <LogoImage src="/img/Logo.png" />
            </LogoLink>
            <MenuList>
                <li><MenuLink to="/stock" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Stock</MenuLink></li>
                <li><MenuLink to="/Location" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Location</MenuLink></li>
                <li><MenuLink to="/quotes" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Quotes</MenuLink></li>
                <li><MenuLink to="/memes" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Memes</MenuLink></li>
                <li><MenuLink to="/random" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Random</MenuLink></li>
            </MenuList>
        </NavContainer>
    );
};

const NavContainer = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5rem;
    z-index: 9999;
`;

const LogoLink = styled(Link)`
    display: flex;
    align-items: center;
`;

const LogoImage = styled.img`
    height: 60px;
`;

const MenuList = styled.ul`
    display: flex;
    gap: 2.5rem;
    list-style: none;
    margin: 0;
    padding: 0;
    background: linear-gradient(to bottom, #555555, #333333);
    padding: 12px 32px;
    border-radius: 50px;
    box-shadow: 0 0 15px 5px orange;
`;

const MenuLink = styled(Link)`
    font-size: 12px;
    font-weight: 500;
    color: #eee;
    text-decoration: none;
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
        color: white;
        transform: scale(1.1);
        text-shadow: 0 0 8px white;
    }
`;

export default Navbar;