"use server";
import { redirect } from "next/navigation";
import { z } from "zod";

const schemaRegister = z.object({
  username: z.string().min(3).max(20, {
    message: "Username must be between 3 and 20 characters",
  }),
  password: z.string().min(6).max(100, {
    message: "Password must be between 6 and 100 characters",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
});

const schemaSignIn = z.object({
  password: z.string().min(6).max(100, {
    message: "Password must be between 6 and 100 characters",
  }),
  identifier: z.string().email({
    message: "Please enter a valid email address",
  }),
});

export async function registerUserAction(prevState: any, formData: FormData) {
  console.log("Hello From Register User Action");
  // 驗證型別
  const validatedFields = schemaRegister.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      strapiErrors: null,
      message: "Missing Fields. Failed to Register.",
    };
  }

  return {
    ...prevState,
    data: "ok",
  };
}

export async function signInAction(prevState: any, formData: FormData) {
  const passwordValue = formData.get("password");
  const identifierValue = formData.get("identifier");

  const validatedFields = schemaSignIn.safeParse({
    password: passwordValue,
    identifier: identifierValue,
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      strapiErrors: null,
      message: "Missing Fields. Failed to Register.",
    };
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ passwordValue, identifierValue }),
  });

  if (res.ok) {
    console.log("😀😀");
    redirect("/protected");
  } else {
    alert("Invalid credentials");
  }
}
