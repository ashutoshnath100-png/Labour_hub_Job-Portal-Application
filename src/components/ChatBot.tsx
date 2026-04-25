import { MessageCircle, X } from "lucide-react";
import { useState } from "react";

const ChatBot = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="fixed bottom-6 right-6 bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full shadow-lg z-50">
                <MessageCircle size={24} />
            </button>
            {open && (
                <div className="fixed bottom-24 right-6 w-80 bg-white rounded-2xl shadow-xl z-50 overflow-hidden">
                    <div className="bg-orange-500 text-white p-4 flex justify-between items-center">
                        <h3 className="font-semibold">LabourHub Support</h3>
                        <button onClick={() => setOpen(false)}>
                            <X size={18} />
                        </button>
                    </div>
                    <div className="p-4 text-sm text-gray-600 h-60 overflow-y-auto space-y-2">
                        <div className="bg-gray-100 p-3 rounded-lg max-w-[85%]">
                            👋 Hi! How can we help you today?
                        </div>

                        <div className="bg-orange-100 p-3 rounded-lg max-w-[85%] ml-auto text-right">
                            I want to find a worker
                        </div>

                        <div className="bg-gray-100 p-3 rounded-lg max-w-[85%]">
                            Sure 🙂 Please go to the <b>Find Labour</b> page.
                        </div>
                    </div>
                    <div className="p-3 border-t">
                        <input
                            type="text"
                            placeholder="Type a message..."
                            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatBot;