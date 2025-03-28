"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const AdminRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState<string | null>(null);

  // Fetch all borrow requests
  const fetchRequests = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/books/borrowRequests/getAll");
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching borrow requests:", error);
      toast.error("Failed to fetch borrow requests.");
    } finally {
      setLoading(false);
    }
  };

  // Approve a borrow request
  const handleApprove = async (requestId: string, bookId: string) => {
    setProcessing(requestId);
    console.log("Approving request with payload:", { requestId, bookId });
    try {
      const response = await axios.post("/api/books/borrowRequests/approve", {
        requestId,
        bookId,
      });

      if (response.status === 200) {
        toast.success("Request approved successfully!");
        fetchRequests(); // Refresh the list
      } else {
        toast.error("Failed to approve the request.");
      }
    } catch (error: any) {
      console.error("Error approving request:", error);
      const errorMessage = error.response?.data?.error || "An error occurred while approving the request.";
      toast.error(errorMessage);
    } finally {
      setProcessing(null);
    }
  };

  // Reject a borrow request
  const handleReject = async (requestId: string) => {
    setProcessing(requestId);
    console.log("Rejecting request with payload:", { requestId });
    try {
      const response = await axios.post("/api/books/borrowRequests/reject", {
        requestId,
      });

      if (response.status === 200) {
        toast.success("Request rejected successfully!");
        fetchRequests(); // Refresh the list
      } else {
        toast.error("Failed to reject the request.");
      }
    } catch (error: any) {
      console.error("Error rejecting request:", error);
      const errorMessage = error.response?.data?.error || "An error occurred while rejecting the request.";
      toast.error(errorMessage);
    } finally {
      setProcessing(null);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Borrow Requests</h1>
      {loading ? (
        <p>Loading requests...</p>
      ) : requests.length === 0 ? (
        <p>No borrow requests found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">User</th>
              <th className="border border-gray-300 px-4 py-2">Book</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request: any, idx) => (
              <tr key={idx}>
                <td className="border border-gray-300 px-4 py-2">{request.userId}</td>
                <td className="border border-gray-300 px-4 py-2">{request.bookTitle}</td>
                <td className="border border-gray-300 px-4 py-2">{request.status}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {request.status === "Pending" && (
                    <div className="flex gap-2">
                      <Button
                        className="bg-green-500 text-white"
                        onClick={() => handleApprove(request.id || request._id, request.bookId || request.book_id)}
                        disabled={processing === request.id}
                      >
                        Approve
                      </Button>
                      <Button
                        className="bg-red-500 text-white"
                        onClick={() => handleReject(request.id || request._id)}
                        disabled={processing === request.id}
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminRequestsPage;