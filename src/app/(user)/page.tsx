import { getCategories } from "@/apis/category";

import Aside from "../../components/ui/Aside";
import CardCategory from "@/components/ui/CardCategory";
import { Suspense } from "react";
import CategoryList from "@/components/pages/home/CategoryList";


const Home = async () => {
  const categories = await getCategories('category', 9, 'active')
  return (
    <div className="flex flex-wrap sm:flex-col lg:flex-row  mx-auto">
      <div className="flex-1 m-4">

        <div className="mb-4">
          <p>Categories</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {categories.data.map((category) => (<CardCategory key={category._id} category={category} />))}
          <CardCategory />
        </div>
        
        <CategoryList categoriesData={categories.data} />
      </div>
      <aside className="sm:max-w-full lg:max-w-[340px] m-4">
        <Suspense fallback={<div>loading...</div>}>
          <Aside />
        </Suspense>
      </aside>
    </div>
  );
}

export default Home
