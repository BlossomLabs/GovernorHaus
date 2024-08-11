import { Button } from "@/components/ui/button"
import FormCard from "./shared/FormCard"
import Field from "./shared/Field"
import AddressInput from "./shared/AddressInput"

import type { Form } from "../../utils/form"
import { Table, TableHead, TableBody, TableRow, TableCell, TableHeader, TableFooter } from "../ui/table"
import { useFieldArray, useWatch } from "react-hook-form"

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
  const { fields: tokenholders, append, remove } = useFieldArray({ name: "token.tokenholders", control: form.control });

  return (
    <FormCard title="Token parameters" description="These settings will determine the name and symbol of the token that will be created for your organization. Add members to define the initial distribution of this token.">
      <Field form={form} name="token.name" label="Token name" description="The name of the token." placeholder="OnePiece" />
      <Field form={form} name="token.symbol" label="Token symbol" description="The symbol of the token." placeholder="ONE" />

      <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Address</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tokenholders.map((field, index) => (
          <TableRow key={field.id}>
            <TableCell className="font-medium">
              <AddressInput form={form} name={`token.tokenholders.${index}.address`} placeholder="0x1234567890abcdef1234567890abcdef12345678" />
            </TableCell>
            <TableCell>
              <AddressInput form={form} name={`token.tokenholders.${index}.amount`} placeholder="1000" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right"><Total control={form.control} /></TableCell>
        </TableRow>
      </TableFooter>
    </Table>

      <Button type="button" onClick={() => append({ address: "", amount: 0 })} className="py-2 px-4 rounded-md">
        Add more
      </Button>
      {tokenholders.length > 1 ?
      <Button type="button" onClick={() => remove(tokenholders.length - 1)} className="py-2 px-4 rounded-md">
        Delete last
      </Button> : null }
      
    </FormCard>
  )
}

export default TokenParametersCard