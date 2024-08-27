import { FC, memo } from "react";
import { FollowModal } from "@/components/follow-modal";
import { UserRoundCheck, UsersRound } from "lucide-react";
import { FollowTrigger } from "@/components/follow-trigger";
import { Tag } from "@/app/model/tags";

interface FollowComponentProps {
  followers: Tag<string>[];
  following: Tag<string>[];
}

function users_name(users: Tag<string>[]) {
  return users?.map((user) => {
    return {
      name: user.title,
    };
  });
}

export const FollowComponent: FC<FollowComponentProps> = memo(
  ({ followers, following }) => {
    return (
      <div className="flex flex-row gap-8">
        <FollowModal
          title="Seguidores"
          trigger={
            <FollowTrigger
              icon={<UsersRound className="text-indigo-600" />}
              label={"Seguidores"}
              quantity={followers?.length}
            />
          }
          users={users_name(followers)}
        />
        <FollowModal
          title="Seguindo"
          trigger={
            <FollowTrigger
              icon={<UserRoundCheck className="text-emerald-600" />}
              label={"Seguindo"}
              quantity={following?.length}
            />
          }
          users={users_name(following)}
        />
      </div>
    );
  },
);

FollowComponent.displayName = "FollowComponent";
