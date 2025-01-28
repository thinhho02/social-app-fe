'use client'

import React, { MouseEventHandler, useState } from 'react'
import { FaTrashCan } from 'react-icons/fa6'

const ButtonDetele = ({
    id,
    label,
    deleteAction
}: {
    id: string;
    label: string;
    deleteAction: (id: string) => Promise<{ message: string } | undefined>
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState<string | undefined>()


    const handleDeleteClick: MouseEventHandler<HTMLButtonElement> = (event) => {
        setIsModalOpen(true);
    };

    const handleConfirmDelete: MouseEventHandler<HTMLButtonElement> = async (event) => {
        setIsPending(true);

        const result = await deleteAction(id);
        if (result) {
            setError(result.message)
        } else {
            setIsModalOpen(false);
        }
        setIsPending(false)
    }

    const handleCancel: MouseEventHandler<HTMLButtonElement> = (event) => {
        setIsModalOpen(false);
    };
    return (
        <>
            <button type='button' onClick={handleDeleteClick} className='text-xs p-2 hover:bg-gray-700 rounded text-red-500'>
                <FaTrashCan />
            </button>
            {isModalOpen &&
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-900 rounded-lg p-6 shadow-lg text-center">
                        <div className='mb-3 pb-3 border-b border-gray-700'>
                            <h3 className="text-base mb-4">{label}</h3>
                            <h3>Are you sure you want to proceed?</h3>
                        </div>
                        {error &&
                            <div className='mb-3 border-b border-gray-700'>
                                <h3 className="text-base mb-4">{error}</h3>
                            </div>}
                        <div className="flex justify-center gap-4">
                            <button
                                className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
                                onClick={handleConfirmDelete}
                                disabled={isPending}
                            >
                                {isPending ? 'Loading...' : 'Confirm'}
                            </button>
                            <button
                                className="bg-gray-600 px-4 py-2 rounded-lg hover:bg-gray-500 transition"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                        </div>

                    </div>
                </div>
            }
        </>
    )
};


export default ButtonDetele