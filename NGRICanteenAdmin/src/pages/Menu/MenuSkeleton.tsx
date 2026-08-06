import { Skeleton } from "../../components/ui/skeleton";

export default function MenuSkeleton() {

    return (

        <div className="grid grid-cols-3 gap-6">

            {Array.from({ length: 6 }).map((_, index) => (

                <Skeleton
                    key={index}
                    className="h-48 rounded-2xl"
                />

            ))}

        </div>

    );

}