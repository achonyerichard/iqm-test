import FscComponent from "@/components/FscComponent";

export default function Home() {
  return (
    <div className="p-6 lg:p-20 min-h-screen xl:max-w-[1440px] w-full mx-auto">
      <h2 className="text-center text-black text-xl lg:text-3xl font-bold pb-5 lg:pb-10">FSC Moodlet System</h2>
      <FscComponent/>
    </div>
  );
}
