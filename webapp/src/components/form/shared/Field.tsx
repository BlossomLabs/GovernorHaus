import { InfoCircledIcon } from "@radix-ui/react-icons"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import type { Form, FieldName } from "../../../utils/form"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { useState } from "react"
import makeBlockie from "ethereum-blockies-base64";
import Image from "next/image"
import { isAddress } from "viem"
import { cn } from "@/utils/shadcn"

const transparentPixel = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"

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

type FieldProps = { form: Form, name: FieldName, label: string, description: string, placeholder: string, type?: "text" | "number" | "address", className?: string }

function Field({ form, name, label, description, placeholder, type = "text", className }: FieldProps) {
    let isAddressField = false;
    if (type === "address") {
        isAddressField = true;
        type = "text"
    }
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem
                    className={cn("mb-8", className)}>
                    <FieldTitle label={label} description={description} />
                    <FormControl>
                        <Input
                            type={type}
                            leftElement={isAddressField && 
                                <Image src={isAddress(String(field.value)) ? makeBlockie(String(field.value)) : transparentPixel} alt="" width={20} height={20} className="rounded bg-gray-300" /> }
                            className="w-full border border-gray-300 rounded-md mb-2"
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
