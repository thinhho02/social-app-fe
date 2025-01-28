'use client'

import React, { useActionState } from 'react'
import { createCategory } from '@/lib/action';
import PickImage from '@/components/ui/PickImage';


const FormCategory = () => {
    const [state, submitAction, isPending] = useActionState(createCategory, { message: '' });

    return (
        <form action={submitAction} className="w-1/2 mx-auto">
            {state && (
                <div className='mb-4 text-red-600'>
                    {state.message}
                </div>
            )}
            <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                <input id="name" name="name" type="text" placeholder="Name"
                    className="block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>

            <div className='mt-3'>
                <div className='mb-3'>
                    <span className="block text-sm font-medium">Image</span>
                </div>
                <PickImage reset={!!state?.message} />
            </div>

            <button type="submit" className="w-full mt-5 py-2 px-4 bg-blue-600 rounded-md text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" disabled={isPending}>
                {isPending ? 'Submitting...' : 'Submit'}
            </button>
        </form>
    )
}

export default FormCategory
