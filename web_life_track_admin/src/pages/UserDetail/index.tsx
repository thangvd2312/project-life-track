import { useState } from "react";
import { ChevronDown } from "lucide-react";
import * as Accordion from "@radix-ui/react-accordion";
import { Button } from "@/components/ui/button";
import DatePickerWithIconButton from "@/components/datepicker/DatePickerWithIconButton";
import WeeklyTab from "@/pages/UserDetail/WeeklyTab";
import DailyTab from "@/pages/UserDetail/DailyTab";
import MonthlyTab from "@/pages/UserDetail/MonthlyTab";

const DATE_RANGE = {
  DAILY: "daily",
  WEEKLY: "weekly",
  MONTHLY: "monthly",
};

const ACCORDION_VALUE = "record-data";

const DATE_RANGES = [
  { id: 1, label: "Daily", value: DATE_RANGE.DAILY },
  { id: 2, label: "Weekly", value: DATE_RANGE.WEEKLY },
  { id: 3, label: "Monthly", value: DATE_RANGE.MONTHLY },
];

const HEALTH_METRICS = [
  {
    type: "bloodPressure",
    label: "Blood Pressure",
    value: "120/80",
    unit: "mmHg",
  },
  { type: "heartRate", label: "Heart Rate", value: 78, unit: "bpm" },
  { type: "sleep", label: "Sleep Duration", value: 7, unit: "hours" },
];

const NUTRIENTS = [
  { type: "foodItems", label: "Food Items", value: 8, unit: "items" },
  { type: "energy", label: "Energy", value: 2209, unit: "kcal" },
  { type: "protein", label: "Protein", value: 53, unit: "g" },
  { type: "carbs", label: "Carbohydrates", value: 283, unit: "g" },
  { type: "fat", label: "Fat", value: 107, unit: "g" },
];

const BIOMARKERS = [
  {
    type: "bloodPressure",
    label: "Blood Pressure",
    value: "120/80",
    unit: "mmHg",
  },
  {
    type: "fastingGlucose",
    label: "Fasting Glucose",
    value: 0,
    unit: "mmHg",
  },
  {
    type: "postPrandialGlucose",
    label: "Blood Pressure",
    value: 0,
    unit: "mmHg",
  },
  {
    type: "heartRate",
    label: "Heart Rate",
    value: 77,
    unit: "bpm",
  },
  {
    type: "sleepDuration",
    label: "Sleep Duration",
    value: 6.7,
    unit: "hours",
  },
  {
    type: "weight",
    label: "Weight",
    value: 84.5,
    unit: "kg",
  },
];

const DIETARY = [
  {
    type: "totalItems",
    label: "Total Items",
    value: 8,
    unit: "items",
  },
  {
    type: "breakfast",
    label: "Breakfast",
    value: 2,
    unit: "items",
  },
  {
    type: "lunch",
    label: "Lunch",
    value: 2,
    unit: "items",
  },
  {
    type: "dinner",
    label: "Dinner",
    value: 2,
    unit: "items",
  },
  {
    type: "snacks",
    label: "Snacks",
    value: 2,
    unit: "items",
  },
  {
    type: "totalEnergy",
    label: "Total Energy",
    value: 2209,
    unit: "kcal",
  },
  {
    type: "protein",
    label: "Protein",
    value: 53,
    unit: "g",
  },
  {
    type: "fat",
    label: "Fat",
    value: 107,
    unit: "g",
  },
  {
    type: "carbonhydrate",
    label: "Carbohydrate",
    value: 283,
    unit: "g",
  },
];

function formatDate(date: Date | undefined) {
  if (!date) {
    return "";
  }
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

const UserDetail = () => {
  const [currentDateRange, setCurrentDateRange] = useState(DATE_RANGE.WEEKLY);
  const [valueAccordion, setValueAccordion] = useState("");

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date("2025-06-01"));
  const [month, setMonth] = useState<Date | undefined>(date);
  const [value, setValue] = useState(formatDate(date));

  function toggleAccordion(value: string) {
    setValueAccordion(value === valueAccordion ? "" : value);
  }

  function changeDateRange(value: string) {
    setCurrentDateRange(value);
    setValueAccordion("");
  }

  return (
    <div className="p-8 space-y-6">
      <h1 className="mb-6 text-3xl text-theme-black-100">이용자 상세정보</h1>
      <div className="bg-white rounded-2xl p-6 hover:shadow-lg transition-shadow shadow-theme-200 space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {DATE_RANGES.map((range) => {
              const isActive = currentDateRange === range.value;
              return (
                <Button
                  className="min-w-22"
                  key={range.id}
                  variant={isActive ? "default" : "outline"}
                  onClick={() => changeDateRange(range.value)}
                >
                  {range.label}
                </Button>
              );
            })}
          </div>
          <div>
            <DatePickerWithIconButton />
          </div>
        </div>
        {currentDateRange === DATE_RANGE.DAILY && (
          <div>
            <Accordion.Root
              type="single"
              value={valueAccordion}
              onValueChange={setValueAccordion}
              collapsible
              className="w-full"
            >
              <Accordion.Item
                value={ACCORDION_VALUE}
                className="border rounded-2xl"
              >
                <Accordion.Header className="flex bg-gray-100 hover:bg-gray-200 rounded-t-2xl px-6 cursor-pointer">
                  <Accordion.Trigger
                    onClick={toggleAccordion.bind(null, ACCORDION_VALUE)}
                    className="flex flex-1 items-center justify-between py-4 font-medium transition-all [&[data-state=open]>svg]:rotate-180"
                  >
                    <div className="flex items-center gap-3">
                      <h3 className="text-sm text-theme-black-100">
                        Record Data
                      </h3>
                    </div>
                    <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
                  </Accordion.Trigger>
                </Accordion.Header>

                {valueAccordion !== ACCORDION_VALUE && (
                  <div className="space-y-2 p-6">
                    <div className="flex items-center gap-4">
                      {HEALTH_METRICS.map((item) => {
                        return (
                          <div key={item.type} className="space-y-1">
                            <span className="text-[11px] text-theme-gray-200 font-normal tracking-wider">
                              {item.label.toUpperCase()}
                            </span>
                            <p className="text-sm font-medium">
                              {item.value} {item.unit}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex items-center gap-4">
                      {NUTRIENTS.map((item) => {
                        return (
                          <div key={item.type} className="space-y-1">
                            <span className="text-[11px] text-theme-gray-200 font-normal tracking-wider">
                              {item.label.toUpperCase()}
                            </span>
                            <p className="text-sm font-medium">
                              {item.value} {item.unit}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                <Accordion.Content className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <div>
                    <div className="space-y-6 p-6 border-b">
                      <h3 className="font-bold text-theme-black-100">
                        Biomarkers
                      </h3>
                      <div className="grid grid-cols-4 gap-4">
                        {BIOMARKERS.map((item) => {
                          return (
                            <div key={item.type} className="space-y-1">
                              <span className="text-xs text-theme-gray-200 font-normal tracking-wider">
                                {item.label}
                              </span>
                              <p className="text-lg font-medium">
                                {item.value}{" "}
                                <span className="text-theme-gray-200 text-[11px]">
                                  {item.unit}
                                </span>
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="space-y-6 p-6">
                      <h3 className="font-bold text-theme-black-100">
                        Dietary
                      </h3>
                      <div className="grid grid-cols-4 gap-4">
                        {DIETARY.map((item) => {
                          return (
                            <div key={item.type} className="space-y-1">
                              <span className="text-xs text-theme-gray-200 font-normal tracking-wider">
                                {item.label}
                              </span>
                              <p className="text-lg font-medium">
                                {item.value}{" "}
                                <span className="text-theme-gray-200 text-[11px]">
                                  {item.unit}
                                </span>
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            </Accordion.Root>
          </div>
        )}
      </div>
      {currentDateRange === DATE_RANGE.DAILY && <DailyTab />}
      {currentDateRange === DATE_RANGE.WEEKLY && <WeeklyTab />}
      {currentDateRange === DATE_RANGE.MONTHLY && <MonthlyTab />}
    </div>
  );
};

export default UserDetail;
