'use client'

import React, { Dispatch, MouseEvent, SetStateAction } from 'react'

const tabs = [
  { id: 'trending', label: 'Trending' },
  { id: 'newest', label: 'Newest' },
  { id: 'recommand', label: 'Recommand' },
];

const Tabs = ({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: Dispatch<SetStateAction<string>> }) => {
  const handleTabClick = (event: MouseEvent<HTMLButtonElement>) => {
    setActiveTab(event.currentTarget.id);
  }

  return (
    <div className="mb-4 border-b-2 border-gray-200 ">
      <ul className="flex flex-wrap -mb-px text-sm font-medium text-center transition ease-linear">
        {tabs.map((tab) => (
          <li
            key={tab.id}
            className={`w-1/3 ${activeTab === tab.id ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'
              }`}
          >
            <button
              id={tab.id}
              className="p-4 pt-0 w-full"
              onClick={handleTabClick}
              type="button"
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}


export default Tabs
