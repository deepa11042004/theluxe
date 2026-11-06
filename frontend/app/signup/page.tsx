import { redirect } from "next/navigation";

// Accounts are created by joining The Luxe Club (payment on /join); members then set their password from the welcome email.
export default function SignupPage() {
  redirect("/join");
}
