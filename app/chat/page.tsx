import { PageLayout } from "@/components/page-layout";

export default function ChatPage() {
  return (
    <PageLayout>
      <div className="mb-12">
        <h1 className="text-6xl font-bold text-white mb-4">Chat</h1>
        <p className="text-gray-400">
          Connect with me in real-time. Ask questions or discuss potential collaborations.
        </p>
      </div>

      <div className="bg-[#1C1C1C] rounded-lg p-6">
        <p className="text-gray-400 text-center">
          Chat functionality coming soon...
        </p>
      </div>
    </PageLayout>
  );
}
