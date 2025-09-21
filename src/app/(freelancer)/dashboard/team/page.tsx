import { Plus, UserPlus, Users, Mail, Phone, MoreVertical } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'pending' | 'inactive';
  avatar: string;
  lastActive: string;
};

const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    role: 'Developer',
    status: 'active',
    avatar: '/avatars/01.png',
    lastActive: '2 hours ago',
  },
  {
    id: '2',
    name: 'Maria Garcia',
    email: 'maria.garcia@example.com',
    role: 'Designer',
    status: 'active',
    avatar: '/avatars/02.png',
    lastActive: '5 hours ago',
  },
];

export default function TeamPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team</h1>
          <p className="text-muted-foreground">
            Manage your team members and their permissions
          </p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Invite Member
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>
                Manage your team members and their permissions
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Member
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamMembers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No team members found.
                  </TableCell>
                </TableRow>
              ) : (
                teamMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                          <Users className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {member.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{member.role}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span
                          className={`h-2.5 w-2.5 rounded-full ${
                            member.status === 'active'
                              ? 'bg-green-500'
                              : member.status === 'pending'
                              ? 'bg-yellow-500'
                              : 'bg-gray-500'
                          } mr-2`}
                        ></span>
                        {member.status.charAt(0).toUpperCase() +
                          member.status.slice(1)}
                      </div>
                    </TableCell>
                    <TableCell>{member.lastActive}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Mail className="mr-2 h-4 w-4" />
                            <span>Send Message</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Phone className="mr-2 h-4 w-4" />
                            <span>Call</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Invite Team Members</CardTitle>
            <CardDescription>
              Send invitations to new team members via email
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <Button className="w-full">
                <UserPlus className="mr-2 h-4 w-4" />
                Send Invitation
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Team Settings</CardTitle>
            <CardDescription>
              Manage your team's settings and permissions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Team Size</p>
                <p className="text-sm text-muted-foreground">
                  Current: {teamMembers.length} members
                </p>
              </div>
              <Button variant="outline" size="sm">
                Upgrade Plan
              </Button>
            </div>
            <div className="rounded-md border p-4">
              <p className="text-sm font-medium">Team Permissions</p>
              <p className="text-sm text-muted-foreground mt-1">
                Manage what team members can do
              </p>
              <Button variant="outline" size="sm" className="mt-3">
                Configure Permissions
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
