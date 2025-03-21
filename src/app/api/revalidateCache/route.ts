import { revalidateTag } from 'next/cache';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log(body)
        const { tags } = body;

        if (!tags || !Array.isArray(tags) || tags.length === 0) {
            return Response.json({ message: 'Tags is required' }, { status: 400 });
        }
        tags.map((tag)=> revalidateTag(tag))
        return Response.json({ success: true });
    } catch (error) {
        return Response.json({ message: 'Failed to revalidate' }, { status: 500 });
    }
}