
const ProBanner = () => {
    return (
        <div className="mb-8">
            <div className="flex items-center justify-between  rounded-xl p-3 border border-[#2c2c2c]">
                <div className="flex items-center space-x-3 text-sm text-textColor">
                    <span className="bg-textColor text-bodyBg text-xs font-bold px-1.5 py-0.5 rounded">PRO</span>
                    <span>Upgrade for full access beyond the 4 latest apps — <a href="#" className="text-textColor underline hover:text-mainColor">Get Pro</a></span>
                </div>
            </div>
        </div>
    );
};

export default ProBanner;
