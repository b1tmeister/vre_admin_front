import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar, Clock, Users, Edit, Trash2, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ScheduleAgenda = () => {
  const [agendaItems, setAgendaItems] = useState([
    {
      id: "1",
      date: "Nov 21, 2025",
      startTime: "1 a.m.",
      endTime: "1:59 p.m.",
      title: "Green Tech and Sustainable Innovation",
      description: "Welcome to VRE Event.",
      speakers: "Shanu Tyagi",
      sponsors: "VRD",
    },
    {
      id: "2",
      date: "Nov 20, 2025",
      startTime: "noon",
      endTime: "2 p.m.",
      title: "Testing of VRE 28th July",
      description: "Devendra and Shanu testing",
      speakers: "",
      sponsors: "VRD",
    },
    {
      id: "3",
      date: "Nov 20, 2025",
      startTime: "1 a.m.",
      endTime: "11 p.m.",
      title: "The Future of AI in Cybersecurity",
      description: "Testing by Saurabh",
      speakers: "Shanu Tyagi",
      sponsors: "VRD",
    },
  ]);

  const [formData, setFormData] = useState({
    date: "",
    startTime: "",
    endTime: "",
    title: "",
    description: "",
    speakers: "",
    sponsors: "",
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      setAgendaItems(
        agendaItems.map((item) =>
          item.id === editingId ? { ...formData, id: editingId } : item
        )
      );
      toast({
        title: "Agenda Updated",
        description: "Agenda item has been successfully updated.",
      });
    } else {
      const newAgendaItem = {
        id: Date.now().toString(),
        ...formData,
      };
      setAgendaItems([...agendaItems, newAgendaItem]);
      toast({
        title: "Agenda Added",
        description: "New agenda item has been successfully added.",
      });
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      date: "",
      startTime: "",
      endTime: "",
      title: "",
      description: "",
      speakers: "",
      sponsors: "",
    });
    setIsDialogOpen(false);
    setEditingId(null);
  };

  const handleEdit = (item) => {
    setFormData({
      date: item.date,
      startTime: item.startTime,
      endTime: item.endTime,
      title: item.title,
      description: item.description,
      speakers: item.speakers,
      sponsors: item.sponsors,
    });
    setEditingId(item.id);
    setIsDialogOpen(true);
  };

  const handleDelete = (id) => {
    setAgendaItems(agendaItems.filter((item) => item.id !== id));
    toast({
      title: "Agenda Deleted",
      description: "Agenda item has been successfully removed.",
    });
  };

  const startSession = (title) => {
    toast({
      title: "Session Started",
      description: `"${title}" session has been started.`,
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Schedule & Agenda Management</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-500 hover:bg-blue-600">
                <Plus className="h-4 w-4 mr-2" />
                Add New Agenda
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingId ? "Edit Agenda Item" : "Add New Agenda Item"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    placeholder="e.g., Nov 21, 2025"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="startTime">Start Time</Label>
                    <Input
                      id="startTime"
                      placeholder="e.g., 1 a.m."
                      value={formData.startTime}
                      onChange={(e) =>
                        setFormData({ ...formData, startTime: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="endTime">End Time</Label>
                    <Input
                      id="endTime"
                      placeholder="e.g., 1:59 p.m."
                      value={formData.endTime}
                      onChange={(e) =>
                        setFormData({ ...formData, endTime: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Event title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Event description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="speakers">Speakers</Label>
                  <Input
                    id="speakers"
                    placeholder="Speaker names"
                    value={formData.speakers}
                    onChange={(e) =>
                      setFormData({ ...formData, speakers: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="sponsors">Sponsors</Label>
                  <Input
                    id="sponsors"
                    placeholder="Sponsor names"
                    value={formData.sponsors}
                    onChange={(e) =>
                      setFormData({ ...formData, sponsors: e.target.value })
                    }
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">
                    {editingId ? "Update Agenda" : "Add Agenda"}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {agendaItems.map((item) => (
            <Card key={item.id} className="border-l-4 border-l-blue-500">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {item.date}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {item.startTime} - {item.endTime}
                      </div>
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <Users className="h-4 w-4 text-white" />
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground mb-3">
                      {item.description}
                    </p>

                    <div className="space-y-2">
                      {item.speakers && (
                        <div>
                          <span className="font-medium">Speakers: </span>
                          <span className="text-blue-600">{item.speakers}</span>
                        </div>
                      )}
                      {item.sponsors && (
                        <div>
                          <span className="font-medium">Sponsors: </span>
                          <span className="text-blue-600">{item.sponsors}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 ml-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(item)}
                      className="text-gray-600"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit Agenda
                    </Button>
                    <Button
                      size="sm"
                      className="bg-green-500 hover:bg-green-600 text-white"
                      onClick={() => startSession(item.title)}
                    >
                      Start Session
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ScheduleAgenda;
