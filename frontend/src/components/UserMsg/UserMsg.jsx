const UserMsg = ({ values }) => {
    return (
        <li className="flex justify-end">
            <div className="bg-blue-500 text-white px-4 py-2 rounded-lg max-w-[60%] break-words shadow">
                {values.msg}
            </div>
        </li>
    )
}

export default UserMsg
