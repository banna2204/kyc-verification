import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { UploadCloud, CheckCircle, XCircle, Loader2, FileText, Image as ImageIcon } from 'lucide-react';

const ManualUpload = ({ onAllDocumentsUploaded }) => {
  const [documents, setDocuments] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(true);
  
  const [selectedType, setSelectedType] = useState('aadhaar');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  
  const [uploadError, setUploadError] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef(null);

  const fetchDocuments = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:3000/api/documents/my-documents', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        const docs = res.data.data;
        setDocuments(docs);
        const hasAadhaar = docs.some(d => d.documentType === 'aadhaar');
        const hasPan = docs.some(d => d.documentType === 'pan');
        const hasPhoto = docs.some(d => d.documentType === 'photo');
        if (hasAadhaar && hasPan && hasPhoto && onAllDocumentsUploaded) {
          onAllDocumentsUploaded();
        }
      }
    } catch (error) {
      console.error('Error fetching documents', error);
    } finally {
      setLoadingStatus(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleFileChange = (e) => {
    setUploadError('');
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // Validate size
    if (selectedFile.size > 5 * 1024 * 1024) {
      setUploadError('File size exceeds limit (Max 5MB)');
      setFile(null);
      setPreview(null);
      return;
    }

    // Validate type based on document type
    const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const validDocTypes = ['application/pdf', ...validImageTypes];

    if (selectedType === 'photo' && !validImageTypes.includes(selectedFile.type)) {
      setUploadError('Only JPG, JPEG, PNG are allowed for Photo');
      setFile(null);
      setPreview(null);
      return;
    } else if (selectedType !== 'photo' && !validDocTypes.includes(selectedFile.type)) {
      setUploadError('Only PDF, JPG, JPEG, PNG are allowed for Aadhaar/PAN');
      setFile(null);
      setPreview(null);
      return;
    }

    setFile(selectedFile);

    // Create preview
    if (selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else if (selectedFile.type === 'application/pdf') {
      setPreview('pdf');
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);
    setUploadError('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('documentType', selectedType);

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3000/api/documents/upload', formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        }
      });
      
      // Handle success
      setFile(null);
      setPreview(null);
      setSelectedType('aadhaar');
      if (fileInputRef.current) fileInputRef.current.value = '';
      
      // Refresh documents list
      await fetchDocuments();
    } catch (error) {
      console.error('Upload failed', error);
      setUploadError(error.response?.data?.message || 'Failed to upload document');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'verified': return <CheckCircle className="text-green-500" size={20} />;
      case 'rejected': return <XCircle className="text-red-500" size={20} />;
      default: return <Loader2 className="text-yellow-500 animate-spin" size={20} />;
    }
  };

  const maskData = (data, type) => {
    if (!data) return '';
    if (type === 'aadhaar') {
      // Find 12 digits and mask first 8
      const match = data.replace(/\s/g, '').match(/(\d{8})(\d{4})/);
      if (match) return `XXXX XXXX ${match[2]}`;
    }
    if (type === 'pan') {
      const match = data.match(/[A-Z]{5}[0-9]{4}[A-Z]/i);
      if (match) {
        const pan = match[0];
        return `${pan.slice(0, 2)}XXXXX${pan.slice(-3)}`;
      }
    }
    return 'Masked';
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Document Upload & Verification</h2>

      {/* Upload Section */}
      <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Upload New Document</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Document Type</label>
            <select 
              value={selectedType} 
              onChange={(e) => {
                setSelectedType(e.target.value);
                setFile(null);
                setPreview(null);
                setUploadError('');
                if (fileInputRef.current) fileInputRef.current.value = '';
              }}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#173300] outline-none"
              disabled={isUploading}
            >
              <option value="aadhaar">Aadhaar Card (PDF/Image)</option>
              <option value="pan">PAN Card (PDF/Image)</option>
              <option value="photo">User Photo (Image Only)</option>
            </select>

            <div className="mt-4">
               <label className="block text-sm font-medium text-gray-700 mb-2">Choose File (Max 5MB)</label>
               <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleFileChange} 
                  disabled={isUploading}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-lg file:border-0
                    file:text-sm file:font-semibold
                    file:bg-[#e2fbc7] file:text-[#173300]
                    hover:file:bg-[#d0f5ad] transition-colors"
                />
            </div>

            {uploadError && (
              <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm flex items-start gap-2">
                <XCircle size={16} className="mt-0.5 flex-shrink-0" />
                <p>{uploadError}</p>
              </div>
            )}

            {file && (
              <div className="mt-6">
                <button 
                  onClick={handleUpload}
                  disabled={isUploading}
                  className="w-full bg-[#173300] text-white py-3 rounded-xl font-semibold hover:bg-[#1a3d00] transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
                >
                  {isUploading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Uploading... {uploadProgress}%
                    </>
                  ) : (
                    <>
                      <UploadCloud size={18} />
                      Upload Document
                    </>
                  )}
                </button>
                
                {/* Progress Bar */}
                {isUploading && (
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                    <div 
                      className="bg-[#9ee86f] h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Preview Section */}
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl bg-white p-4 h-64 md:h-auto overflow-hidden relative">
            {preview ? (
              preview === 'pdf' ? (
                <div className="flex flex-col items-center text-gray-400">
                  <FileText size={64} className="mb-4 text-[#173300]" />
                  <p className="font-medium">PDF Document Selected</p>
                  <p className="text-sm truncate max-w-[200px] mt-2">{file?.name}</p>
                </div>
              ) : (
                <img src={preview} alt="Preview" className="max-h-full max-w-full object-contain rounded" />
              )
            ) : (
              <div className="flex flex-col items-center text-gray-400">
                <ImageIcon size={48} className="mb-4 opacity-50" />
                <p>No preview available</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Uploaded Documents List */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Your Uploaded Documents</h3>
        {loadingStatus ? (
          <div className="flex justify-center p-8">
            <Loader2 className="animate-spin text-[#173300]" size={32} />
          </div>
        ) : documents.length === 0 ? (
          <p className="text-gray-500 bg-gray-50 p-6 rounded-xl text-center border border-gray-100">No documents uploaded yet.</p>
        ) : (
          <div className="space-y-4">
            {documents.map(doc => (
              <div key={doc._id} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#f4fde9] rounded-lg flex items-center justify-center text-[#173300]">
                    {doc.fileUrl.endsWith('.pdf') ? <FileText size={24} /> : <ImageIcon size={24} />}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 capitalize">{doc.documentType}</h4>
                    <p className="text-sm text-gray-500">
                      Status: <span className="font-semibold capitalize">{doc.verificationStatus}</span>
                    </p>
                    {(doc.verificationStatus === 'verified' && doc.extractedData) && (
                      <p className="text-xs text-blue-600 mt-1">
                        Detected: {maskData(doc.extractedData, doc.documentType)}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col flex-end items-end gap-2">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(doc.verificationStatus)}
                  </div>
                  <a 
                    href={doc.fileUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-xs text-[#173300] font-semibold hover:underline"
                  >
                    View File
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManualUpload;
