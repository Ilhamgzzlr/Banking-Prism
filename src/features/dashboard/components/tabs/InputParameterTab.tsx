import { Section, InfoTooltip, LGDOption, GrowthAssumptionOption, ParameterSection, ContinueButton, BackButton, SelectModelPopup } from "../common";
import { useParameters } from "./hooks/useParameters";
import {
  INITIALIZATION_PARAMETERS,
  GROWTH_ASSUMPTION_OPTIONS,
  LGD_METHODS,
  // LOAN_SEGMENTS
} from "./data/parameterConfig";
import { useOrderStore } from "@/stores/useOrderStore";
import { useState, useEffect } from "react";
import { OrdersAPI } from "@/api/orders.api";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";


export default function InputParameterTab() {
  const {
    orderId,
    page6,
    page2,
    savePageData,
    nextStep,
    prevStep,
  } = useOrderStore();

  const stressColumns = page2?.stress_columns?.slice(1) || [];

  const {
    parameters,
    updateParameter,
    handleFileChange,
    validateParameters,
    setShowElasticityTooltip
  } = useParameters(page6?.parameters, stressColumns);


  const gdpColumnOptions = page2?.macro_columns || [];

  useEffect(() => {
    savePageData(6, { parameters });
  }, [parameters]);

  const initParams = {
    TRAIN_RATIO: Number(parameters.train_ratio),
    // RESID_MODE_PD: parameters.resid_mode_pd as "Normal" | "Bootstrapping" | "Residual",
    // sementara normal dulu
    RESID_MODE_PD: "Normal" as "Normal",
    WRITE_OFF_VALUE: Number(parameters.write_off_value),
    N_PATHS_PD: Number(parameters.n_paths_pd),
    CURE_RATE_VALUE: Number(parameters.cure_rate_value),
    EQUITY: Number(parameters.equity),
  };

  const eadValues = stressColumns.map((segment: any) => ({
    ead_column: segment,
    value: Number(parameters.exposure[segment]),
    elasticity_value:
      parameters.ead_growth_assumption === "gdp" || parameters.ead_growth_assumption === "manual"
        ? Number(parameters.ead[segment])
        : undefined,
  }));

  const eadConfig = {
    // ead_growth_assumption: (
    //   parameters.ead_growth_assumption === "constant"
    //     ? "Constant"
    //     : parameters.ead_growth_assumption === "manual"
    //       ? "Manual"
    //       : "GDP Growth"
    // ) as "Constant" | "Manual" | "GDP Growth",

    // sementara constant dulu
    ead_growth_assumption: "Constant" as "Constant",

    ead_values: eadValues,

    gdp_column_name:
      parameters.ead_growth_assumption === "gdp"
        ? parameters.gdp_column
        : undefined,
  };

  const nplValues = stressColumns.reduce((acc: any, segment: any) => {
    acc[segment] = Number(parameters.npl[segment]);
    return acc;
  }, {} as Record<string, number>);

  const rwaConfig = {
    credit_rwa: Number(parameters.rwa_credit),
    non_credit_rwa: Number(parameters.rwa_non_credit),
    operational_rwa: Number(parameters.rwa_operational),
  };

  const lgdConfig = {
    // lgd_mode: (
    //   parameters.lgd_method === "constant"
    //     ? "Constant"
    //     : parameters.lgd_method === "rr_model"
    //       ? "RR Model"
    //       : "LGD Model"
    // ) as "Constant" | "RR Model" | "LGD Model",

    // sementara constant dulu
    lgd_mode: "Constant" as "Constant",


    // lgd_constant_value:
    //   parameters.lgd_method === "constant"
    //     ? Number(parameters.lgd_constant_value) || 0.1
    //     : undefined,

    lgd_constant_value: 0.1,

    historical_data_file:
      parameters.lgd_method !== "constant"
        ? parameters.lgd_method === "rr_model"
          ? parameters.rr_file
          : parameters.lgd_file
        : null,

    related_macro_data:
      parameters.lgd_method !== "constant"
        ? parameters.lgd_method === "rr_model"
            ? parameters.rr_macro_columns
            : parameters.lgd_macro_columns
        : undefined,

    modelling_approach:
      parameters.lgd_method !== "constant"
        ? parameters.lgd_method === "rr_model"
          ? parameters.rr_modelling_approach
          : parameters.lgd_modelling_approach
        : undefined,
  };



  const handleContinue = async () => {
    if (!orderId) return alert("Order not found");

    if (!validateParameters()) {
      alert("Please fill in all required parameters");
      return;
    }

    const payload = {
      init_params: initParams,
      ead_config: eadConfig,
      npl_values: nplValues,
      rwa_config: rwaConfig,
      lgd_config: lgdConfig,
    };

    try {
      await OrdersAPI.savePage6(orderId, payload);

      savePageData(6, { parameters });

      // await OrdersAPI.runCalculation(orderId);
      nextStep();
    } catch (e) {
      console.error(e);
      alert("Failed to save parameters");
    }
  };


  const handleBack = () => {
    prevStep();
  };

  // Prepare parameter sections data
  // const initializationParams = INITIALIZATION_PARAMETERS.map(param => ({
  //   ...param,
  //   value: parameters[param.id as keyof typeof parameters] as string
  // }));

  const initializationParams = INITIALIZATION_PARAMETERS.map(param => {
    if (param.id === "resid_mode_pd") {
      return {
        ...param,
        value: parameters.resid_mode_pd,
        options: [
          { label: "Normal", value: "Normal" },
          { label: "Bootstrapping", value: "Bootstrapping" },
          { label: "Fitted", value: "Fitted" },
        ]
      };
    }

    return {
      ...param,
      value: parameters[param.id as keyof typeof parameters] as string
    };
  });


  const exposureParams = stressColumns.map((segment: any) => ({
    id: `exposure_${segment}`,
    label: segment === "micro" ? "Micro (Enterprise)" :
      segment === "civil" ? "Civil Servant" :
        segment.charAt(0).toUpperCase() + segment.slice(1),
    value: parameters.exposure[segment] || "",
    placeholder: "e.g., 18000000"
  }));

  const growthParams = parameters.ead_growth_assumption !== "constant"
    ? stressColumns.map((segment: any) => ({
      id: `ead_${segment}`,
      label: segment === "micro" ? "Micro (Enterprise)" :
        segment === "civil" ? "Civil Servant" :
          segment.charAt(0).toUpperCase() + segment.slice(1),
      value: parameters.ead[segment] || "",
      placeholder: parameters.ead_growth_assumption === "gdp" ? "e.g., 1.5" : "e.g., 0.05",
      unit: parameters.ead_growth_assumption === "gdp" ? "elasticity" : "%"
    }))
    : [];

  const nplParams = stressColumns.map((segment: any) => ({
    id: `npl_${segment}`,
    label: segment === "micro" ? "Micro (Enterprise)" :
      segment === "civil" ? "Civil Servant" :
        segment.charAt(0).toUpperCase() + segment.slice(1),
    value: parameters.npl[segment] || "",
    placeholder: "e.g., 75000"
  }));

  const rwaParams = [
    { id: "rwa_credit", label: "Credit Risk RWA", value: parameters.rwa_credit, placeholder: "e.g., 80000" },
    { id: "rwa_non_credit", label: "Market Risk RWA", value: parameters.rwa_non_credit, placeholder: "e.g., 150000" },
    { id: "rwa_operational", label: "Operational Risk RWA", value: parameters.rwa_operational, placeholder: "e.g., 50000" }
  ];

  const [openSelectModel, setOpenSelectModel] = useState(false);
  const [selectedModel, setSelectedModel] = useState<{
    id: string;
    name: string;
  } | null>(null);


  const handleRrModellingApproachChange = (approach: "auto" | "custom") => {
    updateParameter("rr_modelling_approach", approach);

    if (approach === "custom") {
      setOpenSelectModel(true);
    }
  };

  const handleLgdModellingApproachChange = (approach: "auto" | "custom") => {
    updateParameter("lgd_modelling_approach", approach);

    if (approach === "custom") {
      setOpenSelectModel(true);
    }
  };

  const handleConfirmModel = (model: { id: string; name: string }) => {
    setSelectedModel(model);

    // OPTIONAL: simpan ke parameters agar ikut ke payload
    // updateParameter("selected_model_id", model.id);
  };



  return (
    <div className="space-y-8">
      {/* Initialization Parameters */}
      <ParameterSection
        title="Initialization Parameters"
        parameters={initializationParams}
        onParameterChange={(id, value) => updateParameter(id as any, value)}
        columns={2}
        required
      />

      {/* Exposure at Default */}
      <ParameterSection
        title="Exposure at Default"
        parameters={exposureParams}
        onParameterChange={(id, value) => {
          const segment = id.replace('exposure_', '');
          updateParameter('exposure', { ...parameters.exposure, [segment]: value });
        }}
        columns={2}
        required
      />

      {/* EAD Growth Assumption */}
      <Section title="EAD Growth Assumption" required>
        <div className="flex gap-6 mb-6">
          {GROWTH_ASSUMPTION_OPTIONS.map((option) => (
            <GrowthAssumptionOption
              key={option.value}
              value={option.value}
              label={option.label}
              description={option.description}
              isSelected={parameters.ead_growth_assumption === option.value}
              onSelect={(value) => updateParameter("ead_growth_assumption", value)}
            />
          ))}
        </div>

        {parameters.ead_growth_assumption !== "constant" && (
          <>
            {/* GDP Column Selection */}
            {parameters.ead_growth_assumption === "gdp" && (
              <div className="mb-6">
                <div className="flex flex-col gap-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      GDP Column Name
                    </label>
                    <Select
                      value={parameters.gdp_column || ""}
                      onValueChange={(value) =>
                        updateParameter("gdp_column", value)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select GDP column..." />
                      </SelectTrigger>

                      <SelectContent>
                        {gdpColumnOptions.length > 0 ? (
                          gdpColumnOptions.slice(1).map((column: any) => (
                            <SelectItem key={column} value={column}>
                              {column}
                            </SelectItem>
                          ))
                        ) : (
                          <>
                            <SelectItem value="gdp_growth">
                              GDP Growth Rate
                            </SelectItem>
                            <SelectItem value="gdp_nominal">
                              Nominal GDP
                            </SelectItem>
                            <SelectItem value="gdp_real">
                              Real GDP
                            </SelectItem>
                            <SelectItem value="gdp_per_capita">
                              GDP per Capita
                            </SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Elasticity Tooltip */}
                  <div className="flex items-center">
                    <div
                      className="relative inline-flex items-center gap-2"
                      onMouseEnter={() => setShowElasticityTooltip(true)}
                      onMouseLeave={() => setShowElasticityTooltip(false)}
                    >
                      <h4 className="text-sm font-semibold text-gray-900">
                        Elasticity Assumption
                      </h4>
                      <InfoTooltip
                        content="Elasticity is a parameter that measures how sensitive banking portfolios are to changes in GDP. For example, a value of 1.5 means that a given change in GDP will translate into elasticity that is 1.5 times greater; if there's a 1% drop in GDP on aggregate, then elasticity of 1.5 indicates that it will be roughly a 1.5% increase in values."
                        position="right"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Growth Parameters Section */}
            {growthParams.length > 0 && (
              <ParameterSection
                title={`Growth Assumption for ${parameters.ead_growth_assumption === "gdp" ? "GDP Elasticity" : "Manual Growth"}`}
                parameters={growthParams}
                onParameterChange={(id, value) => {
                  const segment = id.replace('ead_', '');
                  updateParameter('ead', { ...parameters.ead, [segment]: value });
                }}
                columns={2}
              />
            )}
          </>
        )}
      </Section>

      {/* Non Performing Loan */}
      <ParameterSection
        title="Non Performing Loan (NPL)"
        parameters={nplParams}
        onParameterChange={(id, value) => {
          const segment = id.replace('npl_', '');
          updateParameter('npl', { ...parameters.npl, [segment]: value });
        }}
        columns={2}
      />

      {/* Risk-Weighted Assets (RWA) */}
      <ParameterSection
        title="Risk-Weighted Assets (RWA)"
        parameters={rwaParams}
        onParameterChange={(id, value) => updateParameter(id as any, value)}
        columns={3}
      />

      {/* Loss Given Default (LGD) */}
      <Section title="Loss Given Default (LGD)" required>
        <div className="space-y-4">
          {LGD_METHODS.map((method) => (
            <LGDOption
              key={method.value}
              method={method.value}
              label={method.label}
              isSelected={parameters.lgd_method === method.value}
              macroOptions={gdpColumnOptions.slice(1) || []}
              onSelect={() => updateParameter("lgd_method", method.value)}
              lgdValue={parameters.lgd_constant_value}
              onLGDValueChange={(value) => updateParameter("lgd_constant_value", value)}
              rrFile={parameters.rr_file}
              onRrFileChange={(file) => handleFileChange("rr_file", file)}
              rrMacroColumns={parameters.rr_macro_columns || []}
              onRrMacroColumnsChange={(values) =>
                updateParameter("rr_macro_columns", values)
              }
              rrModellingApproach={parameters.rr_modelling_approach}
              onRrModellingApproachChange={handleRrModellingApproachChange}
              lgdFile={parameters.lgd_file}
              onLgdFileChange={(file) => handleFileChange("lgd_file", file)}
              lgdMacroColumns={parameters.lgd_macro_columns || []}
              onLgdMacroColumnsChange={(values) =>
                updateParameter("lgd_macro_columns", values)
              }
              lgdModellingApproach={parameters.lgd_modelling_approach}
              onLgdModellingApproachChange={handleLgdModellingApproachChange}
              selectedModel={selectedModel}
            />
          ))}
        </div>
      </Section>

      <SelectModelPopup
        open={openSelectModel}
        onOpenChange={setOpenSelectModel}
        onConfirm={handleConfirmModel}
      />


      {/* Action Buttons */}
      <div className="flex justify-between gap-3 pt-4">
        <BackButton
          onClick={handleBack}
          label="Back"
        />

        <ContinueButton
          onClick={handleContinue}
          disabled={!validateParameters()}
          label="Continue"
        />
      </div>
    </div>
  );
}