import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { menuSchema} from "../../pages/Menu/MenuSchema";
import type {MenuForm } from "../../pages/Menu/MenuSchema";

import * as menuService from "../../services/menu";
import toast from "react-hot-toast";
import type { MenuItem } from "../../types/menu";
import { useEffect } from "react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
   menu?: MenuItem | null;
}

export default function AddMenuDialog({
  open,
  onOpenChange,
  onSuccess,
  menu
}: Props) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<MenuForm>({
    resolver: zodResolver(menuSchema),
    defaultValues: {
      sessionType: "LUNCH",
    },
  });

   useEffect(() => {

  if (menu) {

    reset({
      itemName: menu.itemName,
      description: menu.description ?? "",
      price: menu.price,
      sessionType: menu.sessionType,
    });

  } else {

    reset({
      itemName: "",
      description: "",
      price: 0,
      sessionType: "LUNCH",
    });

  }

}, [menu, reset]);
 
  const onSubmit = async (data: MenuForm) => {
    
    try {
      if(menu){

    await menuService.updateMenu(menu.id, data);

}else{

    await menuService.createMenu(data);

}

     toast.success(
  menu
    ? "Menu Item Updated Successfully"
    : "Menu Item Created Successfully"
);

      onSuccess();

      reset();

      onOpenChange(false);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ?? "Failed to create menu item",
      );
    }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle> {menu ? "Edit Menu Item" : "Add Menu Item"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <Label>Item Name</Label>
            <Input {...register("itemName")} />
            <p className="text-red-500 text-sm">{errors.itemName?.message}</p>
          </div>

          <div>
            <Label>Description</Label>
            <Textarea {...register("description")} />
          </div>

          <div>
            <Label>Price</Label>
            <Input type="number" {...register("price")} />
            <p className="text-red-500 text-sm">{errors.price?.message}</p>
          </div>

          <div>
            <Label>Meal Type</Label>
            <Controller
              control={control}
              name="sessionType"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LUNCH">Lunch</SelectItem>
                    <SelectItem value="DINNER">Dinner</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
         <Button type="submit" className="w-full">
  {menu ? "Update Menu Item" : "Save Menu Item"}
</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
