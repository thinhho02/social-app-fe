import { getCreators } from '@/apis/creator';
import ButtonDetele from '@/components/ui/ButtonDetele';
import { deleteCreator } from '@/lib/action';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { FaPen, FaPlus, FaTrashCan } from 'react-icons/fa6';

const TABLE_HEAD = ["Name", "Media URL", "Category", "Tags", "Description", "status", ""];



export default async function CreatorsPage() {
  const creators = await getCreators('creator')
  return (
    <div>
      <div className='mb-7 flex justify-between'>
        <h3 className='text-xl'>Creators</h3>
        <Link href={'creators/create'} type='button' className='text-xs flex items-center gap-2 p-2 bg-blue-600 hover:bg-blue-700 rounded'>
          <FaPlus />
          Add New
        </Link>
      </div>
      <div className="h-full w-full overflow-x-auto bg-[#111c44] shadow rounded-lg">
        <table className="w-full min-w-max table-auto text-left border-collapse">
          <thead className='text-xs uppercase bg-gray-700 text-gray-400'>
            <tr className="">
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-gray-600 p-4 text-sm font-normal"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {creators.data.map(({ _id, name, description, category, tags, mediaUrl, status, slug }, index) => {

              return (
                <tr key={_id} className="odd:bg-gray-900 even:bg-gray-800 border-b border-gray-700">
                  <td className='p-4'>
                    <span className="text-sm font-normal">
                      {name}
                    </span>
                  </td>
                  <td className='p-4'>
                    <span className="text-sm font-normal">
                      <div></div>
                      <Image src={mediaUrl} alt='' width={50} height={50} className='rounded-sm' />
                    </span>
                  </td>
                  <td className='p-4'>
                    <span className="text-sm font-normal">
                      {category.name}
                    </span>
                  </td>
                  <td className='p-4'>
                    <span className="text-sm font-normal">
                      {tags.map((tag) => (tag.name)).join(', ')}
                    </span>
                  </td>
                  <td className='p-4'>
                    <span className="text-sm font-normal">
                      {description}
                    </span>
                  </td>
                  <td className='p-4'>
                    <span
                      className={`text-xs me-2 px-2.5 py-0.5 rounded-full 
                      ${status === 'active' && 'bg-green-900 text-green-300'}
                      ${status === 'pending' && 'bg-yellow-900 text-yellow-300'}
                      uppercase font-bold`}>
                      {status}
                    </span>
                  </td>
                  <td className='p-4'>
                    <div className='flex gap-2'>
                      <Link href={`creators/${slug}`} type='button' className='text-xs p-2 hover:bg-gray-700 rounded'>
                        <FaPen />
                      </Link>
                      <ButtonDetele id={_id} label='' deleteAction={deleteCreator} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  )
}
