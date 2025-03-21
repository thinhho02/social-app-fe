import React from 'react'

import Item from '@/components/ui/Item';
import { Category } from '@/types/category'

interface CategoryListProps {
    categoriesData: Category[]
}

const randomDataInArray = (array: Category[], slice: number) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray.slice(0, slice)
}

const CategoryList = ({ categoriesData }: CategoryListProps) => {
    
    const dataRand = randomDataInArray(categoriesData, 3)
    return (
        <>
            {dataRand.map(data => (<Item key={data._id} category={data} />))}
        </>
    )
}

export default CategoryList