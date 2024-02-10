import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { signOutAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export const NavBar = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="w-full flex justify-center border-b border-foreground/10 h-16">
      <div className="w-full flex justify-between items-center p-3 text-sm">
        Hey, {user!.email}
        <form action={signOutAction}>
          <Button variant="destructive" size="icon">
            <LogOut />
          </Button>
        </form>
      </div>
    </nav>
  );
};
