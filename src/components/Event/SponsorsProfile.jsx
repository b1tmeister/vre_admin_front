import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Edit, Trash2, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SponsorsProfile = () => {
  const [sponsors, setSponsors] = useState([
    {
      id: "1",
      companyName: "Tech Corp",
      type: "sponsor",
      facebook: "https://facebook.com/techcorp",
      linkedin: "https://linkedin.com/company/techcorp",
      website: "https://techcorp.com",
    },
  ]);

  const [formData, setFormData] = useState({
    companyName: "",
    type: "sponsor",
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "",
    website: "",
  });

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      setSponsors(
        sponsors.map((sponsor) =>
          sponsor.id === editingId ? { ...formData, id: editingId } : sponsor
        )
      );
      toast({
        title: "Sponsor Updated",
        description: "Sponsor information has been successfully updated.",
      });
    } else {
      const newSponsor = {
        id: Date.now().toString(),
        ...formData,
      };
      setSponsors([...sponsors, newSponsor]);
      toast({
        title: "Sponsor Added",
        description: "New sponsor has been successfully added.",
      });
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      companyName: "",
      type: "sponsor",
      facebook: "",
      instagram: "",
      twitter: "",
      linkedin: "",
      website: "",
    });
    setShowForm(false);
    setEditingId(null);
  };

  const handleEdit = (sponsor) => {
    setFormData({
      companyName: sponsor.companyName,
      type: sponsor.type,
      facebook: sponsor.facebook || "",
      instagram: sponsor.instagram || "",
      twitter: sponsor.twitter || "",
      linkedin: sponsor.linkedin || "",
      website: sponsor.website || "",
    });
    setEditingId(sponsor.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setSponsors(sponsors.filter((sponsor) => sponsor.id !== id));
    toast({
      title: "Sponsor Deleted",
      description: "Sponsor has been successfully removed.",
    });
  };

  const displaySponsors = () => {
    setShowForm(false);
    toast({
      title: "Sponsors Displayed",
      description: "All sponsors are now visible on the event page.",
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Sponsors Management</CardTitle>
          <div className="flex gap-2">
            <Button onClick={() => setShowForm(!showForm)} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Sponsor
            </Button>
            <Button
              onClick={displaySponsors}
              className="bg-red-500 hover:bg-red-600"
            >
              Display Sponsors
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {showForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">
                {editingId ? "Edit Sponsor" : "Add New Sponsor"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    placeholder="Enter Sponsor Company Name"
                    value={formData.companyName}
                    onChange={(e) =>
                      setFormData({ ...formData, companyName: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <Label>Select Sponsor Type</Label>
                  <div className="flex items-center space-x-6 mt-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="sponsor"
                        checked={formData.type === "sponsor"}
                        onCheckedChange={() =>
                          setFormData({ ...formData, type: "sponsor" })
                        }
                      />
                      <Label htmlFor="sponsor">Sponsor</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="exhibitor"
                        checked={formData.type === "exhibitor"}
                        onCheckedChange={() =>
                          setFormData({ ...formData, type: "exhibitor" })
                        }
                      />
                      <Label htmlFor="exhibitor">Exhibitor</Label>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input
                    id="facebook"
                    placeholder="Enter Sponsor Facebook URL"
                    value={formData.facebook}
                    onChange={(e) =>
                      setFormData({ ...formData, facebook: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input
                    id="instagram"
                    placeholder="Enter Sponsor Instagram URL"
                    value={formData.instagram}
                    onChange={(e) =>
                      setFormData({ ...formData, instagram: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="twitter">Twitter</Label>
                  <Input
                    id="twitter"
                    placeholder="Enter Sponsor Twitter URL"
                    value={formData.twitter}
                    onChange={(e) =>
                      setFormData({ ...formData, twitter: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    placeholder="Enter Sponsor LinkedIn URL"
                    value={formData.linkedin}
                    onChange={(e) =>
                      setFormData({ ...formData, linkedin: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    placeholder="Enter Sponsor Website URL"
                    value={formData.website}
                    onChange={(e) =>
                      setFormData({ ...formData, website: e.target.value })
                    }
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    type="submit"
                    className="bg-gray-800 hover:bg-gray-900"
                  >
                    {editingId ? "Update Sponsor" : "Add Sponsor"}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Current Sponsors</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Company Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Social Links</TableHead>
                  <TableHead>Website</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sponsors.map((sponsor, index) => (
                  <TableRow key={sponsor.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="font-medium">
                      {sponsor.companyName}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          sponsor.type === "sponsor" ? "default" : "secondary"
                        }
                      >
                        {sponsor.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {sponsor.facebook && (
                          <Button variant="ghost" size="sm" asChild>
                            <a
                              href={sponsor.facebook}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </Button>
                        )}
                        {sponsor.instagram && (
                          <Button variant="ghost" size="sm" asChild>
                            <a
                              href={sponsor.instagram}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </Button>
                        )}
                        {sponsor.twitter && (
                          <Button variant="ghost" size="sm" asChild>
                            <a
                              href={sponsor.twitter}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </Button>
                        )}
                        {sponsor.linkedin && (
                          <Button variant="ghost" size="sm" asChild>
                            <a
                              href={sponsor.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {sponsor.website && (
                        <Button variant="ghost" size="sm" asChild>
                          <a
                            href={sponsor.website}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(sponsor)}
                        >
                          <Edit className="h-4 w-4 text-blue-500" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(sponsor.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default SponsorsProfile;
