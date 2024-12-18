
import { keyframes } from '@emotion/react';

// Existing heartbeat animation
export const heartbeat = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
`;

// Typewriter effect animation (looping)
export const typewriter = keyframes`
  0% { width: 0; }
  50% { width: 100%; }
  100% { width: 0; }
`;

// Cursor effect (invisible)
export const cursor = keyframes`
  0%, 100% { border-right-color: transparent; }
  50% { border-right-color: transparent; }
`;
