import AppAreaChart from "@/components/AppAreaChart";
import AppBarChart from "@/components/AppBarChart";
import AppBarChartMixed from "@/components/AppBarChartMixed";
import AppBarChartActive from "@/components/AppBarChartActive";
import AppBarChartInteractive from "@/components/AppBarChartInteractive";
import AppBarVerticalChart from "@/components/AppBarVerticalChart";
import AppPizzaChart from "@/components/AppPizzaChart";
import { Lora } from "next/font/google";

const lora = Lora({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const HomePage = () => {
    return (
        <div className="space-y-6">
            <div className="space-y-1">
                <h1 className={`${lora.className} font-regular text-2xl`}>Enem PE - Públicas x Privadas</h1>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4">
                <div className="border p-3 lg:p-4 lg:col-span-6">
                    <AppBarChartActive />
                </div>
                <div className="border p-3 lg:p-4 lg:col-span-6">
                    <AppBarChart />
                </div>
                
                <div className="border p-3 lg:p-4 lg:col-span-12">
                    <AppAreaChart />
                </div>

                <div className="border p-3 lg:p-4 lg:col-span-6">
                    <AppPizzaChart />
                </div>
                <div className="border p-3 lg:p-4 lg:col-span-6">
                    <AppBarChartMixed />
                </div>

                <div className="border p-3 lg:p-4 lg:col-span-6">
                    <AppBarChartInteractive />
                </div>
                <div className="border p-3 lg:p-4 lg:col-span-6">
                    <AppBarVerticalChart />
                </div>
            </div>
        </div>
    );
};

export default HomePage