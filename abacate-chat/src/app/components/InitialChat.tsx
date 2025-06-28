import Image from "next/image";
import MainInput, { MainInputProps } from "./MainInput";

type InitialChatProps = MainInputProps & {};

export function InitialChat({
  value,
  onChange,
  onSubmit,
  isLoading,
}: InitialChatProps) {
  return (
    <div className="flex flex-col gap-5 items-center">
      <Image src={"/logo.svg"} alt="Abacatinho Logo" width={150} height={150} />
      <h1
        className="
      font-semibold text-2xl sm:text-3xl 
      md:text-4xl leading-tight text-center text-custom"
      >
        Qual tech você quer usar para integrar a Abacate?
      </h1>
      <div className="h-40 w-full max-w-3xl flex flex-col justify-center items-center">
        <MainInput
          value={value}
          onChange={onChange}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
