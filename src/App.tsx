import { useEffect, useState } from "react";

function App() {
  const firstMessage = [{role: 'coach', content: "What's on your mind?"}]
  const [role, setRole] = useState('self')
  const [dialog, setDialog] = useState(firstMessage)
  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault()
  //   console.log(event.target.message.value)
  // }
  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault()
  //   console.log((event.target as HTMLFormElement).message.value)
  // }

  // const addMessage = (content: string) => {
  //   setRole(prev => prev == 'self' ? 'coach' : 'self')
  //   setDialog( prev => [...prev, { role, content }])
    
  // }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const content = (event.target as HTMLFormElement).message.value;
    if(content.length == 0) return;

    setRole(prev => prev == 'self' ? 'coach' : 'self');
    setDialog( prev => [...prev, { role, content }]);

    (event.target as HTMLFormElement).reset();
  }

  useEffect( () => {
    const convo = document.getElementById('convo');
    if(convo) {
      convo.scrollTop = convo.scrollHeight;
    }
  }, [dialog])
  
  return (
    <div className="h-dvh flex justify-center items-center bg-gray-100 p-4">
      <div className="w-full h-full max-w-lg bg-white shadow-sm p-4 rounded flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-gray-800 text-center flex flex-row gap-2 justify-center">
          <span className={role == "self" ? "underline" : ""}>Self</span>
          <span className={role != "self" ? "underline" : ""}>Coach</span>
        </h1>
        <ul className="flex-1 flex flex-col gap-4 overflow-y-auto no-scrollbar" id="convo">
          {dialog.map( msg => (
            <li className={`w-full ${msg.role == role ? "pl-12" : "pr-12"}`}>
              <div className={`flex w-full ${msg.role == role ? "justify-end" : "justify-start"}`}>
                <p className={`${msg.role == role ? "bg-orange-200" : "bg-blue-200"} p-4 rounded break-words overflow-hidden`}>
                  {msg.content}
                </p>
              </div>
            </li>
          ))}

        </ul>
        <div>
          <form onSubmit={handleSubmit}>
            <textarea
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault();
                    // console.log({event})
                    const form = (event.target as any).closest("form")
                    const submitEvent = new SubmitEvent('submit', { bubbles: true });
                    form.dispatchEvent(submitEvent);
                  }
                }}
                className="w-full bg-gray-100 p-4 mb-2 shadow-md rounded text-gray-600"
                rows={2}
                placeholder="Type your message..."
                name="message"
              />
              
              <div className="flex justify-between">
                  <button type="button"
                    onClick={() => {
                      setDialog(firstMessage);
                      setRole('self');
                    }}
                    className="bg-red-400 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Reset
                  </button>
                  <button type="submit" className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">Send</button>
              </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
