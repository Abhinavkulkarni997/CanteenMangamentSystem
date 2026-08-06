import { Skeleton } from "../../components/ui/skeleton";

export default function DashboardSkeleton() {

    return (

        <div className="space-y-8">

            <div className="grid grid-cols-4 gap-6">

                {[1,2,3,4].map(i=>(

                    <Skeleton

                        key={i}

                        className="h-36 rounded-2xl"

                    />

                ))}

            </div>

            <Skeleton className="h-96 rounded-2xl"/>

        </div>

    );

}