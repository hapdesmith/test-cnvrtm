import AppLayout from "../appLayout";

export default function HomeLayout({ children }: { children: React.ReactNode }) {

  return (
    <AppLayout>
      <div className="flex flex-col lg:flex-row px-4">
        <div className="w-full">
          {children}
        </div>
      </div>
    </AppLayout>
  );
}