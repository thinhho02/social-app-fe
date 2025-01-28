import { getCategories } from "@/apis/category"
import { getTags } from "@/apis/tag"
import { ReactTag } from "@/types/creator"
import Breadcrumb from "@/components/ui/BreadCrumb"

import FormCreator from "./FormCreator"

const breadCrumb = [
    { label: "Creators", href: "/admin/creators" },
    { label: "Create" }
]

const CreateCreatorPage = async () => {
    const tags = await getTags('tag')
    const categories = await getCategories('category')
    const suggestions: ReactTag[] = tags.data.map((tag) => ({ id: tag.name, text: tag.name, className: '' }))
    return (
        <div>
            <div className="mb-6">
                <Breadcrumb isAdmin items={breadCrumb} />
            </div>
            <div className='mb-7'>
                <h3 className='text-xl'>Create New Creator</h3>
            </div>
            <FormCreator categories={categories.data} suggestions={suggestions} />
        </div>
    )
}

export default CreateCreatorPage
