"use client";
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from './ui';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface Props {
    className?: string;
}

export const ProfileError: React.FC<Props> = (props) => {
    const { className } = props;
    const update = () => {
        window.location.reload();
    }
    return (
        <div className={cn("h-[100vh] flex items-center  justify-center gap-10", className)}>
            <div className="flex flex-col justify-center gap-6">
                <h1 className="text-[35px] text-bold">Доступ запрещён</h1>
                <span className="text-[18px] text-gray-400">Данную страницу могут просматривать только<br /> авторизованные пользователи</span>
                <div className="flex gap-5 mt-10">
                    <Link href={'/'}><Button variant="outline" className="text-[18px]"><ArrowLeft />На главную</Button></Link>
                    <Button variant="secondary" className="text-[18px]" onClick={update}>Обновить</Button>
                </div>
            </div>
            <div >
                <Image src="/lock.png" alt="lock-icon" width={300} height={300} />
            </div>
        </div>
    );
}