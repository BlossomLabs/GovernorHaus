import { InfoCircledIcon } from "@radix-ui/react-icons"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import type { Form, FieldName } from "../../../utils/form"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { useState } from "react"

function FieldTitle({ label, description }: { label: string, description: string }) {
    const [open, setOpen] = useState(false);

    const handleToggle = () => {
        setOpen(!open);
    };

    return (
        <div className="flex items-center">
            <FormLabel className="block text-sm font-medium text-gray-700">{label}</FormLabel>
            {description && (
                <Tooltip open={open} onOpenChange={setOpen}>
                    <TooltipTrigger asChild>
                        <InfoCircledIcon className="w-4 h-4 ml-1 cursor-pointer" onClick={handleToggle} />
                    </TooltipTrigger>
                    <TooltipContent>
                        {description}
                    </TooltipContent>
                </Tooltip>
            )}
        </div>
    );
}
function Field({ form, name, label, description, placeholder, type = "text" }: { form: Form, name: FieldName, label: string, description: string, placeholder: string, type?: "text" | "number" }) {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem
                    className="mb-8">
                    <FieldTitle label={label} description={description} />
                    <FormControl>
                        <Input
                            type={type}
                            className="w-full border border-gray-300 rounded-md p-2 mb-2"
                            placeholder={placeholder}
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

Field.FieldTitle = FieldTitle

export default Field
