import type { ReactNode } from "react";

interface Props{
    title:string;
    description?:string;
    actions?:ReactNode;
    children:ReactNode;
}

export default function PageContainer({
    title,
    description,
    actions,
    children,
}:Props){
    return(
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">{title}</h1>
                    {description && (
                        <p className="text-slate-500 mt-1">{description}</p>
                    )}
                </div>
                {actions }
            </div>
            {children}
        </div>
    )
}