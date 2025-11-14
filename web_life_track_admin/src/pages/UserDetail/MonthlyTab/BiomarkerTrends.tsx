import type { IOptionCustomLineChart } from "@/common/types";
import CustomLineChart from "@/components/chart/CustomLineChart";
import { Card } from "@/components/ui/card";
import { Fragment } from "react/jsx-runtime";

const dates = Array.from({ length: 30 }, (_, i) => {
  const d = new Date("2025-10-13");
  d.setDate(d.getDate() + i);
  return d.toISOString().split("T")[0];
});

const bloodPressureData = dates.map((date, i) => ({
  date,
  diastolic: Math.round(78 + Math.sin(i / 2) * 4 + Math.random() * 3),
  systolic: Math.round(122 + Math.cos(i / 2) * 6 + Math.random() * 4),
}));

const bloodGlucoseData = dates.map((date, i) => ({
  date,
  fasting:
    Math.random() < 0.2 ? undefined : Math.round(95 + Math.random() * 25),
}));

const heartRateData = dates.map((date, i) => ({
  date,
  heartRate: Math.round(70 + Math.sin(i / 3) * 8 + Math.random() * 4),
}));

const weightData = dates.map((date, i) => ({
  date,
  weight: Math.round(80 - i * 0.1 + Math.random() * 0.3),
}));

const sleepDurationData = dates.map((date, i) => ({
  date,
  duration: parseFloat((6.5 + Math.sin(i / 5) + Math.random()).toFixed(1)),
}));

const macroNutrientsData = dates.map((date, i) => ({
  date,
  carbs: Math.round(300 + Math.sin(i) * 150 + Math.random() * 50),
  energy: Math.round(2000 + Math.random() * 1000),
  fat: Math.round(200 + Math.random() * 100),
  protein: Math.round(100 + Math.sin(i / 2) * 80 + Math.random() * 30),
}));

const sugarAndFatDetailData = dates.map((date, i) => ({
  date,
  saturatedFat: Math.round(20 + Math.random() * 25),
  sugar: Math.round(20 + Math.random() * 40),
  transFat: 0,
}));

const cholesterolAndSodiumData = dates.map((date, i) => ({
  date,
  cholesterol: Math.round(200 + Math.random() * 100),
  sodium: Math.round(2000 + Math.random() * 1000),
}));

const bloodPressureOptions: IOptionCustomLineChart = {
  yAxis: [{ min: 0, max: 140, unit: "mmHg" }],
  labels: [
    {
      text: "Diastolic (mmHg)",
      color: "#3B82F6",
      dataKey: "diastolic",
      unit: "mmHg",
    },
    {
      text: "Systolic (mmHg)",
      color: "#EF4444",
      dataKey: "systolic",
      unit: "mmHg",
    },
  ],
};

const bloodGlucoseOptions: IOptionCustomLineChart = {
  yAxis: [{ min: 0, max: 200, unit: "mg/dL" }],
  labels: [
    {
      text: "Fasting (mg/dL)",
      color: "#f39c12",
      dataKey: "fasting",
      unit: "mg/dL",
    },
  ],
};

const heartRateOptions: IOptionCustomLineChart = {
  yAxis: [{ min: 0, max: 100, unit: "bpm" }],
  labels: [
    {
      text: "Heart Rate (bpm)",
      color: "#9b59b6",
      dataKey: "heartRate",
      unit: "bpm",
    },
  ],
};

const weightOptions: IOptionCustomLineChart = {
  yAxis: [{ min: 0, max: 100, unit: "kg" }],
  labels: [
    { text: "Weight (kg)", color: "#18a085", dataKey: "weight", unit: "kg" },
  ],
};

const sleepDurationOptions: IOptionCustomLineChart = {
  yAxis: [{ min: 0, max: 10, unit: "hours" }],
  labels: [
    {
      text: "Sleep Duration (hours)",
      color: "#2c3e50",
      dataKey: "duration",
      unit: "hours",
    },
  ],
};

const macroNutrientsOptions: IOptionCustomLineChart = {
  yAxis: [
    { min: 0, max: 800, unit: "g" },
    { min: 0, max: 8000, unit: "kcal" },
  ],
  labels: [
    { text: "Carbs (g)", color: "#3498db", dataKey: "carbs", unit: "g" },
    {
      text: "Energy (kcal)",
      color: "#e74c3d",
      dataKey: "energy",
      unit: "kcal",
    },
    { text: "Fat (g)", color: "#f39c12", dataKey: "fat", unit: "g" },
    { text: "Protein (g)", color: "#55d284", dataKey: "protein", unit: "g" },
  ],
};

const sugarAndFatDetailOptions: IOptionCustomLineChart = {
  yAxis: [{ min: 0, max: 300, unit: "g" }],
  labels: [
    {
      text: "Saturated Fat (g)",
      color: "#9c27b0",
      dataKey: "saturatedFat",
      unit: "g",
    },
    { text: "Sugar (g)", color: "#ed4377", dataKey: "sugar", unit: "g" },
    { text: "Trans Fat (g)", color: "#673ab7", dataKey: "transFat", unit: "g" },
  ],
};

const cholesterolAndSodiumOptions: IOptionCustomLineChart = {
  yAxis: [
    { min: 0, max: 300, unit: "mg" },
    { min: 0, max: 3000, unit: "mg" },
  ],
  labels: [
    {
      text: "Cholesterol (mg)",
      color: "#9c27b0",
      dataKey: "cholesterol",
      unit: "mg",
    },
    { text: "Sodium (mg)", color: "#ed4377", dataKey: "sodium", unit: "mg" },
  ],
};

const BiomarkerTrends = () => {
  return (
    <Fragment>
      <Card className="p-6 border-none">
        <h2 className="text-xl">Biomarker Trends</h2>
        <CustomLineChart
          title="Blood Pressure"
          data={bloodPressureData}
          options={bloodPressureOptions}
        />
        <CustomLineChart
          title="Blood Glucose"
          data={bloodGlucoseData}
          options={bloodGlucoseOptions}
        />
        <CustomLineChart
          title="Heart Rate"
          data={heartRateData}
          options={heartRateOptions}
        />
        <CustomLineChart
          title="Weight"
          data={weightData}
          options={weightOptions}
        />
        <CustomLineChart
          title="Sleep Duration"
          data={sleepDurationData}
          options={sleepDurationOptions}
        />

        <CustomLineChart
          title="Macronutrients"
          data={macroNutrientsData}
          options={macroNutrientsOptions}
        />

        <CustomLineChart
          title="Sugar & Fat Details"
          data={sugarAndFatDetailData}
          options={sugarAndFatDetailOptions}
        />
      </Card>
      <NutritionTrends />
    </Fragment>
  );
};

const NutritionTrends = () => {
  return (
    <Card className="p-6 border-none">
      <h2 className="text-xl">Nutrition Trends (Korean Nutrition Label)</h2>

      <CustomLineChart
        title="Macronutrients"
        data={macroNutrientsData}
        options={macroNutrientsOptions}
      />

      <CustomLineChart
        title="Sugar & Fat Details"
        data={sugarAndFatDetailData}
        options={sugarAndFatDetailOptions}
      />

      <CustomLineChart
        title="Cholesterol & Sodium"
        data={cholesterolAndSodiumData}
        options={cholesterolAndSodiumOptions}
      />
    </Card>
  );
};
export default BiomarkerTrends;
