import Link from "next/link";
import css from "./ProfilePage.module.css";
import { getServerMe } from "@/lib/api/serverApi";
import Image from "next/image";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Profile | NoteHub",
  description: "View and manage your user profile",
  openGraph: {
    title: "Profile | NoteHub",
    description: "View and manage your user profile",
    url: "/profile",
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub-images-logo",
      },
    ],
    type: "website",
  },
};
const ProfilePage = async () => {
  const user = await getServerMe();
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>{`Username: ${user.username}`}</p>
          <p>{`Email: ${user.email}`}</p>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;