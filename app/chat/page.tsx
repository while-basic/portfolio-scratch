import { PageLayout } from "@/components/page-layout";
import { Chat } from "@/components/chat";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat | Christopher Celaya",
  description: "Chat with Chris's AI assistant about his projects, experience, and potential collaborations.",
};

export default function ChatPage() {
  return (
    <PageLayout>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Chat with Chris's Assistant</h1>
        <p className="text-muted-foreground">
          Feel free to ask questions about my experience, projects, or potential collaborations.
        </p>
      </div>

      <div className="rounded-lg border bg-card">
        <Chat />
      </div>
    </PageLayout>
  );
}
