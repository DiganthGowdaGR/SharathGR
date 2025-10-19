"use client";
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: '700', // Bold
});

const StyledH2 = ({ text }: { text: string }) => {
  return (
    <h2
      className={`${montserrat.className} text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text 
        bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 whitespace-pre-line`}
    >
      {text}
    </h2>
  );
};

export default StyledH2;