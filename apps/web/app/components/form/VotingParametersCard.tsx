import type { Form } from "../../utils/form";
import Field from "./shared/Field";
import FormCard from "./shared/FormCard";

function VotingParametersCard({ form }: { form: Form }) {
  return (
    <FormCard
      title="Voting parameters"
      description="Think about these parameters as a balancing act between ease of passing proposals and security against malicious proposals. That's an important - and tough - tradeoff to get right!"
    >
      <Field
        form={form}
        type="number"
        name="governor.quorumNumerator"
        label="Minimum quorum"
        description="The minimum percentage of votes required to pass a proposal."
        placeholder="4"
      />
      <div className="flex flex-row gap-4 w-full">
        <Field
          form={form}
          type="number"
          name="governor.votingDelay"
          label="Voting delay"
          description="The delay before voting starts."
          placeholder="1"
          className="w-1/3"
        />
        <Field
          form={form}
          type="number"
          name="governor.votingPeriod"
          label="Voting period"
          description="The duration of the voting period."
          placeholder="5"
          className="w-1/3"
        />
        <Field
          form={form}
          type="number"
          name="timelock.minDelay"
          label="Timelock delay"
          description="The delay before the proposal can be executed."
          placeholder="1"
          className="w-1/3"
        />
      </div>
    </FormCard>
  );
}

export default VotingParametersCard;
