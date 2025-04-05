import { ArrowBack, Edit } from "@mui/icons-material";
import Link from "next/link";

export default function ProfileHeader({ title, isEdit, editLink, backEditLink }: { title: string; isEdit: boolean; editLink: string; backEditLink: string; }) {

  return (
    <div className="flex items-end justify-between gap-x-6">
      <h2 className="text-5xl grow flex items-end gap-x-3 after:content-[''] after:block after:w-full after:h-2 after:bg-black after:mt-2">
        {isEdit ? 'Edit' : 'My'} <span className="font-bold whitespace-nowrap">{title}</span>
      </h2>
      <Link href={isEdit ? backEditLink : editLink} className="shrink text-lg">
        {isEdit && <ArrowBack />}
        <span className="underline">{isEdit ? `Go back to My ${title}` : `Edit ${title}`}</span>
        {!isEdit && <Edit className="ml-1" />}
      </Link>
    </div>
  );
}