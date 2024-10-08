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
    type?: 'text' | 'number';
  };
export const TextField = ({
  error,
  oneRegister,
  placeholder,
  type = 'text',
}: TextFieldProps) => {
  const errorClassName = error
    ? 'border-red-500 focus:border-red-500'
    : 'border-gray-300 focus:border-indigo-500';

  return (
    <div className="flex w-full flex-col">
      <input
        type={type}
        placeholder={placeholder}
        {...oneRegister}
        className={`block w-full appearance-none rounded border-2 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none ${errorClassName}`}
      />
      {error && (
        <span className="text-red-500">{error.message?.toString()}</span>
      )}
    </div>
  );
};
