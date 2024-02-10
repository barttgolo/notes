"use client";

import { addNoteAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { NoteSchema, noteSchema } from "@/utils/form/noteForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const AddNoteDialog = () => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const { register, handleSubmit, reset } = useForm<NoteSchema>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      content: "",
    },
  });

  return (
    <Drawer open={open} onOpenChange={(open) => setOpen(open)}>
      <DrawerTrigger asChild>
        <Button size="icon">
          <PlusCircle className="h-4 w-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Add new note</DrawerTitle>
        </DrawerHeader>
        <div className="px-4">
          <Textarea placeholder="Type your note" {...register("content")} />
        </div>
        <DrawerFooter>
          <Button
            onClick={handleSubmit(async (data) => {
              setOpen(false);
              reset();
              const error = await addNoteAction(data);

              toast({
                title: error ? "Error!" : "Success!",
                description: error
                  ? error.message
                  : "Your note has been added.",
              });
            })}
          >
            Submit
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
