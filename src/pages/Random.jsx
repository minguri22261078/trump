import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";

const Page = styled.div`
  font-family: 'Inter', sans-serif;
  background: black;
  color: white;
  padding: 0;
  margin: 0;
`;

const Hero = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 20px;
  opacity: 0;
  transform: translateY(30px);
  transition: all 1s ease;

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }

  h2 {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 1rem;
    line-height: 1.6;
  }

  p {
    font-size: 16px;
    color: #555;
    transition: all 0.6s ease;
  }
`;

const Block = styled.div`
  max-width: 600px;
  width: 100%;
  margin: 60px auto 100px;
`;

const Label = styled.p`
  text-align: center;
  font-size: 20px;
  color: #ff8f2c;
  font-weight: 600;
  margin-bottom: 24px;
  animation: typingFade 1.2s ease-in-out forwards;
  opacity: 0;
`;

const StyledButton = styled.button`
  display: block;
  margin: 12px auto;
  padding: 14px 28px;
  border-radius: 14px;
  background: linear-gradient(145deg, #1f1f1f, #0e0e0e);
  color: #fff;
  font-weight: 500;
  font-size: 16px;
  letter-spacing: 0.3px;
  border: 1px solid #444;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.04);
    background: linear-gradient(145deg, #333, #1c1c1c);
    box-shadow: 0 8px 20px rgba(255, 143, 44, 0.4);
  }
`;

const SlotWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  background: none;
  border: none;
  margin-bottom: 24px;
`;

const SlotItem = styled.div`
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  text-align: center;
`;

const StyledImage = styled.img`
  width: 240px;
  height: auto;
  object-fit: contain;
  margin-bottom: 20px;
`;

const ResultSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: left;
  gap: 32px;
  margin: 60px auto;
  justify-content: center;

  @media (max-width: 700px) {
    flex-direction: column;
    text-align: center;
  }
`;

const ResultContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 300px;
`;

const ResultText = styled.p`
  font-size: 20px;
  font-weight: 600;
  color: #ff8f2c;
  animation: typingFade 1.2s ease-in-out forwards;
  opacity: 0;
`;

const ResultButton = styled(StyledButton)`
  margin-top: 20px;
`;

const ResultImage = styled.img`
  width: 280px;
  height: auto;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
`;

const questions = [
  {
    q: "1. 당신의 아침 루틴은?",
    a: ["일단 알람 끄기", "핸드폰 보기", "기지개 켜며 트윗 작성"],
  },
  {
    q: "2. SNS에서 주로 하는 행동은?",
    a: ["댓글 살펴보기", "좋아요 누르기", "내 글 리프레시 10번"],
  },
  {
    q: "3. 지금 기분을 이모지로 표현하면?",
    a: ["😴", "😎", "🤯"],
  },
  {
    q: "4. 지금 가장 먹고 싶은 음식은?",
    a: ["햄버거", "샐러드", "스테이크"],
  },
];

const resultSet = [
  {
    img: "/img/random-quote1.png",
    text: "오늘은 모두에게 트윗을 날려도 괜찮은 날입니다📱",
  },
  {
    img: "/img/random-quote2.png",
    text: "당신은 자신감 넘치는 스타일! 머리 스타일도 남다르군요💇‍♂️",
  },
  {
    img: "/img/random-quote3.png",
    text: "전략가 타입! 트럼프도 감탄할 셈법입니다💼",
  },
  {
    img: "/img/random-quote4.png",
    text: "오늘의 운세: 벽을 세워도 기분은 좋을 날입니다🧱",
  },
  {
    img: "/img/random-quote5.png",
    text: "거래는 셈보다 타이밍. 지금이 그때입니다💸",
  },
  {
    img: "/img/random-quote6.png",
    text: "운이 좋군요. 오늘은 백악관에 초대받을 수도!🏛️",
  },
];

const Random = () => {
  // 심리테스트 state/logic
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const next = (answer) => {
    const updated = [...answers, answer];
    setAnswers(updated);
    if (step === questions.length - 1) {
      const totalScore = updated.join("").length;
      const resultIndex = totalScore % resultSet.length;
      setResult(resultSet[resultIndex]);
    } else {
      setStep(step + 1);
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers([]);
    setResult(null);
  };

  const currentQuestion = useMemo(() => questions[step], [step]);

  return (
    <Page>
      <Hero className={heroVisible ? "visible" : ""}>
        <h2>
          트럼프 심리 테스트 🔮
          <br />
          오늘의 트럼프 운세를 알아보세요!
        </h2>
        <p className="fade-in">
          4가지 질문에 답하면 당신만의 트럼프 운세를 알려드립니다!
        </p>
      </Hero>

      <Block>
        {!result ? (
          <>
            <h3>트럼프 심리 테스트 🔮</h3>
            <p>재치 있는 질문에 답하고 당신의 트럼프 운세를 확인해보세요!</p>

            <Label className="fade-in">{currentQuestion.q}</Label>
            {currentQuestion.a.map((option, idx) => (
              <StyledButton
                key={idx}
                className="fade-in"
                onClick={() => next(option)}
              >
                {option}
              </StyledButton>
            ))}
          </>
        ) : (
          <>
            <h3>🎉 당신의 트럼프 운세 🎉</h3>
            <ResultSection>
              <ResultImage src={result.img} alt="Result" />
              <ResultContent>
                <ResultText>{result.text}</ResultText>
                <ResultButton onClick={reset}>다시 해보기 🔁</ResultButton>
              </ResultContent>
            </ResultSection>
          </>
        )}
      </Block>

      <div style={{ backgroundColor: "black", height: "100px", width: "100%" }} />
      <style>
        {`
          .fade-in {
            opacity: 0;
            transform: translateY(20px);
            animation: fadeSlideUp 0.6s ease forwards;
          }
          @keyframes fadeSlideUp {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes typingFade {
            0% {
              opacity: 0;
              transform: translateY(10px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </Page>
  );
};

export default Random;
