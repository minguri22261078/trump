import React from "react";
import styled from "styled-components";

const QuoteGallery = () => {
  const [heroVisible, setHeroVisible] = React.useState(false);
  const [popupVideoId, setPopupVideoId] = React.useState(null);
  const rowRefs = React.useRef([]);

  React.useEffect(() => {
    setTimeout(() => setHeroVisible(true), 200);
  }, []);

  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    }, { threshold: 0.3 });

    rowRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      rowRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const quotes = [
    {
      side: "left",
      img: "/img/quote-a.png",
      quote: `"Make America Great Again."`,
      sub: "→ 트럼프의 대표 슬로건. 간결하면서도 강한 메시지.",
      youtubeId: "GH-XrMi7yBo"
    },
    {
      side: "right",
      img: "/img/quote-b.png",
      quote: `"I have the best words."`,
      sub: "→ 자신의 어휘력과 표현 능력을 자랑할 때 던진 말. 밈으로도 유명.",
      youtubeId: "FSuEzLJpqPE"
    },
    {
      side: "left",
      img: "/img/quote-c.png",
      quote: `"You're fired!"`,
      sub: "→ 리얼리티 TV에서 유행시킨 상징적인 대사.",
      youtubeId: "GJ-aEfU9-Rc"
    },
    {
      side: "right",
      img: "/img/quote-d.png",
      quote: `"I know more about ISIS than the generals do. Believe me."`,
      sub: "→ 자칭 전문가로서 과장된 표현으로 자주 인용되는 발언 중 하나.",
      youtubeId: "s1JCrE_4BiM"
    },
    {
      side: "left",
      img: "/img/quote-e.png",
      quote: `"Nobody builds walls better than me."`,
      sub: "→ 멕시코 국경 장벽을 강조하며 한 말로, 자화자찬의 대표적 예.",
      youtubeId: "LFESuyd1nTc"
    },
  ];

  return (
    <Page>
      <Hero className={heroVisible ? "show" : ""}>
        <div>
          <h2>
            트럼프가 남긴 전설적인 한마디들🗨️
            <br />
            대단한 통찰력(?)과 유머가 가득!
            <br />
            놓치면 손해보는 명언.zip📦
          </h2>
          <p>화제의 중심, 트럼프 명언을 지금 만나보세요.</p>
        </div>
      </Hero>

      <QuoteList>
        {quotes.map((item, idx) => (
          <QuoteRow
            key={idx}
            side={item.side}
            ref={(el) => (rowRefs.current[idx] = el)}
          >
            {item.side === "left" && <Avatar src={item.img} />}
            <Bubble onClick={() => setPopupVideoId(item.youtubeId)}>
              <Main>{item.quote}</Main>
              <Sub>{item.sub}</Sub>
            </Bubble>
            {item.side === "right" && <Avatar src={item.img} />}
          </QuoteRow>
        ))}
      </QuoteList>

      {popupVideoId && (
        <PopupOverlay onClick={() => setPopupVideoId(null)}>
          <PopupContent onClick={(e) => e.stopPropagation()}>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${popupVideoId}?autoplay=1`}
              title="YouTube video"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </PopupContent>
        </PopupOverlay>
      )}
    </Page>
  );
};

const Page = styled.div`
  background: black;
  color: white;
  font-family: 'Inter', sans-serif;
  padding: 60px 20px 120px;
`;

const Hero = styled.div`
  text-align: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transform: translateY(30px);
  transition: all 1s ease;

  &.show {
    opacity: 1;
    transform: translateY(0);
  }

  h2 {
    font-size: 24px;
    font-weight: 700;
    line-height: 1.6;
    margin-bottom: 16px;
  }

  p {
    font-size: 16px;
    color: #ccc;
    opacity: 0;
    transform: translateY(20px);
    transition: all 1s ease;
    transition-delay: 0.4s;
  }

  &.show p {
    opacity: 1;
    transform: translateY(0);
  }
`;

const QuoteList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  max-width: 960px;
  margin: 0 auto;
`;

const QuoteRow = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.side === "right" ? "row-reverse" : "row")};
  align-items: center;
  gap: 20px;
  opacity: 0;
  transform: translateX(${(props) => (props.side === "right" ? "50px" : "-50px")});
  transition: all 0.6s ease;

  &.show {
    opacity: 1;
    transform: translateX(0);
  }
`;

const Avatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;

const Bubble = styled.div`
  background: #444;
  padding: 20px;
  border-radius: 20px;
  max-width: 600px;
  cursor: pointer;
`;

const Main = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const Sub = styled.div`
  font-size: 14px;
  color: #ccc;
`;

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const PopupContent = styled.div`
  background: #000;
  padding: 20px;
  border-radius: 10px;

  iframe {
    border-radius: 10px;
    overflow: hidden;
  }
`;

export default QuoteGallery;