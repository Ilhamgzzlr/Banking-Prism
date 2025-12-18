import { useState, useEffect } from "react";
import {
  ContinueButton,
  BackButton,
  FileUploadSection,
  HorizontalRadioGroup,
  Section
} from "../common";
import { useFileUpload } from "./hooks/useFileUpload";
import { TIME_HORIZON_OPTIONS, UPLOAD_CONFIG } from "./data/inputDataConfig";
// import { uploadInputData } from "@/api/orders";
import { useOrderStore } from "@/stores/useOrderStore";
import { OrdersAPI } from "@/api/orders.api";


// type Props = {
//   orderId: number;
//   onContinue: (fileColumns: { macroeconomic: string[] }) => void;
//   onBack: () => void;
// };


export default function InputDataTab() {
  const { page2, savePageData, nextStep, prevStep, orderId } = useOrderStore();

  const [timeHorizon, setTimeHorizon] = useState<string>(
    page2?.time_horizon ?? "yearly"
  );

  useEffect(() => {
    savePageData(2, {
      ...page2,
      time_horizon: timeHorizon,
    });
  }, [timeHorizon]);


  const { files, handleFileSelect, fileColumns } = useFileUpload();

  const handleContinue = async () => {
    if (!orderId) {
      alert("Order ID not found. Please restart flow.");
      return;
    }

    if (!files.stressTest || !files.macroeconomic) {
      alert("Please upload both files");
      return;
    }

    try {
      // await uploadInputData(orderId, {
      //   time_horizon: timeHorizon,
      //   stressTestingFile: files.stressTest,
      //   macroFile: files.macroeconomic,
      // });
      await OrdersAPI.savePage2(orderId, {
        time_horizon: timeHorizon,
        stressTestingFile: files.stressTest,
        macroFile: files.macroeconomic,
      });

      // simpan metadata ke Zustand (BUKAN file)
      savePageData(2, {
        time_horizon: timeHorizon,
        stress_uploaded: true,
        macro_uploaded: true,
        macro_columns: fileColumns.macroeconomic,
        stress_columns: fileColumns.stressTest
      });

      nextStep(); // pakai Zustand, bukan props
    } catch (error) {
      console.error(error);
      alert("Failed to upload data");
    }
  };



  const handleBack = () => {
    prevStep();
  };


  const isFormValid = files.stressTest && files.macroeconomic;

  return (
    <div className="space-y-8">
      {/* Time Horizon */}
      <HorizontalRadioGroup
        title="Time Horizon of Stress Testing Data"
        options={TIME_HORIZON_OPTIONS}
        name="timeHorizon"
        required
        selectedValue={timeHorizon}
        onValueChange={setTimeHorizon}
      />

      {/* Stress Testing Data Input */}
      <Section title="Stress Testing Data Input" required>
        <FileUploadSection
          title={UPLOAD_CONFIG.STRESS_TEST.title}
          acceptedTypes={UPLOAD_CONFIG.STRESS_TEST.acceptedTypes}
          onFileSelect={(file) => handleFileSelect("stressTest", file)}
          selectedFile={files.stressTest}
          required
        />
      </Section>

      {/* Macroeconomic Scenario Data Input */}
      <Section title="Macroeconomic Scenario Data Input" required>
        <FileUploadSection
          title={UPLOAD_CONFIG.MACROECONOMIC.title}
          acceptedTypes={UPLOAD_CONFIG.MACROECONOMIC.acceptedTypes}
          onFileSelect={(file) => handleFileSelect("macroeconomic", file)}
          selectedFile={files.macroeconomic}
          required
        />
      </Section>

      {/* Action */}
      <div className="flex justify-between">
        <BackButton
          onClick={handleBack}
          label="Back"
        />
        <ContinueButton
          onClick={handleContinue}
          disabled={!isFormValid}
          label="Continue"
        />
      </div>
    </div>
  );
}