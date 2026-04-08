import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Check, X, FileText, Loader2, Image as ImageIcon } from 'lucide-react';

const AdminPanel = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPendingDocuments = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:3000/api/documents/admin/pending', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        setDocuments(res.data.data);
      }
    } catch (error) {
      console.error('Error fetching admin documents:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingDocuments();
  }, []);

  const handleVerify = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:3000/api/documents/admin/verify/${id}`, 
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Remove from pending list
      setDocuments(documents.filter(doc => doc._id !== id));
    } catch (error) {
      alert('Failed to update status');
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin text-[#173300]" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#9ee86f] p-8 font-sans text-[#143600]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold ">Admin Verification Dashboard</h1>
            <p className="text-gray-500 mt-2">Review pending KYC documents</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm font-semibold text-gray-700 border border-gray-100">
            Pending: <span className="">{documents.length}</span>
          </div>
        </div>

        {documents.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-[#173300] shadow-sm">
            <FileText className="mx-auto text-[#143600] mb-4" size={64} />
            <h2 className="text-xl font-bold text-[#143600]">All caught up!</h2>
            <p className="text-gray-500 mt-2">There are no pending documents to verify.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {documents.map((doc) => (
              <div key={doc._id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col transition-shadow hover:shadow-md">
                
                {/* Image / File Preview area */}
                <div className="h-48 bg-gray-100 relative group overflow-hidden flex items-center justify-center">
                  {doc.fileUrl.endsWith('.pdf') ? (
                    <FileText size={64} className="text-gray-400" />
                  ) : (
                    <img 
                      src={doc.fileUrl} 
                      alt="Document Preview" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  )}
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                     <a href={doc.fileUrl} target="_blank" rel="noreferrer" className="bg-white text-gray-900 px-4 py-2 rounded font-semibold text-sm hover:bg-gray-100 transition-colors">
                       View Full File
                     </a>
                  </div>
                </div>

                {/* Details Area */}
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-xs font-bold text-[#173300] bg-[#e2fbc7] px-2 py-1 rounded-full uppercase tracking-wider">
                        {doc.documentType}
                      </span>
                      <h3 className="font-bold text-gray-800 mt-2 truncate pr-2">
                        {doc.userId?.email || 'Unknown User'}
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">ID: {doc.userId?._id}</p>
                    </div>
                  </div>

                  {doc.extractedData ? (
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 mb-6 flex-1">
                      <p className="text-[10px] uppercase font-bold text-gray-500 mb-1 tracking-wider">Extracted OCR Data</p>
                      <p className="text-sm font-mono text-gray-700 break-words line-clamp-3">
                        {doc.extractedData}
                      </p>
                    </div>
                  ) : (
                    <div className="flex-1"></div>
                  )}

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-3 mt-auto">
                    <button 
                      onClick={() => handleVerify(doc._id, 'rejected')}
                      className="flex items-center justify-center gap-2 py-2.5 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 transition-colors"
                    >
                      <X size={18} /> Reject
                    </button>
                    <button 
                      onClick={() => handleVerify(doc._id, 'verified')}
                      className="flex items-center justify-center gap-2 py-2.5 bg-[#173300] text-white font-bold rounded-xl hover:bg-[#1a3d00] transition-colors"
                    >
                      <Check size={18} /> Approve
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
