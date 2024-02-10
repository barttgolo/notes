"use client";

import { completeNoteAction } from "@/app/actions";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Check } from "lucide-react";
import { useState } from "react";

type Props = {
  id: string;
};

export const MarkAsDoneAlertDialog = ({ id }: Props) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  return (
    <AlertDialog open={open} onOpenChange={(open) => setOpen(open)}>
      <AlertDialogTrigger asChild>
        <Button size="icon">
          <Check className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently mark this note as completed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            onClick={async () => {
              setOpen(false);
              const error = await completeNoteAction(id);

              toast({
                title: error ? "Error!" : "Success!",
                description: error ? error.message : "Note has been completed.",
              });
            }}
          >
            Confirm
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
