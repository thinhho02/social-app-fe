import React from "react";
import { FaAngleRight, FaHouse } from 'react-icons/fa6'
import Link from "next/link";

interface BreadcrumbItem {
    label: string;
    href?: string;
};

interface BreadcrumbProps {
    isAdmin?: boolean
    items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items , isAdmin }) => {
    return (
        <nav className="flex">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                <li className="inline-flex items-center">
                    <Link
                        href={isAdmin ? '/admin' : '/'}
                        className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                    >
                        <FaHouse />
                    </Link>
                </li>

                {/* Render each breadcrumb item dynamically */}
                {items.map((item, index) => {
                    // If it's the last item (current page), don't show a link, only text
                    const isLast = index === items.length - 1;

                    return (
                        <li key={index}>
                            <div className="flex items-center">
                                <FaAngleRight />
                                {isLast ? (
                                    <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                                        {item.label}
                                    </span>
                                ) : (
                                    <Link
                                        href={item.href || "#"}
                                        className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                                    >
                                        {item.label}
                                    </Link>
                                )}
                            </div>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
