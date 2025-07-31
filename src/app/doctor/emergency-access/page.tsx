import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";

export default function EmergencyAccessPage() {
  return (
    <div className="p-6 mx-20 my-4">
      <h2 className="text-2xl font-bold mb-4 text-red-600">Emergency Access</h2>
      <Card className="p-4 border-red-500 border-2">
        <h3 className="text-lg font-semibold mb-2">Emergency Patient Info</h3>
        <p className="mb-2">Name: John Doe</p>
        <p className="mb-2">Blood Type: O+</p>
        <p className="mb-2">Allergies: None</p>
        <p className="mb-2">Emergency Contact: 123-456-7890</p>
        <Button variant="destructive">Trigger Emergency Protocol</Button>
      </Card>
    </div>
  );
} 