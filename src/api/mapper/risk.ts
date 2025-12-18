export const mapCreditRiskMetricsToPayload = (metrics: any[]) => {
  const find = (name: string) =>
    metrics.find(m => m.name === name);

  const toRiskLimit = (m: any) => ({
    risk_limit: Number(m.riskLimit),
    risk_appetite: Number(m.riskAppetite),
    risk_capacity: Number(m.riskCapacity),
    risk_tolerance: Number(m.riskTolerance),
  });

  const nplGross = find("NPL Gross");
  const nplNet = find("NPL Net");
  const car = find("Capital Adequacy Ratio (CAR)");

  return {
    npl_gross_limits: nplGross ? toRiskLimit(nplGross) : null,
    npl_net_limits: nplNet ? toRiskLimit(nplNet) : null,
    car_limits: car ? toRiskLimit(car) : null,
  };
};
