import {AlertDialog,
AlertDialogAction,
AlertDialogCancel,
AlertDialogContent,
AlertDialogDescription,
AlertDialogFooter,
AlertDialogHeader,
AlertDialogTitle
} from "../../components/ui/alert-dialog";

import toast from "react-hot-toast";
import * as menuService from "../../services/menu";
import type { MenuItem } from "../../types/menu";

interface Props{
    open:boolean;
    onOpenChange:(open:boolean) => void;
    onSuccess:() => void;
    menu:MenuItem|null;
}

export default function DeleteMenuDialog({
    open,
    onOpenChange,
    menu,
    onSuccess,
}:Props){
    const handleDelete=async()=>{
        if(!menu) return;
        try{
            await menuService.deleteMenu(menu.id);
            toast.success("Menu deleted successfully");
            onSuccess();
            onOpenChange(false);
        }catch(error:any){
            toast.error(error.response?.data?.message?? "Failed to delete menu"

            );
        }
    };
    return(
        <AlertDialog 
        open={open}
        onOpenChange={onOpenChange}
        >
            <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Delete Menu Item?</AlertDialogTitle>
                <AlertDialogDescription>
                    Are you sure you want to delete
                    <strong>{menu?.itemName}</strong>?
                    <br/><br/> 
                    This action cannot be undone. 
                    This will permanently delete the menu item from the system.
                </AlertDialogDescription>
                </AlertDialogHeader>  
                <AlertDialogFooter>
                    <AlertDialogCancel>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>

            </AlertDialogContent>
            </AlertDialog>
        );
    
    
}