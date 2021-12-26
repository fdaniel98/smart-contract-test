const {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} = require("@chakra-ui/react");

const MoneyInput = ({ value, setValue }) => {
  const format = (val) => `$` + val;
  const parse = (val) => val.replace(/^\$/, "");
  return (
    <NumberInput
      onChange={(valueString) => setValue(parse(valueString))}
      value={format(value)}
      max={5000}
      min={50}
    >
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
};

export default MoneyInput;
