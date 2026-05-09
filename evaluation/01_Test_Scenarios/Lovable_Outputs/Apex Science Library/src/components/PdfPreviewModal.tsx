import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FileText } from "lucide-react";

interface PdfPreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fileName: string;
}

export function PdfPreviewModal({ open, onOpenChange, fileName }: PdfPreviewModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl h-[80vh]">
        <DialogHeader>
          <DialogTitle className="font-heading text-primary">{fileName}</DialogTitle>
        </DialogHeader>
        <div className="flex-1 flex flex-col items-center justify-center bg-muted rounded-lg p-8">
          <FileText className="h-16 w-16 text-muted-foreground mb-4" />
          <p className="text-muted-foreground font-body text-center">
            PDF preview for <strong>{fileName}</strong>
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            In production, this would render the actual PDF document.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
