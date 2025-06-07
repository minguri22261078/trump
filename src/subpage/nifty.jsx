import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useInView } from "react-intersection-observer";

// Chart.js에 필요한 요소 등록
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

// CSS 애니메이션 keyframes 정의
const fadeKeyframes = `
  @keyframes fadeUp {
    0% {
      opacity: 0;
      transform: translateY(30px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeScale {
    0% {
      opacity: 0;
      transform: scale(0.95);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.1);
      opacity: 0.8;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

// 전역 스타일 태그 컴포넌트
const StyleTag = () => (
  <style dangerouslySetInnerHTML={{ __html: fadeKeyframes }} />
);

const MemeSection = () => {
  // 탭 인덱스 상태 (현재 사용하지 않음)
  const [tabIndex, setTabIndex] = useState(0);

  // 화면에 보이는지 감지하는 Intersection Observer 훅
  const [chartRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  // 전체 데이터 (억 단위)
  const fullData = [480, 520, 650, 700, 730, 780];
  // 애니메이션용 점진적 데이터 상태
  const [animatedData, setAnimatedData] = useState([]);

  // inView가 true가 되면 애니메이션 효과를 위해 데이터 점진적으로 추가
  useEffect(() => {
    if (inView && animatedData.length === 0) {
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setAnimatedData(fullData.slice(0, i));
        if (i >= fullData.length) clearInterval(interval);
      }, 300);
    }
  }, [inView, animatedData.length]);

  return (
    <Wrapper>
      <StyleTag />

      <FullScreenTitleSection>
        <Title>인도 Nifty 50</Title>
      </FullScreenTitleSection>

      <HeroSection>
        <OverlayLabel>Top 3📈</OverlayLabel>
      </HeroSection>

      <Section>
        <Headline>
          Min’s Stock Picks?📈
          <br />
          지금은 얼마일까!
        </Headline>
        <Change>-2.7% : -30,000</Change>
      </Section>

      <HeroLinear>
        <HeadlineLarge>Build with focus.</HeadlineLarge>
        <HeadlineLarge style={{ marginTop: "-12px" }}>Invest with vision.</HeadlineLarge>
        <SubText>인도 주식 시장의 핵심, Nifty 50 지수를 분석해드립니다.</SubText>

        {/* 차트 컨테이너: inView 상태에 따라 애니메이션 클래스 적용 */}
        <ChartContainer ref={chartRef} className={inView ? "animate" : ""}>
          <Line
            data={{
              labels: ["2018", "2019", "2020", "2021", "2022", "2023"].slice(0, animatedData.length),
              datasets: [
                {
                  label: "S&P 500 Growth (억 원)",
                  data: animatedData,
                  borderColor: "#ff8f2c",
                  backgroundColor: "rgba(255, 143, 44, 0.1)",
                  tension: 0.4,
                  fill: true,
                  pointBackgroundColor: "white",
                },
              ],
            }}
            options={{
              responsive: true,
              animation: inView ? { duration: 1000 } : false,
              scales: {
                x: {
                  grid: { display: false },
                  ticks: { color: "#aaa" },
                },
                y: {
                  grid: { color: "#333" },
                  ticks: {
                    color: "#aaa",
                    callback: (value) => `${value}억`,
                  },
                },
              },
              plugins: {
                legend: { display: false },
              },
            }}
          />
        </ChartContainer>
      </HeroLinear>
    </Wrapper>
  );
};

// 공통 배경 및 폰트 스타일
const Wrapper = styled.div`
  background: #000000;
  color: white;
  font-family: 'Inter', sans-serif;
  padding-bottom: 100px;
`;

// 전체 화면 제목 섹션
const FullScreenTitleSection = styled.section`
  height: 100vh;
  background: #000000;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

// 히어로 이미지 섹션
const HeroSection = styled.div`
  height: 40vh;
  background-image: url('/img/nifty-hero.png');
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

// 제목 스타일 (fadeUp 애니메이션 포함)
const Title = styled.h1`
  font-size: 42px;
  font-weight: 800;
  opacity: 0;
  transform: translateY(30px);
  animation: fadeUp 1.4s ease-out forwards;
  animation-delay: 0.3s;
`;

// 히어로 섹션 내 오버레이 라벨
const OverlayLabel = styled.div`
  margin-top: 20px;
  font-size: 28px;
  font-weight: 700;
  color: white;
  background: rgba(0, 0, 0, 0.2);
  padding: 8px 24px;
  border-radius: 12px;
  backdrop-filter: blur(2px);
`;

// 일반 섹션 스타일링
const Section = styled.section`
  text-align: center;
  margin: 60px 20px;
  position: relative;
  z-index: 1;
`;

// 섹션 내 헤드라인
const Headline = styled.h2`
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 8px;
`;

// 변동 퍼센트 텍스트 및 애니메이션
const Change = styled.p`
  font-size: 14px;
  color: #ff8f2c;
  font-weight: 600;
  animation: pulse 1.6s ease-in-out infinite;
`;

// 히어로 라인 섹션 (텍스트 및 차트 포함)
const HeroLinear = styled.section`
  background: #000000;
  color: white;
  padding: 160px 40px 100px;
  text-align: center;
`;

// 큰 헤드라인 스타일 (fadeUp 애니메이션 포함)
const HeadlineLarge = styled.h1`
  font-size: 48px;
  font-weight: 700;
  line-height: 1.2;
  opacity: 0;
  transform: translateY(40px);
  animation: fadeUp 1.2s ease-out forwards;
  animation-delay: 0.2s;
`;

// 서브 텍스트 스타일
const SubText = styled.p`
  font-size: 18px;
  color: #ccc;
  margin-top: 20px;
`;

// 차트 컨테이너 스타일 및 애니메이션 처리
const ChartContainer = styled.div`
  margin-top: 60px;
  background: #000000;
  padding: 40px;
  border-radius: 24px;
  opacity: 0;
  transform: scale(0.95);
  transition: all 0.8s ease-out;

  &.animate {
    opacity: 1;
    transform: scale(1);
  }
`;

export default MemeSection;