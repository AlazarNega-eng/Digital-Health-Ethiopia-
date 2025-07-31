import { Card } from "../../../components/ui/card";
import { Table, TableHeader } from "../../../components/ui/table";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";

export default function PatientPage() {
  return (
    <div className="py-6 mx-20 my-4">
      <h2 className="text-2xl font-bold mb-4">Patient Management</h2>
      <Card className="mb-6 p-4">
        <h3 className="text-lg font-semibold mb-2">Add New Patient</h3>
        <form className="flex flex-col gap-2">
          <Input placeholder="Full Name" />
          <Input placeholder="Date of Birth" type="date" />
          <Textarea placeholder="Medical History" />
          <Button type="submit">Add Patient</Button>
        </form>
      </Card>
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-2">Patient List</h3>
        <Table>
          <TableHeader>
            <tr>
              <th>Name</th>
              <th>Date of Birth</th>
              <th>Actions</th>
            </tr>
          </TableHeader>
          <tbody>
            <tr>
              <td>John Doe</td>
              <td>1990-01-01</td>
              <td><Button size="sm">View</Button></td>
            </tr>
            {/* More rows here */}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}
