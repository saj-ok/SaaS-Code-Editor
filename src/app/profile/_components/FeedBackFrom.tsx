import { useMutation } from 'convex/react';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Star, Trash2, Calendar, Edit2, Save, XCircle } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const MAX_CHARACTERS = 340;

function FeedBackFrom() {
  const [text, setText] = useState("");
  const [role, setRole] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreviousFeedback, setShowPreviousFeedback] = useState(true);
  const [editingFeedback, setEditingFeedback] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [editRole, setEditRole] =  useState("");
  const [editRating, setEditRating] = useState(0);
  const [editHoverRating, setEditHoverRating] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);

  const { user } = useUser();
  const userId = user?.id as string;

  // Get user's previous feedback
  const userFeedbacks = useQuery(api.feedback.getFeedbackPerUser, userId ? { userId } : "skip");

  const createFeedback = useMutation(api.feedback.createFeedback);
  const deleteFeedback = useMutation(api.feedback.deleteFeedbackById);
  const updateFeedback = useMutation(api.feedback.updateFeedbackById);

  // Character count helpers
  const remainingChars = MAX_CHARACTERS - text.length;
  const editRemainingChars = MAX_CHARACTERS - editText.length;

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (newText.length <= MAX_CHARACTERS) {
      setText(newText);
    }
  };

  const handleEditTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (newText.length <= MAX_CHARACTERS) {
      setEditText(newText);
    }
  };

  const getCharacterCountColor = (remaining: number) => {
    if (remaining < 20) return 'text-red-400';
    if (remaining < 50) return 'text-yellow-400';
    return 'text-gray-400';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error("Please provide a rating");
      return;
    }

    if (!text.trim()) {
      toast.error("Please provide feedback content");
      return;
    }

    setIsSubmitting(true);
    try {
      await createFeedback({
        rating,
        content: text,
        userRole: role,
      })
      toast.success("Thank you for your feedback!");
      setText("");
      setRating(0);
      setRole("");
    } catch (error) {
      console.log(error);
      toast.error(error instanceof Error ? error.message : "Something went wrong while submitting your feedback. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleDeleteFeedback = async (feedbackId: string) => {
    try {
      await deleteFeedback({ feedbackId: feedbackId as any });
      toast.success("Feedback deleted successfully!");
    } catch (error) {
      console.log(error);
      toast.error(error instanceof Error ? error.message : "Failed to delete feedback");
    }
  };

  const handleEditFeedback = (feedback: any) => {
    setEditingFeedback(feedback._id);
    setEditText(feedback.content);
    setEditRole(feedback.userRole)
    setEditRating(feedback.rating);
    setEditHoverRating(0);
  };

  const handleCancelEdit = () => {
    setEditingFeedback(null);
    setEditText("");
    setEditRole("");
    setEditRating(0);
    setEditHoverRating(0);
  };

  const handleUpdateFeedback = async (feedbackId: string) => {
    if (editRating === 0) {
      toast.error("Please provide a rating");
      return;
    }

    if (!editText.trim()) {
      toast.error("Please provide feedback description");
      return;
    }

    setIsUpdating(true);
    try {
      await updateFeedback({
        feedbackId: feedbackId as any,
        rating: editRating,
        content: editText,
        userRole: editRole,
      });
      toast.success("Feedback updated successfully!");
      handleCancelEdit();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update feedback");
    } finally {
      setIsUpdating(false);
    }
  };
 

  return (
    <div className='space-y-6 mt-8'>
      <div className='bg-gradient-to-br from-[#12121a] to-[#1a1a2e] rounded-2xl p-6 border border-gray-800/50'>
        <div className='flex items-center justify-between mb-6'>
          <div>
            <h2 className='text-2xl font-bold text-white'>Share Your Experience</h2>
            <p className='text-gray-400'>
              We value your feedback to improve our application.
            </p>
          </div>
          <div className='flex items-center gap-2 px-3 py-2 bg-[#1e1e2e]/80 rounded-full border border-gray-800/50'>
            <Star className='w-4 h-4 text-yellow-500 fill-yellow-500' />
            <span className='text-sm font-medium text-gray-300'>Feedback</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
          <div className='space-y-2'>
            <Label className='font-semibold text-white'>Rate your experience</Label>
            <div className='flex items-center  gap-32'>
              <div className='flex items-center gap-1'>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type='button'
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className='p-1 transition-transform hover:scale-110 focus:outline-none'
                  >
                    <Star
                      className={`w-8 h-8 ${star <= (hoverRating || rating)
                        ? 'text-yellow-500 fill-yellow-500'
                        : 'text-gray-600 fill-gray-600'
                        }`}
                      strokeWidth={1.5}
                    />
                  </button>
                ))}
              </div>
              <div className={`glass border  p-2 rounded-xl flex justify-between ${rating < 3 ? "animate-pulse" : "animate-bounce"} text-gray-400`}>
                <span>
                  {["😒Very dissatisfied", "😞Dissatisfied", "🙂Neutral", "😊Satisfied", "🤗Very satisfied"][rating - 1] || ""}
                </span>
              </div>
            </div>
          </div>
           
          <div className='space-y-2'>
            <Label htmlFor='role' className='font-semibold text-white'>Role</Label>
            <Input
             id='role'
             value={role}
             onChange={(e)=>setRole(e.target.value)}
             placeholder='are you a student or expert? if expert then write you position with company name.'
             className='bg-[#1e1e2e]/80 border-gray-800/50 text-white placeholder:text-gray-500'
            />
          </div>

          <div className='space-y-2'>
            <div className='flex items-center justify-between'>
              <Label htmlFor="feedback-text" className='font-semibold text-white'>
                Tell us about your experience
              </Label>
              <div className='flex items-center gap-2'>
                <span className={`text-sm font-medium ${getCharacterCountColor(remainingChars)}`}>
                  {remainingChars} characters remaining
                </span>
                <div className='w-16 h-2 bg-gray-700 rounded-full overflow-hidden'>
                  <div 
                    className={`h-full transition-all duration-300 ${
                      remainingChars < 20 ? 'bg-red-500' : 
                      remainingChars < 50 ? 'bg-yellow-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${((MAX_CHARACTERS - text.length) / MAX_CHARACTERS) * 100}%` }}
                  />
                </div>
              </div>
            </div>
            <Textarea
              id="feedback-text"
              value={text}
              onChange={handleTextChange}
              placeholder="What did you like? What can we improve? Any features you'd like to see?"
              className='min-h-[150px] bg-[#1e1e2e]/80 border-gray-800/50 text-white placeholder:text-gray-500'
            />
            <div className='text-xs text-gray-500 text-right'>
              {text.length}/{MAX_CHARACTERS} characters
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || rating === 0 || !text.trim()}
            className="mt-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl 
            hover:from-blue-600 hover:to-purple-700 transition-all py-6 text-base font-semibold shadow-lg
            disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className='flex items-center gap-2'>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sharing your feedback...
              </span>
            ) : (
              "Share Feedback"
            )}
          </Button>
        </form>
      </div>

      {/* Previous Feedback Section */}
      {userFeedbacks && userFeedbacks.length > 0 && (
        <div className='bg-gradient-to-br from-[#12121a] to-[#1a1a2e] rounded-2xl p-6 border border-gray-800/50'>
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-xl font-bold text-white'>Your Previous Feedbacks</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPreviousFeedback(!showPreviousFeedback)}
              className="hover:text-white border-gray-800/50 hover:bg-blue-500/10 hover:border-blue-500/50 bg-[#1e1e2e]/80 text-gray-300"
            >
              {showPreviousFeedback ? 'Hide' : 'Show'} ({userFeedbacks.length})
            </Button>
          </div>

          {showPreviousFeedback && (
            <div className='space-y-4 max-h-96 overflow-y-auto overflow-x-hidden'>
              {userFeedbacks.map((feedback) => (
                <Card key={feedback._id} className="bg-[#1e1e2e]/80 border-gray-800/50">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      {editingFeedback === feedback._id ? (
                        <div className="w-full space-y-3 ">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-white">Rating:</span>
                            <div className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  type="button"
                                  key={star}
                                  onClick={() => setEditRating(star)}
                                  onMouseEnter={() => setEditHoverRating(star)}
                                  onMouseLeave={() => setEditHoverRating(0)}
                                  className="p-1 transition-transform hover:scale-110 focus:outline-none"
                                >
                                  <Star
                                    className={`w-5 h-5 ${star <= (editHoverRating || editRating)
                                      ? 'text-yellow-500 fill-yellow-500'
                                      : 'text-gray-600 fill-gray-600'
                                      }`}
                                  />
                                </button>
                              ))}
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label className="text-white">Role</Label>
                            <Input
                              value={editRole}
                              onChange={(e) => setEditRole(e.target.value)}
                              className="bg-[#0a0a0f]/80 border-gray-800/50 text-white placeholder:text-gray-500"
                              placeholder="Update your role..."
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <div className='flex items-center justify-between'>
                              <Label className="text-white">Feedback</Label>
                              <div className='flex items-center gap-2'>
                                <span className={`text-xs font-medium ${getCharacterCountColor(editRemainingChars)}`}>
                                  {editRemainingChars} remaining
                                </span>
                                <div className='w-12 h-1.5 bg-gray-700 rounded-full overflow-hidden'>
                                  <div 
                                    className={`h-full transition-all duration-300 ${
                                      editRemainingChars < 20 ? 'bg-red-500' : 
                                      editRemainingChars < 50 ? 'bg-yellow-500' : 'bg-blue-500'
                                    }`}
                                    style={{ width: `${((MAX_CHARACTERS - editText.length) / MAX_CHARACTERS) * 100}%` }}
                                  />
                                </div>
                              </div>
                            </div>
                            <Textarea
                              value={editText}
                              onChange={handleEditTextChange}
                              className="  min-h-[100px]  bg-[#0a0a0f]/80 border-gray-800/50 text-white placeholder:text-gray-500"
                              placeholder="Update your feedback..."
                            />
                            <div className='text-xs text-gray-500 hyphens-auto max-w-prose text-justify'>
                              {editText.length}/{MAX_CHARACTERS} characters
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleUpdateFeedback(feedback._id)}
                              disabled={isUpdating || editRating === 0 || !editText.trim()}
                              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700"
                            >
                              {isUpdating ? (
                                <span className="flex items-center gap-1">
                                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                                  Updating...
                                </span>
                              ) : (
                                <>
                                  <Save className="w-4 h-4 mr-1" />
                                  Save
                                </>
                              )}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleCancelEdit}
                              disabled={isUpdating}
                              className="border-gray-800/50 hover:bg-gray-800/50 text-black hover:text-white"
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className='flex items-center gap-20'>
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`w-4 h-4 ${star <= feedback.rating
                                      ? 'text-yellow-500 fill-yellow-500'
                                      : 'text-gray-600 fill-gray-600'
                                      }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-400">
                                {feedback.rating}/5 stars
                              </span>
                            </div>
                            <div className="px-3 py-2 bg-[#0a0a0f]/80 border border-gray-800/50 rounded-full hover:text-white hover:cursor-pointer flex items-center gap-4 text-xs text-gray-400">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                <span>{new Date(feedback._creationTime).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditFeedback(feedback)}
                              className="text-blue-400 hover:text-blue-300 bg-blue-950/80 hover:bg-blue-500/50 border-blue-500/30 hover:border-blue-500/50"
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteFeedback(feedback._id)}
                              className="text-red-100 hover:text-red-300 bg-red-900/60 hover:bg-red-500/10 border-red-500/30 hover:border-red-500/50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  </CardHeader>
                  {editingFeedback !== feedback._id && (
                    <CardContent className="pt-0">
                      <p className="text-sm text-gray-300 mb-2">
                        "{feedback.content}"
                      </p>
                      {feedback.userRole && (
                        <p className="text-xs text-gray-500">
                          Role: {feedback.userRole}
                        </p>
                      )}
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default FeedBackFrom;