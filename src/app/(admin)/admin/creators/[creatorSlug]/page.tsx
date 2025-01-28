import { getCreatorBySlug, getCreators } from "@/apis/creator"
import Breadcrumb from "@/components/ui/BreadCrumb"
import FormEditCreator from "./FormEditCreator"
import { ReactTag } from "@/types/creator"
import { getTags } from "@/apis/tag"
import { getCategories } from "@/apis/category"



export async function generateStaticParams() {
    const creators = await getCreators('creator')

    return creators.data.map((creator) => ({
        creatorSlug: creator.slug,
    }))
}

const breadCrumb = [
    { label: "Creators", href: "/admin/creators" },
    { label: "Edit" }
]

export default async function UpdateCreatorPage({ params }: { params: Promise<{ creatorSlug: string }> }) {
    const { creatorSlug } = await params
    const creator = await getCreatorBySlug('creator/slug/', creatorSlug)
    const tags = await getTags('tag')
    const categories = await getCategories('category')
    const suggestions: ReactTag[] = tags.data.map((tag) => ({ id: tag.name, text: tag.name, className: '' }))

    return (
        <div>
            <div className="mb-6">
                <Breadcrumb isAdmin items={breadCrumb} />
            </div>
            <div className='mb-7'>
                <h3 className='text-xl'>Edit Category</h3>
            </div>
            <FormEditCreator creator={creator.data} categories={categories.data} suggestions={suggestions} />
        </div>
    )
}