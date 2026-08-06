import {Inbox} from "lucide-react";

interface Props{
    title:string;
    description:string;
}

export default function EmptyState({
    title,
    description,
}:Props){
    return(
        <div className="flex flex-col items-center justify-center py-20">
            <Inbox className="text-slate-400" size={56} />
            <h3 className="mt-4 text-xl font-semibold">
                {title}
            </h3>
            <p className="text-slate-500 mt-2">
                {description}
            </p>
        </div>
    );
}