const Infobox = ({children,heading,backgroundColor = 'bg-gray-100',
    textColor = 'text-gray-800',
buttoninfo,}) => {
    return (
      <div className={`${backgroundColor} p-6 rounded-lg shadow-md`}>
        <h2 className={`${textColor} font-bold`}>{heading}</h2>
        <p className={`${textColor} mt-2 mb-4`}>
          {children}
        </p>
        <a
          href={buttoninfo.Link}
          className={`${buttoninfo.backgroundColor} inline-block text-white rounded-lg px-4 py-2 hover:bg-gray-700`}
        >
       {buttoninfo.text}
        </a>
      </div>
    );
}
 
export default Infobox;