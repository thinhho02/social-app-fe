'use client'

import { useRouter } from "next/navigation"
import { useEffect } from "react"


const TagsPage = () => {
    const router = useRouter()
    useEffect(() => {
        router.push('/')
    }, [router])
    return (
        <div>
sadad
        </div>

    )
}

export default TagsPage
