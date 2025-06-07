import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// 페이지 컴포넌트 임포트
import Home from "./pages/Home";
import Stock from "./pages/Stock";
import Quotes from "./pages/Quotes";
import Memes from "./pages/Memes";
import Random from "./pages/Random";
import Location from "./pages/Location";

import NiftyPage from "./subpage/nifty";
import Sp500Page from "./subpage/sp500";
import NasdaqPage from "./subpage/nasdaq";

const App = () => {
  return (
      <Router>
        <div style={{ margin: 0, padding: 0 }}>
          <Navbar />
          <main style={{ minHeight: "100vh", padding: 0, margin: 0 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/stock" element={<Stock />} />
              <Route path="/Location" element={<Location />} />
              <Route path="/quotes" element={<Quotes />} />
              <Route path="/memes" element={<Memes />} />
              <Route path="/random" element={<Random />} />

              <Route path="/subpage/nifty" element={<NiftyPage />} />
              <Route path="/subpage/sp500" element={<Sp500Page />} />
              <Route path="/subpage/nasdaq" element={<NasdaqPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
  );
};

export default App;