import { Button } from "@/components/ui/button"
import { Table, TableHead, TableBody, TableRow, TableCell, TableHeader, TableFooter } from "@/components/ui/table"

import Field from "./Field"
import type { Form } from "../../../utils/form"
import { useFieldArray } from "react-hook-form"
import { TrashIcon, PlusCircledIcon } from "@radix-ui/react-icons"

function MultiField({ form, name, label, description, fields, footer }: { form: Form, name: 'token.tokenholders', label: string, description: string, fields: { name: 'address' | 'amount', label: string, description: string, placeholder: string, type: 'text' | 'number' }[], footer: React.ReactNode }) {
    const { fields: _fields, append, remove } = useFieldArray({ name, control: form.control });

    return (
        <>
            <Field.FieldTitle label={label} description={description} />
            <Table>
                <TableHeader>
                    <TableRow>
                        {fields.map((field) => (
                            <TableHead key={field.name}>{field.label}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {_fields.map((field, index) => (
                        <TableRow key={field.id}>
                            {fields.map((field) => (
                                <TableCell key={field.name} className="font-medium">
                                    <Field form={form} type={field.type} name={`token.tokenholders.${index}.${field.name}`} label="" description="" placeholder={field.placeholder} />
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    {footer}
                </TableFooter>
            </Table>

            <div className="flex items-center mt-5">
                <Button type="button" onClick={() => append({ address: "", amount: 0 })} className="py-2 px-4 rounded-md">
                    <span className="text-xl mr-2"><PlusCircledIcon /></span> Add more
            </Button>
            {_fields.length > 1 ?
                <Button type="button" onClick={() => remove(_fields.length - 1)} className="py-2 px-4 rounded-md ml-2">
                    <span className="text-xl mr-2"><TrashIcon /></span> Remove last
                </Button> : null}
            </div>
        </>
    )
}

export default MultiField
