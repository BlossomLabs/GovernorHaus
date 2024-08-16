import Field from "./shared/Field"
import FormCard from "./shared/FormCard"
import type { Form } from "../../utils/form"

function ClaimNameCard({ form }: { form: Form }) {
  return (
    <FormCard title="Profile Info" description="This is the info that will be displayed on the DAO's profile.">
      <Field form={form} name="governor.name" label="DAO name" description="This is your public name visible to others." placeholder="e.g. One Piece" />
    </FormCard>
  )
}

export default ClaimNameCard