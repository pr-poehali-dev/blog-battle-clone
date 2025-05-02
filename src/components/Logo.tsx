import { Gamepad2 } from "lucide-react";

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <Gamepad2 className="h-6 w-6 text-primary" />
      <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-400 text-transparent bg-clip-text">
        BlogBattle
      </span>
    </div>
  );
};

export default Logo;
