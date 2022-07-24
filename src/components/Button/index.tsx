import { ReactNode } from 'react';

import styles from './styles.module.css';

interface ButtonProps {
  color: string;
  label: string;
  onClick: () => void;
  fill?: boolean
}

export function Button({ color, label, onClick, fill}: ButtonProps) {
  return (
    <div 
      className='flex justify-center items-center border py-6 font-semibold rounded'
      onClick={onClick} 
      style={{
        color: fill ? '#FFF' : color,
        borderColor: color,
        backgroundColor: fill ? color : 'transparent'
      }}
    >
      {label}
    </div>
  );
}
