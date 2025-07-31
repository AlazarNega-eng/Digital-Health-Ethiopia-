import { Card } from "../../../components/ui/card";
import { Table, TableHeader } from "../../../components/ui/table";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";

export default function TreatmentPlanPage() {
  return (
    <div className="p-6 mx-20 my-4">
      <h2 className="text-2xl font-bold mb-4">Treatment Plans</h2>
      <Card className="mb-6 p-4">
        <h3 className="text-lg font-semibold mb-2">Create Treatment Plan</h3>
        <form className="flex flex-col gap-2">
          <Input placeholder="Patient Name" />
          <Textarea placeholder="Treatment Details" />
          <Button type="submit">Create Plan</Button>
        </form>
      </Card>
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-2">Existing Treatment Plans</h3>
        <Table>
          <TableHeader>
            <tr>
              <th>Patient</th>
              <th>Treatment</th>
              <th>Actions</th>
            </tr>
          </TableHeader>
          <tbody>
            <tr>
              <td>Jane Smith</td>
              <td>Physical Therapy</td>
              <td><Button size="sm">View</Button></td>
            </tr>
            {/* More rows here */}
          </tbody>
        </Table>
      </Card>
    </div>
  );
} 