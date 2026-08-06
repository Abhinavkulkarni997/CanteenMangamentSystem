import type {ReactNode} from "react";
interface Props{
    title:string;
    children:ReactNode;
}
export default function SectionCard({
    title,
    children
}:Props){
    return(
        <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold mb-6">
                {title}
            </h2>
            {children}
        </div>
    );
}