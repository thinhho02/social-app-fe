'use client'
import Image from "next/image"

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <div className="mx-auto">
            <Image src={'https://ik.imagekit.io/r9vwbtuo5/loi-http-error-500.jpg?updatedAt=1737901825646'} alt="error" width={300} height={150} />
        </div>
    )
}