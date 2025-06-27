import Infoboxes from '@/components/Infoboxes';
import Link from 'next/link';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import Homeproperties from '@/components/Homeproties';
import connectdb from '@/config/database';
import FeaturedProperties from '@/components/FeaturedProperties';

const HomePage = () => {
    connectdb();
return(
<div>
<Hero/>

<Infoboxes/>
<FeaturedProperties/>
<Homeproperties/>
</div>
);
};

export default HomePage;