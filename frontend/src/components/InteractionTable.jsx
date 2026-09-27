const InteractionTable = ({ interactions }) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Command</th>
            <th>Input</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {interactions.map((interaction) => (
            <tr key={interaction.discordInteractionId}>
              <td>
                {interaction.username || "Unknown"}
              </td>

              <td>
                /{interaction.commandName}
              </td>

              <td>
                {interaction.inputText || "—"}
              </td>

              <td>
                {interaction.status}
              </td>

              <td>
                {new Date(
                  interaction.createdAt
                ).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InteractionTable;