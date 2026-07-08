import React, { useState } from "react";
import { DocumentRecord, Customer } from "../types";
import { mockDocuments } from "../mockDb";
import { FileText, ShieldCheck, ShieldAlert, CheckCircle2, Upload, Trash, Eye, ZoomIn, Loader2 } from "lucide-react";

interface DocumentViewerProps {
  customers: Customer[];
  documents: DocumentRecord[];
  setDocuments: React.Dispatch<React.SetStateAction<DocumentRecord[]>>;
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({
  customers,
  documents,
  setDocuments,
}) => {
  const [activeDocId, setActiveDocId] = useState<string>("doc-1");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [dragActive, setDragActive] = useState<boolean>(false);

  const activeDoc = documents.find((d) => d.id === activeDocId) || documents[0];
  const linkedCustomer = customers.find((c) => c.id === activeDoc?.customerId);

  // Drag and drop mechanics
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await processUpload(e.dataTransfer.files[0].name);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      await processUpload(e.target.files[0].name);
    }
  };

  const processUpload = async (fileName: string) => {
    setIsUploading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Guess document type based on name, default to paystub
    let type: DocumentRecord["type"] = "paystub";
    const nameLower = fileName.toLowerCase();
    if (nameLower.includes("pan")) type = "pan";
    else if (nameLower.includes("aadhaar")) type = "aadhaar";
    else if (nameLower.includes("bank") || nameLower.includes("statement")) type = "bank_statement";

    const newDoc: DocumentRecord = {
      id: `doc-${Date.now()}`,
      customerId: "cust-101", // Default linked to Aarav Mehta
      type,
      fileName,
      uploadDate: new Date().toISOString().split("T")[0],
      status: "verified",
      ocrConfidence: parseFloat((95 + Math.random() * 4).toFixed(2)),
      extractedData: {
        documentName: fileName.toUpperCase(),
        checksumSignature: "0x89E3F1...23D",
        uploadDomain: "BankOS AI OCR Secure Node"
      }
    };

    setDocuments((prev) => [newDoc, ...prev]);
    setActiveDocId(newDoc.id);
    setIsUploading(false);
  };

  const handleDeleteDoc = (id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
    if (activeDocId === id) {
      setActiveDocId(documents[0]?.id || "");
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 transition-colors duration-300">
      {/* Left Column: Document Manager list */}
      <div className="xl:col-span-1 space-y-4">
        {/* Upload portal dropzone */}
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-2xl p-5 text-center flex flex-col items-center justify-center transition-all relative ${
            dragActive
              ? "border-sky-500 bg-sky-50/20 dark:bg-sky-950/20"
              : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
          }`}
          id="dropzone-panel"
        >
          <input
            type="file"
            id="file-upload-input"
            className="hidden"
            onChange={handleFileSelect}
            disabled={isUploading}
          />
          
          {isUploading ? (
            <div className="space-y-2 py-4">
              <Loader2 className="h-8 w-8 text-sky-500 animate-spin mx-auto" />
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                OCR Intelligent Scanning...
              </p>
            </div>
          ) : (
            <label htmlFor="file-upload-input" className="cursor-pointer space-y-2.5 py-4 block">
              <Upload className="h-8 w-8 text-slate-400 mx-auto" />
              <div>
                <span className="text-xs font-bold text-sky-500">Click to upload</span>
                <span className="text-xs text-slate-500 dark:text-slate-400"> or drag & drop</span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono">
                Supports PDF, JPG, PNG (Max 10MB)
              </p>
            </label>
          )}
        </div>

        {/* Saved Document records list */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-3">
          <h4 className="font-display font-bold text-xs text-slate-800 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">
            Uploaded Banking Credentials
          </h4>

          <div className="space-y-2 max-h-[300px] overflow-y-auto" id="documents-grid-list">
            {documents.map((doc) => {
              const isSelected = doc.id === activeDocId;
              return (
                <div
                  key={doc.id}
                  className={`p-3 rounded-xl border transition-all flex items-center justify-between ${
                    isSelected
                      ? "bg-slate-50 dark:bg-slate-850/60 border-sky-500/40"
                      : "bg-transparent border-slate-200 dark:border-slate-800"
                  }`}
                >
                  <button
                    onClick={() => setActiveDocId(doc.id)}
                    className="flex items-center space-x-3 text-left min-w-0 flex-1 cursor-pointer"
                  >
                    <span className="bg-slate-100 dark:bg-slate-850 p-2 rounded-lg border border-slate-200 dark:border-slate-700">
                      <FileText className="h-4 w-4 text-slate-500" />
                    </span>
                    <div className="min-w-0">
                      <h5 className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
                        {doc.fileName}
                      </h5>
                      <p className="text-[9px] text-slate-400 font-mono">
                        {doc.type.toUpperCase().replace("_", " ")} • {doc.uploadDate}
                      </p>
                    </div>
                  </button>

                  <div className="flex items-center space-x-2">
                    <span className={`h-2 w-2 rounded-full ${
                      doc.status === "verified"
                        ? "bg-emerald-500"
                        : doc.status === "flagged"
                        ? "bg-rose-500"
                        : "bg-slate-400"
                    }`}></span>
                    <button
                      onClick={() => handleDeleteDoc(doc.id)}
                      className="text-slate-400 hover:text-rose-500 p-1 rounded-md hover:bg-rose-50 dark:hover:bg-rose-950/20 transition cursor-pointer"
                      title="Delete document"
                    >
                      <Trash className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Column: Active Document Scan Details */}
      {activeDoc ? (
        <div className="xl:col-span-2 space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-5 gap-4">
              <div>
                <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                  Document Audit: {activeDoc.fileName}
                </h3>
                {linkedCustomer && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-sans mt-0.5">
                    Assigned Owner Dossier: <span className="font-semibold text-sky-500">{linkedCustomer.name}</span>
                  </p>
                )}
              </div>

              {/* Confidence badge */}
              <div className="bg-slate-50 dark:bg-slate-800/50 px-4 py-2 rounded-xl border border-slate-100 dark:border-slate-800">
                <span className="text-[9px] font-mono text-slate-400 uppercase block">OCR Trust Index</span>
                <span className={`text-base font-display font-black ${
                  activeDoc.ocrConfidence >= 90
                    ? "text-emerald-500"
                    : activeDoc.ocrConfidence >= 70
                    ? "text-amber-500"
                    : "text-rose-500"
                }`}>
                  {activeDoc.ocrConfidence}%
                </span>
              </div>
            </div>

            {/* Document Scan Frame Mockup */}
            <div className="my-6 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-8 rounded-xl relative overflow-hidden flex flex-col items-center justify-center min-h-[160px] text-center shadow-inner">
              <div className="absolute top-2.5 right-2.5 flex space-x-1">
                <span className="bg-slate-200 dark:bg-slate-800 p-1 rounded-md text-slate-500 dark:text-slate-400">
                  <ZoomIn className="h-3.5 w-3.5" />
                </span>
                <span className="bg-slate-200 dark:bg-slate-800 p-1 rounded-md text-slate-500 dark:text-slate-400">
                  <Eye className="h-3.5 w-3.5" />
                </span>
              </div>

              <FileText className="h-12 w-12 text-sky-500/80 mb-3" />
              <h5 className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {activeDoc.fileName} - Document Scan Safe Frame
              </h5>
              <p className="text-[10px] text-slate-400 font-mono mt-1">
                Watermark Verified • Structural Integrity Certified by BankOS Engine
              </p>
            </div>

            {/* Extracted JSON Metadata & Warnings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Extracted JSON */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase">
                  Extracted OCR Metadata (JSON payload)
                </span>
                <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                  <pre className="text-[10px] font-mono text-slate-700 dark:text-slate-300 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                    {JSON.stringify(activeDoc.extractedData || {}, null, 2)}
                  </pre>
                </div>
              </div>

              {/* Issues / Anomalies */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase">
                  Institutional Security Flags
                </span>

                <div className="space-y-2.5">
                  {activeDoc.status === "verified" ? (
                    <div className="p-4 rounded-xl bg-emerald-50/40 dark:bg-emerald-950/10 border border-emerald-500/20 text-xs flex items-start space-x-3">
                      <ShieldCheck className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <h5 className="font-bold text-emerald-800 dark:text-emerald-400">Security Clearance Passed</h5>
                        <p className="text-slate-500 dark:text-slate-400 mt-1">
                          No structural alerts or mismatch patterns identified in PAN card character scans.
                        </p>
                      </div>
                    </div>
                  ) : (
                    activeDoc.issues?.map((issue, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-rose-50/40 dark:bg-rose-950/10 border border-rose-500/20 text-xs flex items-start space-x-3">
                        <ShieldAlert className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
                        <div>
                          <h5 className="font-bold text-rose-800 dark:text-rose-400">Structural Trust Alert</h5>
                          <p className="text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                            {issue}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="xl:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center text-center py-16">
          <Eye className="h-8 w-8 text-slate-400 mb-2" />
          <p className="text-xs text-slate-500">Select or upload a document to examine OCR metadata</p>
        </div>
      )}
    </div>
  );
};
