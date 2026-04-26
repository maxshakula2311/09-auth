"use client";

import { useRouter } from "next/navigation";
import css from "./EditProfilePage.module.css";
import Image from "next/image";
import { User } from "@/types/user";
import { useEffect, useState } from "react";
import { getMe, updateMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

const EditProfilePage = () => {
  const router = useRouter();
  const setGlobUser = useAuthStore((state) => state.setUser);
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getMe();
        setUser(userData);
        setUsername(userData.username);
      } catch (error) {
        console.error("Failed to fetch user", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedUserData = await updateMe({ username });

      setGlobUser(updatedUserData);
      router.push("/profile");
      router.refresh();
    } catch (error) {
      alert("Помилка при оновленні профілю");
    }
  };
  return (
    <>
      {loading && <p>Loading...</p>}
      {user && (
        <main className={css.mainContent}>
          <div className={css.profileCard}>
            <h1 className={css.formTitle}>Edit Profile</h1>

            <Image
              src={user.avatar}
              alt="User Avatar"
              width={120}
              height={120}
              className={css.avatar}
            />

            <form className={css.profileInfo} onSubmit={handleSubmit}>
              <div className={css.usernameWrapper}>
                <label htmlFor="username">Username:</label>
                <input
                  id="username"
                  type="text"
                  className={css.input}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <p>{`Email: ${user.email}`}</p>

              <div className={css.actions}>
                <button type="submit" className={css.saveButton}>
                  Save
                </button>
                <button
                  type="button"
                  className={css.cancelButton}
                  onClick={() => router.back()}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </main>
      )}
    </>
  );
};

export default EditProfilePage;