import {
  FieldError,
  InternalFieldName,
  UseFormRegisterReturn,
} from 'react-hook-form';

type TextFieldProps<TFieldName extends InternalFieldName = InternalFieldName> =
  {
    error?: FieldError;
    placeholder?: string;
    oneRegister: UseFormRegisterReturn<TFieldName>;
  };
export const TextField = ({
  error,
  oneRegister,
  placeholder,
}: TextFieldProps) => {
  const errorClassName = error
    ? 'border-red-500 focus:border-red-500'
    : 'border-gray-500 focus:border-indigo-500';

  return (
    <div className="flex flex-col">
      <input
        type="text"
        placeholder={placeholder}
        {...oneRegister}
        className={`block w-full appearance-none rounded border px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none ${errorClassName}`}
      />
      {error && (
        <span className="text-red-500">{error.message?.toString()}</span>
      )}
    </div>
  );
};
