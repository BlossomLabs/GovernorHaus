import Field from "./shared/Field"
import FormCard from "./shared/FormCard"
import type { Form } from "../../utils/form"

function ClaimNameCard({ form }: { form: Form }) {
  return (
    <FormCard title="Claim a name" description="GovernorHaus uses the Ethereum Name Service (ENS) to assign names to organizations.">
      <Field form={form} name="governor.name" label="DAO name" description="This is your public display name." placeholder="onepiece" />
    </FormCard>
  )
}

export default ClaimNameCard