
'use client'
import { useWriteContract } from "wagmi"
import { parseAbi } from "viem"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import ClaimNameCard from "../../components/form/ClaimNameCard"
import { useCreateDaoForm } from "../../utils/form"

function LaunchPage() {
    const { writeContract } = useWriteContract()
    const form = useCreateDaoForm()

    function onSubmit(values: any) {
        console.log(values);
        // writeContract({
        //     // ...
        // }, {
        //     onSuccess: (res) => {
        //         console.log(res);
        //     },
        //     onError: (err) => {
        //         console.log(err);
        //     }
        // })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="p-10 rounded-md">
                    <h2 className="text-3xl font-bold mb-2">Create your organization</h2>
                    <p className="text-gray-700 mb-6">
                        Name and define your DAO parameters so grantees know they are joining the right organization.
                    </p>
                    <ClaimNameCard form={form} />
                    <Button type="submit" className="bg-yellow-500 text-white py-3 px-6 rounded-md hover:bg-yellow-600">
                        Create DAO
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default LaunchPage