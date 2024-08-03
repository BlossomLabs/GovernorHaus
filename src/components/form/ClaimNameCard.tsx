import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form"
import type { Form } from "../../utils/form"
import { Input } from "@/components/ui/input"
import { useFormState } from "react-hook-form";

function ClaimNameCard({ form }: { form: Form }) {
  const { errors } = useFormState({ control: form.control });
  return (
    <Card className="border border-yellow-300 rounded-lg mb-6 p-6">
      <CardHeader className="mb-4">
        <CardTitle className="text-xl font-semibold mb-2">Claim a name</CardTitle>
        <CardDescription className="text-gray-600">
          GovernorHaus uses the Ethereum Name Service (ENS) to assign names to organizations.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormField
          control={form.control}
          name="daoname"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-sm font-medium text-gray-700 mb-2">DAO name</FormLabel>
              <FormControl>
                <Input className="w-full border border-gray-300 rounded-md p-2 mb-2" placeholder="onepiece" {...field} />
              </FormControl>
              <FormDescription className="text-gray-500">
                This is your public display name.
              </FormDescription>
              <FormMessage>{errors.daoname?.message}</FormMessage>
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  )
}

export default ClaimNameCard