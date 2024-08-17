import { Button } from "@/components/ui/button"
import { Table, TableHead, TableBody, TableRow, TableCell, TableHeader, TableFooter } from "@/components/ui/table"

import Field from "./Field"
import type { Form } from "../../../utils/form"
import { useFieldArray } from "react-hook-form"
import { TrashIcon, PlusCircledIcon } from "@radix-ui/react-icons"
import { cn } from "@/utils/shadcn"

type MultiFieldProps = {
    form: Form,
    name: 'token.tokenholders',
    label: string,
    description: string,
    fields: {
        name: 'address' | 'amount',
        label: string,
        description: string,
        placeholder: string,
        type: 'text' | 'number' | 'address'
        className?: string
    }[],
    footer: React.ReactNode
}

function MultiField({ form, name, label, description, fields, footer }: MultiFieldProps) {
    const { fields: _fields, append, remove } = useFieldArray({ name, control: form.control });

    return (
        <>
            <Field.FieldTitle label={label} description={description} />
            <Table>
                <TableHeader>
                    <TableRow>
                        {fields.map((field) => (
                            <TableHead key={field.name} colSpan={3} className={field.className}>{field.label}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {_fields.map((field, index) => (
                        <TableRow key={field.id}>
                            {fields.map((field) => (
                                <TableCell key={field.name} colSpan={3} className={cn("font-medium", field.className)}>
                                    <Field form={form} type={field.type} name={`token.tokenholders.${index}.${field.name}`} label="" description="" placeholder={field.placeholder} className="mb-0" />
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    {footer}
                </TableFooter>
            </Table>

            <div className="flex flex-col min-[400px]:flex-row items-center mt-5">
                <Button size="sm" type="button" onClick={() => append({ address: "", amount: 0 })} className="py-2 px-4 rounded-md">
                    <span className="text-xl mr-2"><PlusCircledIcon /></span> Add more
                </Button>
                {_fields.length > 1 ?
                    <Button size="sm" type="button" onClick={() => remove(_fields.length - 1)} className="py-2 px-4 rounded-md min-[400px]:ml-2 mt-2 min-[400px]:mt-0">
                        <span className="text-xl mr-2"><TrashIcon /></span> Remove last
                    </Button> : null}
            </div>
        </>
    )
}

export default MultiField
