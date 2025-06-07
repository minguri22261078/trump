import React, { useState, useEffect } from "react";
import styled from "styled-components";
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

// Chart.js에 필요한 요소 등록: 선 그래프, 축, 툴팁 등
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

// CSS keyframes 애니메이션 정의: fadeUp, fadeScale, pulse
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

// 애니메이션 keyframes를 전역 스타일로 삽입하는 컴포넌트
const StyleTag = () => (
    <style dangerouslySetInnerHTML={{ __html: fadeKeyframes }} />
);

// 예시 그래프 데이터 (현재 코드에서는 사용되지 않음)
const graphData = [
    {
        label: "GDP Growth",
        data: [4.8, 5.2, 6.5, 7.0, 7.3, 7.8],
        color: "#4bc0c0"
    },
    {
        label: "Risk Index",
        data: [3.2, 3.8, 4.1, 4.4, 4.2, 3.9],
        color: "#ff6384"
    },
    {
        label: "Top Companies",
        data: [10, 12, 15, 20, 22, 25],
        color: "#ff9f40"
    }
];

// 메인 컴포넌트: S&P 500 관련 정보를 보여주고 애니메이션 차트를 렌더링
const MemeSection = () => {
    const [tabIndex, setTabIndex] = useState(0); // 현재 탭 인덱스 (미사용 상태)
    const [chartRef, inView] = useInView({
        triggerOnce: true,
        threshold: 0.3,
    });

    // 실제 차트에 표시할 전체 데이터 (억 단위)
    // 2018~2023: 상승세 유지, 2022년 약간 하락 후 회복
    const fullData = [520, 570, 610, 750, 710, 820];
    const [animatedData, setAnimatedData] = useState([]);

    // 차트가 뷰포트 내에 들어오면 점진적으로 데이터 증가시키는 useEffect
    useEffect(() => {
        if (inView && animatedData.length === 0) {
            let i = 0;
            const interval = setInterval(() => {
                i++;
                setAnimatedData(fullData.slice(0, i)); // 데이터 배열을 점차 늘림
                if (i >= fullData.length) clearInterval(interval); // 끝나면 인터벌 제거
            }, 300);
        }
    }, [inView]);

    return (
        <Wrapper>
            {/* 전역 애니메이션 스타일 삽입 */}
            <StyleTag />

            {/* 전체 화면 타이틀 영역 */}
            <FullScreenTitleSection>
                <Title>미국 S&P 500</Title>
            </FullScreenTitleSection>

            {/* 히어로 이미지 배경 영역 및 오버레이 텍스트 */}
            <HeroSection>
                <OverlayLabel>Top 2📈</OverlayLabel>
            </HeroSection>

            {/* 중간 정보 영역: 헤드라인과 변동률 표시 */}
            <Section>
                <Headline>
                    Min’s Stock Picks?📈
                    <br />
                    지금은 얼마일까!
                </Headline>
                <Change>-3.7% : -75,000</Change>
            </Section>

            {/* 차트 및 설명 영역 */}
            <HeroLinear>
                <HeadlineLarge>America’s Market Power.</HeadlineLarge>
                <HeadlineLarge style={{ marginTop: "-12px" }}>The S&P 500 Unveiled.</HeadlineLarge>
                <SubText>미국 주식 시장의 핵심, S&P 500 지수를 한눈에 분석해드립니다.</SubText>
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
                                    pointBackgroundColor: "white"
                                }
                            ]
                        }}
                        options={{
                            responsive: true,
                            animation: inView ? { duration: 1000 } : false,
                            scales: {
                                x: {
                                    grid: { display: false },
                                    ticks: { color: "#aaa" }
                                },
                                y: {
                                    grid: { color: "#333" },
                                    ticks: {
                                        color: "#aaa",
                                        callback: (value) => `${value}억`
                                    }
                                }
                            },
                            plugins: {
                                legend: { display: false }
                            }
                        }}
                    />
                </ChartContainer>
            </HeroLinear>
        </Wrapper>
    );
};

// 최상위 래퍼: 전체 배경 및 기본 폰트 설정
const Wrapper = styled.div`
  background: #000000;
  color: white;
  font-family: 'Inter', sans-serif;
  padding-bottom: 100px;
`;

// 전체 화면 높이의 타이틀 영역, 중앙 정렬
const FullScreenTitleSection = styled.section`
  height: 100vh;
  background: #000000;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

// 히어로 이미지 배경 영역, 중앙 정렬 및 세로 배치
const HeroSection = styled.div`
  height: 40vh;
  background-image: url('/img/nifty-hero2.png');
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

// 타이틀 텍스트: fadeUp 애니메이션 적용
const Title = styled.h1`
  font-size: 42px;
  font-weight: 800;
  opacity: 0;
  transform: translateY(30px);
  animation: fadeUp 1.4s ease-out forwards;
  animation-delay: 0.3s;
`;

// 히어로 섹션 내 오버레이 라벨 스타일
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

// 중간 정보 섹션: 텍스트 중앙 정렬 및 마진
const Section = styled.section`
  text-align: center;
  margin: 60px 20px;
  position: relative;
  z-index: 1;
`;

// 헤드라인 텍스트 스타일
const Headline = styled.h2`
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 8px;
`;

// 변동률 텍스트: 주기적인 pulse 애니메이션 적용
const Change = styled.p`
  font-size: 14px;
  color: #ff8f2c;
  font-weight: 600;
  animation: pulse 1.6s ease-in-out infinite;
`;

export default MemeSection;

// 차트 및 설명 영역 래퍼: 패딩과 중앙 정렬, 배경색 적용
const HeroLinear = styled.section`
  background: #000000;
  color: white;
  padding: 160px 40px 100px;
  text-align: center;
`;

// 큰 헤드라인 텍스트: fadeUp 애니메이션 적용, 라인 높이 조절
const HeadlineLarge = styled.h1`
  font-size: 48px;
  font-weight: 700;
  line-height: 1.2;
  opacity: 0;
  transform: translateY(40px);
  animation: fadeUp 1.2s ease-out forwards;
  animation-delay: 0.2s;
`;

// 서브 텍스트 스타일: 작은 크기, 연한 회색
const SubText = styled.p`
  font-size: 18px;
  color: #ccc;
  margin-top: 20px;
`;

// 차트 컨테이너: 기본적으로 투명하고 축소된 상태, animate 클래스 적용 시 확대 및 불투명해짐
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