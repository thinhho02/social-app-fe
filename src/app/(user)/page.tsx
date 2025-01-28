import CardCategory from "@/components/ui/CardCategory";
import Item from "./Item";
import { getCategories } from "@/apis/category";
import Aside from "./Aside";


const Home = async () => {
  const categories = await getCategories('category')
  return (
    <div className="flex">
      <div className="flex-1 m-4">

        <div className="mb-4">
          <p>Categories</p>
        </div>
        <div className="grid grid-cols-5 gap-4">
          {categories.data.map((category) => (<CardCategory key={category._id} category={category} />))}
          <CardCategory />
        </div>

        <Item category={categories.data[0]} />
        <Item category={categories.data[1]} />
        <Item category={categories.data[2]} />
      </div>
      <Aside />
    </div>
  );
}

export default Home
