import AppAreaChart from "@/components/AppAreaChart";
import AppBarChart from "@/components/AppBarChart";
import AppPieChart from "@/components/AppPieChart";
import AppLineChart from "@/components/AppLineChart";
import AppBarChartActive from "@/components/AppBarChartActive";

const HomePage = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
            <div className='bg-grid p-4 rounded-lg lg:col-span-2 xl:col-span-2 xl:col-span-1 2xl:col-span-2'>
                <AppBarChart />
            </div>
            <div className='bg-grid p-4 rounded-lg lg:col-span-2 xl:col-span-2 xl:col-span-1 2xl:col-span-2'>
                <AppBarChartActive />
            </div>
            <div className='bg-grid p-4 rounded-lg'><AppPieChart/></div>
            <div className='bg-grid p-4 rounded-lg lg:col-span-2 xl:col-span-2 xl:col-span-1 2xl:col-span-2'>
                <AppAreaChart />
            </div>
            <div className='bg-grid p-4 rounded-lg'>
        
            </div>
             <div className='bg-grid p-4 rounded-lg lg:col-span-2 xl:col-span-2 xl:col-span-1 2xl:col-span-2'>
                <AppLineChart />
            </div>
        </div>
    );
};

export default HomePage