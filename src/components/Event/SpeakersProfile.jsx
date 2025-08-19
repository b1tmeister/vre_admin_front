import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Grid, List, Phone, Linkedin, Edit, Trash2, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SpeakersProfile = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [speakers, setSpeakers] = useState([
    {
      id: "1",
      name: "Shanu Tyagi",
      designation: "Lead Developer",
      company: "None",
      phone: "787878787878",
      bio: "This is the demo content. This is the demo content...",
      linkedin: "https://linkedin.com/in/shanutyagi",
      image: "/placeholder.svg",
    },
  ]);
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    company: "",
    phone: "",
    bio: "",
    linkedin: "",
    image: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSpeaker = {
      id: Date.now().toString(),
      ...formData,
    };
    setSpeakers([...speakers, newSpeaker]);
    setFormData({
      name: "",
      designation: "",
      company: "",
      phone: "",
      bio: "",
      linkedin: "",
      image: "",
    });
    setIsDialogOpen(false);
    toast({
      title: "Speaker Added",
      description: "New speaker has been successfully added.",
    });
  };

  const handleDelete = (id) => {
    setSpeakers(speakers.filter((speaker) => speaker.id !== id));
    toast({
      title: "Speaker Deleted",
      description: "Speaker has been successfully removed.",
    });
  };

  const handleEdit = (speaker) => {
    setFormData({
      name: speaker.name,
      designation: speaker.designation,
      company: speaker.company,
      phone: speaker.phone,
      bio: speaker.bio,
      linkedin: speaker.linkedin,
      image: speaker.image,
    });
    setIsDialogOpen(true);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Speakers Management</CardTitle>
          <div className="flex items-center gap-2">
            <div className="flex items-center border rounded-lg">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <Grid className="h-4 w-4" />
                Grid
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
                List
              </Button>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add New
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Speaker</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="designation">Designation</Label>
                    <Input
                      id="designation"
                      value={formData.designation}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          designation: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      value={formData.linkedin}
                      onChange={(e) =>
                        setFormData({ ...formData, linkedin: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) =>
                        setFormData({ ...formData, bio: e.target.value })
                      }
                      rows={3}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Add Speaker
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {speakers.map((speaker) => (
              <Card key={speaker.id} className="border border-border">
                <CardContent className="p-6 text-center">
                  <Avatar className="w-20 h-20 mx-auto mb-4">
                    <AvatarImage src={speaker.image} />
                    <AvatarFallback>{speaker.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-lg mb-2">{speaker.name}</h3>
                  <div className="flex items-center justify-center mb-2">
                    <Linkedin className="h-4 w-4 text-orange-500" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {speaker.designation}, {speaker.company}
                  </p>
                  <p className="text-xs text-muted-foreground mb-4">
                    {speaker.bio}
                  </p>
                  <Button
                    className="w-full bg-orange-500 hover:bg-orange-600"
                    onClick={() => handleEdit(speaker)}
                  >
                    Edit Speaker
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Designation</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Bio</TableHead>
                <TableHead>LinkedIn</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {speakers.map((speaker, index) => (
                <TableRow key={speaker.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={speaker.image} />
                      <AvatarFallback>{speaker.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">{speaker.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-1" />
                      {speaker.phone}
                    </div>
                  </TableCell>
                  <TableCell>{speaker.designation}</TableCell>
                  <TableCell>{speaker.company}</TableCell>
                  <TableCell className="max-w-xs truncate">
                    {speaker.bio}
                  </TableCell>
                  <TableCell>
                    <Linkedin className="h-5 w-5 text-orange-500" />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(speaker)}
                      >
                        <Edit className="h-4 w-4 text-orange-500" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(speaker.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default SpeakersProfile;
