"use client";

import { useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

import meetingsApi from "@/api/meetings";
import { getUserSessionFromStorage } from "@/lib/auth";

export const MeetingRoom = ({
  id,
  startDate,
  endDate,
}: {
  id: number;
  startDate: Date;
  endDate: Date;
}) => {
  const effectCalled = useRef(false);
  const renderAfterCalled = useRef(false);

  if (effectCalled.current) {
    renderAfterCalled.current = true;
  }

  const ZegoCloundUiKitInstance = useRef<ZegoUIKitPrebuilt | null>(null);

  const { meetingId } = useParams();

  if (typeof meetingId !== "string") {
    throw new Error("No :meetingId param found");
  }

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

    if (ZegoCloundUiKitInstance.current) {
      return;
      // ZegoCloundUiKitInstance.current.destroy();
    }

    // create instance object from token
    const zp = ZegoUIKitPrebuilt.create(kitToken);

    // start the call
    zp.joinRoom({
      container: document.getElementById("zego-meeting-container"),
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
      showPreJoinView: false,
      showRemoveUserButton: false,
      showTurnOffRemoteCameraButton: true,
      showTurnOffRemoteMicrophoneButton: true,
      onJoinRoom: () => {
        // destory room after meeting end time
        setTimeout(
          async () => {
            zp.destroy();
          },
          Math.max(endDate.getTime() - Date.now(), 0)
        );
      },
    });

    ZegoCloundUiKitInstance.current = zp;
  };

  useEffect(() => {
    if (!effectCalled.current) {
      if (!ZegoCloundUiKitInstance.current) {
        console.log("initializeZego");

        meetingsApi.getMeetingRoomToken(id).then((room) => {
          console.log("room", room);
          initializeZego(
            room.app_id,
            room.token,
            room.room_id,
            room.user_id,
            getUserSessionFromStorage().name
          );
        });
      }

      effectCalled.current = true;
    }

    return () => {
      if (!renderAfterCalled.current) {
        return;
      }

      if (ZegoCloundUiKitInstance.current) {
        console.log("unmounting  MeetingRoom");
        ZegoCloundUiKitInstance.current.destroy();
        ZegoCloundUiKitInstance.current = null;
      }
    };
  }, []);

  return <div id="zego-meeting-container" className="w-full"></div>;
};
