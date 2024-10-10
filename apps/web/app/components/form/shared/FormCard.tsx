import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";

function FormCard({
  children,
  title,
  description,
}: { children: React.ReactNode; title: string; description: string }) {
  return (
    <Card className="border border-teal-500 rounded-lg mb-6 p-6">
      <CardHeader className="mb-4">
        <CardTitle className="font-header text-xl font-semibold mb-2">
          {title}
        </CardTitle>
        <CardDescription className="text-gray-600">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export default FormCard;
