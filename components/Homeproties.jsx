import PropertyCard from './PropertyCard';
import Link from 'next/link';
import connectdb from '@/config/database';
import Property from '@/models/property';

const Homeproperties = async () => {
await connectdb();

const recentproperties = await Property. find({})
.sort({ createdAt: -1 })
.limit(3)
.lean();
    return ( <><section className='px-4 py-6'>
        <div className='container-xl lg:container m-auto px-4 py-6'>
            <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
                            RECENT PROPERTIES
            </h2>
        {recentproperties. length === 0 ? (
        <p>No properties found</p>
        ) : (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {recentproperties.map((property) => (
        <PropertyCard key={property._id} property={property} />
        ))}
        </div>
        )}
        </div>
        </section>
        <section className='m-auto max-w-lg my-10 px-6'>
        <Link
        href='/properties'
        className = 'block bg-black text-white text-center py-4 hover:bg-gray-700 px-6 rounded-xl'>
        
        View All Properties

        </Link>
        </section>
        </>
         );
}
 
export default Homeproperties;