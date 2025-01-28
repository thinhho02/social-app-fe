'use client'

import React, { FormEventHandler, useActionState, useState } from 'react'
import { updateCategory } from '@/lib/action';
import PickImage from '@/components/ui/PickImage';
import { Category } from '@/types/category';

interface FormEditCategoryProps {
    category: Category
}

const FormEditCategory: React.FC<FormEditCategoryProps> = ({ category }) => {
    const [error, setError] = useState<string | null>(null)
    const [isPending, setIsPending] = useState(false)

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault()
        setError(null)
        setIsPending(true)
        const formData = new FormData(event.currentTarget);
        

        const result = await updateCategory(category, formData)
        if (result?.message) {
            setError(result.message)
            setIsPending(false)
        }
    }
    return (
        <form onSubmit={handleSubmit} className="w-1/2 mx-auto">
            {error && (
                <div className='mb-4 text-red-600'>
                    {error}
                </div>
            )}
            <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                <input id="name" name="name" type="text" placeholder="Name"
                    defaultValue={category.name}
                    className="block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>

            <div className='mt-3'>
                <div className='mb-3'>
                    <span className="block text-sm font-medium">Image</span>
                </div>
                <PickImage reset={false} valueImageSrc={category.mediaUrl} />
            </div>

            <button type="submit" className="w-full mt-5 py-2 px-4 bg-blue-600 rounded-md text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" disabled={isPending}>
                {isPending ? 'Submitting...' : 'Submit'}
            </button>
        </form>
    )
}

export default FormEditCategory
