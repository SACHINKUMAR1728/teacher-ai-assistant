import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, List, RefreshCw } from 'lucide-react';
import { CreateAssignment } from './CreateAssignment';
import AssignmentsList from '../shared/AssignmentsList';

const TeacherDashboard = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to fetch assignments
  const fetchAssignments = () => {
    setLoading(true);
    fetch('http://localhost:5000/api/teacher/assignments', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setAssignments(data.data);
        } else {
          console.error('Invalid response format:', data);
        }
      })
      .catch((error) => {
        console.error('Error fetching assignments:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Fetch assignments when the component mounts
  useEffect(() => {
    fetchAssignments();
  }, []);

  // Function to handle new assignment creation
  const handleCreateAssignment = (newAssignment) => {
    const assignment = {
      ...newAssignment,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      submissions: [],
    };

    setAssignments((prev) => [assignment, ...prev]);
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-primary/5 flex justify-between items-center">
        <div>
          <CardTitle className="text-2xl">Teacher Dashboard</CardTitle>
          <CardDescription>
            Create and manage assignments for your students
          </CardDescription>
        </div>
        <button 
          onClick={fetchAssignments} 
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          disabled={loading}
        >
          <RefreshCw className="h-4 w-4" />
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="view">
          <TabsList className="mb-6">
            <TabsTrigger value="view" className="flex items-center gap-2">
              <List className="h-4 w-4" />
              <span>View Assignments</span>
            </TabsTrigger>
            <TabsTrigger value="create" className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              <span>Create Assignment</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="view" className="mt-0">
            <AssignmentsList assignments={assignments} viewType="teacher" />
          </TabsContent>
          
          <TabsContent value="create" className="mt-0">
            <CreateAssignment onCreateAssignment={handleCreateAssignment} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TeacherDashboard;
