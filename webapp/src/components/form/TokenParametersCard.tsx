import FormCard from "./shared/FormCard"
import Field from "./shared/Field"

import type { Form } from "../../utils/form"
import { TableRow, TableCell } from "../ui/table"
import { useWatch } from "react-hook-form"
import MultiField from "./shared/MultiField"


const Total = ({ control }: { control: Form["control"] }) => {
  const formValues = useWatch({
    name: "token.tokenholders",
    control
  });
  const total = formValues.reduce(
    (acc, current) => acc + Number(current.amount || 0),
    0
  );
  return total;
};

function TokenParametersCard({ form }: { form: Form }) {

  return (
    <FormCard title="Token parameters" description="These settings will determine the name and symbol of the token that will be created for your organization. Add members to define the initial distribution of this token.">
      <Field form={form} name="token.name" label="Token name" description="The name of the token." placeholder="OnePiece" />
      <Field form={form} name="token.symbol" label="Token symbol" description="The symbol of the token." placeholder="ONE" />
      <MultiField
        form={form}
        name="token.tokenholders"
        label="Token Holders"
        description="The addresses and amounts of the tokenholders."
        fields={[{
          name: "address",
          type: "text",
          label: "Address",
          description: "The address of the tokenholder.",
          placeholder: "0x1234567890abcdef1234567890abcdef12345678"
        }, {
          name: "amount",
          type: "number",
          label: "Amount",
          description: "The amount of tokens to be distributed to the address.",
          placeholder: "1000"
        }]}
        footer={<TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right"><Total control={form.control} /></TableCell>
        </TableRow>}
      />
    </FormCard>
  )
}

export default TokenParametersCard