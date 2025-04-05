export default function ProfileField({ label, value }: { label: string, value: string | undefined }) {
  return (
    <div className="flex flex-col gap-y-2 lg:gap-y-3">
      <p className="text-base lg:text-lg font-extrabold">{label}</p>
      <p>{value || '-'}</p>
    </div>
  );
}