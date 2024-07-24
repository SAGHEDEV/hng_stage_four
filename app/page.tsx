import DefaultHeader from "./components/defaultHeader";
import MainPage from "./home/main";

export default function Home() {
  return (
    <main className=" md:p-6 ">
      <DefaultHeader />
      <div className="p-[16px] md:p-0">
        <MainPage />
      </div>
    </main>
  );
}
