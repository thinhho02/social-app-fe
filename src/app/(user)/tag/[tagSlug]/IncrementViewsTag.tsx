'use client'
import React, { useEffect } from 'react'
import { incrementViewsTag } from '@/apis/tag'

const IncrementViewsTag = ({ tagSlug }: { tagSlug: string }) => {
    useEffect(() => {
        async function logPageVisit() {
            try {
                const res = await incrementViewsTag('tag/increment-views/', tagSlug)
                if (!res.message) {
                    throw new Error('Failed to log page visit')
                }
            } catch (error) {
                throw new Error('Something wrong')
            }
        }
        logPageVisit()
    }, [tagSlug])
    return null;
}

export default IncrementViewsTag