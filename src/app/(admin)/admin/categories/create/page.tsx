import Breadcrumb from "@/components/ui/BreadCrumb"
import FormAction from "./FormCategory"

const breadCrumb = [
  { label: "Categories", href: "/admin/categories" },
  { label: "Create" }
]

export default function CreateCategoryPage() {
  return (
    <div>
      <div className="mb-6">
        <Breadcrumb isAdmin items={breadCrumb} />
      </div>
      <div className='mb-7'>
        <h3 className='text-xl'>Create New Category</h3>
      </div>
      <FormAction />
    </div>
  )
}

