// import React from 'react';
// import { User, Bot } from 'lucide-react';
// import { formatTime } from '../utils/chatUtils';

// export const MessageBubble = ({ message }) => {
//   const isUser = message.sender === 'user';

//   // Try to parse AI message content as table data
//   let table = null;
//   if (!isUser && typeof message.content === 'string') {
//     try {
//       const data = JSON.parse(message.content);
//       // Array of objects: render as table with headers
//       if (Array.isArray(data) && data.length > 0 && typeof data[0] === 'object' && !Array.isArray(data[0])) {
//         const headers = Object.keys(data[0]);
//         table = (
//           <table className="ai-table">
//             <thead>
//               <tr>
//                 {headers.map((header) => (
//                   <th key={header}>{header}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {data.map((row, i) => (
//                 <tr key={i}>
//                   {headers.map((header) => (
//                     <td key={header}>{row[header]}</td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         );
//       }
//       // Array of arrays: fallback to previous logic
//       else if (Array.isArray(data) && data.length > 0 && Array.isArray(data[0])) {
//         table = (
//           <table className="ai-table">
//             <tbody>
//               {data.map((row, i) => (
//                 <tr key={i}>
//                   {row.map((cell, j) => (
//                     <td key={j}>{cell}</td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         );
//       }
//     } catch (e) {}
//   }

//   return (
//     <div className={`message-bubble ${isUser ? 'user' : 'ai'}`}>
//       <div className="message-avatar">
//         {isUser ? <User size={20} /> : <Bot size={20} />}
//       </div>
//       <div className="message-content">
//         <div className="message-text">
//           {table ? table : message.content}
//         </div>
//         <div className="message-time">
//           {formatTime(message.timestamp)}
//         </div>
//       </div>
//     </div>
//   );
// };
import React from 'react';
import { User, Bot } from 'lucide-react';
import { formatTime } from '../utils/chatUtils';

export const MessageBubble = ({ message }) => {
  const isUser = message.sender === 'user';

  // Render table if rawResults is present
  const renderTable = (data) => {
    if (!Array.isArray(data)) return null;

    // Case: Array of objects
    if (data.length > 0 && typeof data[0] === 'object' && !Array.isArray(data[0])) {
      const headers = Object.keys(data[0]);
      return (
        <table className="ai-table">
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i}>
                {headers.map((header) => (
                  <td key={header}>{row[header]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    // Case: Array of arrays
    if (Array.isArray(data[0])) {
      return (
        <table className="ai-table">
          <tbody>
            {data.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    return null;
  };

  const table = !isUser ? renderTable(message.rawResults) : null;

  return (
    <div className={`message-bubble ${isUser ? 'user' : 'ai'}`}>
      <div className="message-avatar">
        {isUser ? <User size={20} /> : <Bot size={20} />}
      </div>
      <div className="message-content">
        <div className="message-text">
          {message.content}
        </div>

        {table && (
          <div className="message-table">
            {table}
          </div>
        )}

        <div className="message-time">
          {formatTime(message.timestamp)}
        </div>
      </div>
    </div>
  );
};
