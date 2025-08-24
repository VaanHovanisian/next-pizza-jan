"use client"
import React from 'react';
import { cn } from '@/lib/utils';
import { Button, Card } from '../ui';
import { CardContent, CardHeader, CardTitle } from '../ui/card';
import { FormInput } from '../form/form-input';
import { Trash2 } from 'lucide-react';

interface Props {
    className?: string;
}

export const CheckoutInfo: React.FC<Props> = (props) => {
    const { className } = props;

    return (

        <Card className="w-full">
            <CardHeader>
                <CardTitle className="flex justify-between">
                    <span>2. Персональная информация</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
                <FormInput name="name" label="Name" />
                <FormInput name="lastname" label="Last Name" />
                <FormInput name="email" label="Email" />
                <FormInput name="phone" label="Phone" />
            </CardContent>

        </Card>



    );
}