import { type FieldName, useCreateDaoForm } from "@/utils/form";
import { Form } from "@repo/ui/components/ui/form";
import Field from "./shared/Field";
import FormCard from "./shared/FormCard";
import MultiField from "./shared/MultiField";

type FormParamsField =
  | {
      name: FieldName;
      label: string;
      description: string;
      type: "text" | "number" | "address";
      placeholder?: string;
      className?: string;
    }
  | {
      name: "token.tokenholders"; // FIXME: This should be a broader type
      label: string;
      description: string;
      type: "multifield";
      fields: {
        name: "address" | "amount";
        label: string;
        description: string;
        type: "address" | "number";
        placeholder?: string;
        className?: string;
      }[]; // FIXME: This should be FormParamsField[];
      footer: (string | ((formValues: any) => string))[];
    };

export type FormParams = {
  title: string;
  description: string;
  fields: FormParamsField[];
}[];

export function Autoform({
  formParams,
  onSubmit,
  FormLayout,
}: {
  formParams: FormParams;
  onSubmit: (data: any) => void;
  FormLayout: React.ComponentType<{ children: React.ReactNode }>;
}) {
  const form = useCreateDaoForm();
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* FIXME: If this is removed, the form will not re-render the errors */}
        <div className="hidden">{JSON.stringify(form.formState.errors)}</div>
        <FormLayout>
          {formParams.map((card: FormParams[0]) => {
            return (
              <FormCard
                title={card.title}
                description={card.description}
                key={card.title}
              >
                {card.fields.map((field: FormParamsField) => {
                  if (field.type === "multifield") {
                    return (
                      <MultiField
                        key={field.name}
                        form={form}
                        name={field.name}
                        label={field.label}
                        description={field.description}
                        fields={field.fields}
                        footer={field.footer}
                      />
                    );
                  }
                  return (
                    <Field
                      key={field.name}
                      form={form}
                      name={field.name}
                      label={field.label}
                      description={field.description}
                      placeholder={field.placeholder}
                      type={field.type}
                    />
                  );
                })}
              </FormCard>
            );
          })}
        </FormLayout>
      </form>
    </Form>
  );
}
