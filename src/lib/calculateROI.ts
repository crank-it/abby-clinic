export interface ROIInputs {
  weeklyAppointments: number;
  responseRate: number;
  minutesPerResponse: number;
  hourlyWage?: number;
  annualPrice?: number;
}

export interface ROIResult {
  weeklyResponses: number;
  weeklyMinutes: number;
  weeklyHours: number;
  annualHours: number;
  annualStaffCost: number;
  abbyCost: number;
  annualSavings: number;
  roiPercentage: number;
  paybackDays: number;
}

export function calculateROI({
  weeklyAppointments,
  responseRate,
  minutesPerResponse,
  hourlyWage = 35,
  annualPrice = 160
}: ROIInputs): ROIResult {
  const weeklyResponses = weeklyAppointments * responseRate;
  const weeklyMinutes = weeklyResponses * minutesPerResponse;
  const weeklyHours = weeklyMinutes / 60;
  const annualHours = weeklyHours * 48; // 48 working weeks
  const annualStaffCost = annualHours * hourlyWage;
  const annualSavings = annualStaffCost - annualPrice;
  const roiPercentage = (annualSavings / annualPrice) * 100;
  const paybackDays = annualPrice / (annualStaffCost / 365);

  return {
    weeklyResponses: Math.round(weeklyResponses),
    weeklyMinutes: Math.round(weeklyMinutes),
    weeklyHours: parseFloat(weeklyHours.toFixed(1)),
    annualHours: Math.round(annualHours),
    annualStaffCost: Math.round(annualStaffCost),
    abbyCost: annualPrice,
    annualSavings: Math.round(Math.max(0, annualSavings)),
    roiPercentage: Math.round(Math.max(0, roiPercentage)),
    paybackDays: Math.round(Math.max(1, paybackDays))
  };
}
