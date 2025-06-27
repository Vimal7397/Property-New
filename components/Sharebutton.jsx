"use client";
import {FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
    LinkedinShareButton,
    LinkedinIcon,
    WhatsappShareButton,
    WhatsappIcon,
  EmailShareButton,
  EmailIcon
} from "react-share"


const Sharebuttons = ({property}) => {
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}` // Replace with your URL

    return ( 
      <>
      <h3 className="text-xl font-bold text-center pt-2">
share this property:
      </h3>
      <div className="flex gap-3 justify-center pb-5">
        <FacebookShareButton url={shareUrl} quote={property.name}
        hastage={`#${property.type.replace(/\s/g, '')}ForRent`}> 

          <FacebookIcon size={40} round={true} />
        </FacebookShareButton> 
        <TwitterShareButton url={shareUrl} tittle={property.name}
        hashtags={[`#${property.type.replace(/\s/g, '')}ForRent`]}> 

          <TwitterIcon size={40} round={true} />
        </TwitterShareButton> 
        <WhatsappShareButton url={shareUrl} tittle={property.name}
        seperator="::" > 

          <WhatsappIcon size={40} round={true} />
        </WhatsappShareButton> 
      </div>
      </>
    );
}
 
export default Sharebuttons;