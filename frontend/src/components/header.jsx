import { Link } from 'react-router-dom'; 

const Header = () => {
    return (
        <div className='bg-black text-white flex justify-center'>
            <marquee direction="right" className="w-full">
                <span className='ml-8 md:ml-24 text-xs md:text-base'>
                    Limited time offer... Get 50% off right now!!
                </span>
                <Link to={'/products'} className='font-bold mr-8 md:mr-24 text-xs md:text-base'>
                    CLICK HERE
                </Link>
            </marquee>
        </div>
    );
}

export default Header;
