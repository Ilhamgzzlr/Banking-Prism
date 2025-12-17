import MainLayout from "@layouts/MainLayout";
import StressModelTabs from "../components/StressModelTabs";

export default function StressTestingModelPage() {
  return (
    <MainLayout>
      <div className="bg-white p-6 flex flex-col flex-1">
        <StressModelTabs />
      </div>
    </MainLayout>
  );
}
