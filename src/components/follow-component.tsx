import { FC, memo } from "react";
import { FollowModal } from "@/components/follow-modal";
import { UserRoundCheck, UsersRound } from "lucide-react";
import { FollowTrigger } from "@/components/follow-trigger";

export const FollowComponent: FC = memo(() => {
  return (
    <div className="flex flex-row gap-8">
      <FollowModal
        title="Seguidores"
        trigger={
          <FollowTrigger
            icon={<UsersRound className="text-indigo-600" />}
            label={"Seguidores"}
            quantity={users.length}
          />
        }
        users={users}
      />
      <FollowModal
        title="Seguindo"
        trigger={
          <FollowTrigger
            icon={<UserRoundCheck className="text-emerald-600" />}
            label={"Seguindo"}
            quantity={users.length}
          />
        }
        users={users}
      />
    </div>
  );
});

FollowComponent.displayName = "FollowComponent";

const users = Array.from({ length: 1000 }).map((_, i) => ({
  name: "User " + i,
}));
