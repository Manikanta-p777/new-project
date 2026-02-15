const AiMsg = ({ values }) => {
    return (
        <li className="flex justify-start">
            <div className="bg-gray-300 text-black px-4 py-2 rounded-lg max-w-[60%] shadow whitespace-pre-wrap break-words">
                {values.msg}
            </div>
        </li>
    );
};

export default AiMsg