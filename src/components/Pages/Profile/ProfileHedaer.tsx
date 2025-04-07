import { ArrowBack, Edit } from "@mui/icons-material";
import Link from "next/link";

export default function ProfileHeader({ title, isEdit, editLink, backEditLink }: { title: string; isEdit: boolean; editLink: string; backEditLink: string; }) {

  return (
    <div className="mt-4 lg:mt-0 flex flex-col lg:flex-row items-end justify-between gap-x-2 lg:gap-x-6 border-r-4 pr-2 lg:pr-0 border-gray-300 lg:border-r-0">
      <h2 className="text-3xl lg:text-5xl grow flex items-end gap-x-1 lg:gap-x-3 after:content-[''] after:block after:w-full after:h-2 after:bg-black after:mt-2">
        {isEdit ? 'Edit' : 'My'} <span className="font-bold whitespace-nowrap">{title}</span>
      </h2>
      <Link href={isEdit ? backEditLink : editLink} className="shrink text-xs lg:text-lg">
        {isEdit && <ArrowBack className="!text-sm lg:!text-lg" />}
        <span className="underline">{isEdit ? `Go back to My ${title}` : `Edit ${title}`}</span>
        {!isEdit && <Edit className="ml-1 !text-sm lg:!text-lg" />}
      </Link>
    </div>
  );
}