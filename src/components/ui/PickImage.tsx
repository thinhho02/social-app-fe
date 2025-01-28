'use client'

import Image from 'next/image'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { FaUpload } from 'react-icons/fa6'

const PickImage = ({ reset, valueImageSrc }: { reset: boolean, valueImageSrc?: string }) => {
  const [pickedImage, setPickedImage] = useState<{ src: string; name: string } | null>(null)

  useEffect(() => {
    if (valueImageSrc) {
      setPickedImage({ src: valueImageSrc, name: '' })
    }
    if (reset) {
      setPickedImage(null)
    }
  }, [reset])

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }
    const file = event.target.files[0]
    const imageUrl = URL.createObjectURL(file)
    setPickedImage({ src: imageUrl, name: file.name })
  }
  return (
    <div className='flex'>
      <div className='w-4/12'>
        <div className='relative w-44 h-32 rounded-lg flex items-center justify-center border'>
          {pickedImage &&
            <Image
              src={pickedImage.src}
              alt={pickedImage.name}
              fill
              className='rounded-lg' />}
          {!pickedImage && <p className="text-sm text-gray-400 mt-1">No image picked yet.</p>}
        </div>
      </div>
      <div>
        <label htmlFor='imageUpload' className="flex items-center gap-2 text-sm font-medium py-3 px-2 bg-blue-600 hover:bg-blue-700 rounded-md cursor-pointer"><FaUpload />Upload Image</label>
        <input
          type="file"
          accept='image/png, image/jpg, image/jpeg'
          id='imageUpload'
          name='imageUpload'
          onChange={handleImageUpload}
          className="hidden" />
      </div>
    </div>
  )
}

export default PickImage
