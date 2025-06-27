import connectdb from "@/config/database";
import Property from "@/models/property";
import Link from "next/link";
import Bookmarkbutton from "@/components/Bookmarkbutton";
import PropertyContactForm from "@/components/PropertyContentform";
import Sharebuttons from "@/components/Sharebutton";
import { FaArrowLeft } from "react-icons/fa";
import PropertyDetails from "@/components/PropertyDetails";
import Propertyheaderimage from "@/components/Propertyheaderimage";
import PropertyImages from "@/components/PropertyImages";
import { convertToSerializableObject } from "@/util/convertToObject";
/* @next-codemod-ignore */
const PropertyPage =async props => {
  const params = await props.params;
  await connectdb();
   const PropertyDoc =await Property.findById(params.id).lean();
      const g=convertToSerializableObject(PropertyDoc);
      if(!g){
       return <h1 ClassName="text center text-2xl font-bold mt-10">
       Propertynot found
       </h1>
      }

  return<>
  
  <Propertyheaderimage image={g.images[0]} />
  <section>
<div className="container m-auto py-6 px-6">
  <Link
    href="/properties"
    className="text-blue-500 hover:text-blue-600 flex items-center"
  >
    <FaArrowLeft className="mg-2" /> Back to Properties
  </Link>
</div>
</section>
<section className="bg-blue-50">
  <div className="container m-auto py-10 px-6">
    {/* Flex Layout */}
    <div className="flex flex-col md:flex-row gap-6">
      {/* Main Content (75%) */}
      <div className="flex-grow md:basis-[75%]">
        <PropertyDetails property={g} />
      </div>

      {/* Sidebar (25%) */}
      <div className="flex-grow-0 md:basis-[25%] flex flex-col gap-6">
        {/* Contact the Seller */}
        <Bookmarkbutton property={g} />
                {/* Share Property */}
                <Sharebuttons property={g} />
        <PropertyContactForm property={g} />

      </div>
    </div>
  </div>
</section>
          <PropertyImages images={g.images} />
   </>
};
    
    export default PropertyPage;