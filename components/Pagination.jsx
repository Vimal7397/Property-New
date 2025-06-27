import Link from "next/link";

const pagination = ({page,pageSize,totalItems }) => {

    const totalPages = Math.ceil(totalItems / pageSize); // Calculate total pages based on total items and page size
    return ( <section className="container mx-auto flex justify-center items-center my-8">
        {page > 1 ? (
    <Link href={`/properties?page=${page-1}`} className="px-4 py-2 bg-blue-50  rounded-l white:bg-blue-600 ">Previous</Link>
    ):null}
   <span className="mx-2">page {page} of {totalPages} </span>
   {page <= 1 ? (
    <Link href={`/properties?page=${page+1}`} className="px-4 py-2 bg-blue-50  hover:bg-white-600">next</Link>
   ): null} 
    </section> );
}
 
export default pagination;