import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
// Removed Slider import and slick-carousel css imports

const MemeGallery = () => {
  // Sample meme list
  const memes = [
    { image: "/img/meme1.png", title: "작은 손 (Tiny Hands)" },
    { image: "/img/meme2.png", title: "샤피 허리케인 지도 (Sharpie Hurricane Map)" },
    { image: "/img/meme3.png", title: "엇박자 박수 (Trump Clapping Out of Sync)" },
    { image: "/img/meme4.png", title: "“WRONG!” 토론 영상" },
    { image: "/img/meme5.png", title: "바람에 날리는 머리카락" },
    { image: "/img/meme6.png", title: "covfefe 트윗" }
  ];

  // Comment state and input state
  const [comments, setComments] = useState({});
  const [input, setInput] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [popupIndex, setPopupIndex] = useState(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const next = (currentIndex + 1) % memes.length;
      setCurrentIndex(next);
      const container = sliderRef.current;
      if (container) {
        const scrollTo = container.children[next].offsetLeft - container.offsetWidth / 2 + container.children[next].offsetWidth / 2;
        container.scrollTo({ left: scrollTo, behavior: "smooth" });
      }
    }, 4500);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleCommentChange = (index, value) => {
    setInput({ ...input, [index]: value });
  };

  const handleCommentSubmit = (index) => {
    if (!input[index]) return;
    const newComments = { ...comments };
    if (!newComments[index]) newComments[index] = [];
    newComments[index].push(input[index]);
    setComments(newComments);
    setInput({ ...input, [index]: "" });
  };

  const openPopup = (index) => {
    setPopupIndex(index);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setPopupIndex(null);
  };

  return (
    <Page>
      <Hero>
        <HeroTitle>
          트럼프가 밈이 아니라 밈이 트럼프다🤣<br />
          말보다 짤이 빠른 시대, 여긴 트럼프 박물관🏛️
        </HeroTitle>
        <HeroSubtitle>밈은 시대를 반영하고, 트럼프는 그 시대였다</HeroSubtitle>
      </Hero>

      <SliderWrapper ref={sliderRef}>
        {memes.map((meme, index) => (
          <MemeCard key={index} className={index === currentIndex ? "active" : ""}>
            <img src={meme.image} alt="meme" onClick={() => openPopup(index)} />
            <h3>{meme.title}</h3>
          </MemeCard>
        ))}
      </SliderWrapper>

      {showPopup && (
        <PopupOverlay onClick={closePopup}>
          <Popup onClick={(e) => e.stopPropagation()}>
            <h3>{memes[popupIndex].title}</h3>
            <input
              type="text"
              value={input[popupIndex] || ""}
              onChange={(e) => handleCommentChange(popupIndex, e.target.value)}
              placeholder="댓글을 입력하세요"
            />
            <button onClick={() => handleCommentSubmit(popupIndex)}>등록</button>
            <ul>
              {(comments[popupIndex] || []).map((cmt, i) => (
                <li key={i}>{cmt}</li>
              ))}
            </ul>
          </Popup>
        </PopupOverlay>
      )}
    </Page>
  );
};

const styleSheet = document.styleSheets[0];
const keyframes = `
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}`;
styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

const Page = styled.div`
  font-family: 'Inter', sans-serif;
  background-color: black;
  color: white;
  min-height: 100vh;
  padding: 0;
  margin: 0;
  overflow-x: hidden;       // prevent horizontal scrollbar
  width: 100vw;             // force full width
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
  transform: translateY(40px);
  animation: fadeInUp 1.2s ease-out forwards;
`;

const HeroTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.6;
`;

const HeroSubtitle = styled.p`
  font-size: 16px;
  color: #555;
`;

const SliderWrapper = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  gap: 20px;
  padding: 0 10vw;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
  width: 100%;
  position: relative;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const MemeCard = styled.div`
  flex: 0 0 50%;
  scroll-snap-align: center;
  text-align: center;
  transition: all 0.6s ease;
  opacity: 0.4;
  transform: scale(0.85) translateX(0);

  &.active {
    opacity: 1;
    transform: scale(1) translateX(0);
  }

  img {
    width: 100%;
    max-height: 220px;
    object-fit: contain;
    margin-bottom: 12px;
    cursor: pointer;
    filter: grayscale(80%);
    transition: filter 0.4s ease, transform 0.4s ease;
  }

  &.active img {
    filter: grayscale(0%);
  }

  h3 {
    font-size: 16px;
    margin-bottom: 10px;
  }
`;

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const Popup = styled.div`
  background: #222;
  padding: 24px;
  border-radius: 12px;
  color: white;
  width: 400px;
  max-width: 90%;
  h3 {
    margin-bottom: 12px;
  }
  input {
    width: 80%;
    padding: 8px;
    margin-right: 6px;
    border-radius: 6px;
    border: none;
  }
  button {
    padding: 8px 12px;
    background: #ff8f2c;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }
  ul {
    margin-top: 12px;
    list-style: none;
    padding-left: 0;
  }
  li {
    font-size: 14px;
    margin: 4px 0;
  }
`;

export default MemeGallery;