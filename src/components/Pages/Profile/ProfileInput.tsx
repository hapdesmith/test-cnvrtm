export default function ProfileInput({ label, error, isError, children }: { label: string, error: string, isError: boolean, children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-1 lg:gap-y-2">
      <label htmlFor="salutation" className="text-base lg:text-lg font-extrabold">{label}</label>
      <div>
        {children}
        {isError && (
          <p className="text-red-700 text-xs lg:text-sm italic mt-1">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
