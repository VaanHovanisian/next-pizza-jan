"use client"
import React from 'react';
import { cn } from '@/lib/utils';
import { Button, Card } from '../ui';
import { CardContent, CardHeader, CardTitle } from '../ui/card';
import { FormInput } from '../form/form-input';
import { Trash2 } from 'lucide-react';
import { FormTextarea } from '../form/form-textarea';

interface Props {
    className?: string;
}

export const CheckoutAddress: React.FC<Props> = (props) => {
    const { className } = props;

    return (

        <Card className="w-full">
            <CardHeader>
                <CardTitle className="flex justify-between">
                    <span>3. Адрес доставки</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <FormInput name="address" label="Address" />
                <FormTextarea name="comment" label="Message" />
            </CardContent>

        </Card>



    );
}