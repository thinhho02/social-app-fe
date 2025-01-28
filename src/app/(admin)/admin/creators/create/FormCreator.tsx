'use client'

import React, { FormEventHandler, useState } from 'react'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { WithContext as ReactTags, SEPARATORS } from 'react-tag-input'
import PickImage from '@/components/ui/PickImage'
import { createCreator } from '@/lib/action'
import { Category } from '@/types/category'
import { ReactTag } from '@/types/creator'


const statuses = ['active', 'pending']

const FormCreator = ({ categories, suggestions }: { categories: Category[], suggestions: Array<ReactTag> }) => {
    const [tags, setTags] = useState<Array<ReactTag>>([]);
    const [error, setError] = useState<string | null>(null)
    const [isPending, setIsPending] = useState(false)

    const handleDelete = (index: number) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    const handleAddition = (tag: ReactTag) => {
        setTags((prevTags) => {
            return [...prevTags, tag];
        });
    };

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault()
        setError(null)
        setIsPending(true)
        const formData = new FormData(event.currentTarget)
        const textTags = [...tags.map(tag => tag.text)]
        formData.append("tags", JSON.stringify(textTags))

        const result = await createCreator(formData)
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
                    className="block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>

            <div className='mt-3'>
                <label htmlFor="category" className="block text-sm font-medium mb-2">Category</label>
                <select id="category" name="category"
                    className="block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    {categories.map((category) => (
                        <option key={category._id} value={category._id}>{category.name}</option>
                    ))}
                </select>
            </div>

            <div className='mt-3'>
                <label htmlFor="Tag" className="block text-sm font-medium mb-2">Tag</label>
                <DndProvider backend={HTML5Backend}>
                    <ReactTags classNames={{
                        tags: 'react-tags',
                        selected: 'react-tags__selected',
                        tag: 'react-tags__selected-tag',
                        remove: 'react-tags__selected-tag-remove ReactTags__remove',
                        tagInput: 'react-tags__input',
                        tagInputField: 'react-tags__input input',
                        suggestions: 'react-tags__suggestions',
                        activeSuggestion: 'react-tags_activeSuggestion',
                        editTagInput: 'react-tags_editTagInput',
                        editTagInputField: 'react-tags_editTagInputField',
                        clearAll: 'react-tags_clearAll',
                    }} tags={tags} suggestions={suggestions} handleAddition={handleAddition} handleDelete={handleDelete} separators={[SEPARATORS.ENTER, SEPARATORS.COMMA]} inputFieldPosition="top" placeholder="Select Tags" allowUnique />
                </DndProvider>

            </div>

            <div className='mt-3'>
                <label htmlFor="description" className="block text-sm font-medium mb-2">Description</label>
                <textarea id="description" name="description" rows={4}
                    className="block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"></textarea>
            </div>
            <div className='mt-3'>
                <label htmlFor="status" className="block text-sm font-medium mb-2">Status</label>
                <select id="status" name="status"
                    className="block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    {statuses.map((status) => (
                        <option key={status} value={status}>{status}</option>
                    ))}
                </select>
            </div>
            <div className='mt-3'>
                <div className='mb-3'>
                    <span className="block text-sm font-medium">Image</span>
                </div>
                <PickImage reset={false} />
            </div>

            <button type="submit" className="w-full mt-5 py-2 px-4 bg-blue-600 rounded-md text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" disabled={isPending}>
                {isPending ? 'Submitting...' : 'Submit'}
            </button>
        </form>
    )
}

export default FormCreator
