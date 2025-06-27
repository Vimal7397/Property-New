
import PropertyCard from "@/components/PropertyCard";
import connectdb from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/util/getSessionUser";

const SavedPropertiespage = async () => {
  await connectdb();
  const { userId } = await getSessionUser();

  const user = await User.findById(userId).populate("bookmarks");
  const bookmarks = user?.bookmarks || []; // Ensure bookmarks is always an array

  console.log("Bookmarks:", bookmarks);

  return (
    <section className="px-4 py-6">
      <div className="container lg:container m-auto px-4 py-6">
        <h1 className="text-2xl mb-4">Saved Properties</h1>

        {bookmarks.length === 0 ? (
          <p>No saved properties</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bookmarks.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SavedPropertiespage;