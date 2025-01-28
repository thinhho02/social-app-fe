'use client'

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { FaAngleRight } from 'react-icons/fa6';

const tabs = [
    { path: "", label: "Dashboard" },
    { path: "categories", label: "Categories" },
    { path: "creators", label: "Creators" },
];

const SideBar = () => {
    const pathname = usePathname();

    return (
        <div>
            <div className="bg-[#111c44] px-5 w-full h-screen transition-all duration-200 ease-linear">
                <div className="relative w-full h-full overflow-hidden">
                    <div className="flex flex-col items-center mt-4">
                        <Image src='/hummingbird-309492.svg' alt="" width={50} height={50} priority />
                        <div className="mb-6 h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

                        <div className="flex flex-col px-4 w-full">
                            {tabs.map((tab) => {
                                
                                const currentPath = pathname.split('/')[2] || '';
                                const isActive = currentPath === tab.path;

                                return (
                                    <Link
                                        key={tab.path}
                                        href={`/admin/${tab.path}`}
                                        className={`flex items-center justify-between w-full py-2 px-4 mb-1 rounded-md transition text-sm ${isActive ? 'bg-blue-900' : 'hover:bg-gray-700'
                                            }`}
                                    >
                                        <span>{tab.label}</span>
                                        <FaAngleRight />
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SideBar;
