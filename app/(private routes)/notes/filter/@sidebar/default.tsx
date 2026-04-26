import css from "./SidebarNotes.module.css";
import Link from "next/link";
import { sidebarTags } from "@/lib/tags";
const NotesSidebar = () => {
  return (
    <>
      <ul className={css.menuList}>
        <li className={css.menuItem}>
          <Link href={`/notes/filter/all`} className={css.menuLink}>
            All notes
          </Link>
        </li>
        {sidebarTags.map((tag) => {
          return (
            <li key={tag} className={css.menuItem}>
              <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
                {tag}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};
export default NotesSidebar;