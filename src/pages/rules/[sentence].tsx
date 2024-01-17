// pages/rules/[sentence].tsx

import RuleDetails from "@/components/rule-details/rule-details"

const RuleDetailsPage = ({ rule }: { rule: any }) => {
  if (!rule) {
    // Handle loading or not found state
    return <p>Loading...</p>
  }

  return (
    <div>
      {/* Pass the title and frames to the RuleDetails component */}
      <RuleDetails
        title={rule.sentence}
        frames={rule.frames}
      />
    </div>
  )
}

export async function getServerSideProps(context: {
  params: { sentence: any }
}) {
  const { sentence } = context.params

  // Fetch the rule data based on the sentence
  const response = await fetch(`http://localhost:3000/api/handle-list`, {
    // Modify the URL based on your development server's address
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ rules: [{ component: sentence }] }),
  })

  if (!response.ok) {
    // Handle not found state or other errors
    console.error("Error fetching rule:", response.statusText)
    return { notFound: true }
  }

  const data = await response.json()

  if (!data.success || !data.backendData || data.backendData.length === 0) {
    // Handle not found state or other errors
    console.error("Rule not found or backend error:", data.error)
    return { notFound: true }
  }

  return {
    props: { rule: data.backendData[0] },
  }
}

export default RuleDetailsPage
