import React from 'react';
import { cn } from '@/lib/utils';

interface Props {
    className?: string;
    size: "s" | "m" | "l";
    children: React.ReactNode;

}

export const Title: React.FC<Props> = (props) => {
    const { className, children, size } = props;
    const setTag = {
        s: "h3",
        m: "h2",
        l: "h1"
    }
    const setSize = {
        s: "text-[16px] font-medium",
        m: "text-[24px] font-bold",
        l: "text-[36px] font-bold"
    }

    return React.createElement(setTag[size], { className: cn(setSize[size], className) }, children)
}