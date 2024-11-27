import { InfoCircledIcon } from "@radix-ui/react-icons";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { Input } from "@repo/ui/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@repo/ui/components/ui/tooltip";
import { cn } from "@repo/ui/lib/utils";
import { useState } from "react";
import type { FieldName, Form } from "../../../utils/form";
import AddressAvatar from "./AddressAvatar";

function FieldTitle({
  label,
  description,
}: {
  label: string;
  description: string;
}) {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div className="flex items-center">
      <FormLabel className="block text-sm font-medium text-gray-700">
        {label}
      </FormLabel>
      {description && (
        <Tooltip open={open} onOpenChange={setOpen}>
          <TooltipTrigger asChild>
            <InfoCircledIcon
              className="w-4 h-4 ml-1 cursor-pointer"
              onClick={handleToggle}
            />
          </TooltipTrigger>
          <TooltipContent>{description}</TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}

type FieldProps = {
  form: Form;
  name: FieldName;
  label: string;
  description: string;
  placeholder?: string;
  type?: "text" | "number" | "address";
  className?: string;
  onPaste?: (text: string, e: any) => void;
};

function Field({
  form,
  name,
  label,
  description,
  placeholder = "",
  type = "text",
  className,
  onPaste,
}: FieldProps) {
  let isAddressField = false;
  if (type === "address") {
    isAddressField = true;
    type = "text";
  }
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("mb-8", className)}>
          <FieldTitle label={label} description={description} />
          <FormControl>
            <Input
              type={type}
              leftElement={
                isAddressField && (
                  <AddressAvatar addressOrEns={String(field.value)} />
                )
              }
              className="w-full border border-gray-300 rounded-md mb-2 input-number-hide-arrows"
              placeholder={placeholder}
              onPasteCapture={(e: any) =>
                onPaste
                  ? onPaste(e.clipboardData.getData("text"), e)
                  : undefined
              }
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

Field.FieldTitle = FieldTitle;

export default Field;
