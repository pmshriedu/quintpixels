import { redirect } from "next/navigation";

export default function AdminRegisterPage() {
  // Server-side check for registration toggle
  const enabled = process.env.ENABLE_ADMIN_REGISTRATION === "true";
  if (!enabled) redirect("/pixels/login");

  return <RegisterForm />;
}

function RegisterForm() {
  return <RegisterClient />;
}

// Separate client component to handle the form
import RegisterClient from "./RegisterClient";
