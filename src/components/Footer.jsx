import React from "react";
import styled from "styled-components";

// 푸터 전체 레이아웃 컴포넌트
const FooterContainer = styled.footer`
    background-color: #1d1d1f;
    padding: 2rem 1rem 1rem;
    text-align: center;
    color: #f5f5f7;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen;
`;

// 푸터 로고 이미지
const Logo = styled.img`
    height: 60px;
    margin-bottom: 2rem;
`;

// 링크들을 감싸는 그리드 컨테이너
const LinkGrid = styled.div`
    display: flex;
    justify-content: center;
    gap: 4rem;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
`;

// 링크 컬럼 컨테이너
const Column = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
`;

// 푸터 내 링크 스타일 (공통)
const FooterLink = styled.a`
    text-decoration: none;
    color: #f5f5f7;
    font-size: 14px;

    &:hover {
        text-decoration: underline;
    }
`;

// 이메일 텍스트 스타일
const Email = styled.div`
    font-size: 13px;
    margin-top: 1rem;
    color: #ccc;
`;

// 하단 저작권 및 구분선 영역
const BottomBar = styled.div`
    margin-top: 2rem;
    padding-top: 1rem;
    font-size: 12px;
    color: #999;
    border-top: 1px solid #444;
`;

// 푸터 컴포넌트
const Footer = () => {
    return (
        <FooterContainer>
            <Logo src="/img/Logo.png" alt="logo" />
            <LinkGrid>
                <Column>
                    <FooterLink href="#">About</FooterLink>
                    <FooterLink href="#">Quotes</FooterLink>
                    <FooterLink href="#">Videos</FooterLink>
                </Column>
                <Column>
                    <FooterLink href="#">Privacy Policy</FooterLink>
                    <FooterLink href="#">Terms of Use</FooterLink>
                    <FooterLink href="#">Contact</FooterLink>
                </Column>
            </LinkGrid>
            <Email>elmo0915@kaywon.ac.kr</Email>
            <BottomBar>© 2025 Min Seok. All rights reserved.</BottomBar>
        </FooterContainer>
    );
};

export default Footer;
