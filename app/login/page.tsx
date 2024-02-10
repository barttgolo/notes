"use client";

import { signInAction, signUpAction } from "@/app/login/actions";
import { AuthSchema, authSchema } from "@/utils/form/authForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";

export default function Login() {
  const params = useSearchParams();
  const errorMessage = params.get("message");

  const { register, handleSubmit } = useForm<AuthSchema>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <Card>
        <CardHeader>
          <CardTitle>Sign in or create account</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex-1 flex flex-col w-full justify-center gap-2">
            <Label className="text-md" htmlFor="email">
              Email
            </Label>
            <Input placeholder="you@example.com" {...register("email")} />

            <Label className="text-md" htmlFor="password">
              Password
            </Label>
            <Input
              type="password"
              placeholder="••••••••"
              {...register("password")}
            />
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <div className="flex gap-2">
            <Button onClick={handleSubmit((data) => signInAction(data))}>
              Sign In
            </Button>
            <Button
              variant="outline"
              onClick={handleSubmit((data) => signUpAction(data))}
            >
              Sign Up
            </Button>
          </div>
          {errorMessage && (
            <div className="text-red-500 text-sm font-bold">{errorMessage}</div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
