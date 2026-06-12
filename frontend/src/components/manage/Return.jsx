const Return = () => {
    return (
        <div className="ml-4 sm:ml-10 p-4 sm:p-5">
            <h1 className="text-3xl font-bold mb-2 sm:mb-4 text-red-400">
                Return Item(s)
            </h1>
            <p className="text-sm sm:text-base text-[#666] mb-4">
                Let&apos;s get this taken care of
            </p>
            <div className="border-2 rounded p-4 sm:p-6 mb-6 flex flex-col sm:flex-row">
                <div className="flex items-start gap-4">
                    <input type="checkbox" />
                    <div className="w-16 sm:w-20 h-16 sm:h-20">
                        <img
                            src="https://yt3.googleusercontent.com/05lhMeAH6tZrPIUsp2yHNz3DwzhKbDUQcxcY0_qeXVyZttR_pktBzw0FcLUSR6D4fVqsEgL3ZO0=s900-c-k-c0x00ffffff-no-rj"
                            alt="product"
                            className="rounded"
                        />
                    </div>
                    <div>
                        <h2 className="text-lg sm:text-xl font-bold mb-2">Apple</h2>
                        <p className="text-xs sm:text-sm font-normal mb-2">817032 | 64267101</p>
                        <p className="text-sm sm:text-base mb-2">$4.98</p>
                        <p className="text-xs sm:text-sm text-green-500">Return by Jan 16, 2024</p>
                    </div>
                </div>
                <div className="flex gap-4 mt-4 sm:mt-0 items-center justify-center">
                    <input
                        type="number"
                        className="w-[50px] sm:w-[60px] h-[40px] sm:h-[50px] border-2 rounded outline-none p-2"
                    />
                    <select className="border-2 rounded p-2 sm:p-3">
                        <option value="">Reason for return</option>
                        <option value="defective">Defective product</option>
                        <option value="wrong-item">Wrong item received</option>
                        <option value="no-longer-needed">No longer needed</option>
                    </select>
                </div>
            </div>

            <button className="border-2 w-full sm:w-auto p-3 text-sm sm:text-base hover:bg-red-400 mt-4 rounded">
                Proceed to Return Method
            </button>
        </div>
    );
}

export default Return;
