// components/Card.js
import Image from 'next/image';

const Card = ({ imageSrc, title, subtitle }) => {
  return (
    <div className="max-w-sm h-[80px] cursor-pointer  rounded-[5px] flex items-center overflow-hidden border border-gray-300">
      <Image className="" src={imageSrc} alt={title} width={100} height={50} />
      <div className="px-6 py-4 bg-gray-800">
        <div className="font-bold text-white text-xl mb-2">{title}</div>
        <p className=" text-white text-base">{subtitle}</p>
      </div>
    </div>
  );
};

export default Card;
