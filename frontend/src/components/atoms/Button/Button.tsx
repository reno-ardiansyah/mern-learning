import React from 'react';
import { Button as AntButton, ButtonProps } from 'antd';

const Button: React.FC<ButtonProps> = (props) => {
  return <AntButton {...props}>{props.children}</AntButton>;
};

export default Button;
