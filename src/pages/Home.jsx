import React, { useEffect, useRef } from "react";
import styled from "styled-components";

// 카드 데이터 배열 (타이틀, 설명, 아이콘 이미지)
const cards = [
    {
        icon: "/img/icon1.png",
        title: "🧩 밈으로 만나는 트럼프",
        desc: "트럼프의 명언이 매일 랜덤으로 등장합니다. 오늘은 어떤 말을 남겼을까요?"
    },
    {
        icon: "/img/icon2.png",
        title: "💬 트럼프의 입에서 나온 말들",
        desc: "웃기고 당황스럽고 때로는 멋진, 직접 말한 명언과 유머 발언을 카드 형식으로 소개합니다."
    },
    {
        icon: "/img/icon3.png",
        title: "📊 내 돈을 돌려줘, 트럼프!",
        desc: "주식 하락의 원흉(?)을 향한 유쾌한 반격. 실제 주가와 함께 보는 트럼프 스타일의 주식 갤러리."
    }
];

const Home = () => {
    const cardsRef = useRef([]);
    const introRef = useRef(null);
    const heroTextRef = useRef(null);

    // 스크롤 인터섹션 옵저버 등록 (인트로 및 카드 요소 애니메이션 등장)
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add("show");
                    }, index * 150);
                }
            });
        }, { threshold: 0.3 });

        cardsRef.current.forEach(el => el && observer.observe(el));
        if (introRef.current) {
            introRef.current.querySelectorAll("div, img").forEach(el => observer.observe(el));
        }
        if (heroTextRef.current) {
            observer.observe(heroTextRef.current);
        }

        return () => {
            cardsRef.current.forEach(el => el && observer.unobserve(el));
            if (introRef.current) {
                introRef.current.querySelectorAll("div, img").forEach(el => observer.unobserve(el));
            }
            if (heroTextRef.current) {
                observer.unobserve(heroTextRef.current);
            }
        };
    }, []);

    // JSX 영역 구성
    return (
        <Wrapper>
            <Hero>
                <HeroImage src="/img/Background.png" />
                <HeroText ref={heroTextRef}>
                    <h1>Make America Great Again</h1>
                    <p>벽을 세우고, 관세를 올리고, 트윗을 날리던 그 남자<br />믿기 힘들겠지만, 이건 다 실화입니다.</p>
                </HeroText>
            </Hero>

            <Intro ref={introRef}>
                <IntroText>
                    <h2>Donald Trump</h2>
                    <p>
                        안녕하세요, 제 이름은 도널드 J. 트럼프입니다.<br />
                        저는 미국의 제45대 대통령이자 비즈니스맨입니다.<br />
                        부동산 개발부터 리얼리티 TV, 정치까지 다양한 분야에서 활동해왔습니다.<br />
                        지금도 여전히 뉴스의 중심, 밈의 주인공으로 활약 중입니다.
                    </p>
                </IntroText>
                <Profile src="/img/trump.png" />
            </Intro>

            <SectionTitle>Summary of this text</SectionTitle>

            <CardGrid>
                {cards.map((card, i) => (
                    <Card key={i} ref={el => cardsRef.current[i] = el}>
                        <CardIcon
                            src={card.icon}
                            alt={card.title}
                        />
                        <CardText>
                            <h3>{card.title}</h3>
                            <p>{card.desc}</p>
                        </CardText>
                    </Card>
                ))}
            </CardGrid>
        </Wrapper>
    );
};

// 전체 페이지 스타일링 Wrapper
const Wrapper = styled.div`
    background-color: black;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

// 히어로 섹션 스타일
const Hero = styled.section`
    position: relative;
    height: 100vh;
    overflow: hidden;
`;

const HeroImage = styled.img`
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.4);
`;

const HeroText = styled.div`
    position: relative;
    z-index: 2;
    padding: 32vh 30vw 5rem;
    max-width: 720px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease;

    &.show {
        opacity: 1;
        transform: translateY(0);
    }

    h1 {
        font-size: 3.5rem;
        font-weight: 700;
        margin-bottom: 1rem;
    }
    p {
        font-size: 1.2rem;
        line-height: 1.6;
        color: #ccc;
    }
`;

// 인트로 섹션 스타일
const Intro = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 6rem 8vw 2rem;
    flex-wrap: wrap;
    gap: 4rem;
    text-align: left;
`;

const IntroText = styled.div`
    max-width: 480px;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease;
    &.show {
        opacity: 1;
        transform: translateY(0);
    }

    h2 {
        font-size: 1.8rem;
        margin-bottom: 1rem;
    }

    p {
        font-size: 1rem;
        line-height: 1.7;
        color: #ccc;
    }
`;

const Profile = styled.img`
    width: 180px;
    border-radius: 12px;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease;
    &.show {
        opacity: 1;
        transform: translateY(0);
    }
    &:hover {
        transform: scale(1.05);
    }
`;

// 섹션 제목 스타일
const SectionTitle = styled.h2`
    font-size: 1.6rem;
    padding: 3rem 6vw 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
`;

// 카드 그리드 스타일
const CardGrid = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 0 6vw 4rem;
    justify-content: center;
    align-items: center;
`;

// 카드 스타일 (중복 transition 정리)
const Card = styled.div`
    background: #1d1d1f;
    color: #f5f5f7;
    border-radius: 20px;
    padding: 1.2rem 1.5rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    width: 100%;
    max-width: 720px;
    min-height: 120px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.6s ease;

    &.show {
        opacity: 1;
        transform: translateY(0);
    }

    &:hover {
        transform: translateY(-6px) scale(1.025);
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
    }
`;

// 카드 아이콘 스타일 분리
const CardIcon = styled.img`
    width: 84px;
    height: 84px;
    border-radius: 16px;
    background-color: #fff;
    object-fit: cover;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
`;

// 카드 텍스트 스타일
const CardText = styled.div`
    text-align: left;

    h3 {
        margin: 0 0 0.6rem;
        font-size: 1.1rem;
        font-weight: 600;
    }

    p {
        color: #ccc;
        font-size: 0.96rem;
        line-height: 1.6;
    }
`;

export default Home;