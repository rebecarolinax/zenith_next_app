import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export function DigitsInput({setValuesInput, valuesInput}) {
  return (
    <InputOTP maxLength={4}>
      <InputOTPGroup className={'gap-[20px]'}>
        <InputOTPSlot  setInputValue={(newValue) => setValuesInput(valuesInput.map((value, index) => index == 0 ? newValue : value))} index={0} />
        <InputOTPSlot setInputValue={(newValue) => setValuesInput(valuesInput.map((value, index) => index == 1 ? newValue : value))} index={1} />
        <InputOTPSlot setInputValue={(newValue) => setValuesInput(valuesInput.map((value, index) => index == 2 ? newValue : value))} index={2} />
        <InputOTPSlot setInputValue={(newValue) => setValuesInput(valuesInput.map((value, index) => index == 3 ? newValue : value))} index={3} />
      </InputOTPGroup>
    </InputOTP>
  );
}
