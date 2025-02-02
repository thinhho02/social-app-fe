'use client'
import React, { useEffect } from 'react'

import { incrementViewsCreator } from '@/apis/creator';

const IncrementViewsCreator = ({ creatorSlug }: { creatorSlug: string }) => {
    useEffect(() => {
        async function logPageVisit() {
            try {
                const res = await incrementViewsCreator('creator/increment-views/', creatorSlug)
                if (!res.message) {
                    throw new Error('Failed to log page visit')
                }
            } catch (error) {
                throw new Error('Something wrong')
            }
        }
        logPageVisit()
    }, [creatorSlug])
    return null;
}

export default IncrementViewsCreator