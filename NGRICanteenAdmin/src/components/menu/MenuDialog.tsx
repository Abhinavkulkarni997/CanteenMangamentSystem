interface Props{

    open:boolean;

    onOpenChange:(value:boolean)=>void;

    mode:"create"|"edit";

    menu?:MenuItem;

    onSuccess:()=>void;

}