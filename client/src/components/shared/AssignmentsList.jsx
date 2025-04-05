import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Calendar, Clock, FileText } from 'lucide-react';
import { format, isPast, formatDistanceToNow } from 'date-fns';
import SubmitAssignment from '../student/SubmitAssignment';
import { AssignmentDetail } from './AssignmentDetail';

const FeedbackDetail = ({ feedback }) => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">Feedback</h2>
      <p className="text-gray-700">{feedback ? feedback : "No feedback available yet."}</p>
    </div>
  );
};

const AssignmentsList = ({ assignments, viewType, onSubmitAssignment }) => {
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleViewDetails = (assignment) => {
    setSelectedAssignment(assignment);
  };

  const handleOpenSubmitDialog = (assignment) => {
    setSelectedAssignment(assignment);
    setShowSubmitDialog(true);
  };

  const handleCloseSubmitDialog = () => {
    setShowSubmitDialog(false);
  };

  const handleOpenFeedbackDialog = async (assignment) => {
    setSelectedAssignment(assignment);
    setShowFeedbackDialog(true);

    try {
      const response = await fetch(`http://localhost:5000/api/feedback/${assignment.id}`);
      const data = await response.json();
      setFeedback(data.feedback || "No feedback available.");
    } catch (error) {
      console.error("Error fetching feedback:", error);
      setFeedback("Failed to fetch feedback.");
    }
  };

  const handleCloseFeedbackDialog = () => {
    setShowFeedbackDialog(false);
    setFeedback("");
  };

  const getDeadlineStatus = (deadline) => {
    const deadlineDate = new Date(deadline);
    if (isPast(deadlineDate)) {
      return <Badge variant="destructive">Past Due</Badge>;
    }
    const timeLeft = formatDistanceToNow(deadlineDate, { addSuffix: true });
    if (deadlineDate.getTime() - Date.now() < 2 * 24 * 60 * 60 * 1000) {
      return <Badge variant="warning" className="bg-amber-500">Due Soon ({timeLeft})</Badge>;
    }
    return <Badge variant="outline">Due {timeLeft}</Badge>;
  };

  const hasSubmitted = (assignment) => {
    return assignment.submissions && assignment.submissions.length > 0;
  };

  if (assignments.length === 0) {
    return (
      <div className="text-center py-10">
        <FileText className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-semibold text-gray-900">No assignments</h3>
        <p className="mt-1 text-sm text-gray-500">
          {viewType === 'teacher' 
            ? 'Get started by creating a new assignment.' 
            : 'No assignments have been posted yet.'}
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assignments.map((assignment) => (
          <Card 
            key={assignment.id} 
            className="assignment-card overflow-hidden hover:shadow-lg transition-shadow"
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{assignment.title}</CardTitle>
                {getDeadlineStatus(assignment.deadline)}
              </div>
              <CardDescription className="flex items-center gap-1 mt-2">
                <Calendar className="h-3.5 w-3.5" />
                <span>Posted on {format(new Date(assignment.createdAt), 'MMM d, yyyy')}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm text-gray-600 line-clamp-2">{assignment.instructions}</p>
              <div className="mt-3 flex items-center text-sm text-muted-foreground">
                <Clock className="mr-1 h-3.5 w-3.5" />
                <span>Due {format(new Date(assignment.deadline), 'MMM d, yyyy')}</span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-2">
              <Button variant="outline" size="sm" onClick={() => handleViewDetails(assignment)}>
                View Details
              </Button>
              
              {viewType === 'student' && (
                hasSubmitted(assignment) ? (
                  <Button 
                    size="sm"
                    variant="default"
                    onClick={() => handleOpenFeedbackDialog(assignment)}
                  >
                    View Feedback
                  </Button>
                ) : (
                  <Button 
                    size="sm"
                    onClick={() => handleOpenSubmitDialog(assignment)}
                    disabled={isPast(new Date(assignment.deadline))}
                    variant="default"
                  >
                    Submit
                  </Button>
                )
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      {selectedAssignment && (
        <Dialog 
          open={!!selectedAssignment && !showSubmitDialog} 
          onOpenChange={(open) => !open && setSelectedAssignment(null)}
        >
          <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
            <AssignmentDetail 
              assignment={selectedAssignment} 
              viewType={viewType}
              onSubmit={viewType === 'student' ? () => handleOpenSubmitDialog(selectedAssignment) : undefined}
            />
          </DialogContent>
        </Dialog>
      )}

      {selectedAssignment && onSubmitAssignment && (
        <Dialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Submit Assignment: {selectedAssignment.title}</DialogTitle>
              <DialogDescription>
                Upload your work to submit this assignment.
              </DialogDescription>
            </DialogHeader>
            <SubmitAssignment 
              assignment={selectedAssignment}
              onSubmit={(submission) => {
                onSubmitAssignment(selectedAssignment.id, submission);
                handleCloseSubmitDialog();
              }}
            />
          </DialogContent>
        </Dialog>
      )}

      {selectedAssignment && showFeedbackDialog && (
        <Dialog open={showFeedbackDialog} onOpenChange={handleCloseFeedbackDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Feedback for {selectedAssignment.title}</DialogTitle>
            </DialogHeader>
            <FeedbackDetail feedback={feedback} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AssignmentsList;
