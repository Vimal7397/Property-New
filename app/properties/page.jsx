import connectdb from '@/config/database';
import PropertyCard from '@/components/PropertyCard';
import Property from '@/models/property';
import Pagination from '@/components/Pagination';

const PropertiesPage =async (props) => {
    const searchParams = await props.searchParams;
    const { page = 1, pageSize = 9 } = searchParams; // Default to page 1 and page size of 10 if not provided
    console.log( searchParams);
   
    await connectdb();
    
    const total = await Property.countDocuments({}); // Get the total number of properties

    const skip = (page - 1) * pageSize; 
    
    const properties = await Property.find({}).skip(skip).limit(pageSize); // Fetch properties with pagination

    const showPagination = total > pageSize; // Show pagination only if there are more than pageSize properties

    return (
        <section className='px-4 py-6'>
        <div className='container-xl lg:container m-auto px-4 py-6'>
        {properties. length === 0 ? (
        <p>No properties found</p>
        ) : (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {properties.map((property) => (
        <PropertyCard key={property._id} property={property} />
        ))}
        </div>
        )}
        {showPagination && ( <Pagination page={parseInt(page)}
        pageSize={parseInt(pageSize)}
        totalItem={total}/>)}
       
        </div>
        </section>
    );
};
export default PropertiesPage;