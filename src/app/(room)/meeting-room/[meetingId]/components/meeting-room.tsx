"use client";

import { useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

export const MeetingRoom = () => {
  const isZegoCloundinitialized = useRef(false);

  const router = useRouter();
  const params = useParams();

  const initializeZego = (
    ...args: Parameters<typeof ZegoUIKitPrebuilt.generateKitTokenForProduction>
  ) => {
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForProduction(
      args[0],
      args[1],
      args[2],
      args[3],
      args[4]
    );
    // create instance object from token
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    // start the call
    zp.joinRoom({
      container: document.getElementById("zego-meeting-container"),
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
      showRemoveUserButton: false,
      showTurnOffRemoteCameraButton: true,
      showTurnOffRemoteMicrophoneButton: true,
      onLeaveRoom: () => {
        router.replace("/account/my-applications/" + params.id);
      },
    });

    isZegoCloundinitialized.current = true;
  };

  useEffect(() => {
    if (!isZegoCloundinitialized.current) {
      // initializeZego(
      //   room.app_id,
      //   room.token,
      //   room.room_id,
      //   room.user_id
      //   data.username
      // );
    }
  }, []);

  return <div id="zego-meeting-container" className="min-h-full"></div>;
};
