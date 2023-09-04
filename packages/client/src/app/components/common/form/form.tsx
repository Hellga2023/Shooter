import React, { FC, ReactNode } from 'react';
// import classNames from 'classnames';
// import style from './form.module.scss';

type TFormProps = {
    children: ReactNode;
    className: string;
};

const Input: FC<TFormProps> = ({ children, className }) => (
    <form className={className}>{children}</form>
);

export default Input;
