import React, { useEffect, useRef, forwardRef, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// 전체 페이지를 감싸는 Wrapper
const Wrapper = styled.div`
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  margin: 0;
  padding: 0;
  background-color: black;
  color: #1d1d1f;
  overflow-x: hidden;
`;

// 상단 Hero 영역
const HeroSection = styled.section`
  background: black;
  color: white;
  padding: 0 32px;
  text-align: center;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  opacity: 0;
  transform: translateY(30px);
  transition: all 1s ease;

  &.hero-animate {
    opacity: 1;
    transform: translateY(0);
  }
`;

const HeroTitle = styled.h1`
  font-weight: 700;
  font-size: 2.0rem;
  line-height: 1.1;
  margin-bottom: 20px;
`;

const HeroSubtitle = styled.p`
  font-weight: 400;
  font-size: 1.0rem;
  line-height: 1.4;
  max-width: 600px;
  margin: 0 auto;
  white-space: pre-line;
  color: #d1d1d6;
`;

// 각 지수 섹션을 구성하는 블록 관련 스타일
const SectionBlockWrapper = styled.section.withConfig({
  shouldForwardProp: (prop) => prop !== "isLast"
})`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${props => props.bg};
  color: ${props => props.color};
  padding: 48px 80px;
  border-radius: 24px;
  margin: 40px auto;
  max-width: 1200px;
  box-shadow: ${props => (props.bg === "#fff" ? "0 4px 20px rgba(0,0,0,0.1)" : "none")};
  transition: opacity 0.5s ease, transform 0.5s ease;
  opacity: 0;
  transform: translateY(40px);
  cursor: pointer;

  &.show {
    opacity: 1;
    transform: translateY(0);
  }

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 16px 40px rgba(0,0,0,0.2);
  }

  @media (max-width: 900px) {
    flex-direction: column;
    padding: 32px 24px;
  }
`;

const TextBlock = styled.div`
  flex: 1 1 50%;
  padding-right: 40px;
  @media (max-width: 900px) {
    padding-right: 0;
    text-align: center;
    margin-bottom: 40px;
  }
`;

const Title = styled.h2`
  font-weight: 800;
  font-size: 2rem;
  line-height: 1.1;
  margin-bottom: 16px;
`;

const Subtitle = styled.p`
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.5;
  color: ${props => (props.color ? props.color : "inherit")};
`;

const ImageBlock = styled.div`
  flex: 1 1 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SectionImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 32px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.15);
`;

// 각 지수 섹션 컴포넌트
const SectionComponent = forwardRef(({ bg, color, title, subtitle, image, onClick }, ref) => (
  <SectionBlockWrapper bg={bg} color={color} ref={ref} onClick={onClick} className="show">
    <TextBlock>
      <Title>{title}</Title>
      <Subtitle color={color}>{subtitle}</Subtitle>
    </TextBlock>
    <ImageBlock>
      <SectionImage src={image} alt={title} />
    </ImageBlock>
  </SectionBlockWrapper>
));

const StockShowcase = () => {
  const sectionRefs = useRef([]);
  const navigate = useNavigate();

  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setHeroVisible(true);
    }, 200);
  }, []);

  const sections = [
      {
          bg: "#000",
          color: "#fff",
          title: "인도 Nifty 50",
          subtitle: "인도 시장을 대표하는 Nifty 50 지수입니다.",
          image: "/img/nifty50.png",
          path: "/subpage/nifty"
      },
      {
          bg: "#ff8f2c",
          color: "#fff",
          title: "미국 S&P 500",
          subtitle: "미국 경제를 반영하는 S&P 500 지수입니다.",
          image: "/img/sp500.png",
          path: "/subpage/sp500"
      },
      {
          bg: "#fff",
          color: "#000",
          title: "미국 나스닥 100",
          subtitle: "기술주 중심의 미국 나스닥 100 지수입니다.",
          image: "/img/nasdaq.png",
          path: "/subpage/nasdaq"
      }
  ];

  const handleClick = (path) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      navigate(path);
    }, 300); // delay navigation slightly to allow scroll
  };

  return (
    <Wrapper>
      {/* 상단 Hero 섹션 */}
      <HeroSection className={heroVisible ? "hero-animate" : ""}>
        <HeroTitle>트럼프가 가져간 저의 💰 궁금하시 않나요?</HeroTitle>
        <HeroSubtitle>
          이제껏 경험 못 했던 하락장📉{"\n"}
          이 사이트에서 제3의 입장에서 한번 경험해보세요✨
        </HeroSubtitle>
      </HeroSection>

      {/* 모든 섹션 렌더링 */}
      {sections.map((section, idx) => (
        <SectionComponent
          key={idx}
          ref={el => (sectionRefs.current[idx] = el)}
          bg={section.bg}
          color={section.color}
          title={section.title}
          subtitle={section.subtitle}
          image={section.image}
          onClick={() => handleClick(section.path)}
        />
      ))}
    </Wrapper>
  );
};

export default StockShowcase;