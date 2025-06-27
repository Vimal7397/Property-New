import PropertyEditForm from "@/components/PropertyEditForm";
import connectdb from "@/config/database";
import Property from "@/models/property";
import { convertToSerializableObject } from "@/util/convertToObject";

const propertyEditPage  = async ({params}) => {
    await connectdb();
    const { id } = await params

    const propertyDoc= await Property.findById(id).lean()
    const property=convertToSerializableObject(propertyDoc);
    if(!property){
        return <div>Property not found</div>
    }
    return ( 
        <section className='bg-blue-50'>
            <div className="container m-auto max-w-2xl py-24">
                <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border-m-4 md:m-0">
                  <PropertyEditForm property={property}/>
                </div>
            </div>
        </section>
    );
}
 
export default propertyEditPage ;