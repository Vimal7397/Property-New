import PropertyAddForm from "@/components/PropertyAddForm";

const addproperties = () => {
    return (  
        <section className=".bg-blue-50">
        <div className="container m-auto max-w-2xl px-4 py-24">
         <div className="bg-white px-6 py-8 mb-4 shadow-md rounded border m-4 md:m-0">
          <PropertyAddForm/>
           </div>   
        </div>
        </section>
    );
}
 
export default addproperties; 