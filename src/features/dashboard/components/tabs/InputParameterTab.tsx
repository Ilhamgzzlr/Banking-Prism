import { Section, InfoTooltip, LGDOption, GrowthAssumptionOption, ParameterSection, ContinueButton, BackButton } from "../common";
import { useParameters } from "./hooks/useParameters";
import {
  INITIALIZATION_PARAMETERS,
  GROWTH_ASSUMPTION_OPTIONS,
  LGD_METHODS,
  LOAN_SEGMENTS
} from "./data/parameterConfig";

type Props = {
  onContinue: () => void;
  fileColumns?: { macroeconomic: string[] };
  onBack: () => void;
};


export default function InputParameterTab({ onContinue, onBack, fileColumns }: Props) {
  const {
    parameters,
    updateParameter,
    handleFileChange,
    validateParameters,
    setShowElasticityTooltip
  } = useParameters();

  const handleContinue = () => {
    if (!validateParameters()) {
      alert("Please fill in all required parameters");
      return;
    }

    onContinue();
  };

  const handleBack = () => {
    onBack();
  }

  // Prepare parameter sections data
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

  const exposureParams = LOAN_SEGMENTS.map(segment => ({
    id: `exposure_${segment}`,
    label: segment === "micro" ? "Micro (Enterprise)" :
      segment === "civil" ? "Civil Servant" :
        segment.charAt(0).toUpperCase() + segment.slice(1),
    value: parameters[`exposure_${segment}` as keyof typeof parameters] as string,
    placeholder: "e.g., 18000000"
  }));

  const growthParams = parameters.ead_growth_assumption !== "constant"
    ? LOAN_SEGMENTS.map(segment => ({
      id: `ead_${segment}`,
      label: segment === "micro" ? "Micro (Enterprise)" :
        segment === "civil" ? "Civil Servant" :
          segment.charAt(0).toUpperCase() + segment.slice(1),
      value: parameters[`ead_${segment}` as keyof typeof parameters] as string,
      placeholder: parameters.ead_growth_assumption === "gdp" ? "e.g., 1.5" : "e.g., 0.05",
      unit: parameters.ead_growth_assumption === "gdp" ? "elasticity" : "%"
    }))
    : [];

  const nplParams = LOAN_SEGMENTS.map(segment => ({
    id: `npl_${segment}`,
    label: segment === "micro" ? "Micro (Enterprise)" :
      segment === "civil" ? "Civil Servant" :
        segment.charAt(0).toUpperCase() + segment.slice(1),
    value: parameters[`npl_${segment}` as keyof typeof parameters] as string,
    placeholder: "e.g., 75000"
  }));

  const rwaParams = [
    { id: "rwa_credit", label: "Credit RWA", value: parameters.rwa_credit, placeholder: "e.g., 80000" },
    { id: "rwa_non_credit", label: "Non-Credit RWA", value: parameters.rwa_non_credit, placeholder: "e.g., 150000" },
    { id: "rwa_operational", label: "Operational RWA", value: parameters.rwa_operational, placeholder: "e.g., 50000" }
  ];

  const gdpColumnOptions = fileColumns?.macroeconomic || [];

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
        onParameterChange={(id, value) => updateParameter(id as any, value)}
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
                    <select
                      value={parameters.gdp_column}
                      onChange={(e) => updateParameter("gdp_column", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    >
                      <option value="">Select GDP column...</option>
                      {gdpColumnOptions.length > 0 ? (
                        gdpColumnOptions.slice(1).map((column) => (
                          <option key={column} value={column}>
                            {column}
                          </option>
                        ))
                      ) : (
                        <>
                          <option value="gdp_growth">GDP Growth Rate</option>
                          <option value="gdp_nominal">Nominal GDP</option>
                          <option value="gdp_real">Real GDP</option>
                          <option value="gdp_per_capita">GDP per Capita</option>
                        </>
                      )}
                    </select>
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
                onParameterChange={(id, value) => updateParameter(id as any, value)}
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
        onParameterChange={(id, value) => updateParameter(id as any, value)}
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
              onSelect={() => updateParameter("lgd_method", method.value)}
              rrValue={parameters.rr_value}
              onRrValueChange={(value) => updateParameter("rr_value", value)}
              rrFile={parameters.rr_file}
              onRrFileChange={(file) => handleFileChange("rr_file", file)}
              rrMacroColumn={parameters.rr_macro_column}
              onRrMacroColumnChange={(value) => updateParameter("rr_macro_column", value)}
              rrModellingApproach={parameters.rr_modelling_approach}
              onRrModellingApproachChange={(approach) => updateParameter("rr_modelling_approach", approach)}
              lgdFile={parameters.lgd_file}
              onLgdFileChange={(file) => handleFileChange("lgd_file", file)}
              lgdMacroColumn={parameters.lgd_macro_column}
              onLgdMacroColumnChange={(value) => updateParameter("lgd_macro_column", value)}
              lgdModellingApproach={parameters.lgd_modelling_approach}
              onLgdModellingApproachChange={(approach) => updateParameter("lgd_modelling_approach", approach)}
            />
          ))}
        </div>
      </Section>

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