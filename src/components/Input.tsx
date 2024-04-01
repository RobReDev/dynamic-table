interface InputProps {
  value: string;
  type?: string;
  placeholder?: string;
  classNames?: string;
  onChange: (value: string) => void;
}

const Input = ({
  value,
  type,
  placeholder,
  classNames,
  onChange,
}: InputProps) => (
  <input
    type={type}
    className={`py-2 text-sm text-gray-400 bg-gray-800 rounded-md focus:outline-none ${classNames}`}
    placeholder={placeholder}
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
);

export default Input;
