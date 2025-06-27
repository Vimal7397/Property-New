import connectdb from "@/config/database";
import Property from "@/models/property";
import Link from "next/link";  // FIXED here
import PropertyCard from "@/components/PropertyCard";
import Propertysearchfrom from "@/components/PropertySearchForm";
import { convertToSerializableObject } from "@/util/convertToObject";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const SearchResultsPage = async (props) => {
  const searchParams = await props.searchParams; 
  const { location = "", propertyType = "" } = searchParams || {};

  await connectdb();

  const locationpattern = new RegExp(location, "i");
  let query = { 
    $or: [
      { name: locationpattern },
      { discription: locationpattern },
      { "location.street": locationpattern },
      { "location.city": locationpattern },
      { "location.state": locationpattern },
      { "location.zipcode": locationpattern },
    ]
  };

  if (propertyType && propertyType !== "all") {
    const typePattern = new RegExp(propertyType, "i");
    query.type = typePattern;
  }

  const propertiesQueryResults = await Property.find(query).lean();
  const properties = convertToSerializableObject(propertiesQueryResults);
  console.log(properties);

  return (
    <div>
      <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <Propertysearchfrom />
        </div>
        </section>
        <div className="container-xl lg:container m-auto px-4 py-6">
          <Link href="/properties" className="flex items-center text-blue-500 hover:underline mb-3">
            <FaArrowAltCircleLeft className="mr-2" />
            Back to Properties
          </Link>
          <h1 className="text-2xl mb-4">
            Search Results
          </h1>

          {properties.length === 0 ? (
            <p>No properties found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
    
    </div>
  );
};

export default SearchResultsPage;
