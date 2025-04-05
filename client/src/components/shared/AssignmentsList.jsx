import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar, Clock, FileText } from 'lucide-react';
import { format, isPast } from 'date-fns';
import SubmitAssignment from '../student/SubmitAssignment';
import { AssignmentDetail } from './AssignmentDetail';

const AssignmentsList = ({ assignments, viewType, onSubmitAssignment }) => {
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [dialogType, setDialogType] = useState(null);
  const [submittedAssignments, setSubmittedAssignments] = useState({});
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      const results = {};
      await Promise.all(assignments.map(async (assignment) => {
        try {
          const response = await fetch(`http://localhost:5000/api/feedback/${assignment.id}`);
          results[assignment.id] = response.ok;
        } catch {
          results[assignment.id] = false;
        }
      }));
      setSubmittedAssignments(results);
    };
    fetchSubmissions();
  }, [assignments]);

  const openDialog = async (type, assignment) => {
    setSelectedAssignment(assignment);
    setDialogType(type);

    if (type === 'feedback') {
      try {
        const response = await fetch(`http://localhost:5000/api/feedback/${assignment.id}`);
        setFeedback(response.ok ? (await response.json()).feedback : "No feedback available.");
      } catch {
        setFeedback("Error fetching feedback.");
      }
    }
  };

  const closeDialog = () => {
    setDialogType(null);
  };

  const getDeadlineStatus = (deadline) => {
    const deadlineDate = new Date(deadline);
    return isPast(deadlineDate) ? (
      <Badge variant="destructive">Deadline Passed</Badge>
    ) : (
      <Badge variant="outline">Due {format(deadlineDate, 'MMM d, yyyy')}</Badge>
    );
  };

  if (!assignments.length) {
    return (
      <div className="text-center py-10">
        <FileText className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-semibold text-gray-900">No assignments</h3>
        <p className="mt-1 text-sm text-gray-500">
          {viewType === 'teacher' ? 'Get started by creating a new assignment.' : 'No assignments have been posted yet.'}
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assignments.map((assignment) => (
          <Card key={assignment.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{assignment.title}</CardTitle>
                {getDeadlineStatus(assignment.deadline)}
              </div>
              <div className="flex items-center gap-1 mt-2 text-sm text-gray-500">
                <Calendar className="h-4 w-4" />
                <span>Posted on {format(new Date(assignment.createdAt), 'MMM d, yyyy')}</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 line-clamp-2">{assignment.instructions}</p>
              <div className="mt-3 flex items-center text-sm text-muted-foreground">
                <Clock className="mr-1 h-4 w-4" />
                <span>Due {format(new Date(assignment.deadline), 'MMM d, yyyy')}</span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm" onClick={() => openDialog('details', assignment)}>
                View Details
              </Button>
              {viewType === 'student' && (
                submittedAssignments[assignment.id] ? (
                  <Button size="sm" onClick={() => openDialog('feedback', assignment)}>
                    View Feedback
                  </Button>
                ) : (
                  <Button size="sm" onClick={() => openDialog('submit', assignment)}>
                    Submit
                  </Button>
                )
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={dialogType === 'details'} onOpenChange={closeDialog}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
          {selectedAssignment && <AssignmentDetail assignment={selectedAssignment} viewType={viewType} />}
        </DialogContent>
      </Dialog>

      <Dialog open={dialogType === 'submit'} onOpenChange={closeDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Submit Assignment: {selectedAssignment?.title}</DialogTitle>
          </DialogHeader>
          {selectedAssignment && (
            <SubmitAssignment
              assignment={selectedAssignment}
              onSubmit={(submission) => {
                onSubmitAssignment(selectedAssignment.id, submission);
                closeDialog();
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={dialogType === 'feedback'} onOpenChange={closeDialog}>
        <DialogContent className="max-w-lg max-h-[75vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Feedback for {selectedAssignment?.title}</DialogTitle>
          </DialogHeader>
          <p className="text-gray-700">{feedback}</p>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AssignmentsList;
