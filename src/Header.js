import styled from "styled-components";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { useState } from "react";

export default function Header({ username, isLoggedIn, handleLogout }) {
  const [showLogout, setShowLogout] = useState(false);
  const HeaderContainer = styled.header`
    display: flex;
    align-items: center;
  `;
  const StyledNavLink = styled(Link)`
    text-decoration: none;
    margin: 0 15px;
    color: #555;

    &.active {
      color: #000;
    }
  `;
  const LogoutContainer = styled.div`
    position: relative;
    &:hover > div {
      display: block;
    }
  `;
  const LogoutOverlay = styled.div`
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    padding: 12px 16px;
    cursor: pointer;
    z-index: 1; // to make sure it overlays the other content
  `;

  return (
    <HeaderContainer>
      <Logo />
      <StyledNavLink to="/">HOME</StyledNavLink>
      <StyledNavLink to="/favorite">FAVORITE</StyledNavLink>
      <StyledNavLink to="/rated">RATED</StyledNavLink>
      {isLoggedIn ? (
        <LogoutContainer onClick={() => setShowLogout(!showLogout)}>
          <StyledNavLink to="/">{username}</StyledNavLink>
          {showLogout && (
            <LogoutOverlay onClick={handleLogout}>Logout</LogoutOverlay>
          )}
        </LogoutContainer>
      ) : (
        <StyledNavLink to="/Login">LOGIN</StyledNavLink>
      )}
    </HeaderContainer>
  );
}
