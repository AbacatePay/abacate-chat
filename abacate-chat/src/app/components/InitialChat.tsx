import MainInput, { MainInputProps } from "./MainInput";

type InitialChatProps = MainInputProps & {
  initialValue?: string;
};

export function InitialChat({
  value,
  onChange,
  onSubmit,
  isLoading,
  initialValue,
}: InitialChatProps) {
  return (
    <div className="flex flex-col gap-5 items-center">
      <h1
        className="font-semibold text-2xl sm:text-3xl md:text-4xl leading-tight text-center text-primary">
        Qual tech você quer usar para integrar a Abacate?
      </h1>
      <div className="h-40 w-full max-w-3xl flex flex-col justify-center items-center">
        <MainInput
          value={value}
          onChange={onChange}
          onSubmit={onSubmit}
          isLoading={isLoading}
          initialValue={initialValue}
        />
      </div>
    </div>
  );
}
