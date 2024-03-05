import React from 'react';

interface QuoteProps {
  heading: string;
  paragraph: string;
  name: string;
}

const Quote: React.FC<QuoteProps> = ({ heading, paragraph, name }) => {
  return (
    <div className="flex items-center mt-5 md:mt-0">
      <div className="md:ml-8">
        <h1 className="font-extrabold text-2xl md:text-4xl">{heading}</h1>
        <p className="text-xl font-bold mt-2 md:mt-5">{paragraph}</p>
        <p className="text-gray-700">{name}</p>
      </div>
    </div>

  );
};

export default Quote;
