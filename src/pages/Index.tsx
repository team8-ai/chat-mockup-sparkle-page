
import MessagingApp from "@/components/MessagingApp";

const Index = () => {
  return (
    <div className="h-screen flex items-center justify-center p-4 bg-gradient-to-r from-purple-50 to-blue-50">
      <div className="w-full max-w-6xl h-[85vh] overflow-hidden rounded-xl shadow-2xl border border-gray-200">
        <MessagingApp />
      </div>
    </div>
  );
};

export default Index;
