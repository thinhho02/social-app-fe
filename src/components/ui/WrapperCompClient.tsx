import IncrementViews from "./IncrementViews"

const WrapperCompClient = (
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
        return <IncrementViews slug={slug} path={path} handleIncrement={handleIncrement}/>
    }
export default WrapperCompClient