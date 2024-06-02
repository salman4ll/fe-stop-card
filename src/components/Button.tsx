import React from "react";

interface ButtonProps {
  name: string;
  color: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ name, color }) => {
  return (
    <button 
      className="mr-3" 
      style={{ backgroundColor: color }}       
    >   
      {name}   
    </button>
  )
};

export default Button;
