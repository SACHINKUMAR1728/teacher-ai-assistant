import React, { useState,useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AssignmentsList from '../shared/AssignmentsList';

const StudentDashboard = () => {
  const [assignments, setAssignments] = useState([]);

  const fetchAssignments = () => {
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
        });
    };
  
    // Fetch assignments when the component mounts
    useEffect(() => {
      fetchAssignments();
    }, []);

  const handleSubmitAssignment = (assignmentId, submission) => {
    const newSubmission = {
      ...submission,
      id: Date.now().toString(),
      submittedAt: new Date().toISOString(),
    };

    setAssignments(assignments.map(assignment => 
      assignment.id === assignmentId 
        ? { ...assignment, submissions: [...assignment.submissions, newSubmission] }
        : assignment
    ));
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-primary/5">
        <CardTitle className="text-2xl">Student Dashboard</CardTitle>
        <CardDescription>
          View and submit assignments
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <AssignmentsList
          assignments={assignments} 
          viewType="student" 
          onSubmitAssignment={handleSubmitAssignment}
        />
      </CardContent>
    </Card>
  );
};

export default StudentDashboard;
