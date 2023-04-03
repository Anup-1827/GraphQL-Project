import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

function ClientRow({ client }) {
  return (
    <tr key={client.id}>
      <td className="border-2 border-black pl-4">{client.name}</td>
      <td className="border-2 border-black pl-4">{client.email}</td>
      <td className="border-2 border-black pl-4">{client.phone}</td>
      <td className="border-2 border-black pl-4 text-center cursor-pointer text-red-500">
        {<FontAwesomeIcon icon={faTrash} />}
      </td>
    </tr>
  );
}

export default ClientRow;
