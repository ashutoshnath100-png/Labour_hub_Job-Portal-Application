const SafetyTips = () => {
    return (
        <div className="bg-yellow-50 border border-yellow-200 p-5 rounded-lg mt-6">
            <h4 className="font-semibold mb-3 text-yellow-800">
                ⚠ Safety Tips
            </h4>

            <ul className="text-sm text-yellow-700 space-y-2">
                <li>• Always verify worker identity</li>
                <li>• Discuss payment before work starts</li>
                <li>• Do not share OTP or bank details</li>
                <li>• Meet at a safe location</li>
            </ul>
        </div>
    );
};

export default SafetyTips;