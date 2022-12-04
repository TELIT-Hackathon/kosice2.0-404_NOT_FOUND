const BottomItem = ({img, name, text, onClick }) => {
  return (
    <li className='flex justify-between items-center w-full' onClick={() => onClick?.()}>
      <div className='flex space-x-2 p-2'>
        <img src={img} alt={name} className="w-14 h-14 rounded-full object-cover"/>
        <div className="flex flex-col justify-center">
          <h2 className="font-bold">{name}</h2>
          <p className="text-sm">{text}</p>
        </div>
      </div>

      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth='3'
        stroke='#2EBFA5'
        className='w-8 h-10 rotate-90'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M4.5 15.75l7.5-7.5 7.5 7.5'
        />
      </svg>
    </li>
  );
};

export default BottomItem;
