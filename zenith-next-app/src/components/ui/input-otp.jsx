"use client";

import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { Dot } from "lucide-react";

import { cn } from "@/lib/utils";

const InputOTP = React.forwardRef(
  ({ className, containerClassName, ...props }, ref) => (
    <OTPInput
      ref={ref}
      containerClassName={cn(
        "flex items-center gap-2 has-[:disabled]:opacity-50",
        containerClassName
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  )
);
InputOTP.displayName = "InputOTP";

const InputOTPGroup = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center", className)} {...props} />
));
InputOTPGroup.displayName = "InputOTPGroup";

const InputOTPSlot = React.forwardRef(
  ({ setInputValue, index, className, ...props }, ref) => {
    const inputOTPContext = React.useContext(OTPInputContext);
    const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

    React.useEffect(() => {
      if (char) {
        setInputValue(char);
      }
    }, [char]);

    const handleInput = (event) => {
      const inputChar = event.target.value;
      // Permitir apenas números
      if (/^\d?$/.test(inputChar)) {
        setInputValue(inputChar);
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex h-[70px] w-[80px] items-center justify-center border border-[#2D60FF] text-lg transition-all rounded-[20px]",
          isActive &&
            "z-10 ring-2 ring-ring ring-offset-background border-[#2D60FF] border-[5px]",
          className
        )}
        {...props}
      >
        <input
          type="text"
          value={char || ""}
          onInput={handleInput}
          maxLength={1}
          className="w-full h-full text-center bg-transparent outline-none"
        />
        {hasFakeCaret && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
          </div>
        )}
      </div>
    );
  }
);
InputOTPSlot.displayName = "InputOTPSlot";

const InputOTPSeparator = React.forwardRef(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}>
    <Dot />
  </div>
));
InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
