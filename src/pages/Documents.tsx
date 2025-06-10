
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Upload, FileText, CheckCircle, AlertCircle, Download, Eye, Trash2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  status: "uploaded" | "verified" | "rejected";
  uploadDate: string;
  category: string;
}

const Documents = () => {
  const [uploadedDocs, setUploadedDocs] = useState<Document[]>([
    {
      id: "1",
      name: "aadhaar_card.pdf",
      type: "PDF",
      size: "2.3 MB",
      status: "verified",
      uploadDate: "2024-01-15",
      category: "Identity Proof"
    },
    {
      id: "2",
      name: "land_records.jpg",
      type: "JPG",
      size: "1.8 MB",
      status: "uploaded",
      uploadDate: "2024-01-14",
      category: "Land Documents"
    }
  ]);
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();

  const requiredDocuments = [
    {
      category: "Identity Proof",
      documents: ["Aadhaar Card", "Pan Card", "Voter ID"],
      uploaded: 1,
      required: 1
    },
    {
      category: "Land Documents",
      documents: ["Land Records", "Khasra Number", "Survey Settlement", "Mutation Certificate"],
      uploaded: 1,
      required: 2
    },
    {
      category: "Bank Documents",
      documents: ["Bank Passbook", "Cancelled Cheque", "Account Statement"],
      uploaded: 0,
      required: 1
    },
    {
      category: "Income Proof",
      documents: ["Income Certificate", "Tax Returns", "Agricultural Income Statement"],
      uploaded: 0,
      required: 1
    }
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (files: FileList) => {
    Array.from(files).forEach(file => {
      const newDoc: Document = {
        id: Date.now().toString(),
        name: file.name,
        type: file.type.split('/')[1]?.toUpperCase() || 'UNKNOWN',
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        status: "uploaded",
        uploadDate: new Date().toISOString().split('T')[0],
        category: "General"
      };
      
      setUploadedDocs(prev => [...prev, newDoc]);
      
      toast({
        title: "Document Uploaded",
        description: `${file.name} has been uploaded successfully`,
      });
    });
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const removeDocument = (id: string) => {
    setUploadedDocs(prev => prev.filter(doc => doc.id !== id));
    toast({
      title: "Document Removed",
      description: "Document has been removed from your application",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "rejected":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <FileText className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  const totalRequired = requiredDocuments.reduce((sum, cat) => sum + cat.required, 0);
  const totalUploaded = requiredDocuments.reduce((sum, cat) => sum + Math.min(cat.uploaded, cat.required), 0);
  const completionPercentage = (totalUploaded / totalRequired) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-green-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <ArrowLeft className="h-6 w-6 text-green-600" />
              <span className="text-lg font-semibold text-green-800">Back to Home</span>
            </Link>
            <h1 className="text-2xl font-bold text-green-800">Document Management</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-green-800 mb-2">Document Upload & Management</h2>
          <p className="text-green-600">Upload and manage your application documents securely</p>
        </div>

        {/* Progress Overview */}
        <Card className="border-green-200 mb-6">
          <CardHeader>
            <CardTitle className="text-green-800">Document Upload Progress</CardTitle>
            <CardDescription>
              {totalUploaded} of {totalRequired} required documents uploaded
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={completionPercentage} className="h-3 mb-2" />
            <p className="text-sm text-green-600">{Math.round(completionPercentage)}% Complete</p>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Upload Area */}
          <div className="space-y-6">
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Upload Documents</CardTitle>
                <CardDescription>
                  Drag and drop files or click to upload
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive
                      ? "border-green-400 bg-green-50"
                      : "border-green-200 hover:border-green-300"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Upload className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <p className="text-lg font-medium text-green-800 mb-2">
                    Drop files here or click to upload
                  </p>
                  <p className="text-sm text-green-600 mb-4">
                    Supports PDF, JPG, PNG files up to 5MB
                  </p>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileInput}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload">
                    <Button className="bg-green-600 hover:bg-green-700" asChild>
                      <span>Choose Files</span>
                    </Button>
                  </label>
                </div>

                {/* Document Guidelines */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Document Guidelines:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Clear, colored scans preferred</li>
                    <li>• All text should be readable</li>
                    <li>• File size should be less than 5MB</li>
                    <li>• Supported formats: PDF, JPG, PNG</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Required Documents Checklist */}
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Required Documents</CardTitle>
                <CardDescription>
                  Check what documents you need to upload
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {requiredDocuments.map((category, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-gray-800">{category.category}</h4>
                        <Badge
                          className={
                            category.uploaded >= category.required
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }
                        >
                          {category.uploaded}/{category.required}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600">
                        <p className="mb-2">Required (any {category.required}):</p>
                        <ul className="list-disc list-inside space-y-1">
                          {category.documents.map((doc, docIndex) => (
                            <li key={docIndex}>{doc}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Uploaded Documents */}
          <div>
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Uploaded Documents</CardTitle>
                <CardDescription>
                  Manage your uploaded documents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {uploadedDocs.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                      <p>No documents uploaded yet</p>
                    </div>
                  ) : (
                    uploadedDocs.map((doc) => (
                      <div
                        key={doc.id}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3">
                            {getStatusIcon(doc.status)}
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-800">{doc.name}</h4>
                              <p className="text-sm text-gray-600">
                                {doc.type} • {doc.size} • {doc.uploadDate}
                              </p>
                              <Badge variant="outline" className="mt-1 text-xs">
                                {doc.category}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={getStatusColor(doc.status)}>
                              {doc.status}
                            </Badge>
                            <div className="flex space-x-1">
                              <Button size="sm" variant="outline">
                                <Eye className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Download className="h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => removeDocument(doc.id)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documents;
