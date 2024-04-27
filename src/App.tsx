import { useState } from "react";

function App() {
  const [role, setRole] = useState('self')
  const [dialog, setDialog] = useState([{'role': 'coach', 'content': "What's on your mind?"}])
  return (
    <div className="h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="w-full h-full max-w-lg bg-white shadow-md p-4 rounded flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-gray-800 text-center flex flex-row gap-2 justify-center">
          <span className={role == "self" ? "underline" : ""}>Self</span>
          <span className={role != "self" ? "underline" : ""}>Coach</span>
        </h1>
        <ul className="flex-1 flex flex-col gap-4 overflow-y-auto no-scrollbar">
          {/* {Array(100).fill(0).map( (n, idx) => (
            <>
              <li className="w-full pl-12">
                <div className="flex justify-end w-full">
                  <p className="bg-orange-200 p-4 rounded break-words overflow-hidden">
                  testtesttesttesttesttesttestt esttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest
                  </p>
                </div>
              </li>
              <li className="w-full pr-12">
                <div className="flex justify-end w-full">
                  <p className="bg-blue-200 p-4 rounded break-words overflow-hidden">
                  testtesttesttesttesttesttestt esttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest
                  </p>
                </div>
              </li>
            </>
          ))} */}

          {dialog.map( msg => (
            <li className={`w-full ${msg.role == 'self' ? "pl-12" : "pr-12"}`}>
              <div className={`flex w-full ${msg.role == 'self' ? "justify-end" : "justify-start"}`}>
                <p className={`${msg.role == 'self' ? "bg-orange-200" : "bg-blue-200"} p-4 rounded break-words overflow-hidden`}>
                  {msg.content}
                </p>
              </div>
            </li>
          ))}

        </ul>
        <div>
          <textarea
            className="w-full h-60 bg-gray-100 p-4 mb-2 shadow-md rounded text-gray-600"
            placeholder="Type your message..."
          />
        </div>
      </div>
    </div>
  );
}

export default App;
