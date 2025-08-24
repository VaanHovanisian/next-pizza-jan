import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '../ui';
import { Minus, Plus } from 'lucide-react';

interface Props {
    className?: string;
    increment: () => Promise<void>;
    decrement: () => Promise<void>;
    count: number
}

export const BasketCountButton: React.FC<Props> = (props) => {
    const { className, increment, decrement, count } = props;
    const [loading, setLoading] = React.useState(false);
    const handleCount = async (mode: "+" | "-") => {
        setLoading(true);
        if (mode === "+") {
            await increment();
        } else {
            await decrement();
        }
        setLoading(false);
    }
    return (
        <div className={cn("flex gap-2", className)}>
            <Button variant="outline" disabled={loading || count === 1} onClick={() => handleCount("-")}><Minus /></Button>
            <span>{count}</span>
            <Button variant="outline" disabled={loading} onClick={() => handleCount("+")}><Plus /></Button>
        </div>
    );
}