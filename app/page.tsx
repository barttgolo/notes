import { AddNoteDialog } from "@/components/list/add-note-dialog";
import { NavBar } from "@/components/list/nav-bar";
import { Note } from "@/components/list/note";
import { createClient } from "@/utils/supabase/server";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cookies } from "next/headers";

export default async function Index() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data } = await supabase
    .from("notes")
    .select(
      `created_by:profiles!notes_created_by_fkey(email),
  completed_by:profiles!notes_completed_by_fkey(email),           
  completed_at,
  content,
  created_at,
  id`
    )
    .order("created_at", { ascending: false });

  const activeNotes = data?.filter((note) => !note.completed_at);

  const completedNotes = data?.filter((note) => note.completed_at);

  return (
    <div className="relative flex-1 w-full flex flex-col gap-4 items-center pb-16">
      <NavBar />
      <Tabs defaultValue="all" className="w-full px-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <div className="flex flex-col gap-4">
            {activeNotes?.map((note) => (
              <Note key={note.id} note={note} />
            ))}

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  completed
                </span>
              </div>
            </div>

            {completedNotes?.map((note) => (
              <Note key={note.id} note={note} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="active">
          <div className="flex flex-col gap-4">
            {activeNotes?.map((note) => (
              <Note key={note.id} note={note} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="completed">
          <div className="flex flex-col gap-4">
            {completedNotes?.map((note) => (
              <Note key={note.id} note={note} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="fixed bottom-4 left-4">
        <AddNoteDialog />
      </div>
    </div>
  );
}
