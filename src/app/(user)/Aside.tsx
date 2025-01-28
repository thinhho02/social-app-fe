'use client'

import CardCreator from '@/components/ui/CardCreator'
import Tabs from '@/components/ui/Tabs'
import React, { useEffect, useState } from 'react'
import TopTags from './TopTags'
import { getTrendingCreator } from '@/apis/creator'
import { Creator } from '@/types/creator'

const Aside = () => {
    const [activeTab, setActiveTab] = useState("trending");
    const [creators, setCreators] = useState<Creator[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchCreators() {
            setError(null);
            try {
                const response = await getTrendingCreator(`creator/${activeTab}`);
                console.log(response.data)
                setCreators(response.data);
            } catch (err) {
                setError((err as Error).message);
            }
        }
        fetchCreators();
    }, [activeTab])
    return (
        <aside className="w-3/12 m-4">
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className='grid grid-cols-2 gap-2'>
                {error && <p className="text-red-500">{error}</p>}
                {!error && creators?.length === 0 && (
                    <p>No creators found in {activeTab}.</p>
                )}
                {creators?.map((creator) => (
                    <CardCreator key={creator._id} creator={creator} aside />
                ))}
            </div>
            <div className='mt-5'>
                <TopTags />
            </div>
        </aside>
    )
}

export default Aside
