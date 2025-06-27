import Link from "next/link";
import Infobox from "./Infobox";

Infobox
const Infoboxes = () => {
    return ( <section>
        <div className="container-xl lg:container m-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
            
          <Infobox heading="for renters" buttoninfo={{text:'Browse properties',Link:'/properties',backgroundColor:"bg-black"}}>Find your dream rental property. Bookmark
              properties and contact owners. </Infobox>
          <Infobox heading="for property owners" backgroundColor="bg-blue-100"buttoninfo={{text:'add properties',Link:"./properties/add",backgroundColor:"bg-blue-500"}}>List your properties and reach potential
            tenants. Rent as an airbnb or long term .</Infobox>
          </div>
        </div>
      </section> );
}
 
export default Infoboxes;