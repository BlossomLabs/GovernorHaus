import { FormField, FormItem, FormControl } from "../../ui/form"
import { Input } from "../../ui/input"
import type { Form } from "../../../utils/form"

type NameType = `token.tokenholders.${number}.address` | `token.tokenholders.${number}.amount`

function AddressInput({ form, name, placeholder }: { form: Form, name: NameType, placeholder: string }) {
    return (
      <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
          <FormItem>
              <FormControl>
              <Input className="w-full border border-gray-300 rounded-md p-2 mb-2" placeholder={placeholder} {...field} />
              </FormControl>
          </FormItem>
          )}
    />
    )
  }
  export default AddressInput