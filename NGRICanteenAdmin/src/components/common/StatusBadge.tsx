interface Props{
    status:string;
}
export default function StatusBadge({
    status,
}:Props){
    const styles={
        BOOKED:
            "bg-orange-100 text-orange-700",

        COLLECTED:
            "bg-green-100 text-green-700",
        CANCELLED:
            "bg-red-100 text-red-700",
    };
    return(
        <span className={`px-3 py-1 rounded-full
            text-xs font-semibold ${
                styles[status as keyof typeof styles]
            }`}
            >
                {status}
            </span>
    )
}