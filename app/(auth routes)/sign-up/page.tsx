"use client";

import { register } from "@/lib/api/clientApi";
import css from "./SignUpPage.module.css";

import { useAuthStore } from "@/lib/store/authStore";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      const data = await register({ email, password });

      console.log("🚀 ~ handleSubmit ~ data:", data);

      if (data) {
        setUser(data);
        router.push("/profile");
      } else {
        setError("Something went wrong with email or password");
      }
    } catch (err) {
      setError(((err as Error).message as string) || "Something went wrong");
      console.log(err);
    }
  };
  return (
    <>
      <main className={css.mainContent}>
        <h1 className={css.formTitle}>Sign up</h1>
        <form className={css.form} action={handleSubmit}>
          <div className={css.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              className={css.input}
              required
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              className={css.input}
              required
            />
          </div>

          <div className={css.actions}>
            <button type="submit" className={css.submitButton}>
              Register
            </button>
          </div>

          {error && <p className={css.error}>{error}</p>}
        </form>
      </main>
    </>
  );
};

export default SignUpPage;