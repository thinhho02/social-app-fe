'use client'
import { useEffect } from 'react'

const IncrementViews = (
    {
        slug,
        path,
        handleIncrement
    }:
    {
        slug: string,
        path: string,
        handleIncrement: (path: string, slug: string) => Promise<undefined>
    }) => {
    useEffect(() => {
        if(!slug || !path) return;
        async function logPageVisit() {
            try {
                await handleIncrement(path, slug)
            } catch (error) {
                throw new Error('Something wrong')
            }
        }
        logPageVisit()
    }, [slug, path])
    return null;
}

export default IncrementViews