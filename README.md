# 🌍 Planet C

A collaborative resource management game built with Next.js, WebSocket, and React.

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.local.example .env.local

# Start development server
npm dev
```

## 🔌 Socket Architecture

This project uses a structured WebSocket architecture with:

- ✅ **Type-safe messaging** - All messages are typed
- ✅ **Automatic reconnection** - 5 attempts, 3s delay
- ✅ **Event-based system** - Pub/sub pattern
- ✅ **Reusable hooks** - Easy to use in components
- ✅ **Status indicator** - Visual connection feedback
- ✅ **Error handling** - Comprehensive error management

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) with App Router
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
- **WebSocket:** Native WebSocket API
- **Package Manager:** [pnpm](https://pnpm.io/)

## ⚙️ Configuration

### Environment Variables

Create a `.env.local` file:

```env
# Socket Configuration
NEXT_PUBLIC_SOCKET_URL=ws://localhost:9090/

# Game Configuration
NEXT_PUBLIC_GAME_ID=default-game
```

### Socket Configuration

Modify reconnection settings in `utils/config.ts`:

```typescript
export const SOCKET_CONFIG = {
  reconnect: {
    maxAttempts: 5,
    delay: 3000, // ms
  },
};
```

**Ready to play? 🎮**

Visit [localhost:3000](http://localhost:3000) to get started!
