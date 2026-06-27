"use client";

import React from 'react'
import Whiteboard from './WhiteBoard'
import {
  LiveblocksProvider,
  RoomProvider,
} from "@liveblocks/react/suspense";
import { LIVEBLOCKS_PUBLIC_KEY } from "../config/api.js";

export default function Board() {
    return (
        <LiveblocksProvider publicApiKey={LIVEBLOCKS_PUBLIC_KEY}>
            <RoomProvider id="my-room" initialPresence={{ cursor: null }} initialStorage={{ code: "console.log('Hello world');" }}>
                <Whiteboard />
            </RoomProvider>
        </LiveblocksProvider>
    );
}
