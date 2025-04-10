
import MessagingApp from "@/components/MessagingApp";

const Index = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-r from-purple-50 to-blue-50">
      <div className="w-full h-full max-w-md overflow-hidden border-0 md:border md:border-gray-200 md:rounded-xl md:shadow-2xl md:h-[85vh]">
        <MessagingApp />
      </div>
    </div>
  );
};

export default Index;
