import React from 'react';
import ChatWindow from './components/ChatWindow';

const App: React.FC = () => {
  return (
    <div className="bg-[#fff7ed] h-full flex flex-col items-center text-gray-800 p-2 sm:p-4">
      {/* GLOBAL RESPONSIVE CSS för bilder & knappar */}
      <style>
        {`
          img {
            max-width: 100%;
            height: auto;
            display: block;
          }
          button {
            max-width: 100%;
            box-sizing: border-box;
          }
          html, body, #root {
            max-width: 100vw;
            overflow-x: hidden;
          }
        `}
      </style>
      {/* Chat container */}
      <div className="w-full max-w-2xl flex-1 flex flex-col shadow-2xl rounded-2xl overflow-hidden bg-white min-h-0">
        <header className="bg-[#f97316] text-white p-4 shadow-md z-10 flex-shrink-0">
          <h1 className="text-2xl font-bold text-center">Flexibel Hälsostudio</h1>
          <p className="text-sm text-center text-white/90">Din personliga hälsoguide</p>
        </header>
        <ChatWindow />
      </div>
      <footer className="text-center text-xs text-gray-500 pt-4 pb-2">
        <a href="https://www.flexibelfriskvardhalsa.se/boka-introsamtal" target="_blank" rel="noopener noreferrer" className="hover:text-[#f97316] transition-colors">
          © 2025 Flexibel Hälsostudio. Alla rättigheter förbehållna.
        </a>
      </footer>
    </div>
  );
};

export default App;
