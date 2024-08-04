import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import type { Form, FieldName } from "../../../utils/form"

function Field({ form, name, label, description, placeholder }: { form: Form, name: FieldName, label: string, description: string, placeholder: string }) {
    return (
    <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
        <FormItem>
            <FormLabel className="block text-sm font-medium text-gray-700 mb-2">{label}</FormLabel>
            <FormControl>
            <Input
                className="w-full border border-gray-300 rounded-md p-2 mb-2"
                placeholder={placeholder}
                {...field}
            />
            </FormControl>
            <FormDescription className="text-gray-500">
            {description}
            </FormDescription>
            <FormMessage />
        </FormItem>
        )}
  />
  )
}

export default Field
