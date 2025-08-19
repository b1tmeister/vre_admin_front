import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Users,
  Plus,
  Upload,
  Grid,
  List,
  Phone,
  Mail,
  Building2,
  Linkedin,
  Facebook,
  Twitter,
  Instagram,
  UserX,
  Search,
  MoreHorizontal,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

const AttendeeProfile = () => {
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState("grid");
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [attendees, setAttendees] = useState([
    {
      id: "1",
      name: "Devendra Sharma",
      email: "devendra@example.com",
      phone: "7899365102",
      company: "Tech Corp",
      designation: "Developer",
      avatar: "/placeholder.svg",
      socialLinks: {
        facebook: "https://facebook.com/devendra",
        twitter: "https://twitter.com/devendra",
        instagram: "https://instagram.com/devendra",
        linkedin: "https://linkedin.com/in/devendra",
      },
      status: "active",
    },
  ]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newAttendee = {
      id: Date.now().toString(),
      name: data.fullName,
      email: data.emailId,
      phone: data.contactNumber,
      company: data.companyName,
      designation: "None",
      socialLinks: {
        linkedin: data.linkedinProfile,
      },
      status: "active",
    };

    setAttendees((prev) => [...prev, newAttendee]);
    reset();

    toast({
      title: "Attendee added successfully",
      description: `${data.fullName} has been added to the attendee list.`,
    });

    setIsLoading(false);
  };

  const handleCSVUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast({
      title: "CSV uploaded successfully",
      description: "Attendees have been imported from the CSV file.",
    });

    setIsLoading(false);
    event.target.value = "";
  };

  const toggleAttendeeStatus = (id) => {
    setAttendees((prev) =>
      prev.map((attendee) =>
        attendee.id === id
          ? {
              ...attendee,
              status: attendee.status === "active" ? "suspended" : "active",
            }
          : attendee
      )
    );

    const attendee = attendees.find((a) => a.id === id);
    toast({
      title: `Attendee ${
        attendee?.status === "active" ? "suspended" : "reactivated"
      }`,
      description: `${attendee?.name} has been ${
        attendee?.status === "active" ? "suspended" : "reactivated"
      }.`,
    });
  };

  const filteredAttendees = attendees.filter(
    (attendee) =>
      attendee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attendee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attendee.phone.includes(searchTerm)
  );

  const AttendeeCard = ({ attendee }) => (
    <Card className="w-full max-w-sm">
      <CardContent className="p-6">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={attendee.avatar} alt={attendee.name} />
            <AvatarFallback className="text-lg">
              {attendee.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div className="text-center">
            <h3 className="font-semibold text-lg">{attendee.name}</h3>
            <p className="text-muted-foreground text-sm">
              {attendee.designation}
            </p>
            <Badge
              variant={attendee.status === "active" ? "default" : "destructive"}
              className="mt-1"
            >
              {attendee.status}
            </Badge>
          </div>

          {attendee.socialLinks && (
            <div className="flex space-x-3">
              {attendee.socialLinks.facebook && (
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <Facebook className="h-4 w-4" />
                </Button>
              )}
              {attendee.socialLinks.twitter && (
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <Twitter className="h-4 w-4" />
                </Button>
              )}
              {attendee.socialLinks.instagram && (
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <Instagram className="h-4 w-4" />
                </Button>
              )}
              {attendee.socialLinks.linkedin && (
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <Linkedin className="h-4 w-4" />
                </Button>
              )}
            </div>
          )}

          <Button
            variant={attendee.status === "active" ? "destructive" : "default"}
            className="w-full"
            onClick={() => toggleAttendeeStatus(attendee.id)}
          >
            <UserX className="h-4 w-4 mr-2" />
            {attendee.status === "active"
              ? "Suspend Attendee"
              : "Reactivate Attendee"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Users className="h-4 w-4 text-primary" />
            </div>
            Attendee Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="list" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="list">View Attendees</TabsTrigger>
              <TabsTrigger value="add">Add New</TabsTrigger>
              <TabsTrigger value="upload">Upload CSV</TabsTrigger>
            </TabsList>

            <TabsContent value="list" className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search attendees..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredAttendees.map((attendee) => (
                    <AttendeeCard key={attendee.id} attendee={attendee} />
                  ))}
                </div>
              ) : (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Designation</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAttendees.map((attendee, index) => (
                        <TableRow key={attendee.id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell className="flex items-center space-x-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={attendee.avatar}
                                alt={attendee.name}
                              />
                              <AvatarFallback className="text-xs">
                                {attendee.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span>{attendee.name}</span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              <Phone className="h-3 w-3" />
                              <span>{attendee.phone}</span>
                            </div>
                          </TableCell>
                          <TableCell>{attendee.designation}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                attendee.status === "active"
                                  ? "default"
                                  : "destructive"
                              }
                            >
                              {attendee.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem
                                  onClick={() =>
                                    toggleAttendeeStatus(attendee.id)
                                  }
                                >
                                  {attendee.status === "active"
                                    ? "Suspend"
                                    : "Reactivate"}
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>

            <TabsContent value="add" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Add New Attendee
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          placeholder="Full Name"
                          {...register("fullName", {
                            required: "Full name is required",
                          })}
                          className={
                            errors.fullName ? "border-destructive" : ""
                          }
                        />
                        {errors.fullName && (
                          <p className="text-sm text-destructive">
                            {errors.fullName.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="emailId">Email ID</Label>
                        <Input
                          id="emailId"
                          type="email"
                          placeholder="Email ID"
                          {...register("emailId", {
                            required: "Email is required",
                            pattern: {
                              value: /^\S+@\S+$/i,
                              message: "Please enter a valid email",
                            },
                          })}
                          className={errors.emailId ? "border-destructive" : ""}
                        />
                        {errors.emailId && (
                          <p className="text-sm text-destructive">
                            {errors.emailId.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="contactNumber">Contact Number</Label>
                        <Input
                          id="contactNumber"
                          placeholder="Phone Number"
                          {...register("contactNumber", {
                            required: "Contact number is required",
                          })}
                          className={
                            errors.contactNumber ? "border-destructive" : ""
                          }
                        />
                        {errors.contactNumber && (
                          <p className="text-sm text-destructive">
                            {errors.contactNumber.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Enter Password"
                          {...register("password", {
                            required: "Password is required",
                          })}
                          className={
                            errors.password ? "border-destructive" : ""
                          }
                        />
                        {errors.password && (
                          <p className="text-sm text-destructive">
                            {errors.password.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="companyName">Company Name</Label>
                        <Input
                          id="companyName"
                          placeholder="Enter Company"
                          {...register("companyName")}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="linkedinProfile">
                          LinkedIn Profile
                        </Label>
                        <Input
                          id="linkedinProfile"
                          placeholder="Enter LinkedIn Profile URL"
                          {...register("linkedinProfile")}
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full md:w-auto"
                      disabled={isLoading}
                    >
                      {isLoading ? "Saving..." : "Save"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="upload" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Add Attendee with CSV File
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="csvFile">Choose CSV File</Label>
                    <Input
                      id="csvFile"
                      type="file"
                      accept=".csv"
                      onChange={handleCSVUpload}
                      disabled={isLoading}
                    />
                  </div>

                  <div className="text-sm text-muted-foreground">
                    <p>
                      CSV should contain columns: Name, Email, Phone, Company,
                      Designation
                    </p>
                  </div>

                  {isLoading && (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                      <span className="text-sm">
                        Uploading and processing CSV...
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendeeProfile;
