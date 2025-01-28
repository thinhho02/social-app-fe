import { getCategories, getCategoryBySlug } from "@/apis/category"
import Breadcrumb from "@/components/ui/BreadCrumb"
import FormEditCategory from "./FormEditCategory"


export async function generateStaticParams() {
    const categories = await getCategories('category')

    return categories.data.map((category) => ({
        categorySlug: category.slug,
    }))
}

const breadCrumb = [
    { label: "Categories", href: "/admin/categories" },
    { label: "Edit" }
]

export default async function UpdateCategoryPage({ params }: { params: Promise<{ categorySlug: string }> }) {
    const { categorySlug } = await params
    const category = await getCategoryBySlug('category/slug/', categorySlug)

    return (
        <div>
            <div className="mb-6">
                <Breadcrumb isAdmin items={breadCrumb} />
            </div>
            <div className='mb-7'>
                <h3 className='text-xl'>Edit Category</h3>
            </div>
            <FormEditCategory category={category.data} />
        </div>
    )
}

