import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Leader {
  name: string;
  role: string;
  image: string;
  bio: string;
}

interface LeaderModalProps {
  leader: Leader | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LeaderModal = ({ leader, open, onOpenChange }: LeaderModalProps) => {
  if (!leader) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl">{leader.name}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4">
          <img
            src={leader.image}
            alt={leader.name}
            className="w-40 h-40 rounded-full object-cover"
            loading="lazy"
            width={160}
            height={160}
          />
          <p className="text-primary font-bold uppercase tracking-wider text-sm">{leader.role}</p>
          <p className="text-muted-foreground leading-relaxed text-sm">{leader.bio}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LeaderModal;
