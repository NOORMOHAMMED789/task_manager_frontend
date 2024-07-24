const Input = ({ type, placeHolder, value, onChangeValue }) => {
  return (
    <div className="">
      <input
        className="w-full px-2 py-2 lg:px-3 lg:py-3 border-[1px] focus:outline-none"
        type={type || "text"}
        placeholder={placeHolder || "Enter value"}
        value={value}
        onChange={(e) => onChangeValue(e.target.value)}
      />
    </div>
  );
};

export default Input;
