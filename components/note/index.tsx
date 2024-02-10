import { MarkAsDoneAlertDialog } from "@/components/note/mark-as-done-alert-dialog";
import { RemoveAlertDialog } from "@/components/note/remove-alert-dialog";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Tables } from "@/utils/supabase/types";
import dayjs from "dayjs";

type Props = {
  note: Omit<Tables<"notes">, "completed_by" | "created_by"> & {
    created_by: {
      email: string;
    } | null;
    completed_by: {
      email: string;
    } | null;
  };
};

export const Note = async ({ note }: Props) => {
  return (
    <div className="w-full">
      <Card className={!note.completed_by ? "bg-muted" : ""}>
        <CardHeader>
          <CardTitle className="text-sm">
            {dayjs(note.created_at).format("HH:mm DD/MM/YYYY")}
          </CardTitle>
          <CardDescription>Author {note.created_by?.email}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{note.content}</p>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <div className="flex w-full justify-between gap-2">
            {note.completed_by ? (
              <div className="text-sm text-muted-foreground flex flex-col gap-1 text-left">
                <p>Completed by: {note.completed_by.email}</p>
                <p>At {dayjs(note.completed_at).format("HH:mm DD/MM/YYYY")}</p>
              </div>
            ) : (
              <MarkAsDoneAlertDialog id={note.id} />
            )}
            <RemoveAlertDialog id={note.id} />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
