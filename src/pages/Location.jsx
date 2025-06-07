import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const infos = [
    {
      img: "/img/location1.png",
      title: "백악관 외부 전경",
      desc: "트럼프 대통령이 머물렀던 백악관의 웅장한 외부 모습입니다.",
    },
    {
      img: "/img/location2.png",
      title: "백악관 내부 모습",
      desc: "역사와 전통이 깃든 백악관 내부의 다양한 공간을 확인해보세요.",
    },
    {
      img: "/img/location3.png",
      title: "전설의 코카콜라 버튼",
      desc: "대통령 책상 위에 놓인 유명한 코카콜라 버튼의 전설적인 이야기입니다.",
    },
    {
      img: "/img/location4.png",
      title: "백악관 도서관",
      desc: "조용히 책을 읽거나 손님을 맞이하는 공간으로, 역사적 문서도 전시되어 있습니다.",
    },
    {
      img: "/img/location5.png",
      title: "백악관 장미 정원",
      desc: "로즈 가든은 미국 대통령이 기자회견을 하거나 손님을 초대하는 대표적 장소입니다.",
    },
    {
      img: "/img/location6.png",
      title: "상황실",
      desc: "국가 안보와 관련된 긴급 회의가 열리는 곳으로, 영화에도 자주 등장합니다.",
    }
];

const Wrapper = styled.div`
  padding: 40px 20px;
  background-color: black;
  color: white;
  font-family: 'Inter', sans-serif;
  min-height: 100vh;
  box-sizing: border-box;
`;

const IntroSection = styled.header`
  text-align: center;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transform: translateY(40px);
  transition: all 1s ease;

  &.show {
    opacity: 1;
    transform: translateY(0);
  }

  h1 {
    font-size: 32px;
    font-weight: 700;
    line-height: 1.3;
  }

  p {
    font-size: 18px;
    font-weight: 400;
    margin-top: 16px;
    line-height: 1.5;
    color: #ccc;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.8s ease;
  }

  &.show p {
    opacity: 1;
    transform: translateY(0);
  }
`;

const BoxSection = styled.section`
  max-width: 900px;
  margin: 0 auto 50px;
  display: flex;
  gap: 40px;
  background-color: #1d1d1f;
  border-radius: 12px;
  overflow: hidden;
  box-sizing: border-box;

  opacity: 0;
  transform: translateY(40px);
  transition: all 0.6s ease;

  &.show {
    opacity: 1;
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    margin-bottom: 40px;
  }
`;

const BoxLeft = styled.div`
  flex: 1;
  background-color: #1d1d1f;
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  overflow: hidden;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    border-right: 1px solid #333;
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
  }
`;

const BoxRight = styled.div`
  flex: 1;
  color: #f5f5f5;
  padding: 30px 25px;
  font-size: 16px;
  line-height: 1.6;
  display: flex;
  align-items: center;

  p {
    margin: 0;
  }

  @media (max-width: 768px) {
    padding: 20px 15px;
  }
`;

const MapBox = styled.div`
  max-width: 900px;
  height: 400px;
  margin: 0 auto 60px;
  border-radius: 12px;
  overflow: hidden;

  iframe {
    width: 100%;
    height: 100%;
    border: none;
    display: block;
  }

  @media (max-width: 768px) {
    height: 300px;
    margin-bottom: 40px;
  }
`;

const GridBox = styled.div`
  max-width: 900px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 25px;
  }
`;

const GridItem = styled.div`
  background-color: #222;
  border-radius: 12px;
  overflow: hidden;
  color: white;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;

  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;

  &.show {
    opacity: 1;
    transform: translateY(0);
  }

  img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-bottom: 1px solid #444;
    filter: grayscale(100%);
    transition: filter 0.4s ease;
  }

  &:hover img {
    filter: grayscale(0%);
  }

  h3 {
    margin: 15px 0 8px;
    font-size: 20px;
    font-weight: 700;
  }

  p {
    margin: 0 20px;
    font-size: 15px;
    color: #ccc;
    text-align: center;
    line-height: 1.4;
  }
`;

const TransitionWrapper = styled.div`
  opacity: ${props => (props.visible ? 1 : 0)};
  transform: translateY(${props => (props.visible ? "0" : "10px")});
  transition: all 0.6s ease;
`;

const TrumpLocation = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [introVisible, setIntroVisible] = useState(false);
  const itemRefs = useRef([]);
  const boxRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false); // 사라지게
      setTimeout(() => {
        setCurrentIndex((prev) =>
          prev + 3 >= infos.length ? 0 : (prev + 3) % infos.length
        );
        setVisible(true); // 다시 나타나게
      }, 500); // 페이드아웃 후 전환
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    }, { threshold: 0.3 });

    itemRefs.current.forEach(el => el && observer.observe(el));
    if (boxRef.current) {
      observer.observe(boxRef.current);
    }
    return () => {
      itemRefs.current.forEach(el => el && observer.unobserve(el));
      if (boxRef.current) {
        observer.unobserve(boxRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIntroVisible(true);
    }, 200);
  }, []);

  return (
    <Wrapper>
      <IntroSection className={introVisible ? "show" : ""}>
        <h1>트럼프는 지금 어디에 살고 있을까? 🏛️</h1>
        <p>당신이 몰랐던 트럼프의 근황을 지금 공개합니다.</p>
      </IntroSection>

      <BoxSection ref={boxRef}>
        <BoxLeft>
          <video
            src="/video/white_house.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
        </BoxLeft>
        <BoxRight>
          <p>
            백악관은 미국 대통령의 공식 거처이자 모든 정치의 중심입니다.
            이곳에서 미국의 역사와 현재가 만납니다. 웅장한 외관과 다양한
            내부 공간은 미국의 권력과 전통을 상징합니다.
          </p>
        </BoxRight>
      </BoxSection>

      <MapBox>
        <iframe
          title="백악관 위치"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3105.0016142052466!2d-77.03871862340896!3d38.89767617173427!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7b7be09189b51%3A0x6e3a6e5e06d6bb50!2sThe%20White%20House!5e0!3m2!1sko!2skr!4v1713500000000!5m2!1sko!2skr"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </MapBox>

      <TransitionWrapper visible={visible}>
        <GridBox>
          {infos.slice(currentIndex, currentIndex + 3).map((item, idx) => (
            <GridItem key={idx} ref={el => (itemRefs.current[idx] = el)}>
              <img src={item.img} alt={item.title} />
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </GridItem>
          ))}
        </GridBox>
      </TransitionWrapper>
    </Wrapper>
  );
};

export default TrumpLocation;
