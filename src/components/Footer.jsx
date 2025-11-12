import React from "react";

const Footer = () => {
  return (
    <footer className="mt-16 bg-black/80 border-t border-gray-800 text-gray-400 text-center py-6">
      <p className="text-sm">
        © {new Date().getFullYear()}{" "}
        <span className="text-red-500 font-semibold">MovieView</span> — Built with ❤️ using React + Tailwind
      </p>
      <p className="text-xs mt-1 text-gray-500">
        Powered by OMDb API 🎬
      </p>
    </footer>
  );
};

export default Footer;
