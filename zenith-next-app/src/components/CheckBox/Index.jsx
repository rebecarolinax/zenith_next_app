"use client";

import { Checkbox } from "@/components/ui/checkbox";

export function CheckBox({ classname }) {
  return (
    <div className="flex relative items-center space-x-2 ">
      <Checkbox id="terms" className={'hidden'}/>
      <label
        htmlFor="terms"
        className={`flex right-[100%] text-sm font-semibold text-[#202224] opacity-[60%] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${classname}`}
      >
        Remember Password
      </label>
    </div>
  );
}
