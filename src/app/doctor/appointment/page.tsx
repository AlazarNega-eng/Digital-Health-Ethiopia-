import { Card } from "../../../components/ui/card";
import { Table, TableHeader } from "../../../components/ui/table";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";

export default function AppointmentPage() {
  return (
    <div className="p-6 mx-20 my-4">
      <h2 className="text-2xl font-bold mb-4">Appointment Management</h2>
      <Card className="mb-6 p-4">
        <h3 className="text-lg font-semibold mb-2">Schedule Appointment</h3>
        <form className="flex flex-col gap-2">
          <Input placeholder="Patient Name" />
          <Input placeholder="Date" type="date" />
          <Input placeholder="Time" type="time" />
          <Button type="submit">Schedule</Button>
        </form>
      </Card>
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-2">Upcoming Appointments</h3>
        <Table>
          <TableHeader>
            <tr>
              <th>Patient</th>
              <th>Date</th>
              <th>Time</th>
              <th>Actions</th>
            </tr>
          </TableHeader>
          <tbody>
            <tr>
              <td>Jane Smith</td>
              <td>2024-06-10</td>
              <td>10:00</td>
              <td><Button size="sm">View</Button></td>
            </tr>
            {/* More rows here */}
          </tbody>
        </Table>
      </Card>
    </div>
  );
} 