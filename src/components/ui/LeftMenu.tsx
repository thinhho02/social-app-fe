'use client'

import { getCategories, searchByNameCategory } from "@/apis/category";
import { Category } from "@/types/category";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { FaBars, FaCaretRight, FaChevronRight, FaList, FaSistrix, FaUpRightFromSquare, FaXmark } from "react-icons/fa6";

const LeftMenu = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

    useEffect(() => {
        async function setDataCategories() {
            const categories = await getCategories('category?limit=3')
            setCategories(categories.data)
        }
        setDataCategories()
    },[])

    const debounce = (func: (...args: any[]) => void, delay: number) => {
        let timer: NodeJS.Timeout;
        return (...args: any[]) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func(...args);
            }, delay);
        };
    };
    const fetchCategories = async (query: string) => {
        if (!query) {
            setCategories([]);
            return;
        }

        try {
            const response = await searchByNameCategory('category/search', query);
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
            setCategories([]);
        }
    };

    const debouncedFetchCategories = useMemo(() => debounce(fetchCategories, 300), []);
    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value
        setSearchQuery(query)
        debouncedFetchCategories(query)
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const toggleCategories = () => {
        setIsCategoriesOpen(!isCategoriesOpen);
    };


    return (
        <>
            <button
                className="inline-flex items-center justify-center p-1 w-10 h-10 text-gray-500 rounded-lg focus:outline-none focus:ring-2 dark:text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
                onClick={toggleMenu}
            >
                <FaBars />
            </button>

            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={closeMenu}
                ></div>
            )}

            <div
                className={`fixed top-0 left-0 h-full w-64 bg-black text-white z-50 shadow-lg transform transition-transform duration-300 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="px-4 pt-1 flex justify-between items-center border-b border-gray-700">
                    <span className="relative w-3/12 h-10">
                        <Image src='/hummingbird-309492.svg' alt="" fill />
                    </span>
                    <button onClick={closeMenu}>
                        <FaXmark />
                    </button>
                </div>
                <div className="px-4 mt-4">
                    <button onClick={toggleCategories} type="button" className={`flex items-center gap-2 w-full p-4 py-2 px-4 mb-1 rounded-md transition text-sm ${isCategoriesOpen ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>
                        <span className=""><FaList /></span>
                        Categories
                    </button>
                </div>
                {isCategoriesOpen && <div className="px-4 mt-2">
                    <div className="flex items-center bg-gray-800 rounded-lg px-3 py-2 gap-2">
                        <FaSistrix />
                        <input
                            onChange={handleChangeInput}
                            type="text"
                            placeholder="Search"
                            className="bg-transparent text-sm text-white outline-none w-full"
                        />
                    </div>
                    <ul className="text-sm">
                        {categories?.map((category) => (
                            <li key={category._id} className="py-4 px-2 border-b border-gray-700">
                                <Link href={`/categories/${category.slug}`} className="flex items-center gap-3 hover:text-orange-500">
                                    <FaCaretRight />
                                    <span>{category.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="text-center mt-6">
                        <Link href={'/categories'} className="flex items-center w-full bg-purple-900 rounded-lg text-sm py-2 justify-center gap-2">
                            Show all <FaChevronRight />
                        </Link>
                    </div>
                </div>}
                <ul className="mt-4">
                    <li >

                    </li>
                    <li className="px-4 mt-4">
                        <button className="flex items-center justify-between gap-2 w-full p-4 py-2 px-4 mb-1 rounded-md transition text-sm hover:bg-gray-700">

                            <div className="flex items-center gap-2">
                                <span className="">💰</span>
                                Become a Creator
                            </div>
                            <div className="text-xs">
                                <FaUpRightFromSquare />
                            </div>
                        </button>
                    </li>
                    <li className="px-4 mt-4">
                        <button className="flex items-center justify-between gap-2 w-full p-4 py-2 px-4 mb-1 rounded-md transition text-sm hover:bg-gray-700">

                            <div className="flex items-center gap-2">
                                <span className="">🟢</span>
                                Online Creators
                            </div>
                            <div className="text-xs">
                                <FaUpRightFromSquare />
                            </div>
                        </button>
                    </li>


                </ul>
                <div className="absolute bottom-4 left-4 text-sm text-gray-400">
                    <span>🌐 English</span> · <span>🇻🇳 Vietnam</span>
                </div>
            </div>
        </>
    );
};

export default LeftMenu;