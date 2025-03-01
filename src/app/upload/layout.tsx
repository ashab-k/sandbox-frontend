import Navbar from "@/components/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <div className="w-full">
        <Navbar />
      </div>
      <main className="pt-[5rem]">{children}</main>
    </div>
  );
}
