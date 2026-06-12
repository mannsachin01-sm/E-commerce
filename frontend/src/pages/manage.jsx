import { useState } from 'react';  
import Account from '../components/manage/Account';
import Profile from '../components/manage/Profile';
import Order from '../components/manage/Order';
// import Return from '../components/manage/return';
// import { GiReturnArrow } from "react-icons/gi";
import { MdOutlineManageAccounts } from 'react-icons/md';
import { FaRegUserCircle } from "react-icons/fa";
import { TbShoppingBag } from 'react-icons/tb';

const Manage = () => {
    const [component, setvalue] = useState(<Account/>);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleClick1 = () => {
        setvalue(<Account />);
    }

    const handleClick2 = () => {
        setvalue(<Profile />);
    }

    const handleClick4 = () => {
        setvalue(<Order />);
    }

    // const handleClick5 = () => {
    //     setvalue(<Return />);
    // }

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="flex w-full min-h-screen">
            {/* Sidebar */}
            <div className={`flex flex-col items-start gap-8 md:gap-3 md:w-1/4 border-r-2 border-orange-600 px-4 md:px-10 pt-[12rem] fixed md:static bg-white md:bg-transparent transition-all ease-in-out duration-300 ${sidebarOpen ? 'left-0' : '-left-full'}`}>
                <div className="md:hidden">
                    <button onClick={toggleSidebar} className="text-orange-500 p-2">
                        {sidebarOpen ? 'Close' : 'Open'} Menu
                    </button>
                </div>
                <div>
                    <MdOutlineManageAccounts onClick={handleClick1} size={40} className='md:hidden text-orange-500 cursor-pointer'/>
                    <button 
                        className="hidden md:inline-block md:px-10 hover:text-red-500 w-[15rem] py-2 rounded-md bg-gray-200 text-orange-500 font-semibold text-xl transition ease-in-out duration-300 transform hover:scale-110"
                        onClick={handleClick1}
                    >
                        Manage Account
                    </button>
                </div>
                <div>
                    <FaRegUserCircle onClick={handleClick2} size={35} className='md:hidden text-orange-500 cursor-pointer'/>
                    <button 
                        className="hidden md:inline-block md:px-10 hover:text-red-500 w-[15rem] py-2 rounded-md bg-gray-200 text-orange-500 font-semibold text-xl transition ease-in-out duration-300 transform hover:scale-110"
                        onClick={handleClick2}
                    >
                        My Profile
                    </button>
                </div>
                <div>
                    <TbShoppingBag onClick={handleClick4} size={35} className='md:hidden text-orange-500 cursor-pointer'/>
                    <button 
                        className="hidden md:inline-block md:px-10 hover:text-red-500 w-[15rem] py-2 rounded-md bg-gray-200 text-orange-500 font-semibold text-xl transition ease-in-out duration-300 transform hover:scale-110"
                        onClick={handleClick4}
                    >
                        My Orders
                    </button>
                </div>
                {/* <div>
                    <GiReturnArrow onClick={handleClick5} size={35} className='md:hidden text-orange-500 cursor-pointer'/>
                    <button 
                        className="hidden md:inline-block md:px-10 hover:text-red-500 w-[15rem] py-2 rounded-md bg-gray-200 text-orange-500 font-semibold text-xl transition ease-in-out duration-300 transform hover:scale-110"
                        onClick={handleClick5}
                    >
                        My Returns
                    </button>
                </div> */}
            </div>

            {/* Main content area */}
            <div className='w-full md:ml-1/4 pt-[12rem] md:pt-0'>
                {component}
            </div>
        </div>
    )
}

export default Manage;
