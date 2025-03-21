'use client'

import React, { useEffect, useState } from 'react'

import { getCreatorByTab } from '@/apis/creator'
import { Creator } from '@/types/creator'

import CardCreator from '@/components/ui/CardCreator'
import Tabs from '@/components/ui/Tabs'
import TopTags from './TopTags'

const Aside = () => {
    const [activeTab, setActiveTab] = useState("trending");
    const [creators, setCreators] = useState<Creator[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchCreators() {
            setError(null);
            try {
                const response = await getCreatorByTab(`creator/${activeTab}`, 6);
                setCreators(response.data);
            } catch (err) {
                setError((err as Error).message);
            }
        }
        fetchCreators();
    }, [activeTab])
    return (
        <div>
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className='grid sm:grid-cols-3 lg:grid-cols-2 gap-2'>
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
        </div>
    )
}

export default Aside
